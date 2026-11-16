import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

interface FallingKite {
  id: number;
  left: number;
  color: string;
  delay: number;
}

const COLORS = ['#FFC21A', '#FF4F8B', '#1FB5B0', '#D9482B', '#F4A6B8'];

/**
 * Tier 3 Easter Eggs:
 * 1. 'K' key triggers a temporary kite shower
 * 2. Konami code triggers a Jaipur camel run across the bottom of the viewport
 */
export function EasterEggs() {
  const { kiteShowerCount } = useApp();
  const [kites, setKites] = useState<FallingKite[]>([]);
  const [camelActive, setCamelActive] = useState(false);

  useEffect(() => {
    if (kiteShowerCount === 0) return;
    const batch: FallingKite[] = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      left: 5 + Math.random() * 90,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.4,
    }));
    setKites(batch);
    const timer = window.setTimeout(() => setKites([]), 2600);
    return () => clearTimeout(timer);
  }, [kiteShowerCount]);

  // Konami code detector
  useEffect(() => {
    const seq = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === seq[idx] || e.key.toLowerCase() === seq[idx]) {
        idx += 1;
        if (idx === seq.length) {
          idx = 0;
          setCamelActive(true);
          window.setTimeout(() => setCamelActive(false), 3800);
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {kites.length > 0 && (
          <div
            className="fixed inset-0 pointer-events-none z-[75] overflow-hidden"
            aria-hidden="true"
          >
            {kites.map((k) => (
              <motion.div
                key={k.id}
                initial={{ y: -60, opacity: 1, rotate: -15 }}
                animate={{ y: '105vh', opacity: 0.2, rotate: 45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, delay: k.delay, ease: 'easeIn' }}
                style={{ left: `${k.left}%` }}
                className="absolute top-0"
              >
                <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                  <path
                    d="M17 2L32 17L17 32L2 17L17 2Z"
                    fill={k.color}
                    stroke="#111111"
                    strokeWidth="2.5"
                  />
                  <path d="M17 32L12 40H22L17 32Z" fill="#111111" />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {camelActive && (
          <motion.div
            initial={{ x: '-15vw' }}
            animate={{ x: '110vw' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.4, ease: 'linear' }}
            className="fixed bottom-4 left-0 z-[75] pointer-events-none px-4 py-2 brutal-border brutal-shadow bg-[#FFC21A] text-[#111111] font-hand text-base rounded-[6px]"
            aria-hidden="true"
          >
            🐪 Padharo Mhare Desh! (Konami Camel Unlocked)
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
