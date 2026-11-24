import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import caseStudiesData from '../data/case-studies.json';
import portfolioData from '../data/portfolio.json';
import { useApp } from '../context/AppContext';
import { CaseStudyModalView } from '../components/sections/CaseStudyModalView';
import { SEOHead } from '../components/SEOHead';
import { EmptySearchIllustration, ServiceIllustration } from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { CaseStudyCard, CaseStudyItem } from '../components/ui/CaseStudyCard';
import { JaipurSkylineDivider } from '../components/ui/JaaliDivider';

function ProjectVisual({
  image,
  alt,
  illustrationKey,
}: {
  image: string;
  alt: string;
  illustrationKey?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !image) {
    return (
      <div className="brutal-border rounded-[8px] mb-4 bg-[var(--bg-cream)] p-4 flex items-center justify-center aspect-[16/10]">
        <ServiceIllustration name={illustrationKey} alt={alt} className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="brutal-border rounded-[8px] overflow-hidden mb-4 bg-[var(--bg-sandstone)]">
      <img
        src={image}
        alt={alt}
        width={1200}
        height={896}
        decoding="async"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full aspect-[16/10] object-cover"
      />
    </div>
  );
}

export function WorkPage() {
  const { t, openPlannerModal } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeIndustry, setActiveIndustry] = useState<string>('All');
  const [selectedModal, setSelectedModal] = useState<CaseStudyItem | null>(null);

  const industriesList = useMemo(() => {
    return ['All', ...Array.from(new Set(portfolioData.projects.map((p) => p.industry)))];
  }, []);

  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((proj) => {
      const catOk = activeCategory === 'All' || proj.categories.includes(activeCategory);
      const indOk = activeIndustry === 'All' || proj.industry === activeIndustry;
      return catOk && indOk;
    });
  }, [activeCategory, activeIndustry]);

  return (
    <>
      <SEOHead pageKey="work" path="/work" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-10">
        <header className="max-w-2xl space-y-2.5">
          <p className="type-label text-[var(--text-terracotta)]">
            {t.workSection.eyebrow}
          </p>
          <h1 className="type-display">{t.workSection.headline}</h1>
          <p className="type-body text-[var(--text-secondary)]">
            {portfolioData.contentIntegrityNotice}
          </p>
        </header>

        {/* Category + Industry Filter Bar */}
        <div className="space-y-4 p-4 brutal-border bg-[var(--bg-surface)] rounded-[8px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {portfolioData.filters.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveCategory(cat)}
                    className={`min-h-[44px] px-3.5 py-2 text-xs font-bold brutal-border rounded-[6px] cursor-pointer transition-all ${
                      active
                        ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)] brutal-shadow-sm -translate-y-0.5'
                        : 'bg-[var(--bg-cream)] text-[var(--text-primary)] hover:bg-[var(--bg-sandstone)]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="shrink-0">
              <select
                value={activeIndustry}
                onChange={(e) => setActiveIndustry(e.target.value)}
                aria-label="Filter projects by industry"
                className="min-h-[44px] px-3 py-2 brutal-border bg-[var(--bg-cream)] text-[var(--text-primary)] rounded-[6px] text-xs font-bold"
              >
                {industriesList.map((ind) => (
                  <option key={ind} value={ind}>
                    Industry: {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sample Product Showcases */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="type-h2">Featured Work ({filteredProjects.length})</h2>
            <div role="status" aria-live="polite" className="type-label text-[var(--text-secondary)]">
              {t.workSection.showingPrefix} {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? t.workSection.showingSingle : t.workSection.showingPlural}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <BrutalCard className="p-6 text-center flex flex-col items-center space-y-3 animate-filter-fade">
              <EmptySearchIllustration className="w-28 h-20" alt={t.workSection.emptyTitle} />
              <p className="font-bold text-base">{t.workSection.emptyTitle}</p>
              <BrutalButton
                variant="secondary"
                size="sm"
                onClick={() => {
                  setActiveCategory('All');
                  setActiveIndustry('All');
                }}
              >
                {t.workSection.showAllBtn}
              </BrutalButton>
            </BrutalCard>
          ) : (
            <div
              key={`${activeCategory}-${activeIndustry}`}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-filter-fade"
            >
              {filteredProjects.map((proj) => (
                <BrutalCard key={proj.slug} className="flex flex-col justify-between h-full">
                  <div>
                    <ProjectVisual
                      image={proj.image}
                      alt={proj.imageAlt}
                      illustrationKey={(proj as { illustrationKey?: string }).illustrationKey}
                    />
                    <p className="type-label text-[var(--text-terracotta)] mb-1">
                      {proj.statusBadge}
                    </p>
                    <h3 className="type-h3 mb-1">{proj.name}</h3>
                    <p className="text-xs font-bold text-[var(--text-secondary)] mb-2">
                      {proj.industry}
                    </p>
                    <p className="type-small text-[var(--text-secondary)] leading-relaxed mb-3">
                      {proj.shortDesc}
                    </p>
                    <p className="text-xs font-mono-num font-bold">
                      {proj.servicesDelivered.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t-2 border-[var(--border-ink)]/15">
                    <Link
                      to={`/work/${proj.slug}`}
                      aria-label={`View breakdown for ${proj.name}`}
                      className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-bold underline hover:text-[var(--text-gulabi)]"
                    >
                      <span>View Full Breakdown</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </BrutalCard>
              ))}
            </div>
          )}
        </section>

        <JaipurSkylineDivider />

        {/* Sample Outcome Cases */}
        <section className="space-y-5">
          <h2 className="type-h2">Sample Case Blueprints (Metrics Overview)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudiesData.caseStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                study={study as CaseStudyItem}
                buttonLabel={t.workSection.openModalBtn}
                onInspect={(s) => setSelectedModal(s)}
              />
            ))}
          </div>
        </section>

        <BrutalCard
          tone="marigold"
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <h2 className="type-h3">Want to build something similar?</h2>
            <p className="type-small opacity-90">
              Start with our 60-second interactive Project Planner.
            </p>
          </div>
          <BrutalButton variant="primary" size="md" onClick={() => openPlannerModal()}>
            {t.nav.cta}
          </BrutalButton>
        </BrutalCard>
      </div>

      <CaseStudyModalView study={selectedModal} onClose={() => setSelectedModal(null)} />
    </>
  );
}
