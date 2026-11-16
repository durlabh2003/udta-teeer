import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Palette, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';

interface PillarPreview {
  id: 'design' | 'development' | 'marketing';
  label: string;
  workshop: string;
  headline: string;
  deliverables: string;
  startingFrom: string;
  timeline: string;
  to: string;
  plannerServices: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const PILLARS: PillarPreview[] = [
  {
    id: 'design',
    label: '01. Design',
    workshop: 'Creative Haveli',
    headline: 'Distinctive visual identities, Figma UI/UX systems & packaging built for recall.',
    deliverables: 'Brand Book · UI/UX Design Systems · Motion & Pitch Decks',
    startingFrom: 'From ₹45,000',
    timeline: '2–5 weeks',
    to: '/services/design',
    plannerServices: ['branding-identity', 'ui-ux-design'],
    icon: Palette,
  },
  {
    id: 'development',
    label: '02. Engineering',
    workshop: 'Digital Karkhana',
    headline: 'Custom React/Next websites, D2C storefronts, SaaS MVPs & CRM workflows.',
    deliverables: 'Business Sites · Shopify/Woo · Custom Apps & Automation',
    startingFrom: 'From ₹40,000',
    timeline: '2–6 weeks',
    to: '/services/development',
    plannerServices: ['website-dev', 'ecommerce-dev'],
    icon: Code2,
  },
  {
    id: 'marketing',
    label: '03. Growth',
    workshop: 'Growth Bazaar',
    headline: 'SEO, AI-Search (AEO) & performance ads wired to an owned reporting dashboard.',
    deliverables: 'Local & National SEO · Meta + Google Ads · Bilingual Hooks',
    startingFrom: 'From ₹25,000/mo',
    timeline: 'Monthly Sprint',
    to: '/services/marketing',
    plannerServices: ['seo-aeo', 'performance-marketing'],
    icon: TrendingUp,
  },
];

export function HeroStudioShowcase() {
  const { openPlannerModal } = useApp();
  const [activeId, setActiveId] = useState<'design' | 'development' | 'marketing'>('development');
  const [imgFailed, setImgFailed] = useState(false);

  const active = PILLARS.find((p) => p.id === activeId) ?? PILLARS[1];
  const ActiveIcon = active.icon;

  return (
    <div className="h-full flex flex-col brutal-border brutal-shadow-lg bg-[#FFF9F0] dark:bg-[#212E46] rounded-[6px] overflow-hidden">
      {/* Editorial Artwork Frame */}
      <div className="relative w-full aspect-[16/9] bg-[#F4A6B8] border-b-[3px] border-[#111111] dark:border-[#FFF9F0] overflow-hidden">
        {!imgFailed ? (
          <img
            src="/src/assets/images/jaipur_studio_hero_art_1794811735554.jpg"
            alt="Jaipur Hawa Mahal architectural facade with flying patang kites and kulhad chai studio illustration"
            width={1376}
            height={768}
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4A6B8] text-[#111111]">
            <span className="font-poster text-2xl">Urdta Teeeeeer</span>
            <span className="text-sm font-bold mt-1">Jaipur Creative Technology Studio</span>
          </div>
        )}
      </div>

      {/* Interactive 3-Pillar Studio Scope Explorer */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-4">
        <div className="space-y-3">
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
                  className={`px-2.5 py-2 text-xs font-extrabold brutal-border rounded-[4px] whitespace-nowrap cursor-pointer transition-colors ${
                    selected
                      ? 'bg-[#FFC21A] text-[#111111]'
                      : 'bg-[#F3E5CE] dark:bg-[#182235] text-[#282522] dark:text-[#E7D8C5] hover:bg-[#E7B9A4] hover:text-[#111111]'
                  }`}
                >
                  {pillar.label}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-2 text-xs font-mono-num">
              <span className="inline-flex items-center gap-1.5 font-extrabold text-[#B95E50] dark:text-[#FFC21A]">
                <ActiveIcon className="w-4 h-4" />
                <span>{active.workshop}</span>
              </span>
              <span className="font-bold text-[#4B433C] dark:text-[#E7D8C5]">
                {active.startingFrom} <span aria-hidden="true">·</span> {active.timeline}
              </span>
            </div>

            <p className="text-sm md:text-base font-bold leading-snug text-[#111111] dark:text-[#FFF9F0]">
              {active.headline}
            </p>
            <p className="text-xs font-medium text-[#4B433C] dark:text-[#E7D8C5]">
              {active.deliverables}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/15 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={active.to}
            className="text-xs md:text-sm font-extrabold underline underline-offset-4 hover:text-[#B95E50] dark:hover:text-[#FFC21A]"
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
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold brutal-border bg-[#263650] text-[#FFF9F0] hover:bg-[#FF4F8B] hover:text-[#111111] rounded-[4px] whitespace-nowrap cursor-pointer transition-colors"
          >
            <span>Scope {active.workshop}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
