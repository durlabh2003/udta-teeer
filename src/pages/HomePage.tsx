import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
} from 'lucide-react';
import caseStudiesData from '../data/case-studies.json';
import portfolioData from '../data/portfolio.json';
import pricingData from '../data/pricing.json';
import servicesData from '../data/services.json';
import siteConfig from '../data/site-config.json';
import { useApp } from '../context/AppContext';
import { trackConversionEvent } from '../lib/analytics';
import { buildWhatsAppLink } from '../lib/crmAdapter';
import { HeroStudioShowcase } from '../components/hero/HeroStudioShowcase';
import {
  ChaiFaqIllustration,
  EmptySearchIllustration,
  KathputliCurtainIllustration,
  ServiceIllustration,
  TierThaliIllustration,
  TrapPanelOneIllustration,
  TrapPanelThreeIllustration,
  TrapPanelTwoIllustration,
} from '../components/illustrations/JaipurIllustrations';
import { CaseStudyModalView } from '../components/sections/CaseStudyModalView';
import { IndustrySolutionsSection } from '../components/sections/IndustrySolutionsSection';
import { ProcessJourneyPath } from '../components/sections/ProcessJourneyPath';
import { ProjectPlanner } from '../components/sections/ProjectPlanner';
import { QuickSolutionFinder } from '../components/sections/QuickSolutionFinder';
import { ServiceBazaarShowcase } from '../components/sections/ServiceBazaarShowcase';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { CaseStudyCard, CaseStudyItem } from '../components/ui/CaseStudyCard';
import { JaaliDivider, JaipurSkylineDivider, WobblyUnderline } from '../components/ui/JaaliDivider';
import { JharokhaAccordion } from '../components/ui/JharokhaAccordion';
import { PricingCard } from '../components/ui/PricingCard';
import { ServiceMarquee } from '../components/ui/ServiceMarquee';
import { StickerBadge } from '../components/ui/StickerBadge';

const HOME_WORK_TABS = ['All Work', 'Design', 'Development', 'Marketing', 'Complete Solutions'] as const;

const TRAP_ILLUSTRATIONS = [
  TrapPanelOneIllustration,
  TrapPanelTwoIllustration,
  TrapPanelThreeIllustration,
];

