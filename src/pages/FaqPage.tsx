import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { JharokhaAccordion } from '../components/ui/JharokhaAccordion';

export function FaqPage() {
  const { t } = useApp();

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
      <SEOHead
        title="FAQs — Honest Answers on Pricing, Templates & Support | Urdta Teeeeeer"
        description="Straight answers about custom builds vs templates, ad spend transparency, post-launch support, and why Urdta Teeeeeer starts with a diagnostic."
        path="/faq"
        jsonLd={faqSchema}
      />

      <div className="max-w-[960px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
        <div className="space-y-2">
          <p className="font-hand text-base text-[#D9482B] dark:text-[#FFC21A]">
            {t.faqSection.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {t.faqSection.headline}
          </h1>
        </div>

        <JharokhaAccordion items={t.faqSection.items} />

        <div className="flex flex-wrap gap-4 pt-4">
          <BrutalButton to="/build" variant="hotPink" size="md">
            Apna Package Banao
          </BrutalButton>
          <BrutalButton to="/contact" variant="cream" size="md">
            Ask Another Question
          </BrutalButton>
        </div>
      </div>
    </>
  );
}
