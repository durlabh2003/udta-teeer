import React, { useState } from 'react';
import { ArrowRight, Code2, Layers, Megaphone, Palette, ShoppingBag, Smartphone, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PILLAR_SUMMARY_PRICING } from '../../data/brandConfig';
import { trackConversionEvent } from '../../lib/analytics';
import {
  PillarBazaarIllustration,
  PillarHaveliIllustration,
  PillarKarkhanaIllustration,
  ThreePillarsInterlockIllustration,
} from '../illustrations/JaipurIllustrations';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalCard } from '../ui/BrutalCard';

const PILLAR_CARDS = [
  {
    id: 'design' as const,
    name: 'Design Haveli',
    kicker: '01 · Design',
    priceFrom: PILLAR_SUMMARY_PRICING.design.price,
    timeline: PILLAR_SUMMARY_PRICING.design.timeline,
    exploreUrl: '/services/design',
    preselect: ['branding-identity', 'ui-ux-design'],
    badgeBg: 'bg-[var(--color-gulabi)] text-[var(--text-on-gulabi)]',
    Illustration: PillarHaveliIllustration,
    subServices: [
      { label: 'Brand Identity & Logo', Icon: Palette },
      { label: 'UI/UX & Prototypes', Icon: Layers },
      { label: 'Packaging & Motion', Icon: Sparkles },
    ],
  },
  {
    id: 'development' as const,
    name: 'Digital Karkhana',
    kicker: '02 · Development',
    priceFrom: PILLAR_SUMMARY_PRICING.development.price,
    timeline: PILLAR_SUMMARY_PRICING.development.timeline,
    exploreUrl: '/services/development',
    preselect: ['website-dev', 'ecommerce-dev'],
    badgeBg: 'bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)]',
    Illustration: PillarKarkhanaIllustration,
    subServices: [
      { label: 'Websites & Landing Pages', Icon: Code2 },
      { label: 'D2C E-Commerce Stores', Icon: ShoppingBag },
      { label: 'SaaS, Apps & CRM', Icon: Smartphone },
    ],
  },
  {
    id: 'marketing' as const,
    name: 'Growth Bazaar',
    kicker: '03 · Marketing',
    priceFrom: PILLAR_SUMMARY_PRICING.marketing.price,
    timeline: PILLAR_SUMMARY_PRICING.marketing.timeline,
    exploreUrl: '/services/marketing',
    preselect: ['seo-aeo', 'performance-marketing'],
    badgeBg: 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)]',
    Illustration: PillarBazaarIllustration,
    subServices: [
      { label: 'Local SEO & AI Search', Icon: Megaphone },
      { label: 'Google & Meta Ads', Icon: Sparkles },
      { label: 'Hinglish Content & CRO', Icon: Layers },
    ],
  },
];

export function ServiceBazaarShowcase() {
  const { openPlannerModal } = useApp();
  const [hqSelected, setHqSelected] = useState<string[]>(['Design', 'Development']);

  const toggleHq = (pillar: string) => {
    setHqSelected((prev) =>
      prev.includes(pillar) ? prev.filter((p) => p !== pillar) : [...prev, pillar]
    );
  };

  const handleHqLaunch = () => {
    const mapped: string[] = [];
    if (hqSelected.includes('Design')) mapped.push('branding-identity', 'ui-ux-design');
    if (hqSelected.includes('Development')) mapped.push('website-dev');
    if (hqSelected.includes('Marketing')) mapped.push('seo-aeo', 'performance-marketing');
    trackConversionEvent('service_cta_click', {
      source: 'growth_hq',
      label: hqSelected.join('+'),
    });
    openPlannerModal(mapped.length ? mapped : ['website-dev']);
  };

  return (
    <div className="space-y-6">
      {/* 3 Visual-First Pillar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {PILLAR_CARDS.map((card) => {
          const Illustration = card.Illustration;
          return (
            <BrutalCard
              key={card.id}
              arch="jharokha"
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`px-2 py-0.5 type-label brutal-border rounded-[6px] ${card.badgeBg}`}
                  >
                    {card.kicker}
                  </span>
                  <span className="font-mono-num text-xs font-bold text-[var(--text-secondary)]">
                    {card.priceFrom} <span aria-hidden="true">·</span> {card.timeline}
                  </span>
                </div>

                <div className="brutal-border rounded-[8px] bg-[var(--bg-cream)] p-2.5 flex items-center justify-center">
                  <Illustration className="w-full h-24" alt={card.name} />
                </div>

                <h3 className="type-h3">{card.name}</h3>

                {/* Max 3 concise icon-labelled sub-services */}
                <ul className="space-y-1.5">
                  {card.subServices.map(({ label, Icon }) => (
                    <li
                      key={label}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--text-primary)]"
                    >
                      <span className="w-6 h-6 brutal-border bg-[var(--bg-cream)] rounded-[5px] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[var(--text-terracotta)]" aria-hidden="true" />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-ink)]/15 flex flex-wrap items-center justify-between gap-2">
                <BrutalButton to={card.exploreUrl} variant="tertiary" size="sm">
                  Explore Pillar →
                </BrutalButton>
                <BrutalButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    trackConversionEvent('service_cta_click', {
                      source: 'service_bazaar_pillar',
                      label: card.id,
                    });
                    openPlannerModal(card.preselect);
                  }}
                >
                  Scope {card.id === 'design' ? 'Design' : card.id === 'development' ? 'Build' : 'Growth'}
                </BrutalButton>
              </div>
            </BrutalCard>
          );
        })}
      </div>

      {/* Combined System Banner with Interlocked Three-Pillar Diagram */}
      <div className="p-4 md:p-6 brutal-border brutal-shadow bg-[var(--color-indigo)] text-[#FFF7EC] rounded-t-[16px] rounded-b-[8px] grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-4 brutal-border bg-[var(--bg-surface)] rounded-[8px] p-2.5">
          <ThreePillarsInterlockIllustration
            className="w-full h-20"
            alt="Brand, Web & Growth working together"
          />
        </div>

        <div className="lg:col-span-5 space-y-1.5">
          <div className="type-label text-[var(--color-marigold)]">
            Combined System · {hqSelected.length > 0 ? `${hqSelected.length} Pillars Selected` : 'Select Pillars'}
          </div>
          <h3 className="type-h3 text-[var(--text-on-dark)]">
            Combine Design, Code &amp; Growth Under One Roof
          </h3>
          <p className="type-small text-[var(--text-on-dark)]/80">
            Toggle active workshops below to build your custom stack.
          </p>
        </div>

        <div className="lg:col-span-3 space-y-2.5">
          <div className="flex flex-wrap gap-1.5">
            {['Design', 'Development', 'Marketing'].map((pillar) => {
              const checked = hqSelected.includes(pillar);
              return (
                <button
                  key={pillar}
                  type="button"
                  onClick={() => toggleHq(pillar)}
                  aria-pressed={checked}
                  className={`min-h-[44px] px-2.5 py-1 text-xs font-bold brutal-border rounded-[6px] cursor-pointer transition-colors ${
                    checked
                      ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)]'
                      : 'bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {checked ? '✓ ' : '+ '}
                  {pillar}
                </button>
              );
            })}
          </div>
          <BrutalButton variant="primary" size="sm" onClick={handleHqLaunch} className="w-full">
            <span>Build Combined Plan</span>
            <ArrowRight className="w-4 h-4" />
          </BrutalButton>
        </div>
      </div>
    </div>
  );
}
