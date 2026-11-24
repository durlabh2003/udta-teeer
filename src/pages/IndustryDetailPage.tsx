import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import industriesData from '../data/industries.json';
import portfolioData from '../data/portfolio.json';
import caseStudiesData from '../data/case-studies.json';
import { useApp } from '../context/AppContext';
import { trackConversionEvent } from '../lib/analytics';
import { SEOHead } from '../components/SEOHead';
import { ServiceIllustration } from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { JaaliDivider } from '../components/ui/JaaliDivider';
import { JharokhaAccordion } from '../components/ui/JharokhaAccordion';
import { NotFoundPage } from './NotFoundPage';

const INDUSTRY_TO_PLANNER_LABEL: Record<string, string> = {
  retail: 'Retail & Jewellery',
  hospitality: 'Hospitality & Tourism',
  handicrafts: 'Handicrafts & Lifestyle',
  education: 'Education',
  restaurants: 'Restaurant & Cafe',
  startups: 'Startup & SaaS',
  healthcare: 'Healthcare',
  'real-estate': 'Real Estate',
  manufacturing: 'Manufacturing',
  other: 'Other',
};

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openPlannerModal } = useApp();

  const industry = industriesData.industries.find((i) => i.slug === slug);

  useEffect(() => {
    if (industry) {
      trackConversionEvent('industry_page_view', { industry: industry.slug, label: industry.name });
    }
  }, [industry]);

  if (!industry) {
    return <NotFoundPage />;
  }

  const plannerIndustry = INDUSTRY_TO_PLANNER_LABEL[industry.slug] ?? 'Other';

  const relatedPortfolio = portfolioData.projects.filter((p) =>
    industry.relatedProjectSlugs.includes(p.slug)
  );
  const relatedSamples = caseStudiesData.caseStudies.filter((c) =>
    industry.relatedProjectSlugs.includes(c.id)
  );

  return (
    <>
      <SEOHead
        title={`${industry.name} Digital Solutions | Urdta Teeeeeer Jaipur`}
        description={industry.intro}
        path={`/industries/${industry.slug}`}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
        <nav aria-label="Breadcrumb" className="type-label flex flex-wrap items-center gap-2">
          <Link to="/" className="underline min-h-[44px] inline-flex items-center">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/industries" className="underline min-h-[44px] inline-flex items-center">Industries</Link>
          <span aria-hidden="true">/</span>
          <span>{industry.name}</span>
        </nav>

        {/* Industry Intro + Sector Illustration */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 min-w-0">
            <p className="type-label text-[var(--text-terracotta)]">
              {industry.jaipurEstablishment} · Sector Blueprint
            </p>
            <h1 className="type-display break-words">{industry.name}</h1>
            <p className="text-lg font-bold">{industry.tagline}</p>
            <p className="type-body text-[var(--text-secondary)]">{industry.intro}</p>
            <div className="pt-2 flex flex-wrap gap-3">
              <BrutalButton
                variant="primary"
                size="lg"
                onClick={() => {
                  trackConversionEvent('service_cta_click', {
                    source: 'industry_detail',
                    label: industry.slug,
                    industry: plannerIndustry,
                  });
                  openPlannerModal({
                    services: ['website-dev', 'seo-aeo'],
                    industry: plannerIndustry,
                    note: `Industry sector enquiry: ${industry.name} (${industry.recommendedCombo}).`,
                  });
                }}
              >
                <span>Plan Your {industry.name} Shot</span>
                <ArrowRight className="w-5 h-5" />
              </BrutalButton>
              <BrutalButton to="/packages" variant="secondary" size="lg">
                View Packages
              </BrutalButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <BrutalCard arch="jharokha" tone="sandstone" className="p-4 flex items-center justify-center">
              <ServiceIllustration
                name={(industry as { illustrationKey?: string }).illustrationKey}
                alt={`${industry.name} Jaipur illustration`}
                className="w-full h-40"
              />
            </BrutalCard>
          </div>
        </header>

        {/* Common Challenges */}
        <section className="space-y-4">
          <h2 className="type-h2">Common Friction in {industry.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industry.challenges.map((ch, idx) => (
              <BrutalCard key={ch} tone="surface" className="p-4">
                <div className="type-label text-[var(--text-terracotta)] mb-1.5">
                  Friction 0{idx + 1}
                </div>
                <p className="type-small font-medium leading-relaxed">{ch}</p>
              </BrutalCard>
            ))}
          </div>
        </section>

        {/* Design, Development & Marketing Solutions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <BrutalCard tone="gulabi" arch="scalloped" className="space-y-3">
            <h2 className="type-h3">Creative Haveli (Design)</h2>
            <ul className="space-y-2 text-sm font-medium">
              {industry.designSolutions.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </BrutalCard>

          <BrutalCard tone="cobalt" arch="scalloped" className="space-y-3">
            <h2 className="type-h3">Digital Karkhana (Dev)</h2>
            <ul className="space-y-2 text-sm font-medium">
              {industry.developmentSolutions.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </BrutalCard>

          <BrutalCard tone="marigold" arch="scalloped" className="space-y-3">
            <h2 className="type-h3">Growth Bazaar (Marketing)</h2>
            <ul className="space-y-2 text-sm font-medium">
              {industry.marketingSolutions.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </BrutalCard>
        </section>

        {/* Recommended Service Combination */}
        <BrutalCard
          tone="indigo"
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <p className="type-label text-[var(--color-marigold)]">
              Recommended Combined Solution
            </p>
            <h2 className="type-h3">{industry.recommendedCombo}</h2>
          </div>
          <BrutalButton
            variant="primary"
            size="md"
            onClick={() =>
              openPlannerModal({
                services: ['branding-identity', 'website-dev', 'seo-aeo'],
                industry: plannerIndustry,
                note: `Recommended ${industry.name} stack: ${industry.recommendedCombo}.`,
              })
            }
          >
            Customise This Stack
          </BrutalButton>
        </BrutalCard>

        {/* Related Sample Showcases */}
        {(relatedPortfolio.length > 0 || relatedSamples.length > 0) && (
          <section className="space-y-4">
            <h2 className="type-h2">Relevant Sample Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedPortfolio.map((proj) => (
                <BrutalCard key={proj.slug} className="space-y-3">
                  <p className="type-label text-[var(--text-terracotta)]">
                    {proj.statusBadge}
                  </p>
                  <h3 className="type-h3">{proj.name}</h3>
                  <p className="type-small text-[var(--text-secondary)]">{proj.shortDesc}</p>
                  <Link
                    to={`/work/${proj.slug}`}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-bold underline"
                  >
                    Inspect Architecture →
                  </Link>
                </BrutalCard>
              ))}
              {relatedSamples.map((sc) => (
                <BrutalCard key={sc.id} className="space-y-3">
                  <p className="type-label text-[var(--text-terracotta)]">
                    {sc.badgeLabel}
                  </p>
                  <h3 className="type-h3">{sc.client}</h3>
                  <p className="type-small text-[var(--text-secondary)]">{sc.challenge}</p>
                  <Link
                    to={`/work/${sc.id}`}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-bold underline"
                  >
                    Open Sample Case →
                  </Link>
                </BrutalCard>
              ))}
            </div>
          </section>
        )}

        <JaaliDivider />

        {/* Sector FAQs */}
        {industry.faqs && industry.faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="type-h2">Common Questions</h2>
            <JharokhaAccordion items={industry.faqs} />
          </section>
        )}
      </div>
    </>
  );
}
