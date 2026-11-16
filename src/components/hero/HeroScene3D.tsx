import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';

interface KiteActor {
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  stringLine: THREE.Line;
  basePos: THREE.Vector3;
  phase: number;
  speed: number;
  isCut: boolean;
  cutTimer: number;
  spinVel: THREE.Vector3;
}

const KITE_COLORS = [0xffc21a, 0xff4f8b, 0x1fb5b0, 0xd9482b, 0xf4a6b8];

function createOutlinedBox(
  w: number,
  h: number,
  d: number,
  color: number,
  outlineMat: THREE.LineBasicMaterial
): THREE.Group {
  const grp = new THREE.Group();
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshToonMaterial({ color });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const edges = new THREE.EdgesGeometry(geo, 15);
  const line = new THREE.LineSegments(edges, outlineMat);
  grp.add(mesh, line);
  return grp;
}

function buildHawaMahalGroup(outlineMat: THREE.LineBasicMaterial): THREE.Group {
  const palace = new THREE.Group();

  // Base Terrace Platform (grounded at y = 0)
  const basePlinth = createOutlinedBox(9.2, 0.55, 3.0, 0xd9482b, outlineMat);
  basePlinth.position.set(0, 0.275, 0);
  palace.add(basePlinth);

  // 5-tier pyramidal Hawa Mahal facade
  const tiers = [
    { y: 0.55, h: 1.35, bays: 7, bayW: 1.15, z: 0, color: 0xf4a6b8 },
    { y: 1.9, h: 1.25, bays: 5, bayW: 1.2, z: -0.08, color: 0xff85ad },
    { y: 3.15, h: 1.1, bays: 5, bayW: 1.05, z: -0.15, color: 0xf4a6b8 },
    { y: 4.25, h: 0.95, bays: 3, bayW: 1.1, z: -0.2, color: 0xff85ad },
    { y: 5.2, h: 0.85, bays: 1, bayW: 1.5, z: -0.24, color: 0xf4a6b8 },
  ];

  tiers.forEach((tier, tIdx) => {
    const totalW = tier.bays * tier.bayW;
    // Main tier backing wall
    const wall = createOutlinedBox(totalW + 0.3, tier.h, 1.4 - tIdx * 0.12, tier.color, outlineMat);
    wall.position.set(0, tier.y + tier.h / 2, tier.z);
    palace.add(wall);

    // Cornice chhajja ledge
    const ledge = createOutlinedBox(totalW + 0.55, 0.14, 1.65 - tIdx * 0.12, 0xffc21a, outlineMat);
    ledge.position.set(0, tier.y + tier.h + 0.05, tier.z + 0.06);
    palace.add(ledge);

    // Projecting octagonal jharokha bays
    for (let b = 0; b < tier.bays; b++) {
      const bx = (b - (tier.bays - 1) / 2) * tier.bayW;
      const isCenter = b === Math.floor(tier.bays / 2);
      const projDepth = isCenter ? 0.58 : 0.4;

      const bayGeo = new THREE.CylinderGeometry(
        tier.bayW * 0.32,
        tier.bayW * 0.32,
        tier.h * 0.84,
        6
      );
      const bayMat = new THREE.MeshToonMaterial({
        color: isCenter ? 0xffe4ec : 0xf4a6b8,
      });
      const bayMesh = new THREE.Mesh(bayGeo, bayMat);
      bayMesh.position.set(bx, tier.y + tier.h * 0.46, tier.z + 0.65 - tIdx * 0.05 + projDepth * 0.25);
      const bayEdge = new THREE.LineSegments(new THREE.EdgesGeometry(bayGeo, 20), outlineMat);
      bayEdge.position.copy(bayMesh.position);
      palace.add(bayMesh, bayEdge);

      // Tiny jharokha window slit (dark indigo)
      const win = createOutlinedBox(0.22, tier.h * 0.36, 0.08, 0x2b2f77, outlineMat);
      win.position.set(bx, tier.y + tier.h * 0.44, bayMesh.position.z + tier.bayW * 0.29);
      palace.add(win);

      // Curved bangla/chhatri dome cap on top of each bay
      const capGeo = new THREE.ConeGeometry(tier.bayW * 0.36, 0.34, 6);
      const capMat = new THREE.MeshToonMaterial({
        color: isCenter ? 0xffc21a : 0xd9482b,
      });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(bx, tier.y + tier.h * 0.96, bayMesh.position.z);
      const capEdge = new THREE.LineSegments(new THREE.EdgesGeometry(capGeo, 20), outlineMat);
      capEdge.position.copy(cap.position);
      palace.add(cap, capEdge);
    }
  });

  // Grand top Kalash spire
  const kalashGeo = new THREE.ConeGeometry(0.18, 0.65, 8);
  const kalash = new THREE.Mesh(
    kalashGeo,
    new THREE.MeshToonMaterial({ color: 0xffc21a })
  );
  kalash.position.set(0, 6.42, -0.24);
  const kalashEdge = new THREE.LineSegments(new THREE.EdgesGeometry(kalashGeo, 20), outlineMat);
  kalashEdge.position.copy(kalash.position);
  palace.add(kalash, kalashEdge);

  // Subtle ground shadow disc
  const groundGeo = new THREE.CircleGeometry(6.2, 32);
  groundGeo.rotateX(-Math.PI / 2);
  const groundMat = new THREE.MeshBasicMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
  });
  const groundDisc = new THREE.Mesh(groundGeo, groundMat);
  groundDisc.position.y = 0.01;
  palace.add(groundDisc);

  return palace;
}

