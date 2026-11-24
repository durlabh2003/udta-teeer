import React from 'react';
import { useApp } from '../context/AppContext';
import { ProcessJourneyPath } from '../components/sections/ProcessJourneyPath';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';

export function ProcessPage() {
  const { t, openPlannerModal } = useApp();

  return (
    <>
      <SEOHead pageKey="process" path="/process" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
        <header className="max-w-3xl space-y-3">
          <p className="type-label text-[var(--text-terracotta)]">
            {t.processSection.eyebrow}
          </p>
          <h1 className="type-display">{t.processSection.headline}</h1>
          <p className="type-body text-[var(--text-secondary)]">
            {t.processSection.subhead}
          </p>
        </header>

        <ProcessJourneyPath />

        <div className="flex flex-wrap gap-4">
          <BrutalButton variant="primary" size="lg" onClick={() => openPlannerModal()}>
            Start Step 01: Plan Your Shot
          </BrutalButton>
          <BrutalButton to="/packages" variant="secondary" size="lg">
            See Packages &amp; Rates
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
