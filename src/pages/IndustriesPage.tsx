import React from 'react';
import { IndustrySolutionsSection } from '../components/sections/IndustrySolutionsSection';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { useApp } from '../context/AppContext';

export function IndustriesPage() {
  const { t, openPlannerModal } = useApp();

  return (
    <>
      <SEOHead pageKey="industries" path="/industries" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-10">
        <header className="max-w-2xl space-y-2.5">
          <p className="type-label text-[var(--text-terracotta)]">
            Digital Pink City · Sector Blueprints
          </p>
          <h1 className="type-display">Built for Jaipur &amp; Pan-India Sectors</h1>
          <p className="type-body text-[var(--text-secondary)]">
            Design, engineering, and growth systems tuned to real buyer friction in each sector.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="type-h2">Explore 10 Industry Blueprints</h2>
          <IndustrySolutionsSection />
        </section>

        <BrutalCard
          tone="indigo"
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <h2 className="type-h3">Custom workflow or multi-location setup?</h2>
            <p className="type-small opacity-90">
              Start our 60-second Project Planner and we&apos;ll map the exact architecture.
            </p>
          </div>
          <BrutalButton variant="primary" size="md" onClick={() => openPlannerModal()}>
            {t.nav.cta}
          </BrutalButton>
        </BrutalCard>
      </div>
    </>
  );
}