function buildKiteActor(
  colorHex: number,
  outlineMat: THREE.LineBasicMaterial,
  anchorPos: THREE.Vector3
): KiteActor {
  const group = new THREE.Group();

  // Diamond patang shape
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.55);
  shape.lineTo(0.48, 0.06);
  shape.lineTo(0, -0.52);
  shape.lineTo(-0.48, 0.06);
  shape.closePath();

  const bodyGeo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.04,
    bevelEnabled: false,
  });
  bodyGeo.center();

  const bodyMat = new THREE.MeshToonMaterial({
    color: colorHex,
    side: THREE.DoubleSide,
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  const bodyEdges = new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), outlineMat);

  // Triangular tail
  const tailGeo = new THREE.ConeGeometry(0.16, 0.28, 3);
  const tailMat = new THREE.MeshToonMaterial({ color: 0x111111 });
  const tailMesh = new THREE.Mesh(tailGeo, tailMat);
  tailMesh.position.set(0, -0.64, 0);

  // Invisible larger hitbox for easy clicking/tapping
  const hitGeo = new THREE.BoxGeometry(1.3, 1.4, 0.6);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitMesh = new THREE.Mesh(hitGeo, hitMat);
  hitMesh.layers.set(1);

  group.add(bodyMesh, bodyEdges, tailMesh, hitMesh);
  group.position.copy(anchorPos);

  // Kite string connecting to rooftop
  const strGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    anchorPos.clone(),
  ]);
  const strMat = new THREE.LineBasicMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.55,
  });
  const stringLine = new THREE.Line(strGeo, strMat);

  return {
    group,
    hitMesh,
    stringLine,
    basePos: anchorPos.clone(),
    phase: Math.random() * Math.PI * 2,
    speed: 0.8 + Math.random() * 0.7,
    isCut: false,
    cutTimer: 0,
    spinVel: new THREE.Vector3(),
  };
}

