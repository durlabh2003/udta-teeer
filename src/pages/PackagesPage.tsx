import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import pricingData from '../data/pricing.json';
import servicesData from '../data/services.json';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { TierThaliIllustration } from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { JaaliDivider, JaipurSkylineDivider } from '../components/ui/JaaliDivider';
import { PricingCard } from '../components/ui/PricingCard';

function getThaliVariant(tier?: string): 'starter' | 'growth' | 'royal' {
  if (tier === 'small-thali') return 'starter';
  if (tier === 'royal-feast' || tier === 'royal-kite') return 'royal';
  return 'growth';
}

export function PackagesPage() {
  const { lang, t, openPlannerModal } = useApp();
  const [rateGuideOpen, setRateGuideOpen] = useState(true);

  const disclosures =
    lang === 'hinglish'
      ? pricingData.mandatoryDisclosures.hinglish
      : pricingData.mandatoryDisclosures.en;

  return (
    <>
      <SEOHead pageKey="packages" path="/packages" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-10">
        {/* Header */}
        <header className="max-w-2xl space-y-2.5">
          <p className="type-label text-[var(--text-terracotta)]">
            {t.pricingSection.eyebrow}
          </p>
          <h1 className="type-display">{t.pricingSection.headline}</h1>
          <p className="type-body text-[var(--text-secondary)]">
            {t.pricingSection.subhead}
          </p>
        </header>

        {/* Three Transparent Investment Layers (Jaipur Thali Tiers) */}
        <section className="space-y-5">
          <div className="max-w-xl space-y-1">
            <h2 className="type-h2">Three Transparent Investment Tiers</h2>
            <p className="type-small text-[var(--text-secondary)]">
              Pick the scope tier matching your stage — from ₹2,999 starter packs to full platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {pricingData.packageLayers.map((layer) => (
              <BrutalCard
                key={layer.id}
                arch="scalloped"
                tone={layer.accent as 'marigold' | 'gulabi' | 'cobalt'}
                className="flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="p-2 brutal-border bg-[var(--bg-surface)] rounded-[8px] flex items-center justify-center">
                    <TierThaliIllustration
                      variant={getThaliVariant(layer.tier)}
                      className="w-32 h-16"
                      alt={`${layer.name} tier visual`}
                    />
                  </div>
                  <p className="type-label opacity-85">{layer.badge}</p>
                  <h3 className="type-h3">{layer.name}</h3>
                  <div className="font-mono-num text-xl font-bold">{layer.startingPrice}</div>
                  <p className="text-xs font-bold opacity-85">{layer.whoFor}</p>
                  <ul className="space-y-1.5 text-sm pt-1">
                    {layer.items.map((it) => (
                      <li key={it}>✓ {it}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2.5 border-t-2 border-[var(--border-ink)]/15 space-y-2.5">
                  <p className="text-xs opacity-90">{layer.note}</p>
                  <BrutalButton
                    variant="primary"
                    size="sm"
                    onClick={() => openPlannerModal()}
                    className="w-full"
                  >
                    <span className="flex flex-col items-center leading-tight">
                      <span>{t.pricingSection.buildCustomCta}</span>
                      <span className="text-[10px] font-normal opacity-90">
                        {t.pricingSection.buildCustomSubEn}
                      </span>
                    </span>
                  </BrutalButton>
                </div>
              </BrutalCard>
            ))}
          </div>
        </section>

        <JaaliDivider />

        {/* 3 Core Flagship Offers */}
        <section className="space-y-5">
          <div className="max-w-xl space-y-1">
            <h2 className="type-h2">{t.servicesSection.flagshipsTitle}</h2>
            <p className="type-small text-[var(--text-secondary)]">
              Single accountable workflows aligned across design, code, and growth.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {servicesData.flagships.map((f) => {
              const p = pricingData.startingPrices.find((x) => x.id === f.priceId);
              return (
                <PricingCard
                  key={f.id}
                  title={f.name}
                  price={p?.displayPrice ?? 'Custom'}
                  billingModel={p?.billingModel ?? ''}
                  timeline={p?.timeline ?? ''}
                  description={lang === 'hinglish' ? f.taglineHi : f.taglineEn}
                  deliverables={f.deliverables}
                  accent={f.accent as 'marigold' | 'gulabi' | 'cobalt'}
                  isPopular={f.id === 'creative-web'}
                  illustration={
                    <TierThaliIllustration
                      variant={getThaliVariant(f.tierType)}
                      alt=""
                    />
                  }
                  ctaLabel={t.pricingSection.buildCustomCta}
                  subCtaCaption={t.pricingSection.buildCustomSubEn}
                  onCtaClick={() => openPlannerModal(['website-dev'])}
                />
              );
            })}
          </div>
        </section>

        <JaipurSkylineDivider />

        {/* Collapsible & Mobile-Responsive Starting-From Rate Guide */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="type-h2">Complete Starting-From Rate Guide</h2>
              <p className="type-small text-[var(--text-secondary)]">
                Clear baseline numbers before discovery scoping.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRateGuideOpen((prev) => !prev)}
              aria-expanded={rateGuideOpen}
              className="min-h-[44px] px-4 py-2 brutal-border brutal-shadow-sm bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[6px] inline-flex items-center gap-2 text-sm font-bold cursor-pointer self-start sm:self-auto"
            >
              <span>{rateGuideOpen ? 'Hide Rate Guide' : 'Show Rate Guide'}</span>
              {rateGuideOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {rateGuideOpen && (
            <>
              {/* Mobile stacked cards (< md) */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {pricingData.startingPrices.map((row) => (
                  <BrutalCard key={row.id} className="p-4 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <h3 className="font-display font-bold text-base">{row.name}</h3>
                      <p className="type-label text-[var(--text-secondary)]">
                        {row.billingModel} · {row.timeline}
                      </p>
                    </div>
                    <span className="font-mono-num font-bold text-sm shrink-0">
                      {row.displayPrice}
                    </span>
                  </BrutalCard>
                ))}
              </div>

              {/* Desktop structured table (md+) */}
              <div className="hidden md:block brutal-border brutal-shadow bg-[var(--bg-surface)] rounded-[10px] overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b-[3px] border-[var(--border-ink)] bg-[var(--color-marigold)] text-[var(--text-on-marigold)]">
                      <th className="p-4 font-extrabold">Capability</th>
                      <th className="p-4 font-extrabold">Engagement Model</th>
                      <th className="p-4 font-extrabold">Typical Timeline</th>
                      <th className="p-4 font-extrabold">Starting From</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.startingPrices.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-[var(--border-ink)]/15 last:border-b-0"
                      >
                        <td className="p-4 font-bold">{row.name}</td>
                        <td className="p-4 text-[var(--text-secondary)]">{row.billingModel}</td>
                        <td className="p-4 font-mono-num text-xs">{row.timeline}</td>
                        <td className="p-4 font-mono-num font-bold">{row.displayPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>

        {/* Engagement Models + Mandatory Disclosures */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="type-h2">Engagement Models</h2>
            <div className="grid grid-cols-1 gap-4">
              {pricingData.engagementModels.map((em) => (
                <BrutalCard key={em.id} className="p-5">
                  <h3 className="type-h3 mb-1">
                    {lang === 'hinglish' ? em.nameHi : em.nameEn}
                  </h3>
                  <p className="type-label text-[var(--text-terracotta)] mb-2">
                    Best for: {lang === 'hinglish' ? em.bestForHi : em.bestForEn}
                  </p>
                  <p className="type-small text-[var(--text-secondary)]">{em.structureEn}</p>
                </BrutalCard>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h2 className="type-h2">Clear Billing Terms</h2>
            <BrutalCard tone="gulabi" arch="scalloped" className="space-y-3">
              <ul className="space-y-2.5 text-sm font-medium">
                {disclosures.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="font-bold" aria-hidden="true">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </BrutalCard>
          </div>
        </section>

        <div className="flex justify-center">
          <BrutalButton variant="primary" size="lg" onClick={() => openPlannerModal()}>
            {t.pricingSection.buildCustomCta}
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
