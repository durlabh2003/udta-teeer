import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PILLAR_SUMMARY_PRICING } from '../../data/brandConfig';
import { trackConversionEvent } from '../../lib/analytics';
import { ServiceIllustration, ServiceIllustrationKey } from '../illustrations/JaipurIllustrations';

interface PillarPreview {
  id: 'design' | 'development' | 'marketing';
  shortLabel: string;
  workshop: string;
  headline: string;
  startingFrom: string;
  timeline: string;
  to: string;
  illustrationKey: ServiceIllustrationKey;
  plannerServices: string[];
  accentBg: string;
}

const PILLARS: PillarPreview[] = [
  {
    id: 'design',
    shortLabel: 'Design',
    workshop: 'Design Haveli',
    headline: 'Visual identity, Figma UX & packaging built for instant recall.',
    startingFrom: PILLAR_SUMMARY_PRICING.design.price,
    timeline: PILLAR_SUMMARY_PRICING.design.timeline,
    to: '/services/design',
    illustrationKey: 'branding',
    plannerServices: ['branding-identity', 'ui-ux-design'],
    accentBg: 'bg-[var(--color-gulabi)] text-[var(--text-on-gulabi)]',
  },
  {
    id: 'development',
    shortLabel: 'Engineering',
    workshop: 'Digital Karkhana',
    headline: 'Fast React websites, D2C stores, SaaS MVPs & WhatsApp CRM.',
    startingFrom: PILLAR_SUMMARY_PRICING.development.price,
    timeline: PILLAR_SUMMARY_PRICING.development.timeline,
    to: '/services/development',
    illustrationKey: 'website',
    plannerServices: ['website-dev', 'ecommerce-dev'],
    accentBg: 'bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)]',
  },
  {
    id: 'marketing',
    shortLabel: 'Growth',
    workshop: 'Growth Bazaar',
    headline: 'SEO, AI search (AEO) & ads wired to live owned dashboards.',
    startingFrom: PILLAR_SUMMARY_PRICING.marketing.price,
    timeline: PILLAR_SUMMARY_PRICING.marketing.timeline,
    to: '/services/marketing',
    illustrationKey: 'performance',
    plannerServices: ['seo-aeo', 'performance-marketing'],
    accentBg: 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)]',
  },
];

export function HeroStudioShowcase() {
  const { openPlannerModal } = useApp();
  const [activeId, setActiveId] = useState<'design' | 'development' | 'marketing'>('development');
  const [paused, setPaused] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  // Subtle auto-rotation paused on hover/focus or prefers-reduced-motion
  useEffect(() => {
    if (paused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveId((prev) =>
        prev === 'design' ? 'development' : prev === 'development' ? 'marketing' : 'design'
      );
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const active = PILLARS.find((p) => p.id === activeId) ?? PILLARS[1];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="h-full flex flex-col brutal-border brutal-shadow-lg bg-[var(--bg-surface)] rounded-t-[20px] rounded-b-[8px] overflow-hidden"
    >
      {/* Editorial Artwork Frame */}
      <div className="relative w-full aspect-[16/9] max-h-[210px] bg-[var(--color-sandstone)] border-b-2 border-[var(--border-ink)] overflow-hidden">
        {!imgFailed ? (
          <img
            src="/src/assets/images/jaipur_studio_hero_art_1794811735554.jpg"
            alt="Jaipur Hawa Mahal facade with flying kites and studio workspace"
            width={1376}
            height={768}
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full p-4 flex items-center justify-center bg-[var(--bg-cream)]">
            <ServiceIllustration
              name="website"
              alt="Jaipur Hawa Mahal browser architecture illustration"
              className="w-36 h-28"
            />
          </div>
        )}
      </div>

      {/* Interactive 3 Illustrated Mini-Tiles (Auto-rotate + tappable) */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div className="space-y-2.5">
          <div
            role="tablist"
            aria-label="Preview studio capabilities"
            className="grid grid-cols-3 gap-2"
          >
            {PILLARS.map((pillar) => {
              const selected = pillar.id === active.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(pillar.id)}
                  className={`min-h-[60px] p-1.5 brutal-border rounded-[8px] flex flex-col items-center justify-center gap-0.5 text-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)] ${
                    selected
                      ? `${pillar.accentBg} brutal-shadow-sm -translate-y-0.5`
                      : 'bg-[var(--bg-cream)] text-[var(--text-primary)] hover:bg-[var(--bg-sandstone)]'
                  }`}
                >
                  <div className="w-9 h-7">
                    <ServiceIllustration name={pillar.illustrationKey} alt="" className="w-full h-full" />
                  </div>
                  <span className="font-display font-bold text-xs leading-none">
                    {pillar.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="space-y-1 pt-0.5">
            <div className="flex items-center justify-between gap-2 type-label">
              <span className="text-[var(--text-terracotta)]">{active.workshop}</span>
              <span className="text-[var(--text-secondary)]">
                {active.startingFrom} <span aria-hidden="true">·</span> {active.timeline}
              </span>
            </div>
            <p className="text-sm font-bold leading-snug text-[var(--text-primary)]">
              {active.headline}
            </p>
          </div>
        </div>

        <div className="pt-2.5 border-t border-[var(--border-ink)]/15 flex flex-wrap items-center justify-between gap-2">
          <Link
            to={active.to}
            className="min-h-[44px] inline-flex items-center text-xs font-bold underline underline-offset-4 hover:text-[var(--text-gulabi)]"
          >
            Explore {active.workshop} →
          </Link>
          <button
            type="button"
            onClick={() => {
              trackConversionEvent('cta_click', {
                source: 'hero_showcase',
                label: active.id,
              });
              openPlannerModal({ services: active.plannerServices });
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold brutal-border bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] rounded-[8px] whitespace-nowrap cursor-pointer brutal-press"
          >
            <span>Scope {active.shortLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
