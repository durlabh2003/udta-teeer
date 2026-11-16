import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import servicesData from '../data/services.json';
import pricingData from '../data/pricing.json';
import { useApp } from '../context/AppContext';
import { ServiceBazaarShowcase } from '../components/sections/ServiceBazaarShowcase';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { PricingCard } from '../components/ui/PricingCard';
import { ServiceCard } from '../components/ui/ServiceCard';

export function ServicesPage() {
  const { lang, t, openPlannerModal } = useApp();
  const [stall, setStall] = useState<string>('all');

  const items =
    stall === 'all'
      ? servicesData.catalog
      : servicesData.catalog.filter((s) => s.stall === stall);

  return (
    <>
      <SEOHead
        title="Services Bazaar — Design, Development & Marketing | Urdta Teeeeeer"
        description="Explore Creative Haveli (Design), Digital Karkhana (Development), and Growth Bazaar (Marketing) at Urdta Teeeeeer Jaipur."
        path="/services"
      />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-14">
        <div className="max-w-3xl space-y-3">
          <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
            {t.servicesSection.eyebrow}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            {t.servicesSection.bazaarTitle}
          </h1>
          <p className="text-base md:text-lg text-[#4B433C] dark:text-[#E7D8C5]">
            Explore our three architectural Jaipur establishments or jump straight into a custom
            combined growth plan.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2 text-xs font-bold">
            <Link to="/services/design" className="px-3 py-1.5 brutal-border bg-[#F4A6B8] text-[#111111] rounded-[4px]">
              01 · Creative Haveli (Design) →
            </Link>
            <Link to="/services/development" className="px-3 py-1.5 brutal-border bg-[#1FB5B0] text-[#111111] rounded-[4px]">
              02 · Digital Karkhana (Development) →
            </Link>
            <Link to="/services/marketing" className="px-3 py-1.5 brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px]">
              03 · Growth Bazaar (Marketing) →
            </Link>
          </div>
        </div>

        {/* Interactive 3-Pillar Jaipur Bazaar */}
        <ServiceBazaarShowcase />

        {/* 3 Flagships */}
        <section className="space-y-6">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">Three Flagship Offers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {servicesData.flagships.map((f) => {
              const price = pricingData.startingPrices.find((p) => p.id === f.priceId);
              return (
                <PricingCard
                  key={f.id}
                  title={`${f.stepOrder}. ${f.name}`}
                  price={price?.displayPrice ?? 'Custom'}
                  billingModel={price?.billingModel ?? ''}
                  timeline={price?.timeline ?? ''}
                  description={lang === 'hinglish' ? f.taglineHi : f.taglineEn}
                  deliverables={f.deliverables}
                  accent={f.accent as 'marigold' | 'gulabi' | 'peacock'}
                  isPopular={f.id === 'creative-web'}
                  ctaLabel={t.servicesSection.customizeBtn}
                  onCtaClick={() => openPlannerModal(['website-dev'])}
                />
              );
            })}
          </div>
        </section>

        {/* Filterable Full Catalog */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setStall('all')}
              className={`px-4 py-2 text-xs font-bold brutal-border rounded-[4px] cursor-pointer ${
                stall === 'all' ? 'bg-[#111111] text-[#FFF9F0] dark:bg-[#FFC21A] dark:text-[#111111]' : 'bg-[#FFFFFF] dark:bg-[#212E46]'
              }`}
            >
              {t.servicesSection.allStallsTab}
            </button>
            {servicesData.stalls.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStall(s.id)}
                className={`px-4 py-2 text-xs font-bold brutal-border rounded-[4px] cursor-pointer ${
                  stall === s.id ? 'bg-[#FFC21A] text-[#111111]' : 'bg-[#FFFFFF] dark:bg-[#212E46]'
                }`}
              >
                {lang === 'hinglish' ? s.titleHi : s.titleEn}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Secondary Packages */}
        <section className="space-y-6">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">Focused Secondary Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.secondaryPackages.map((pkg) => (
              <BrutalCard key={pkg.id} className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium text-[#4B433C] dark:text-[#E7D8C5]">
                      {pkg.whoFor} <span aria-hidden="true">·</span> {pkg.timeline}
                    </p>
                    <h3 className="text-xl font-extrabold">{pkg.name}</h3>
                  </div>
                  <span className="font-mono-num font-bold text-sm">{pkg.startingPrice}</span>
                </div>
                <ul className="space-y-1 text-sm">
                  {pkg.includes.map((inc) => (
                    <li key={inc}>→ {inc}</li>
                  ))}
                </ul>
              </BrutalCard>
            ))}
          </div>
        </section>

        {/* Dedicated SEO Landing Pages Directory */}
        <section className="p-6 brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[6px] space-y-4">
          <h2 className="text-xl font-extrabold">Deep-Dive Service Guides (Jaipur &amp; India)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {servicesData.seoLandingPages.map((page) => (
              <Link
                key={page.slug}
                to={`/${page.slug}`}
                className="flex items-center justify-between p-3 brutal-border bg-[#F3E5CE] dark:bg-[#182235] rounded-[4px] text-sm font-bold hover:bg-[#FFC21A] hover:text-[#111111] transition-colors"
              >
                <span>{page.title}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        <div className="flex justify-center">
          <BrutalButton variant="hotPink" size="lg" onClick={() => openPlannerModal()}>
            Plan Your Custom Scope
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
