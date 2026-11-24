import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import servicesData from '../data/services.json';
import { BRAND_CONFIG } from '../data/brandConfig';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { ServiceIllustration } from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { JaaliDivider } from '../components/ui/JaaliDivider';
import { JharokhaAccordion } from '../components/ui/JharokhaAccordion';
import { NotFoundPage } from './NotFoundPage';

const MINI_PROCESS_STEPS = [
  { num: '01', title: 'Audit & Aim', note: '7–10 day clarity check' },
  { num: '02', title: 'Design & Build', note: 'Custom Figma + fast code' },
  { num: '03', title: 'Launch & Grow', note: 'Tracked leads + 30d care' },
];

export function ServiceLandingPage({ slug }: { slug: string }) {
  const { lang, openPlannerModal } = useApp();
  const page = servicesData.seoLandingPages.find((p) => p.slug === slug);

  if (!page) {
    return <NotFoundPage />;
  }

  const relatedPages = servicesData.seoLandingPages
    .filter((p) => p.slug !== page.slug)
    .slice(0, 3);

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
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BRAND_CONFIG.domain}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${BRAND_CONFIG.domain}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: page.title,
          item: `${BRAND_CONFIG.domain}/${page.slug}`,
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

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
        <nav aria-label="Breadcrumb" className="type-label flex items-center gap-2 flex-wrap">
          <Link to="/" className="underline min-h-[44px] inline-flex items-center">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/services" className="underline min-h-[44px] inline-flex items-center">
            Services
          </Link>
          <span aria-hidden="true">/</span>
          <span>{page.title}</span>
        </nav>

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="type-label text-[var(--text-terracotta)]">
              Urdta Teeeeeer · Jaipur Studio
            </p>
            <h1 className="type-display">
              {lang === 'hinglish' ? page.heroHeadlineHi : page.heroHeadlineEn}
            </h1>
            <p className="type-body text-[var(--text-secondary)]">
              {page.definition}
            </p>
            <p className="font-mono-num text-sm font-bold text-[var(--text-primary)]">
              {page.priceRef} <span aria-hidden="true">·</span> {page.timeline}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <BrutalButton variant="primary" size="lg" onClick={() => openPlannerModal()}>
                <span>Apna Package Banao</span>
                <ArrowRight className="w-5 h-5" />
              </BrutalButton>
              <BrutalButton to="/contact" variant="secondary" size="lg">
                Book Discovery Chai
              </BrutalButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <BrutalCard arch="jharokha" tone="sandstone" className="p-4 flex items-center justify-center">
              <ServiceIllustration
                name={page.slug}
                alt={`${page.title} Jaipur vector illustration`}
                className="w-full h-40"
              />
            </BrutalCard>
          </div>
        </header>

        {/* Deliverables & Best Built For */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <BrutalCard tone="marigold" arch="scalloped" className="space-y-3">
            <h2 className="type-h3">What You Get</h2>
            <ul className="space-y-2 text-sm font-medium">
              {page.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </BrutalCard>

          <BrutalCard arch="scalloped" className="space-y-3">
            <h2 className="type-h3">Best Built For</h2>
            <ul className="space-y-2 text-sm">
              {page.whoIsItFor.map((w) => (
                <li key={w} className="flex items-start gap-2">
                  <span className="text-[var(--text-terracotta)] font-bold" aria-hidden="true">
                    →
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </BrutalCard>
        </div>

        {/* 14.5 Mini 3-Step Process Strip */}
        <section className="space-y-4">
          <h2 className="type-h3">How This Ships in 3 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MINI_PROCESS_STEPS.map((st) => (
              <BrutalCard key={st.num} tone="cream" className="p-4 space-y-1">
                <span className="type-label text-[var(--text-gulabi)]">{st.num}</span>
                <h3 className="font-display font-bold text-lg">{st.title}</h3>
                <p className="type-small text-[var(--text-secondary)]">{st.note}</p>
              </BrutalCard>
            ))}
          </div>
        </section>

        <JaaliDivider />

        {/* FAQs */}
        <section className="space-y-5">
          <h2 className="type-h2">Frequently Asked Questions</h2>
          <JharokhaAccordion items={page.faqs} />
        </section>

        {/* 14.5 Related Services Grid */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="type-h3">Explore Related Services</h2>
            <BrutalButton to="/services" variant="tertiary">
              All services →
            </BrutalButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPages.map((rel) => (
              <Link
                key={rel.slug}
                to={`/${rel.slug}`}
                className="p-4 brutal-border brutal-shadow-sm bg-[var(--bg-surface)] rounded-[8px] flex items-center gap-3 hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors"
              >
                <div className="w-12 h-10 shrink-0 brutal-border bg-[var(--bg-cream)] rounded-[6px] p-1">
                  <ServiceIllustration name={rel.slug} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-bold text-sm truncate">{rel.title}</div>
                  <div className="font-mono-num text-xs opacity-75">{rel.priceRef}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
