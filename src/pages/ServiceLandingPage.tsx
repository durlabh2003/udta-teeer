import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import servicesData from '../data/services.json';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { JharokhaAccordion } from '../components/ui/JharokhaAccordion';
import { NotFoundPage } from './NotFoundPage';

export function ServiceLandingPage({ slug }: { slug: string }) {
  const { lang } = useApp();
  const page = servicesData.seoLandingPages.find((p) => p.slug === slug);

  if (!page) {
    return <NotFoundPage />;
  }

  const structuredSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      serviceType: page.serviceType,
      description: page.definition,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Urdta Teeeeeer',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Jaipur',
          addressRegion: 'Rajasthan',
          addressCountry: 'IN',
        },
      },
      areaServed: ['Jaipur', 'Rajasthan', 'India'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${window.location.origin}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: page.title,
          item: `${window.location.origin}/${page.slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <SEOHead
        pageKey={page.slug}
        path={`/${page.slug}`}
        jsonLd={structuredSchema}
      />

      <div className="max-w-[1160px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        <nav aria-label="Breadcrumb" className="text-xs font-bold flex items-center gap-2">
          <Link to="/" className="underline">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/services" className="underline">
            Services
          </Link>
          <span aria-hidden="true">/</span>
          <span>{page.title}</span>
        </nav>

        <header className="space-y-4 max-w-3xl">
          <p className="font-hand text-base text-[#D9482B] dark:text-[#FFC21A]">
            Urdta Teeeeeer · Jaipur Creative Technology Studio
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {lang === 'hinglish' ? page.heroHeadlineHi : page.heroHeadlineEn}
          </h1>
          {/* Answer-Engine Friendly Concise Definition */}
          <p className="text-base md:text-lg leading-relaxed text-[#3A3532] dark:text-[#E6D8C5]">
            {page.definition}
          </p>
          <p className="font-mono-num text-sm font-bold text-[#111111] dark:text-[#FFC21A]">
            {page.priceRef} <span aria-hidden="true">·</span> Typical timeline: {page.timeline}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <BrutalButton to="/build" variant="hotPink" size="lg">
              <span>Customize Scope</span>
              <ArrowRight className="w-5 h-5" />
            </BrutalButton>
            <BrutalButton to="/contact" variant="cream" size="lg">
              Book Discovery Chai
            </BrutalButton>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BrutalCard tone="marigold" className="space-y-3">
            <h2 className="text-2xl font-extrabold">What You Get</h2>
            <ul className="space-y-2 text-sm font-medium">
              {page.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </BrutalCard>

          <BrutalCard className="space-y-3">
            <h2 className="text-2xl font-extrabold">Best Built For</h2>
            <ul className="space-y-2 text-sm">
              {page.whoIsItFor.map((w) => (
                <li key={w} className="flex items-start gap-2">
                  <span className="text-[#D9482B] dark:text-[#FFC21A] font-bold" aria-hidden="true">
                    →
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </BrutalCard>
        </div>

        <section className="space-y-5">
          <h2 className="text-2xl font-extrabold">Frequently Asked Questions</h2>
          <JharokhaAccordion items={page.faqs} />
        </section>
      </div>
    </>
  );
}
