import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { ChaiFaqIllustration } from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { JharokhaAccordion } from '../components/ui/JharokhaAccordion';

export function FaqPage() {
  const { t, openPlannerModal } = useApp();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqSection.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <SEOHead pageKey="faq" path="/faq" jsonLd={faqSchema} />

      <div className="max-w-[840px] mx-auto px-4 md:px-6 py-8 md:py-12 space-y-7">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <p className="type-label text-[var(--text-terracotta)]">
              {t.faqSection.eyebrow}
            </p>
            <h1 className="type-display">{t.faqSection.headline}</h1>
          </div>
          <ChaiFaqIllustration className="w-20 h-20 shrink-0" />
        </header>

        <JharokhaAccordion items={t.faqSection.items} />

        <div className="flex flex-wrap gap-4 pt-4">
          <BrutalButton variant="primary" size="md" onClick={() => openPlannerModal()}>
            {t.pricingSection.buildCustomCta}
          </BrutalButton>
          <BrutalButton to="/contact" variant="secondary" size="md">
            Ask Another Question
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
