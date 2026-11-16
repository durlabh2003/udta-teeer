import React from 'react';
import pricingData from '../data/pricing.json';
import servicesData from '../data/services.json';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { PricingCard } from '../components/ui/PricingCard';

export function PackagesPage() {
  const { lang, t, openPlannerModal } = useApp();

  const disclosures =
    lang === 'hinglish'
      ? pricingData.mandatoryDisclosures.hinglish
      : pricingData.mandatoryDisclosures.en;

  return (
    <>
      <SEOHead pageKey="packages" path="/packages" />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-14">
        <div className="max-w-3xl space-y-3">
          <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
            {t.pricingSection.eyebrow}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            {t.pricingSection.headline}
          </h1>
          <p className="text-base md:text-lg text-[#4B433C] dark:text-[#E7D8C5]">
            {pricingData._meta.note}
          </p>
        </div>

        {/* Layer A / B / C Architecture */}
        <section className="space-y-5">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">
            Three Transparent Investment Layers
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pricingData.packageLayers.map((layer) => (
              <BrutalCard
                key={layer.id}
                tone={layer.accent as 'marigold' | 'gulabi' | 'peacock'}
                className="flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="text-xs font-mono-num font-extrabold uppercase">
                    {layer.badge}
                  </div>
                  <h3 className="font-editorial text-2xl font-bold">{layer.name}</h3>
                  <div className="font-mono-num text-xl font-extrabold">{layer.startingPrice}</div>
                  <p className="text-xs font-bold opacity-85">{layer.whoFor}</p>
                  <ul className="space-y-1.5 text-sm pt-2">
                    {layer.items.map((it) => (
                      <li key={it}>✓ {it}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] opacity-85 pt-3 border-t-2 border-[#111111]/15">
                  {layer.note}
                </p>
              </BrutalCard>
            ))}
          </div>
        </section>

        {/* 3 Flagships */}
        <section className="space-y-5">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">Core Flagship Offers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  accent={f.accent as 'marigold' | 'gulabi' | 'peacock'}
                  isPopular={f.id === 'creative-web'}
                  ctaLabel={t.pricingSection.buildCustomCta}
                  onCtaClick={() => openPlannerModal(['website-dev'])}
                />
              );
            })}
          </div>
        </section>

        {/* Full Transparent Price Table */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="font-editorial text-2xl font-bold">Complete Starting-From Rate Guide</h2>
            <span className="text-xs font-mono-num text-[#B95E50] dark:text-[#FFC21A] font-bold">
              Editable config: src/data/pricing.json
            </span>
          </div>

          <div className="brutal-border brutal-shadow bg-[#FFF9F0] dark:bg-[#212E46] rounded-[6px] overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#FFC21A] text-[#111111]">
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
                    className="border-b border-[#111111]/15 dark:border-[#FFF9F0]/15 last:border-b-0"
                  >
                    <td className="p-4 font-bold">{row.name}</td>
                    <td className="p-4 text-[#4B433C] dark:text-[#E7D8C5]">{row.billingModel}</td>
                    <td className="p-4 font-mono-num text-xs">{row.timeline}</td>
                    <td className="p-4 font-mono-num font-bold">{row.displayPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Engagement Models + Mandatory Disclosures */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-editorial text-2xl font-bold">Engagement Models</h2>
            <div className="grid grid-cols-1 gap-4">
              {pricingData.engagementModels.map((em) => (
                <BrutalCard key={em.id}>
                  <h3 className="text-lg font-extrabold mb-1">
                    {lang === 'hinglish' ? em.nameHi : em.nameEn}
                  </h3>
                  <p className="text-xs font-bold text-[#B95E50] dark:text-[#FFC21A] mb-2">
                    Best for: {lang === 'hinglish' ? em.bestForHi : em.bestForEn}
                  </p>
                  <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">{em.structureEn}</p>
                </BrutalCard>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-editorial text-2xl font-bold">Important Billing Notes</h2>
            <BrutalCard tone="gulabi" className="space-y-3">
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
          <BrutalButton variant="hotPink" size="lg" onClick={() => openPlannerModal()}>
            {t.pricingSection.buildCustomCta}
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
