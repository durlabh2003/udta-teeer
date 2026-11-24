import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import servicesData from '../data/services.json';
import pricingData from '../data/pricing.json';
import { useApp } from '../context/AppContext';
import { ServiceBazaarShowcase } from '../components/sections/ServiceBazaarShowcase';
import { SEOHead } from '../components/SEOHead';
import {
  ServiceIllustration,
  TierThaliIllustration,
} from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { JaaliDivider, JaipurSkylineDivider } from '../components/ui/JaaliDivider';
import { PricingCard } from '../components/ui/PricingCard';
import { ServiceCard } from '../components/ui/ServiceCard';

function getThaliVariant(tier?: string): 'starter' | 'growth' | 'royal' {
  if (tier === 'small-thali') return 'starter';
  if (tier === 'royal-feast' || tier === 'royal-kite') return 'royal';
  return 'growth';
}

export function ServicesPage() {
  const { lang, t, openPlannerModal } = useApp();
  const [stall, setStall] = useState<string>('all');

  const items =
    stall === 'all'
      ? servicesData.catalog
      : servicesData.catalog.filter((s) => s.stall === stall);

  return (
    <>
      <SEOHead pageKey="services" path="/services" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-10">
        <header className="max-w-2xl space-y-2.5">
          <p className="type-label text-[var(--text-terracotta)]">
            {t.servicesSection.eyebrow}
          </p>
          <h1 className="type-display">{t.servicesSection.bazaarTitle}</h1>
          <p className="type-body text-[var(--text-secondary)]">
            {t.servicesSection.subhead}
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-bold">
            <Link
              to="/services/design"
              className="min-h-[44px] px-3.5 py-2 inline-flex items-center brutal-border bg-[var(--color-gulabi-soft)] text-[var(--ink-on-accent)] rounded-[6px] hover:brightness-105"
            >
              01 · Creative Haveli (Design) →
            </Link>
            <Link
              to="/services/development"
              className="min-h-[44px] px-3.5 py-2 inline-flex items-center brutal-border bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] rounded-[6px] hover:brightness-105"
            >
              02 · Digital Karkhana (Development) →
            </Link>
            <Link
              to="/services/marketing"
              className="min-h-[44px] px-3.5 py-2 inline-flex items-center brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[6px] hover:brightness-105"
            >
              03 · Growth Bazaar (Marketing) →
            </Link>
          </div>
        </header>

        {/* Interactive 3-Pillar Jaipur Bazaar */}
        <ServiceBazaarShowcase />

        <JaaliDivider />

        {/* 3 Flagships */}
        <section className="space-y-5">
          <h2 className="type-h2">{t.servicesSection.flagshipsTitle}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                  accent={f.accent as 'marigold' | 'gulabi' | 'cobalt'}
                  isPopular={f.id === 'creative-web'}
                  illustration={
                    <TierThaliIllustration
                      variant={getThaliVariant(f.tierType)}
                      className="w-32 h-16"
                      alt=""
                    />
                  }
                  ctaLabel={t.servicesSection.customizeBtn}
                  subCtaCaption={t.servicesSection.customizeSubEn}
                  onCtaClick={() => openPlannerModal(['website-dev'])}
                />
              );
            })}
          </div>
        </section>

        <JaipurSkylineDivider />

        {/* Filterable Full Catalog */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setStall('all')}
              className={`min-h-[44px] px-4 py-2 text-xs font-bold brutal-border rounded-[6px] cursor-pointer ${
                stall === 'all'
                  ? 'bg-[var(--color-indigo)] text-[var(--text-on-dark)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              {t.servicesSection.allStallsTab}
            </button>
            {servicesData.stalls.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStall(s.id)}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold brutal-border rounded-[6px] cursor-pointer ${
                  stall === s.id
                    ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)]'
                    : 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
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
          <h2 className="type-h2">Focused Secondary Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.secondaryPackages.map((pkg) => (
              <BrutalCard key={pkg.id} className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="type-label text-[var(--text-secondary)]">
                      {pkg.whoFor} <span aria-hidden="true">·</span> {pkg.timeline}
                    </p>
                    <h3 className="type-h3">{pkg.name}</h3>
                  </div>
                  <span className="font-mono-num font-bold text-sm shrink-0">
                    {pkg.startingPrice}
                  </span>
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
        <section className="p-6 brutal-border bg-[var(--bg-surface)] rounded-[10px] space-y-4">
          <h2 className="type-h3">Service Blueprints Across Jaipur &amp; India</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {servicesData.seoLandingPages.map((page) => (
              <Link
                key={page.slug}
                to={`/${page.slug}`}
                className="min-h-[48px] flex items-center justify-between gap-3 p-3 brutal-border bg-[var(--bg-cream)] rounded-[6px] text-sm font-bold hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors"
              >
                <span className="inline-flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-6 shrink-0">
                    <ServiceIllustration name={page.slug} alt="" />
                  </span>
                  <span className="truncate">{page.title}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        <div className="flex justify-center">
          <BrutalButton variant="primary" size="lg" onClick={() => openPlannerModal()}>
            {t.servicesSection.customizeBtn}
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
