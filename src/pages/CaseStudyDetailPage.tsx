import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import caseStudiesData from '../data/case-studies.json';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { NotFoundPage } from './NotFoundPage';

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openPlannerModal } = useApp();

  const candidate = portfolioData.projects.find((p) => p.slug === slug);
  const template = caseStudiesData.caseStudies.find((c) => c.id === slug);

  if (!candidate && !template) {
    return <NotFoundPage />;
  }

  // Normalize either portfolio candidate or template slot into 11-part detail view
  const allSlugs = [
    ...portfolioData.projects.map((p) => ({ slug: p.slug, name: p.name })),
    ...caseStudiesData.caseStudies.map((c) => ({ slug: c.id, name: c.client })),
  ];
  const currentIdx = allSlugs.findIndex((x) => x.slug === slug);
  const prevItem = currentIdx > 0 ? allSlugs[currentIdx - 1] : null;
  const nextItem = currentIdx >= 0 && currentIdx < allSlugs.length - 1 ? allSlugs[currentIdx + 1] : null;

  const title = candidate ? candidate.name : template!.client;
  const statusBadge = candidate ? candidate.statusBadge : template!.placeholderTag;
  const industry = candidate ? candidate.industry : template!.industry;
  const summary = candidate ? candidate.shortDesc : template!.challenge;
  const image = candidate ? candidate.image : template!.image;
  const imageAlt = candidate ? candidate.imageAlt : template!.imageAlt;
  const servicesDelivered = candidate ? candidate.servicesDelivered : template!.whatWeBuilt;
  const timeline = candidate ? candidate.timeline : 'Verify timeline upon publication';
  const challenge = candidate ? candidate.challenge : template!.challenge;
  const objective = candidate
    ? candidate.objective
    : 'Turn business bottlenecks into measurable funnel outcomes across design, engineering, and acquisition.';
  const strategy = candidate
    ? candidate.strategy
    : 'Diagnostic-first prioritization pairing fast UX clarity with conversion instrumentation.';
  const execution = candidate
    ? candidate.execution
    : {
        design: template!.whatWeBuilt[0] ?? 'Custom UI/UX & Brand System',
        development: template!.whatWeBuilt[1] ?? 'Clean full-stack build & integrations',
        marketing: template!.whatWeBuilt[2] ?? 'Conversion tracking & growth setup',
      };
  const techStack = candidate ? candidate.techStack : ['React', 'TypeScript', 'Tailwind CSS', 'GA4 / Schema SEO'];
  const feedback = candidate ? candidate.clientFeedback : `${template!.quote} — ${template!.quoteAuthor}`;

  return (
    <>
      <SEOHead
        title={`${title} — Case Study | Urdta Teeeeeer Jaipur`}
        description={summary}
        path={`/work/${slug}`}
      />

      <div className="max-w-[1160px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        <nav aria-label="Breadcrumb" className="text-xs font-bold flex items-center gap-2">
          <Link to="/" className="underline">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/work" className="underline">Work</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>

        {/* 1 & 2. Header & Summary Card */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 text-xs font-mono-num font-bold brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px]">
              {statusBadge}
            </div>
            <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-base md:text-lg text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed">
              {summary}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <BrutalButton
                variant="hotPink"
                size="md"
                onClick={() =>
                  openPlannerModal({
                    services: ['website-dev', 'ui-ux-design'],
                    note: `Interested in a project similar to ${title} (${industry}).`,
                  })
                }
              >
                <Sparkles className="w-4 h-4" />
                <span>Build Something Similar</span>
              </BrutalButton>
              <BrutalButton to="/work" variant="cream" size="md">
                All Projects
              </BrutalButton>
            </div>
          </div>

          <BrutalCard tone="surface" className="lg:col-span-5 space-y-3 text-sm">
            <div>
              <div className="text-xs font-bold opacity-70 uppercase">Industry</div>
              <div className="font-bold">{industry}</div>
            </div>
            <div>
              <div className="text-xs font-bold opacity-70 uppercase">Services Scope</div>
              <ul className="mt-1 space-y-1">
                {servicesDelivered.map((s) => (
                  <li key={s}>→ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold opacity-70 uppercase">Timeline</div>
              <div className="font-mono-num text-xs font-bold">{timeline}</div>
            </div>
          </BrutalCard>
        </header>

        {/* Visual Showcase */}
        <div className="brutal-border brutal-shadow-lg rounded-[6px] overflow-hidden bg-[#F3E5CE]">
          <img
            src={image}
            alt={imageAlt}
            width={1200}
            height={896}
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="w-full max-h-[460px] object-cover"
          />
        </div>

        {/* 3, 4, 5. Challenge, Objective, Strategy */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BrutalCard>
            <h2 className="text-lg font-extrabold mb-2">Challenge &amp; Context</h2>
            <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed">{challenge}</p>
          </BrutalCard>
          <BrutalCard>
            <h2 className="text-lg font-extrabold mb-2">Project Objective</h2>
            <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed">{objective}</p>
          </BrutalCard>
          <BrutalCard tone="marigold">
            <h2 className="text-lg font-extrabold mb-2">Strategy &amp; Direction</h2>
            <p className="text-sm leading-relaxed">{strategy}</p>
          </BrutalCard>
        </section>

        {/* 6. Execution Breakdown */}
        <section className="space-y-4">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">Execution Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <BrutalCard>
              <div className="text-xs font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A] mb-1">
                01 · Design
              </div>
              <p className="text-sm leading-relaxed">{execution.design}</p>
            </BrutalCard>
            <BrutalCard>
              <div className="text-xs font-mono-num font-bold text-[#1FB5B0] mb-1">
                02 · Development
              </div>
              <p className="text-sm leading-relaxed">{execution.development}</p>
            </BrutalCard>
            <BrutalCard>
              <div className="text-xs font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A] mb-1">
                03 · Marketing
              </div>
              <p className="text-sm leading-relaxed">{execution.marketing}</p>
            </BrutalCard>
          </div>
        </section>

        {/* 7, 8, 9. Results, Stack, Feedback */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <BrutalCard className="lg:col-span-7 space-y-3">
            <h2 className="text-xl font-extrabold">Measured Outcomes &amp; Verification Status</h2>
            {candidate ? (
              <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">{candidate.results}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {template!.metrics.map((m) => (
                  <div key={m.label} className="p-3 brutal-border bg-[#F3E5CE] dark:bg-[#182235] rounded-[4px]">
                    <div className="text-xs font-bold mb-1">{m.label}</div>
                    <div className="text-xs font-mono-num opacity-75">{m.before}</div>
                    <div className="text-xs font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A]">
                      {m.after}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <blockquote className="pt-3 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20 text-sm italic">
              {feedback}
            </blockquote>
          </BrutalCard>

          <BrutalCard tone="gulabi" className="lg:col-span-5 space-y-3">
            <h2 className="text-xl font-extrabold">Technology &amp; Tools</h2>
            <p className="text-sm font-mono-num font-bold leading-relaxed">
              {techStack.join(' · ')}
            </p>
            <div className="pt-2">
              <BrutalButton
                variant="ink"
                size="md"
                onClick={() =>
                  openPlannerModal({
                    services: ['website-dev', 'branding-identity'],
                    note: `Interested in a project similar to ${title} (${industry}).`,
                  })
                }
              >
                Start Your Similar Project
              </BrutalButton>
            </div>
          </BrutalCard>
        </section>

        {/* 10 & 11. Next / Previous Navigation */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t-2 border-[#111111]/20 dark:border-[#FFF9F0]/20">
          {prevItem ? (
            <Link
              to={`/work/${prevItem.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Prev: {prevItem.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextItem && (
            <Link
              to={`/work/${nextItem.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
            >
              <span>Next: {nextItem.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
