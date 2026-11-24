import React, { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowRight,
  Compass,
  Crosshair,
  Hammer,
  Palette,
  Rocket,
  TrendingUp,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrutalButton } from '../ui/BrutalButton';

interface StageDef {
  num: string;
  label: string;
  title: string;
  timeline: string;
  owner: string;
  activities: string[];
  deliverables: string[];
  x: number;
  y: number;
  Icon: React.ComponentType<{ className?: string }>;
}

const SIX_STAGES: StageDef[] = [
  {
    num: '01',
    label: 'Target Goal',
    title: 'Understand the Target',
    timeline: 'Day 1–2',
    owner: 'Founder + Lead',
    activities: ['Discovery goals call', 'Audience & rival scan', 'Leak identification'],
    deliverables: ['Requirement Brief', 'Priority List'],
    x: 90,
    y: 112,
    Icon: Crosshair,
  },
  {
    num: '02',
    label: 'Plan Shot',
    title: 'Plan the Shot',
    timeline: '7–10 Days',
    owner: 'Strategy + Tech',
    activities: ['UX & SEO audit', 'Architecture plan', 'Milestone price lock'],
    deliverables: ['90-Day Roadmap', 'Signed Scope'],
    x: 254,
    y: 72,
    Icon: Compass,
  },
  {
    num: '03',
    label: 'Shape Design',
    title: 'Design the Direction',
    timeline: '1–3 Weeks',
    owner: 'Design Lead',
    activities: ['Brand moodboard', 'Figma wireframes', 'Prototype sign-off'],
    deliverables: ['Design System', 'Figma Prototype'],
    x: 418,
    y: 44,
    Icon: Palette,
  },
  {
    num: '04',
    label: 'Build Fast',
    title: 'Build the Solution',
    timeline: '2–6 Weeks',
    owner: 'Engineering',
    activities: ['React / Shopify build', 'Bilingual copy setup', 'WhatsApp CRM sync'],
    deliverables: ['Staging Build', 'Live Webhooks'],
    x: 582,
    y: 38,
    Icon: Hammer,
  },
  {
    num: '05',
    label: 'Clean Launch',
    title: 'Launch with Precision',
    timeline: 'Launch Week',
    owner: 'Joint QA',
    activities: ['Speed & mobile QA', 'Schema SEO indexing', 'Zero-downtime deploy'],
    deliverables: ['QA Sign-Off', '30-Day Support'],
    x: 746,
    y: 54,
    Icon: Rocket,
  },
  {
    num: '06',
    label: 'Compound Growth',
    title: 'Optimise & Grow',
    timeline: 'Monthly',
    owner: 'Growth Lead',
    activities: ['GA4 funnel tracking', 'SEO / AEO sprints', 'Creative hook tests'],
    deliverables: ['Owned Dashboard', 'Growth Loop'],
    x: 910,
    y: 92,
    Icon: TrendingUp,
  },
];