export function HeroScene3D({ onKiteCut }: { onKiteCut?: (count: number) => void }) {
  const { isDark, t } = useApp();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const isDarkRef = useRef(isDark);
  const onKiteCutRef = useRef(onKiteCut);

  const [fallbackActive, setFallbackActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [cutToast, setCutToast] = useState<string | null>(null);
  const [cutCount, setCutCount] = useState<number>(0);

  isDarkRef.current = isDark;
  onKiteCutRef.current = onKiteCut;

  // Sync background & fog when dark mode toggles without recreating WebGL context
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const bgHex = isDark ? 0x14163d : 0xfff4e0;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.025);
  }, [isDark]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || fallbackActive) return;

    // Probe WebGL availability & detect software renderer
    const probeCanvas = document.createElement('canvas');
    const probeGl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!probeGl) {
      setFallbackActive(true);
      return;
    }

    let isSoftwareGl = false;
    try {
      const ext = probeGl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probeGl.RENDERER;
      const gpu = String(probeGl.getParameter(param));
      probeGl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      isSoftwareGl = false;
    }

    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || 640;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const initialBg = isDarkRef.current ? 0x14163d : 0xfff4e0;
    scene.background = new THREE.Color(initialBg);
    scene.fog = new THREE.FogExp2(initialBg, 0.025);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 4.2, isMobile ? 14.5 : 12.2);
    camera.lookAt(0, 3.0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setFallbackActive(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // RoomEnvironment reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // Lighting rig: warm key + cool hemisphere fill + subtle rim
    const keyLight = new THREE.DirectionalLight(0xfff1d6, 1.4);
    keyLight.position.set(8, 12, 9);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xd9f2ff, 0xf4a6b8, 0.85);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x1fb5b0, 0.45);
    rimLight.position.set(-7, 5, -6);
    scene.add(rimLight);

    const outlineMat = new THREE.LineBasicMaterial({ color: 0x111111 });

    // Hawa Mahal composite architecture
    const hawaMahal = buildHawaMahalGroup(outlineMat);
    hawaMahal.position.set(0, -0.4, -0.5);
    scene.add(hawaMahal);

    // Flock of 3D Patang kites (lite mode on mobile)
    const kiteCount = isMobile ? 5 : 9;
    const kites: KiteActor[] = [];
    const hitMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < kiteCount; i++) {
      const spreadX = (i - (kiteCount - 1) / 2) * (isMobile ? 1.65 : 1.35);
      const anchor = new THREE.Vector3(
        spreadX + (Math.random() - 0.5) * 0.6,
        5.2 + (i % 3) * 1.15 + Math.random() * 0.5,
        1.2 + (i % 2) * 0.9
      );
      const kite = buildKiteActor(
        KITE_COLORS[i % KITE_COLORS.length],
        outlineMat,
        anchor
      );
      kite.hitMesh.userData.kiteIndex = i;
      scene.add(kite.group, kite.stringLine);
      kites.push(kite);
      hitMeshes.push(kite.hitMesh);
    }

    container.innerHTML = '';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'pan-y';
    container.appendChild(renderer.domElement);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer steering + raycasting for cutting kites
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const clickNdc = new THREE.Vector2();
    const rootAnchor = new THREE.Vector3(0, 2.2, 0.2);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerTarget.set(nx, ny);
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      clickNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      clickNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(clickNdc, camera);
      const hits = raycaster.intersectObjects(hitMeshes, false);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.kiteIndex as number;
        const actor = kites[idx];
        if (actor && !actor.isCut) {
          actor.isCut = true;
          actor.cutTimer = 0;
          actor.spinVel.set(
            (Math.random() - 0.5) * 4,
            2.2 + Math.random() * 1.5,
            (Math.random() - 0.5) * 4
          );
          actor.stringLine.visible = false;
          setCutCount((prev) => {
            const next = prev + 1;
            onKiteCutRef.current?.(next);
            return next;
          });
          setCutToast(t.hero.katGaya);
          trackConversionEvent('kite_cut', { source: 'hero_3d' });
          window.setTimeout(() => setCutToast(null), 1600);
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove, { passive: true });
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Pause when scrolled out of viewport or tab hidden
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Animation loop with software-WebGL pacing
    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      if (isVisible) {
        pointerCurrent.x = THREE.MathUtils.damp(pointerCurrent.x, pointerTarget.x, 5, delta);
        pointerCurrent.y = THREE.MathUtils.damp(pointerCurrent.y, pointerTarget.y, 5, delta);

        // Subtle Hawa Mahal parallax breathing
        hawaMahal.rotation.y = THREE.MathUtils.damp(
          hawaMahal.rotation.y,
          pointerCurrent.x * 0.14,
          4,
          delta
        );

        kites.forEach((k) => {
          if (!k.isCut) {
            const floatX = Math.sin(elapsed * k.speed + k.phase) * 0.45 + pointerCurrent.x * 1.1;
            const floatY = Math.cos(elapsed * k.speed * 1.2 + k.phase) * 0.3 + pointerCurrent.y * 0.65;
            k.group.position.x = k.basePos.x + floatX;
            k.group.position.y = k.basePos.y + floatY;
            k.group.rotation.z = Math.sin(elapsed * 2.2 + k.phase) * 0.18 - pointerCurrent.x * 0.2;
            k.group.rotation.y = Math.cos(elapsed * 1.4 + k.phase) * 0.2;

            // Update string line from Hawa Mahal roof to kite tail
            const posAttr = k.stringLine.geometry.getAttribute('position') as THREE.BufferAttribute;
            posAttr.setXYZ(0, rootAnchor.x, rootAnchor.y, rootAnchor.z);
            posAttr.setXYZ(1, k.group.position.x, k.group.position.y - 0.5, k.group.position.z);
            posAttr.needsUpdate = true;
          } else {
            k.cutTimer += delta;
            k.group.position.x += k.spinVel.x * delta;
            k.group.position.y += k.spinVel.y * delta;
            k.group.rotation.z += 6.5 * delta;
            k.group.rotation.x += 2.5 * delta;
            if (k.cutTimer > 2.2) {
              k.isCut = false;
              k.group.position.copy(k.basePos);
              k.group.rotation.set(0, 0, 0);
              k.stringLine.visible = true;
            }
          }
        });

        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    const handleContextLost = (ev: Event) => {
      ev.preventDefault();
      setFallbackActive(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [fallbackActive, t.hero.katGaya]);

  if (fallbackActive) {
    return (
      <div className="relative w-full h-full min-h-[340px] md:min-h-[460px] brutal-border brutal-shadow rounded-[6px] overflow-hidden bg-[#F4A6B8]">
        <img
          src="/src/assets/images/jaipur_studio_hero_art_1794811735554.jpg"
          alt="Illustrated Jaipur Hawa Mahal with flying patang kites and kulhad chai"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full min-h-[360px] md:min-h-[480px] brutal-border brutal-shadow rounded-[6px] overflow-hidden bg-[#FFF4E0] dark:bg-[#14163D]"
      aria-label="Interactive 3D Jaipur Hawa Mahal and flying kites scene"
    >
      <div ref={mountRef} className="w-full h-full min-h-[360px] md:min-h-[480px] cursor-crosshair" />

      {/* Subtle bottom control bar (respects Three.js unobstructed viewport rule) */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 pointer-events-none">
        <span className="px-3 py-1.5 text-xs font-bold brutal-border bg-[#FFF4E0] text-[#111111] dark:bg-[#1D2052] dark:text-[#FFF4E0] rounded-[4px]">
          {t.hero.kiteHint}
        </span>
        {cutCount > 0 && (
          <span className="px-3 py-1.5 text-xs font-mono-num font-bold brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px]">
            Kites cut: {cutCount}
          </span>
        )}
      </div>

      {cutToast && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-4 right-4 px-4 py-2 font-hand text-lg brutal-border brutal-shadow-sm bg-[#FF4F8B] text-[#111111] rounded-[4px] -rotate-3 pointer-events-none"
        >
          {cutToast}
        </div>
      )}
    </div>
  );
}
