import React from 'react';
import { IndustrySolutionsSection } from '../components/sections/IndustrySolutionsSection';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { useApp } from '../context/AppContext';

export function IndustriesPage() {
  const { openPlannerModal } = useApp();

  return (
    <>
      <SEOHead pageKey="industries" path="/industries" />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        <div className="max-w-3xl space-y-3">
          <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
            Digital Pink City · Sector Establishments
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            Built for Jaipur &amp; Indian Businesses Ready to Stand Out
          </h1>
          <p className="text-base md:text-lg text-[#4B433C] dark:text-[#E7D8C5]">
            Different industries win buyers in different ways. Explore tailored design,
            engineering, and marketing systems mapped to your sector&apos;s real conversion friction.
          </p>
        </div>

        <section className="space-y-6">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">
            Explore Solutions Across 10 Sectors
          </h2>
          <IndustrySolutionsSection />
        </section>

        <div className="p-7 brutal-border brutal-shadow bg-[#263650] text-[#FFF9F0] rounded-[6px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-bold">
              Have a niche workflow or multi-location operation?
            </h2>
            <p className="text-sm text-[#FFF9F0]/85">
              Start our 4-step Project Planner and we&apos;ll map the exact architecture for your
              sector.
            </p>
          </div>
          <BrutalButton variant="hotPink" size="md" onClick={() => openPlannerModal()}>
            Plan Your Project
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
