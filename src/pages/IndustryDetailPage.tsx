import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import industriesData from '../data/industries.json';
import portfolioData from '../data/portfolio.json';
import caseStudiesData from '../data/case-studies.json';
import { useApp } from '../context/AppContext';
import { trackConversionEvent } from '../lib/analytics';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { JharokhaAccordion } from '../components/ui/JharokhaAccordion';
import { NotFoundPage } from './NotFoundPage';

const INDUSTRY_TO_PLANNER_LABEL: Record<string, string> = {
  retail: 'Jewellery',
  hospitality: 'Hospitality',
  handicrafts: 'D2C and E-commerce',
  education: 'Education',
  restaurants: 'Restaurant and Cafe',
  startups: 'Startup and Technology',
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
  const relatedTemplates = caseStudiesData.caseStudies.filter((c) =>
    industry.relatedProjectSlugs.includes(c.id)
  );

  return (
    <>
      <SEOHead
        title={`${industry.name} Digital Solutions | Urdta Teeeeeer Jaipur`}
        description={industry.intro}
        path={`/industries/${industry.slug}`}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        <nav aria-label="Breadcrumb" className="text-xs font-bold flex items-center gap-2">
          <Link to="/" className="underline">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/industries" className="underline">Industries</Link>
          <span aria-hidden="true">/</span>
          <span>{industry.name}</span>
        </nav>

        {/* 1. Industry Intro */}
        <header className="space-y-4 max-w-3xl">
          <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
            {industry.jaipurEstablishment} · Sector Blueprint
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            {industry.name}
          </h1>
          <p className="text-lg font-bold">{industry.tagline}</p>
          <p className="text-base leading-relaxed text-[#4B433C] dark:text-[#E7D8C5]">
            {industry.intro}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <BrutalButton
              variant="hotPink"
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
              <span>Plan Your {industry.name} Project</span>
              <ArrowRight className="w-5 h-5" />
            </BrutalButton>
            <BrutalButton to="/packages" variant="cream" size="lg">
              View Transparent Pricing
            </BrutalButton>
          </div>
        </header>

        {/* 2. Common Challenges */}
        <section className="space-y-4">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">
            Common Digital Challenges in {industry.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {industry.challenges.map((ch, idx) => (
              <BrutalCard key={ch} tone="surface">
                <div className="font-mono-num text-xs font-bold text-[#B95E50] dark:text-[#FFC21A] mb-2">
                  Friction 0{idx + 1}
                </div>
                <p className="text-sm font-medium leading-relaxed">{ch}</p>
              </BrutalCard>
            ))}
          </div>
        </section>

        {/* 3, 4, 5. Design, Development & Marketing Solutions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BrutalCard tone="gulabi" className="space-y-3">
            <h2 className="text-xl font-extrabold">Design Solutions (Creative Haveli)</h2>
            <ul className="space-y-2 text-sm font-medium">
              {industry.designSolutions.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </BrutalCard>

          <BrutalCard tone="peacock" className="space-y-3">
            <h2 className="text-xl font-extrabold">Development (Digital Karkhana)</h2>
            <ul className="space-y-2 text-sm font-medium">
              {industry.developmentSolutions.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </BrutalCard>

          <BrutalCard tone="marigold" className="space-y-3">
            <h2 className="text-xl font-extrabold">Marketing (Growth Bazaar)</h2>
            <ul className="space-y-2 text-sm font-medium">
              {industry.marketingSolutions.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </BrutalCard>
        </section>

        {/* 6. Recommended Service Combination */}
        <section className="p-6 md:p-8 brutal-border brutal-shadow bg-[#263650] text-[#FFF9F0] rounded-[6px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono-num font-bold text-[#FFC21A] uppercase">
              Recommended Combined Solution
            </div>
            <h2 className="font-editorial text-2xl font-bold">{industry.recommendedCombo}</h2>
          </div>
          <BrutalButton
            variant="hotPink"
            size="md"
            onClick={() =>
              openPlannerModal({
                services: ['branding-identity', 'website-dev', 'seo-aeo'],
                industry: plannerIndustry,
                note: `Recommended ${industry.name} stack: ${industry.recommendedCombo}.`,
              })
            }
          >
            Customize This Stack
          </BrutalButton>
        </section>

        {/* 7. Related Projects / Portfolio Candidates */}
        {(relatedPortfolio.length > 0 || relatedTemplates.length > 0) && (
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl md:text-3xl font-bold">
              Relevant Projects &amp; Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPortfolio.map((proj) => (
                <BrutalCard key={proj.slug} className="space-y-3">
                  <div className="text-[11px] font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A]">
                    {proj.statusBadge}
                  </div>
                  <h3 className="text-xl font-extrabold">{proj.name}</h3>
                  <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">{proj.shortDesc}</p>
                  <Link
                    to={`/work/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold underline"
                  >
                    Inspect Project Architecture →
                  </Link>
                </BrutalCard>
              ))}
              {relatedTemplates.map((tpl) => (
                <BrutalCard key={tpl.id} className="space-y-3">
                  <div className="text-[11px] font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A]">
                    {tpl.placeholderTag}
                  </div>
                  <h3 className="text-xl font-extrabold">{tpl.client}</h3>
                  <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">{tpl.challenge}</p>
                  <Link
                    to={`/work/${tpl.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold underline"
                  >
                    Open Case Study Template →
                  </Link>
                </BrutalCard>
              ))}
            </div>
          </section>
        )}

        {/* 8. Sector FAQs */}
        {industry.faqs && industry.faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl font-bold">Common Questions</h2>
            <JharokhaAccordion items={industry.faqs} />
          </section>
        )}
      </div>
    </>
  );
}
