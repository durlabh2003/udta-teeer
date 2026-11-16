import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import caseStudiesData from '../data/case-studies.json';
import portfolioData from '../data/portfolio.json';
import { useApp } from '../context/AppContext';
import { CaseStudyModalView } from '../components/sections/CaseStudyModalView';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { CaseStudyCard, CaseStudyItem } from '../components/ui/CaseStudyCard';

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

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        <div className="max-w-3xl space-y-3">
          <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
            Project Bazaar · Honest Work Showcase
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            {t.workSection.headline}
          </h1>
          <p className="text-base text-[#4B433C] dark:text-[#E7D8C5]">
            {portfolioData.contentIntegrityNotice}
          </p>
        </div>

        {/* Category + Industry Filter Bar */}
        <div className="space-y-4 p-5 brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[6px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
              {portfolioData.filters.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold brutal-border rounded-[4px] cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#FFC21A] text-[#111111]'
                      : 'bg-[#FFFFFF] dark:bg-[#182235]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="shrink-0">
              <select
                value={activeIndustry}
                onChange={(e) => setActiveIndustry(e.target.value)}
                aria-label="Filter projects by industry"
                className="px-3 py-2 brutal-border bg-[#FFFFFF] dark:bg-[#182235] rounded-[4px] text-xs font-bold"
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

        {/* Portfolio Candidates */}
        <section className="space-y-5">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">
            Portfolio Candidates ({filteredProjects.length})
          </h2>

          {filteredProjects.length === 0 ? (
            <BrutalCard className="p-8 text-center space-y-2">
              <p className="font-bold">No portfolio candidates match both selected filters.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setActiveIndustry('All');
                }}
                className="text-sm font-bold underline cursor-pointer"
              >
                Reset filters
              </button>
            </BrutalCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <BrutalCard key={proj.slug} className="flex flex-col justify-between h-full">
                  <div>
                    <div className="brutal-border rounded-[4px] overflow-hidden mb-4 bg-[#F3E5CE]">
                      <img
                        src={proj.image}
                        alt={proj.imageAlt}
                        width={1200}
                        height={896}
                        decoding="async"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full aspect-[16/10] object-cover"
                      />
                    </div>
                    <div className="text-[11px] font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A] mb-1">
                      {proj.statusBadge}
                    </div>
                    <h3 className="text-xl font-extrabold mb-1">{proj.name}</h3>
                    <p className="text-xs font-bold opacity-80 mb-2">{proj.industry}</p>
                    <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed mb-3">
                      {proj.shortDesc}
                    </p>
                    <p className="text-xs font-mono-num font-bold">
                      {proj.servicesDelivered.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20">
                    <Link
                      to={`/work/${proj.slug}`}
                      aria-label={`View 11-part breakdown for ${proj.name}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold underline hover:text-[#B95E50] dark:hover:text-[#FFC21A]"
                    >
                      <span>View 11-Part Breakdown</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </BrutalCard>
              ))}
            </div>
          )}
        </section>

        {/* Launch Case Study Templates */}
        <section className="space-y-5">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">
            Case Study Architecture Templates (Metrics Slots)
          </h2>
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

        <div className="p-6 brutal-border brutal-shadow bg-[#FFC21A] text-[#111111] rounded-[6px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold">Want to build something similar?</h2>
            <p className="text-sm">Start with a 7–10 day Brand &amp; Digital Diagnostic or our 4-step Project Planner.</p>
          </div>
          <BrutalButton variant="ink" size="md" onClick={() => openPlannerModal()}>
            Plan Your Project
          </BrutalButton>
        </div>
      </div>

      <CaseStudyModalView study={selectedModal} onClose={() => setSelectedModal(null)} />
    </>
  );
}