export function ProcessJourneyPath() {
  const { openPlannerModal } = useApp();
  const baseId = useId();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window === 'undefined' ? true : window.innerWidth >= 768
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Hover reveals preview popover on desktop without changing the active highlighted stop
  const displayIdx = hoveredStep !== null ? hoveredStep : activeStep;
  const displayStage = SIX_STAGES[displayIdx];
  const isShowingDetail = detailOpen || hoveredStep !== null;

  useEffect(() => {
    if (!detailOpen) return;
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDetailOpen(false);
        setHoveredStep(null);
        tabRefs.current[activeStep]?.focus();
      }
    };
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDetailOpen(false);
      }
    };
    document.addEventListener('keydown', onDocKey);
    document.addEventListener('mousedown', onDocClick);
    return () => {
      document.removeEventListener('keydown', onDocKey);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [detailOpen, activeStep]);

  const moveFocus = (nextIdx: number) => {
    setActiveStep(nextIdx);
    tabRefs.current[nextIdx]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      moveFocus((idx + 1) % SIX_STAGES.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      moveFocus((idx - 1 + SIX_STAGES.length) % SIX_STAGES.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (activeStep === idx && detailOpen) {
        setDetailOpen(false);
      } else {
        setActiveStep(idx);
        setDetailOpen(true);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setDetailOpen(false);
      setHoveredStep(null);
    }
  };

  const activeStage = SIX_STAGES[activeStep];

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseLeave={() => setHoveredStep(null)}
    >
      {/* Live region announcing active step & detail status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Stop {activeStage.num}: {activeStage.title}, {activeStage.timeline}.{' '}
        {isShowingDetail ? 'Details open.' : 'Press Enter or tap to view activities and deliverables.'}
      </div>

      {/* Single Archery Path Canvas */}
      <div className="brutal-border brutal-shadow bg-[var(--bg-cream)] rounded-[8px] p-4 space-y-3">
        {/* Desktop SVG Flight Arc Visual (purely visual trajectory above the 6 stops) */}
        <div className="hidden md:block">
          <svg
            viewBox="0 0 1000 130"
            fill="none"
            className="w-full h-20"
            aria-hidden="true"
          >
            {/* Jaipur Skyline Horizon Accent */}
            <path
              d="M20 122 H980 M130 122 V104 H185 V122 M460 122 V92 H540 V122 M790 122 V100 H850 V122"
              stroke="var(--border-ink)"
              strokeOpacity="0.2"
              strokeWidth="2.5"
            />
            {/* Full Dotted Arrow Arc */}
            <path
              d="M90 106 Q490 8 910 84"
              stroke="var(--border-ink)"
              strokeOpacity="0.25"
              strokeWidth="4"
              strokeDasharray="8 8"
            />
            {/* Active Flight Trail to Active Step */}
            <path
              d={`M90 106 Q${Math.round((90 + activeStage.x) / 2)} ${Math.max(12, activeStage.y - 36)} ${activeStage.x} ${activeStage.y - 6}`}
              stroke="var(--color-gulabi)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Active Arrow Tip */}
            <circle
              cx={activeStage.x}
              cy={activeStage.y - 6}
              r="7"
              fill="var(--color-gulabi)"
              stroke="var(--border-ink)"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* 6 Interactive Stops — Single Tablist, Icon + Max 3-Word Label Only */}
        <div
          role="tablist"
          aria-label="6-step project archery stops"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 md:gap-3"
        >
          {SIX_STAGES.map((st, idx) => {
            const isActive = idx === activeStep;
            const StopIcon = st.Icon;
            return (
              <button
                key={st.num}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`${baseId}-tab-${st.num}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  if (activeStep === idx && detailOpen) {
                    setDetailOpen(false);
                  } else {
                    setActiveStep(idx);
                    setDetailOpen(true);
                  }
                }}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    setHoveredStep(idx);
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`min-h-[76px] p-3 brutal-border rounded-[8px] flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-shadow focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--focus-ring)] ${
                  isActive
                    ? 'bg-[var(--color-gulabi)] text-[var(--text-on-gulabi)] brutal-shadow-sm'
                    : 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
                }`}
              >
                <span
                  className={`w-9 h-9 brutal-border rounded-full flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)]'
                      : 'bg-[var(--bg-cream)] text-[var(--text-primary)]'
                  }`}
                  aria-hidden="true"
                >
                  <StopIcon className="w-4 h-4 stroke-[2.4]" />
                </span>
                <span className="font-display font-bold text-xs md:text-sm leading-tight">
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop Popover Detail Panel (ONLY shown when hovered or tapped/Enter on md+) */}
        {isDesktop && isShowingDetail && (
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${displayStage.num}`}
            className="p-5 brutal-border brutal-shadow bg-[var(--bg-surface)] rounded-[10px] animate-filter-fade"
          >
            <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-[var(--border-ink)]/15">
              <div>
                <p className="type-label text-[var(--text-gulabi)] mb-1">
                  Stop {displayStage.num} · {displayStage.timeline} · {displayStage.owner}
                </p>
                <h3 className="type-h3">{displayStage.title}</h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <BrutalButton
                  variant="primary"
                  size="sm"
                  onClick={() => openPlannerModal()}
                >
                  <span>Start Step 01</span>
                  <ArrowRight className="w-4 h-4" />
                </BrutalButton>
                <button
                  type="button"
                  aria-label="Close stop details"
                  onClick={() => {
                    setDetailOpen(false);
                    setHoveredStep(null);
                  }}
                  className="w-11 h-11 brutal-border bg-[var(--bg-cream)] text-[var(--text-primary)] rounded-[8px] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="type-label text-[var(--text-cobalt)] mb-2">Activities</p>
                <ul className="space-y-1.5 text-sm font-medium text-[var(--text-primary)]">
                  {displayStage.activities.map((a) => (
                    <li key={a}>• {a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="type-label text-[var(--text-terracotta)] mb-2">Deliverables</p>
                <div className="flex flex-wrap gap-2">
                  {displayStage.deliverables.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1.5 brutal-border bg-[var(--bg-cream)] rounded-[6px] text-xs font-bold"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Sheet Detail (ONLY shown after tap/Enter on < md viewports) */}
      {!isDesktop && detailOpen && (
        <div
          className="fixed inset-0 z-[58] bg-[var(--color-indigo)]/65 flex items-end"
          onClick={() => setDetailOpen(false)}
        >
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${activeStage.num}`}
            onClick={(e) => e.stopPropagation()}
            className="w-full brutal-border border-b-0 bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-t-[20px] p-5 pb-7 space-y-4 shadow-2xl max-h-[78vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--border-ink)]/15">
              <div>
                <p className="type-label text-[var(--text-gulabi)] mb-1">
                  Stop {activeStage.num} · {activeStage.timeline}
                </p>
                <h3 className="type-h3">{activeStage.title}</h3>
              </div>
              <button
                type="button"
                aria-label="Close stop sheet"
                onClick={() => setDetailOpen(false)}
                className="w-11 h-11 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <p className="type-label text-[var(--text-cobalt)] mb-1.5">Activities</p>
              <ul className="space-y-1 text-sm font-medium">
                {activeStage.activities.map((a) => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="type-label text-[var(--text-terracotta)] mb-1.5">Deliverables</p>
              <div className="flex flex-wrap gap-2">
                {activeStage.deliverables.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1.5 brutal-border bg-[var(--bg-cream)] rounded-[6px] text-xs font-bold"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <BrutalButton
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setDetailOpen(false);
                openPlannerModal();
              }}
            >
              <span>Start Step 01</span>
              <ArrowRight className="w-4 h-4" />
            </BrutalButton>
          </div>
        </div>
      )}
    </div>
  );
}