export function HomePage() {
  const { lang, t, setPreselectedServiceIds, openPlannerModal, openAuditModal } = useApp();

  const [workFilter, setWorkFilter] = useState<string>('All Work');
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyItem | null>(null);
  const [puppetIdx, setPuppetIdx] = useState<number>(0);
  const [puppetPaused, setPuppetPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    trackConversionEvent('homepage_view', { source: 'home' });
  }, []);

  const testimonials = caseStudiesData.testimonials;
  const activeTestimonial = testimonials[puppetIdx];

  // Auto-advance Kathputli testimonial carousel safely (pauses on hover/focus & reduced-motion)
  useEffect(() => {
    if (puppetPaused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setPuppetIdx((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [puppetPaused, testimonials.length]);

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (workFilter === 'All Work') return true;
    if (workFilter === 'Design') {
      return p.categories.includes('Branding') || p.categories.includes('UI/UX');
    }
    if (workFilter === 'Development') {
      return (
        p.categories.includes('Website Development') ||
        p.categories.includes('E-commerce') ||
        p.categories.includes('Digital Products') ||
        p.categories.includes('SaaS and Dashboards')
      );
    }
    if (workFilter === 'Marketing') {
      return p.categories.includes('Marketing');
    }
    return p.categories.includes('Complete Solutions');
  });

  const handleFlagshipAction = (id: string) => {
    const map: Record<string, string[]> = {
      diagnostic: ['seo-aeo'],
      'creative-web': ['website-dev', 'branding-identity'],
      'growth-partnership': ['performance-marketing', 'social-growth-system'],
    };
    setPreselectedServiceIds(map[id] ?? ['website-dev']);
    openPlannerModal(map[id] ?? ['website-dev']);
  };

  const homeFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqSection.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const audienceChips = [
    { label: t.hero.audienceItems[0], Icon: ShoppingBag },
    { label: t.hero.audienceItems[1], Icon: Store },
    { label: t.hero.audienceItems[2], Icon: Cpu },
  ];

  return (
    <>
      <SEOHead pageKey="home" path="/" jsonLd={homeFaqSchema} />

      {/* SECTION 1: HERO — Visual-First Jaipur Studio Arrival */}
      <section className="relative overflow-hidden pt-6 pb-10 md:pt-8 md:pb-12 bg-[var(--bg-cream)]">
        {/* Subtle Animated Kite + Flying Arrow Backdrop Motif (prefers-reduced-motion safe) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-6 right-8 opacity-35 hidden md:block animate-kite-float"
        >
          <svg width="72" height="80" viewBox="0 0 88 96" fill="none">
            <path d="M44 6 L76 32 L46 66 L14 40 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
            <line x1="44" y1="6" x2="46" y2="66" stroke="var(--border-ink)" strokeWidth="1.5" />
            <path d="M46 66 Q60 80 38 92" stroke="var(--color-gulabi)" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
              <div>
                <p className="type-label text-[var(--text-terracotta)] mb-2">
                  {t.hero.kicker}
                </p>

                {/* Subtle Arrow Swoosh Wordmark */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="font-display font-bold text-xl md:text-2xl tracking-tight">
                    Urdta <span className="text-[var(--text-gulabi)]">Teeeeeer</span>
                  </span>
                  <svg
                    width="54"
                    height="20"
                    viewBox="0 0 54 20"
                    fill="none"
                    className="animate-arrow-sweep"
                    aria-hidden="true"
                  >
                    <line x1="2" y1="10" x2="46" y2="10" stroke="var(--border-ink)" strokeWidth="3" />
                    <path
                      d="M40 4 L50 10 L40 16"
                      stroke="var(--color-gulabi)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h1 className="type-display">{t.hero.headline}</h1>
                <WobblyUnderline color="var(--color-marigold)" />
              </div>

              <p className="type-body text-[var(--text-secondary)] max-w-xl">
                {t.hero.subhead}
              </p>

              {/* 3 Strict Button Hierarchy: Primary Pink + Secondary Outlined + Tertiary Audit Link */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <BrutalButton
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      trackConversionEvent('cta_click', {
                        source: 'hero_primary',
                        label: t.hero.primaryCta,
                      });
                      openPlannerModal();
                    }}
                  >
                    <span>{t.hero.primaryCta}</span>
                    <ArrowRight className="w-5 h-5" />
                  </BrutalButton>
                  <BrutalButton to="/work" variant="secondary" size="lg">
                    {t.hero.secondaryCta}
                  </BrutalButton>
                </div>

                <div>
                  <BrutalButton
                    variant="tertiary"
                    size="sm"
                    onClick={() => {
                      trackConversionEvent('cta_click', {
                        source: 'hero_audit',
                        label: t.hero.auditLink,
                      });
                      openAuditModal();
                    }}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>{t.hero.auditLink}</span>
                  </BrutalButton>
                </div>
              </div>

              {/* Concise 3-Icon Audience Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {audienceChips.map(({ label, Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 brutal-border bg-[var(--bg-surface)] rounded-[8px] text-xs font-bold"
                  >
                    <Icon className="w-3.5 h-3.5 text-[var(--text-cobalt)]" aria-hidden="true" />
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroStudioShowcase />
            </div>
          </div>
        </div>
      </section>

      <ServiceMarquee />

      {/* SECTION 2: 6 VISUAL-FIRST GOAL TILES */}
      <QuickSolutionFinder />

      {/* SECTION 3: "COMMON TRAP" COMIC PANELS + ICON STANDARDS (Low-Opacity Jaali BG) */}
      <section className="py-10 md:py-12 border-b-2 border-[var(--border-ink)] bg-[var(--bg-surface)] jaali-bg">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
          <div className="max-w-xl space-y-1 bg-[var(--bg-surface)]/95 inline-block p-3.5 brutal-border rounded-[8px]">
            <p className="type-label text-[var(--text-terracotta)]">{t.problem.eyebrow}</p>
            <h2 className="type-h2">{t.problem.headline}</h2>
            <p className="type-small text-[var(--text-secondary)]">{t.problem.subhead}</p>
          </div>

          {/* 3 Before/After Comic-Panel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 overflow-visible">
            {t.problem.painPoints.map((pt, i) => {
              const ComicIllustration = TRAP_ILLUSTRATIONS[i % TRAP_ILLUSTRATIONS.length];
              return (
                <BrutalCard
                  key={pt.title}
                  tilt={i === 1 ? 'right' : 'none'}
                  className="flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="type-label text-[var(--text-terracotta)]">
                        0{i + 1} · Trap
                      </span>
                    </div>
                    <ComicIllustration className="w-full h-24" alt={pt.title} />
                    <h3 className="type-h3">{pt.title}</h3>
                    <p className="type-small text-[var(--text-secondary)]">{pt.desc}</p>
                  </div>
                </BrutalCard>
              );
            })}
          </div>

          {/* Compact Icon-Label Strips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 brutal-border bg-[var(--bg-cream)] rounded-[10px] space-y-2.5">
              <div className="type-label text-[var(--text-terracotta)]">
                {t.trustStrip.standardsTitle}
              </div>
              <div className="flex flex-wrap gap-2">
                {siteConfig.capabilitiesTrustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 brutal-border bg-[var(--bg-surface)] rounded-[6px] text-xs font-bold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-cobalt)]" aria-hidden="true" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 brutal-border bg-[var(--bg-cream)] rounded-[10px] space-y-2.5">
              <div className="type-label text-[var(--text-cobalt)]">
                {t.trustStrip.industriesTitle}
              </div>
              <div className="flex flex-wrap gap-2">
                {siteConfig.industriesServed.slice(0, 6).map((ind) => (
                  <span
                    key={ind}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 brutal-border bg-[var(--bg-surface)] rounded-[6px] text-xs font-bold"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[var(--text-gulabi)]" aria-hidden="true" />
                    <span>{ind}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE SERVICE BAZAAR + 3 SIGNATURE PACKAGES */}
      <section id="services" className="py-10 md:py-14 bg-[var(--bg-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl space-y-1">
              <p className="type-label text-[var(--text-terracotta)]">
                {t.servicesSection.eyebrow}
              </p>
              <h2 className="type-h2">{t.servicesSection.headline}</h2>
              <p className="type-small text-[var(--text-secondary)]">
                {t.servicesSection.subhead}
              </p>
            </div>
            <BrutalButton to="/services" variant="secondary" size="sm">
              {t.servicesSection.catalogCta}
            </BrutalButton>
          </div>

          <ServiceBazaarShowcase />

          {/* 3 Signature Packages */}
          <div className="pt-2 space-y-4">
            <h3 className="type-h2">{t.servicesSection.flagshipsTitle}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {servicesData.flagships.map((flagship, idx) => {
                const priceInfo = pricingData.startingPrices.find(
                  (p) => p.id === flagship.priceId
                );
                const tierVariant = idx === 0 ? 'starter' : idx === 1 ? 'growth' : 'royal';
                return (
                  <PricingCard
                    key={flagship.id}
                    title={`${flagship.stepOrder}. ${flagship.name}`}
                    price={priceInfo?.displayPrice ?? 'Custom'}
                    billingModel={priceInfo?.billingModel ?? ''}
                    timeline={priceInfo?.timeline ?? ''}
                    description={
                      lang === 'hinglish' ? flagship.taglineHi : flagship.taglineEn
                    }
                    deliverables={flagship.deliverables}
                    accent={flagship.accent as 'marigold' | 'gulabi' | 'cobalt'}
                    isPopular={flagship.id === 'creative-web'}
                    ctaLabel={t.servicesSection.customizeBtn}
                    subCtaCaption={t.servicesSection.customizeSubEn}
                    illustration={<TierThaliIllustration variant={tierVariant} className="w-32 h-16" />}
                    onCtaClick={() => handleFlagshipAction(flagship.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <JaipurSkylineDivider />

      {/* SECTION 5: SAMPLE WORK & CASE BLUEPRINTS */}
      <section
        id="work"
        className="py-10 md:py-14 border-y-2 border-[var(--border-ink)] bg-[var(--bg-surface)]"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl space-y-1">
              <p className="type-label text-[var(--text-terracotta)]">
                {t.workSection.eyebrow}
              </p>
              <h2 className="type-h2">{t.workSection.headline}</h2>
              <p className="type-small text-[var(--text-secondary)]">
                {t.workSection.subhead}
              </p>
            </div>
            <BrutalButton to="/work" variant="secondary" size="sm">
              {t.hero.secondaryCta}
            </BrutalButton>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by discipline">
              {HOME_WORK_TABS.map((cat) => {
                const active = workFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setWorkFilter(cat);
                      trackConversionEvent('portfolio_filter', { source: 'homepage_work', label: cat });
                    }}
                    className={`min-h-[44px] px-3.5 py-1.5 text-xs font-bold brutal-border rounded-[8px] cursor-pointer transition-all ${
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

            <div role="status" aria-live="polite" className="type-label text-[var(--text-secondary)]">
              {t.workSection.showingPrefix} {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? t.workSection.showingSingle : t.workSection.showingPlural}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <BrutalCard className="p-8 text-center flex flex-col items-center space-y-4 animate-filter-fade">
              <EmptySearchIllustration className="w-32 h-24" alt={t.workSection.emptyTitle} />
              <p className="font-bold text-base">{t.workSection.emptyTitle}</p>
              <BrutalButton variant="secondary" size="sm" onClick={() => setWorkFilter('All Work')}>
                {t.workSection.showAllBtn}
              </BrutalButton>
            </BrutalCard>
          ) : (
            <div key={workFilter} className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-filter-fade">
              {filteredProjects.map((proj) => (
                <BrutalCard key={proj.slug} className="flex flex-col justify-between h-full">
                  <div>
                    <div className="relative brutal-border rounded-[8px] overflow-hidden mb-3 bg-[var(--bg-cream)]">
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
                      <span className="absolute top-2 left-2 px-2 py-0.5 type-label brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[4px]">
                        {proj.statusBadge}
                      </span>
                    </div>
                    <h3 className="type-h3 mb-1">{proj.name}</h3>
                    <p className="type-label text-[var(--text-cobalt)] mb-1.5">{proj.industry}</p>
                    <p className="type-small text-[var(--text-secondary)] mb-2">
                      {proj.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[var(--border-ink)]/15 flex items-center justify-between">
                    <Link
                      to={`/work/${proj.slug}`}
                      aria-label={`View blueprint for ${proj.name}`}
                      className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-bold underline hover:text-[var(--text-gulabi)]"
                    >
                      <span>Inspect Blueprint</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </BrutalCard>
              ))}
            </div>
          )}

          <div className="pt-2 space-y-3">
            <h3 className="type-h3">{t.workSection.benchmarksTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {caseStudiesData.caseStudies.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  study={study as CaseStudyItem}
                  headingTag="h4"
                  buttonLabel={t.workSection.openModalBtn}
                  onInspect={(s) => setActiveCaseStudy(s)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: 10 INDUSTRIES */}
      <section id="industries" className="py-10 md:py-14 bg-[var(--bg-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl space-y-1">
              <p className="type-label text-[var(--text-terracotta)]">
                {t.industriesSection.eyebrow}
              </p>
              <h2 className="type-h2">{t.industriesSection.headline}</h2>
            </div>
            <BrutalButton to="/industries" variant="secondary" size="sm">
              {t.industriesSection.allBtn}
            </BrutalButton>
          </div>

          <IndustrySolutionsSection />
        </div>
      </section>

      {/* SECTION 7: ARCHERY FLIGHT 6-STEP PROCESS */}
      <section
        id="process"
        className="py-10 md:py-14 border-y-2 border-[var(--border-ink)] bg-[var(--bg-surface)]"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl space-y-1">
              <p className="type-label text-[var(--text-terracotta)]">
                {t.processSection.eyebrow}
              </p>
              <h2 className="type-h2">{t.processSection.headline}</h2>
              <p className="type-small text-[var(--text-secondary)]">
                {t.processSection.subhead}
              </p>
            </div>
            <BrutalButton to="/process" variant="secondary" size="sm">
              {t.processSection.guideBtn}
            </BrutalButton>
          </div>

          <ProcessJourneyPath />
        </div>
      </section>

      {/* SECTION 8: WHY URDTA TEEEEER */}
      <section className="py-10 md:py-14 bagru-bg border-b-2 border-[var(--border-ink)] bg-[var(--bg-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="brutal-border brutal-shadow-lg bg-[var(--bg-surface)] rounded-t-[20px] rounded-b-[8px] p-5 md:p-7 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-2">
                <p className="type-label text-[var(--text-terracotta)]">
                  {t.pillarsSection.eyebrow}
                </p>
                <h2 className="type-h2">{t.pillarsSection.headline}</h2>
                <p className="type-body text-[var(--text-secondary)]">
                  {t.pillarsSection.nameStory}
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="brutal-border brutal-shadow-sm rounded-[8px] p-4 bg-[var(--color-indigo)] text-[#FFF7EC] flex items-center gap-3.5">
                  <div className="w-16 h-14 shrink-0 bg-[var(--bg-surface)] brutal-border rounded-[6px] p-1">
                    <ServiceIllustration name="performance" alt="Urdta Teeeeeer arrow bullseye" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="type-label text-[var(--color-marigold)]">Our Aim</div>
                    <p className="font-display text-base font-bold leading-snug">
                      &ldquo;A flying arrow, aimed at the ordinary.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.pillarsSection.pillars.map((pillar, idx) => (
                <BrutalCard
                  key={pillar.title}
                  tone={idx === 0 ? 'marigold' : 'surface'}
                  className="!p-4"
                >
                  <div className="flex items-start gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[var(--text-gulabi)] shrink-0 mt-1" aria-hidden="true" />
                    <h3 className="font-display font-bold text-base">{pillar.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm opacity-85">{pillar.desc}</p>
                </BrutalCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: PACKAGE LAYERS + HONEST BAAT */}
      <section id="packages" className="py-10 md:py-14 bg-[var(--bg-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl space-y-1">
              <p className="type-label text-[var(--text-terracotta)]">
                {t.pricingSection.eyebrow}
              </p>
              <h2 className="type-h2">{t.pricingSection.headline}</h2>
              <p className="type-small text-[var(--text-secondary)]">
                {t.pricingSection.subhead}
              </p>
            </div>
            <BrutalButton to="/packages" variant="secondary" size="sm">
              {t.pricingSection.rateGuideBtn}
            </BrutalButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {pricingData.packageLayers.map((layer, idx) => {
              const tierVariant = idx === 0 ? 'starter' : idx === 1 ? 'growth' : 'royal';
              return (
                <BrutalCard
                  key={layer.id}
                  tone={layer.accent as 'marigold' | 'gulabi' | 'cobalt'}
                  arch="scalloped"
                  className="flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="p-2 brutal-border bg-[var(--bg-surface)] rounded-[8px] flex justify-center">
                      <TierThaliIllustration variant={tierVariant} className="w-32 h-16" />
                    </div>
                    <div className="type-label">{layer.badge}</div>
                    <h3 className="type-h3">{layer.name}</h3>
                    <div className="font-mono-num text-lg md:text-xl font-bold">{layer.startingPrice}</div>
                    <p className="text-xs font-bold opacity-85">{layer.whoFor}</p>
                    <ul className="space-y-1.5 text-sm pt-1">
                      {layer.items.map((it) => (
                        <li key={it}>✓ {it}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-ink)]/15 space-y-3">
                    <p className="text-[11px] opacity-85">{layer.note}</p>
                    <BrutalButton
                      variant="primary"
                      size="sm"
                      onClick={() => openPlannerModal()}
                      className="w-full"
                    >
                      <span className="flex flex-col items-center leading-tight">
                        <span>{t.pricingSection.buildCustomCta}</span>
                        <span className="text-[10px] font-normal opacity-90">
                          {t.pricingSection.buildCustomSubEn}
                        </span>
                      </span>
                    </BrutalButton>
                  </div>
                </BrutalCard>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 brutal-border brutal-shadow bg-[var(--color-indigo)] text-[#FFF7EC] rounded-[8px] p-5 md:p-6 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <StickerBadge label="Honest Baat" tone="marigold" />
                <h3 className="type-h3 text-[#FFF7EC]">{t.pricingSection.whyNot8kTitle}</h3>
                <p className="type-small text-[#FFF7EC]/90">{t.pricingSection.whyNot8kBody}</p>
              </div>
              <div className="pt-1">
                <BrutalButton
                  variant="primary"
                  size="sm"
                  onClick={() => openPlannerModal()}
                >
                  {t.pricingSection.buildCustomCta}
                </BrutalButton>
              </div>
            </div>

            <div className="lg:col-span-5 brutal-border brutal-shadow bg-[var(--bg-surface)] rounded-[8px] p-5 md:p-6 space-y-2.5">
              <h3 className="type-h3">
                {lang === 'hinglish'
                  ? pricingData.scopeCostDrivers.titleHi
                  : pricingData.scopeCostDrivers.titleEn}
              </h3>
              <ul className="space-y-2 text-sm">
                {pricingData.scopeCostDrivers.factors.map((f) => (
                  <li
                    key={f.labelEn}
                    className="pb-1.5 border-b border-[var(--border-ink)]/15 last:border-b-0"
                  >
                    <div className="font-bold">
                      {lang === 'hinglish' ? f.labelHi : f.labelEn}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">{f.detailEn}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: KATHPUTLI STAGE TESTIMONIALS (Curtains, Swipe, Dots, Pause on Hover) */}
      <section className="py-10 md:py-14 border-y-2 border-[var(--border-ink)] bg-[var(--bg-sandstone)]/60 dark:bg-[var(--bg-surface)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
          <div className="max-w-xl space-y-1">
            <p className="type-label text-[var(--text-terracotta)]">
              {t.testimonialsSection.eyebrow}
            </p>
            <h2 className="type-h2">{t.testimonialsSection.headline}</h2>
            <p className="type-small text-[var(--text-secondary)]">
              {t.testimonialsSection.subhead}
            </p>
          </div>

          <div
            onMouseEnter={() => setPuppetPaused(true)}
            onMouseLeave={() => setPuppetPaused(false)}
            onFocus={() => setPuppetPaused(true)}
            onBlur={() => setPuppetPaused(false)}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = e.changedTouches[0]?.clientX - touchStartX.current;
              if (diff > 40) {
                setPuppetIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
              } else if (diff < -40) {
                setPuppetIdx((i) => (i + 1) % testimonials.length);
              }
              touchStartX.current = null;
            }}
            className="brutal-border brutal-shadow-lg bg-[var(--bg-surface)] rounded-t-[18px] rounded-b-[8px] overflow-hidden"
          >
            {/* Stage Curtain Header */}
            <div className="px-5 py-3 bg-[var(--color-gulabi)]/15 border-b-2 border-[var(--border-ink)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <KathputliCurtainIllustration className="w-14 h-10 shrink-0" alt="" />
                <div>
                  <span className="inline-block px-2 py-0.5 type-label brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[4px] mb-0.5">
                    {activeTestimonial.isSample ? 'Sample Quote' : 'Client Quote'}
                  </span>
                  <div className="text-xs font-bold text-[var(--text-secondary)]">
                    {activeTestimonial.puppetRole} · {puppetIdx + 1} / {testimonials.length}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous quote"
                  onClick={() =>
                    setPuppetIdx((i) => (i - 1 + testimonials.length) % testimonials.length)
                  }
                  className="w-11 h-11 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[8px] flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next quote"
                  onClick={() => setPuppetIdx((i) => (i + 1) % testimonials.length)}
                  className="w-11 h-11 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[8px] flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 md:p-6 space-y-4">
              <blockquote className="space-y-2.5" aria-live="polite">
                <p className="text-base md:text-xl font-display font-medium leading-relaxed">
                  {activeTestimonial.quote}
                </p>
                <footer className="text-sm font-bold">
                  — {activeTestimonial.author} <span aria-hidden="true">·</span>{' '}
                  <span className="font-normal text-[var(--text-secondary)]">
                    {activeTestimonial.org}
                  </span>
                </footer>
              </blockquote>

              {/* Dot Pagination Indicators */}
              <div className="flex items-center justify-center gap-1 pt-0.5">
                {testimonials.map((tItem, idx) => (
                  <button
                    key={tItem.id}
                    type="button"
                    onClick={() => setPuppetIdx(idx)}
                    aria-label={`Show sample quote ${idx + 1}`}
                    aria-pressed={idx === puppetIdx}
                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)]"
                  >
                    <span
                      className={`h-3 rounded-full brutal-border transition-all block ${
                        idx === puppetIdx
                          ? 'w-7 bg-[var(--color-gulabi)]'
                          : 'w-3 bg-[var(--bg-cream)]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: CHAI TABLE FAQS (Illustrated Header + Jharokha Accordion) */}
      <section id="faq" className="py-10 md:py-14 bg-[var(--bg-cream)]">
        <div className="max-w-[820px] mx-auto px-4 md:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <p className="type-label text-[var(--text-terracotta)]">{t.faqSection.eyebrow}</p>
              <h2 className="type-h2">{t.faqSection.headline}</h2>
            </div>
            <ChaiFaqIllustration
              className="w-20 h-20 shrink-0"
              alt="Steaming kulhad chai illustration"
            />
          </div>

          <JharokhaAccordion items={t.faqSection.items} />
        </div>
      </section>

      <JaaliDivider />

      {/* SECTION 12: FINAL TARGET BOARD + INLINE INTERACTIVE PROJECT PLANNER */}
      <section
        id="plan-shot"
        className="py-10 md:py-14 bg-[var(--bg-cream)]"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8">
          <div className="brutal-border brutal-shadow-lg bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-t-[18px] rounded-b-[8px] p-5 md:p-7 text-center space-y-3">
            <div className="type-label">DESIGN · DEVELOPMENT · GROWTH</div>
            <h2 className="type-h2 max-w-2xl mx-auto">{t.finalCta.headline}</h2>
            <p className="type-small max-w-xl mx-auto opacity-90">{t.finalCta.subhead}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <BrutalButton
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
                onClick={() => trackConversionEvent('whatsapp_click', { source: 'target_board' })}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.finalCta.whatsappCta}</span>
              </BrutalButton>
              <BrutalButton
                href={siteConfig.calendarEmbedPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.finalCta.secondaryCta}</span>
              </BrutalButton>
              <BrutalButton
                variant="tertiary"
                size="sm"
                onClick={openAuditModal}
                className="!text-[var(--text-on-marigold)] hover:opacity-80"
              >
                <Search className="w-4 h-4" />
                <span>{t.hero.auditLink}</span>
              </BrutalButton>
            </div>
          </div>

          <ProjectPlanner mode="inline" />
        </div>
      </section>

      <CaseStudyModalView
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </>
  );
}
