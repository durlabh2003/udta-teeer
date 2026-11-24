import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import caseStudiesData from '../data/case-studies.json';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { ServiceIllustration } from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { NotFoundPage } from './NotFoundPage';

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openPlannerModal } = useApp();
  const [imgFailed, setImgFailed] = useState(false);

  const portfolioMatch = portfolioData.projects.find((p) => p.slug === slug);
  const sampleCase = caseStudiesData.caseStudies.find((c) => c.id === slug);

  if (!portfolioMatch && !sampleCase) {
    return <NotFoundPage />;
  }

  const allSlugs = [
    ...portfolioData.projects.map((p) => ({ slug: p.slug, name: p.name })),
    ...caseStudiesData.caseStudies.map((c) => ({ slug: c.id, name: c.client })),
  ];
  const currentIdx = allSlugs.findIndex((x) => x.slug === slug);
  const prevItem = currentIdx > 0 ? allSlugs[currentIdx - 1] : null;
  const nextItem =
    currentIdx >= 0 && currentIdx < allSlugs.length - 1 ? allSlugs[currentIdx + 1] : null;

  const title = portfolioMatch ? portfolioMatch.name : sampleCase!.client;
  const statusBadge = portfolioMatch ? portfolioMatch.statusBadge : sampleCase!.badgeLabel;
  const industry = portfolioMatch ? portfolioMatch.industry : sampleCase!.industry;
  const summary = portfolioMatch ? portfolioMatch.shortDesc : sampleCase!.challenge;
  const image = portfolioMatch ? portfolioMatch.image : sampleCase!.image;
  const imageAlt = portfolioMatch ? portfolioMatch.imageAlt : sampleCase!.imageAlt;
  const illustrationKey = portfolioMatch
    ? (portfolioMatch as { illustrationKey?: string }).illustrationKey
    : (sampleCase as { illustrationKey?: string }).illustrationKey;
  const servicesDelivered = portfolioMatch ? portfolioMatch.servicesDelivered : sampleCase!.whatWeBuilt;
  const timeline = portfolioMatch ? portfolioMatch.timeline : '4–6 weeks typical scope';
  const challenge = portfolioMatch ? portfolioMatch.challenge : sampleCase!.challenge;
  const objective = portfolioMatch
    ? portfolioMatch.objective
    : 'Turn funnel friction into measurable outcomes across design, engineering, and acquisition.';
  const strategy = portfolioMatch
    ? portfolioMatch.strategy
    : 'Diagnostic-first prioritisation pairing fast UX clarity with conversion instrumentation.';
  const execution = portfolioMatch
    ? portfolioMatch.execution
    : {
        design: sampleCase!.whatWeBuilt[0] ?? 'Custom UI/UX & Brand System',
        development: sampleCase!.whatWeBuilt[1] ?? 'Fast full-stack build & integrations',
        marketing: sampleCase!.whatWeBuilt[2] ?? 'Conversion tracking & growth setup',
      };
  const techStack = portfolioMatch
    ? portfolioMatch.techStack
    : ['React', 'TypeScript', 'Tailwind CSS', 'GA4 / Schema SEO'];
  const feedback = portfolioMatch
    ? portfolioMatch.clientFeedback
    : `${sampleCase!.quote} — ${sampleCase!.quoteAuthor}`;

  return (
    <>
      <SEOHead
        title={`${title} — Sample Case | Urdta Teeeeeer Jaipur`}
        description={summary}
        path={`/work/${slug}`}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
        <nav aria-label="Breadcrumb" className="type-label flex flex-wrap items-center gap-2">
          <Link to="/" className="underline min-h-[44px] inline-flex items-center">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/work" className="underline min-h-[44px] inline-flex items-center">
            Work
          </Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>

        {/* Header & Summary Card */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 type-label brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[4px]">
              {statusBadge}
            </span>
            <h1 className="type-display">{title}</h1>
            <p className="type-body text-[var(--text-secondary)]">{summary}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <BrutalButton
                variant="primary"
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
              <BrutalButton to="/work" variant="secondary" size="md">
                All Projects
              </BrutalButton>
            </div>
          </div>

          <BrutalCard tone="surface" className="lg:col-span-5 space-y-3 text-sm">
            <div>
              <div className="type-label opacity-70">Industry</div>
              <div className="font-bold">{industry}</div>
            </div>
            <div>
              <div className="type-label opacity-70">Services Scope</div>
              <ul className="mt-1 space-y-1">
                {servicesDelivered.map((s) => (
                  <li key={s}>→ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="type-label opacity-70">Timeline</div>
              <div className="font-mono-num text-xs font-bold">{timeline}</div>
            </div>
          </BrutalCard>
        </header>

        {/* Visual Showcase */}
        <div className="brutal-border brutal-shadow rounded-[10px] overflow-hidden bg-[var(--bg-sandstone)]">
          {imgFailed || !image ? (
            <div className="p-6 flex items-center justify-center bg-[var(--bg-cream)]">
              <ServiceIllustration
                name={illustrationKey}
                alt={imageAlt}
                className="w-full max-w-sm h-48"
              />
            </div>
          ) : (
            <img
              src={image}
              alt={imageAlt}
              width={1200}
              height={896}
              decoding="async"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full max-h-[360px] object-cover"
            />
          )}
        </div>

        {/* Challenge, Objective, Strategy */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <BrutalCard>
            <h2 className="type-h3 mb-2">Challenge &amp; Context</h2>
            <p className="type-small text-[var(--text-secondary)] leading-relaxed">
              {challenge}
            </p>
          </BrutalCard>
          <BrutalCard>
            <h2 className="type-h3 mb-2">Project Objective</h2>
            <p className="type-small text-[var(--text-secondary)] leading-relaxed">
              {objective}
            </p>
          </BrutalCard>
          <BrutalCard tone="marigold">
            <h2 className="type-h3 mb-2">Strategy &amp; Direction</h2>
            <p className="type-small leading-relaxed">{strategy}</p>
          </BrutalCard>
        </section>

        {/* Execution Breakdown */}
        <section className="space-y-4">
          <h2 className="type-h2">Execution Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <BrutalCard>
              <div className="type-label text-[var(--text-terracotta)] mb-1">
                01 · Design (Creative Haveli)
              </div>
              <p className="type-small leading-relaxed">{execution.design}</p>
            </BrutalCard>
            <BrutalCard>
              <div className="type-label text-[var(--text-cobalt)] mb-1">
                02 · Development (Digital Karkhana)
              </div>
              <p className="type-small leading-relaxed">{execution.development}</p>
            </BrutalCard>
            <BrutalCard>
              <div className="type-label text-[var(--text-terracotta)] mb-1">
                03 · Marketing (Growth Bazaar)
              </div>
              <p className="type-small leading-relaxed">{execution.marketing}</p>
            </BrutalCard>
          </div>
        </section>

        {/* Results, Stack, Feedback */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <BrutalCard className="lg:col-span-7 space-y-3">
            <h2 className="type-h3">Sample Outcomes &amp; Architecture</h2>
            {portfolioMatch ? (
              <p className="type-small text-[var(--text-secondary)]">{portfolioMatch.results}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sampleCase!.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 brutal-border bg-[var(--bg-cream)] rounded-[6px]"
                  >
                    <div className="text-xs font-bold mb-1">{m.label}</div>
                    <div className="text-xs font-mono-num opacity-75">{m.before}</div>
                    <div className="text-xs font-mono-num font-bold text-[var(--text-terracotta)]">
                      {m.after}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <blockquote className="pt-3 border-t-2 border-[var(--border-ink)]/15 text-sm italic">
              {feedback}
            </blockquote>
          </BrutalCard>

          <BrutalCard tone="gulabi" className="lg:col-span-5 space-y-3">
            <h2 className="type-h3">Technology &amp; Tools</h2>
            <p className="text-sm font-mono-num font-bold leading-relaxed">
              {techStack.join(' · ')}
            </p>
            <div className="pt-2">
              <BrutalButton
                variant="secondary"
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

        {/* Next / Previous Navigation */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t-2 border-[var(--border-ink)]/20">
          {prevItem ? (
            <Link
              to={`/work/${prevItem.slug}`}
              className="min-h-[44px] inline-flex items-center gap-2 text-sm font-bold hover:underline"
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
              className="min-h-[44px] inline-flex items-center gap-2 text-sm font-bold hover:underline"
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
