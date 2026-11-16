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

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        <div className="max-w-3xl space-y-3">
          <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
            {t.processSection.eyebrow}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            {t.processSection.headline}
          </h1>
          <p className="text-base md:text-lg text-[#4B433C] dark:text-[#E7D8C5]">
            {t.processSection.subhead}
          </p>
        </div>

        <ProcessJourneyPath />

        <div className="flex flex-wrap gap-4">
          <BrutalButton variant="hotPink" size="lg" onClick={() => openPlannerModal()}>
            Start Step 01: Plan Your Project
          </BrutalButton>
          <BrutalButton to="/packages" variant="cream" size="lg">
            See Packages &amp; Pricing
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
