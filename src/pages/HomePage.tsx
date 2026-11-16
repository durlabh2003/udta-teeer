import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Search,
} from 'lucide-react';
import caseStudiesData from '../data/case-studies.json';
import portfolioData from '../data/portfolio.json';
import pricingData from '../data/pricing.json';
import servicesData from '../data/services.json';
import siteConfig from '../data/site-config.json';
import { useApp } from '../context/AppContext';
import { trackConversionEvent } from '../lib/analytics';
import { buildWhatsAppLink } from '../lib/crmAdapter';
import { HeroScene3D } from '../components/hero/HeroScene3D';
import { CaseStudyModalView } from '../components/sections/CaseStudyModalView';
import { IndustrySolutionsSection } from '../components/sections/IndustrySolutionsSection';
import { ProcessJourneyPath } from '../components/sections/ProcessJourneyPath';
import { ProjectPlanner } from '../components/sections/ProjectPlanner';
import { ServiceBazaarShowcase } from '../components/sections/ServiceBazaarShowcase';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { CaseStudyCard, CaseStudyItem } from '../components/ui/CaseStudyCard';
import { JaaliDivider, WobblyUnderline } from '../components/ui/JaaliDivider';
import { JharokhaAccordion } from '../components/ui/JharokhaAccordion';
import { PricingCard } from '../components/ui/PricingCard';
import { ServiceMarquee } from '../components/ui/ServiceMarquee';
import { StickerBadge } from '../components/ui/StickerBadge';

export function HomePage() {
  const { lang, t, setPreselectedServiceIds, openPlannerModal, openAuditModal } = useApp();
  const navigate = useNavigate();

  const [workFilter, setWorkFilter] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyItem | null>(null);
  const [puppetIdx, setPuppetIdx] = useState<number>(0);

  const filteredProjects =
    workFilter === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.categories.includes(workFilter));

  const testimonials = caseStudiesData.testimonials;
  const activeTestimonial = testimonials[puppetIdx];

  const handleFlagshipAction = (id: string) => {
    const map: Record<string, string[]> = {
      diagnostic: ['seo-aeo'],
      'creative-web': ['website-dev', 'branding-identity'],
      'growth-partnership': ['performance-marketing', 'social-growth-system'],
    };
    setPreselectedServiceIds(map[id] ?? ['website-dev']);
    openPlannerModal(map[id] ?? ['website-dev']);
  };

  const faqSchema = {
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

  return (
    <>
      <SEOHead
        title="Urdta Teeeeeer — Digital Pink City Studio | Creative, Tech & Growth in Jaipur"
        description="Based in the Pink City. Building for the world. Urdta Teeeeeer unites brand identity, web & product development, and performance marketing into one accountable partner."
        path="/"
        jsonLd={faqSchema}
      />

      {/* SECTION 1: HERO — Digital Pink City Arrival + Immediate 5s Clarity + 3D Hawa Mahal & Kites */}
      <section className="relative overflow-hidden paper-grain pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
              <div>
                <p className="font-hand text-base md:text-lg text-[#B95E50] dark:text-[#FFC21A] mb-1.5">
                  Based in the Pink City. Building for the world. · जयपुर से, दुनिया के लिए।
                </p>

                {/* Animated Flying Arrow Wordmark Load Moment */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="font-poster text-xl md:text-2xl tracking-tight">
                    Urdta T
                    <motion.span
                      initial={{ letterSpacing: '-0.08em' }}
                      animate={{ letterSpacing: '0.02em' }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-[#FF4F8B]"
                    >
                      eeeeee
                    </motion.span>
                    r
                  </span>
                  <motion.svg
                    width="56"
                    height="20"
                    viewBox="0 0 56 20"
                    fill="none"
                    initial={{ x: -36, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                  >
                    <line
                      x1="2"
                      y1="10"
                      x2="48"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      d="M42 4L52 10L42 16"
                      stroke="#FF4F8B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>

                <h1 className="font-editorial text-[clamp(2.25rem,4.1vw,3.75rem)] font-bold leading-[1.06] tracking-tight">
                  {t.hero.headline}
                </h1>
                <WobblyUnderline color="#FFC21A" />
              </div>

              <p className="text-base md:text-lg leading-relaxed text-[#4B433C] dark:text-[#E7D8C5] max-w-xl">
                {t.hero.subhead}
              </p>

              <p className="font-hand text-lg text-[#263650] dark:text-[#1FB5B0]">
                You bring the ambition. We bring the aim.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <BrutalButton
                  variant="hotPink"
                  size="lg"
                  onClick={() => {
                    trackConversionEvent('cta_click', { source: 'hero_primary', label: 'Take Your First Shot' });
                    openPlannerModal();
                  }}
                >
                  <span>Take Your First Shot</span>
                  <ArrowRight className="w-5 h-5" />
                </BrutalButton>
                <BrutalButton to="/work" variant="cream" size="lg">
                  Explore Our Work
                </BrutalButton>
                <button
                  type="button"
                  onClick={() => {
                    trackConversionEvent('cta_click', { source: 'hero_audit', label: 'Request Free Audit' });
                    openAuditModal();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold underline underline-offset-4 cursor-pointer hover:text-[#B95E50] dark:hover:text-[#FFC21A]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Request Free Website Audit</span>
                </button>
              </div>

              <p className="text-xs font-medium text-[#4B433C] dark:text-[#E7D8C5]">
                D2C &amp; E-Commerce <span aria-hidden="true">·</span> Local Jaipur Businesses{' '}
                <span aria-hidden="true">·</span> Startups &amp; SaaS <span aria-hidden="true">·</span> Starter deliverables from ₹2,999
              </p>
            </div>

            <div className="lg:col-span-6">
              <HeroScene3D />
            </div>
          </div>
        </div>
      </section>

      <ServiceMarquee />

      {/* TRUST & PROBLEM STRIP */}
      <section className="py-12 md:py-16 border-b-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#FFFFFF] dark:bg-[#212E46]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[6px]">
              <div className="text-xs font-bold uppercase tracking-wider mb-1.5 text-[#B95E50] dark:text-[#FFC21A]">
                Studio Standards · {t.trustStrip.heading}
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {siteConfig.capabilitiesTrustBadges.join(' · ')}
              </p>
            </div>
            <div className="p-4 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[6px]">
              <div className="text-xs font-bold uppercase tracking-wider mb-1.5 text-[#111111] dark:text-[#1FB5B0]">
                Industries We Build For
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {siteConfig.industriesServed.join(' · ')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.problem.painPoints.map((pt, i) => (
              <BrutalCard key={pt.title} tilt={i === 1 ? 'right' : 'none'}>
                <div className="font-mono-num text-xs font-bold text-[#B95E50] dark:text-[#FFC21A] mb-2">
                  0{i + 1}. Common Trap
                </div>
                <h3 className="text-xl font-extrabold mb-2">{pt.title}</h3>
                <p className="text-sm leading-relaxed text-[#4B433C] dark:text-[#E7D8C5]">
                  {pt.desc}
                </p>
              </BrutalCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE SERVICE BAZAAR — Three Architectural Jaipur Establishments + Flagships */}
      <section id="services" className="py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A] mb-1">
                {t.servicesSection.eyebrow}
              </p>
              <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-tight mb-3">
                The Service Bazaar — Three Pillars, One Aim
              </h2>
              <p className="text-base text-[#4B433C] dark:text-[#E7D8C5]">
                Explore Jaipur&apos;s three specialized workshops: The Creative Haveli (Design), The
                Digital Karkhana (Development), and The Growth Bazaar (Marketing).
              </p>
            </div>
            <BrutalButton to="/services" variant="cream" size="md">
              Explore Full Service Catalog
            </BrutalButton>
          </div>

          <ServiceBazaarShowcase />

          {/* 3 Flagships */}
          <div className="pt-4">
            <h3 className="font-editorial text-2xl md:text-3xl font-bold mb-5">
              {t.servicesSection.flagshipsTitle}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {servicesData.flagships.map((flagship) => {
                const priceInfo = pricingData.startingPrices.find(
                  (p) => p.id === flagship.priceId
                );
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
                    accent={flagship.accent as 'marigold' | 'gulabi' | 'peacock'}
                    isPopular={flagship.id === 'creative-web'}
                    ctaLabel={t.servicesSection.customizeBtn}
                    onCtaClick={() => handleFlagshipAction(flagship.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <JaaliDivider />

      {/* SECTION 3: PROJECT BAZAAR (Tapinfi, CafeOS, Vyapaar Saathi + Honest Case Templates) */}
      <section
        id="work"
        className="py-16 md:py-20 border-b-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#FFFFFF] dark:bg-[#212E46]"
      >
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A] mb-1">
                Project Bazaar · Portfolio Candidates &amp; Proof Architecture
              </p>
              <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-tight mb-2">
                Featured Projects &amp; Case Templates
              </h2>
              <p className="text-sm md:text-base text-[#4B433C] dark:text-[#E7D8C5]">
                {portfolioData.contentIntegrityNotice}
              </p>
            </div>
            <BrutalButton to="/work" variant="marigold" size="md">
              Explore All Work
            </BrutalButton>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {portfolioData.filters.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={workFilter === cat}
                onClick={() => setWorkFilter(cat)}
                className={`px-3 py-1.5 text-xs font-bold brutal-border rounded-[4px] cursor-pointer ${
                  workFilter === cat
                    ? 'bg-[#FFC21A] text-[#111111]'
                    : 'bg-[#FFF9F0] dark:bg-[#182235]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <BrutalCard key={proj.slug} className="flex flex-col justify-between h-full">
                <div>
                  <div className="brutal-border rounded-[4px] overflow-hidden mb-4 bg-[#F3E5CE]">
                    <img
                      src={proj.image}
                      alt={proj.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[16/10] object-cover"
                    />
                  </div>
                  <div className="text-[11px] font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A] mb-1">
                    {proj.statusBadge}
                  </div>
                  <h3 className="text-xl font-extrabold mb-1.5">{proj.name}</h3>
                  <p className="text-xs font-bold opacity-80 mb-2">{proj.industry}</p>
                  <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed mb-3">
                    {proj.shortDesc}
                  </p>
                  <p className="text-xs font-mono-num font-bold">
                    {proj.servicesDelivered.join(' · ')}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20 flex items-center justify-between">
                  <Link
                    to={`/work/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold underline hover:text-[#B95E50] dark:hover:text-[#FFC21A]"
                  >
                    <span>View Case Breakdown</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </BrutalCard>
            ))}
          </div>

          {/* Honest Case Study Templates */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl font-extrabold">
              How We Measure Real Outcomes (Launch Case Study Templates)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudiesData.caseStudies.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  study={study as CaseStudyItem}
                  buttonLabel={t.workSection.openModalBtn}
                  onInspect={(s) => setActiveCaseStudy(s)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INDUSTRY SOLUTIONS DISTRICT */}
      <section id="industries" className="py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A] mb-1">
                Jaipur Market &amp; Pan-India Verticals
              </p>
              <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-tight mb-2">
                Industry Solutions Tailored to How Your Buyers Decide
              </h2>
            </div>
            <BrutalButton to="/industries" variant="cream" size="md">
              All 10 Industry Guides
            </BrutalButton>
          </div>

          <IndustrySolutionsSection />
        </div>
      </section>

      {/* SECTION 5: AMER FORT 6-STAGE PROCESS JOURNEY */}
      <section
        id="process"
        className="py-16 md:py-20 border-y-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#FFFFFF] dark:bg-[#212E46]"
      >
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A] mb-1">
                {t.processSection.eyebrow}
              </p>
              <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-tight mb-2">
                {t.processSection.headline}
              </h2>
              <p className="text-base text-[#4B433C] dark:text-[#E7D8C5]">
                Click any checkpoint from step 01 to 06 to trace how strategy turns into live
                growth.
              </p>
            </div>
            <BrutalButton to="/process" variant="cream" size="md">
              Deep-Dive Process
            </BrutalButton>
          </div>

          <ProcessJourneyPath />
        </div>
      </section>

      {/* SECTION 6: WHY URDTA TEEEEER — Jaipur Roots & Differentiation */}
      <section className="py-16 md:py-20 bandhani-bg border-b-[3px] border-[#111111] dark:border-[#FFF9F0]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <div className="brutal-border brutal-shadow-lg bg-[#FFF9F0] dark:bg-[#182235] rounded-[6px] p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
                  {t.pillarsSection.eyebrow}
                </p>
                <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-tight">
                  {t.pillarsSection.headline}
                </h2>
                <p className="text-base leading-relaxed text-[#4B433C] dark:text-[#E7D8C5]">
                  {t.pillarsSection.nameStory}
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="brutal-border brutal-shadow-sm rounded-[6px] overflow-hidden bg-[#F4A6B8]">
                  <img
                    src="/src/assets/images/jaipur_studio_hero_art_1794811735554.jpg"
                    alt="Jaipur Hawa Mahal, flying patang kites and kulhad chai studio illustration"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full aspect-[16/9] object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.pillarsSection.pillars.map((pillar, idx) => (
                <BrutalCard
                  key={pillar.title}
                  tone={idx === 0 ? 'marigold' : idx === 3 ? 'gulabi' : 'surface'}
                >
                  <h3 className="text-lg font-extrabold mb-2">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed opacity-90">{pillar.desc}</p>
                </BrutalCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LAYER A/B/C PACKAGE OVERVIEW + WHY NOT ₹8,000 + TESTIMONIALS + FAQS */}
      <section id="packages" className="py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A] mb-1">
                {t.pricingSection.eyebrow}
              </p>
              <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-tight mb-2">
                Structured Package Layers &amp; Honest Pricing
              </h2>
              <p className="text-sm md:text-base text-[#4B433C] dark:text-[#E7D8C5]">
                {pricingData._meta.note}
              </p>
            </div>
            <BrutalButton to="/packages" variant="marigold" size="md">
              Complete Rate Guide
            </BrutalButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pricingData.packageLayers.map((layer) => (
              <BrutalCard
                key={layer.id}
                tone={layer.accent as 'marigold' | 'gulabi' | 'peacock'}
                className="flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="text-xs font-mono-num font-extrabold uppercase">
                    {layer.badge}
                  </div>
                  <h3 className="font-editorial text-2xl font-bold">{layer.name}</h3>
                  <div className="font-mono-num text-xl font-extrabold">{layer.startingPrice}</div>
                  <p className="text-xs font-bold opacity-85">{layer.whoFor}</p>
                  <ul className="space-y-1.5 text-sm pt-2">
                    {layer.items.map((it) => (
                      <li key={it}>✓ {it}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] opacity-85 pt-3 border-t-2 border-[#111111]/15">
                  {layer.note}
                </p>
              </BrutalCard>
            ))}
          </div>

          {/* Honest Baat Card + Cost Drivers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 brutal-border brutal-shadow bg-[#263650] text-[#FFF9F0] rounded-[6px] p-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <StickerBadge label="Honest Baat" tone="marigold" />
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {t.pricingSection.whyNot8kTitle}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-[#FFF9F0]/90">
                  {t.pricingSection.whyNot8kBody}
                </p>
              </div>
              <div className="pt-2">
                <BrutalButton
                  variant="hotPink"
                  size="md"
                  onClick={() => openPlannerModal()}
                >
                  {t.pricingSection.buildCustomCta}
                </BrutalButton>
              </div>
            </div>

            <div className="lg:col-span-5 brutal-border brutal-shadow bg-[#FFF9F0] dark:bg-[#212E46] rounded-[6px] p-7 space-y-3">
              <h3 className="text-xl font-extrabold">
                {lang === 'hinglish'
                  ? pricingData.scopeCostDrivers.titleHi
                  : pricingData.scopeCostDrivers.titleEn}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {pricingData.scopeCostDrivers.factors.map((f) => (
                  <li
                    key={f.labelEn}
                    className="pb-2 border-b border-[#111111]/15 dark:border-[#FFF9F0]/15 last:border-b-0"
                  >
                    <div className="font-bold">
                      {lang === 'hinglish' ? f.labelHi : f.labelEn}
                    </div>
                    <div className="text-xs text-[#4B433C] dark:text-[#E7D8C5]">{f.detailEn}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* KATHPUTLI TESTIMONIAL SLOTS */}
      <section className="py-16 border-y-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#E7B9A4] text-[#111111]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-8">
          <div className="max-w-2xl">
            <p className="font-hand text-base text-[#111111] mb-1">
              {t.testimonialsSection.eyebrow}
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {t.testimonialsSection.headline}
            </h2>
            <p className="text-sm md:text-base">{t.testimonialsSection.subhead}</p>
          </div>

          <div className="brutal-border brutal-shadow-lg bg-[#FFF9F0] text-[#111111] rounded-[6px] p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b-2 border-[#111111]/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">🎭</span>
                <div>
                  <div className="font-mono-num text-xs font-bold text-[#B95E50]">
                    {activeTestimonial.puppetRole}
                  </div>
                  <div className="text-xs font-medium">
                    Slot {puppetIdx + 1} of {testimonials.length}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial slot"
                  onClick={() =>
                    setPuppetIdx((i) => (i - 1 + testimonials.length) % testimonials.length)
                  }
                  className="w-10 h-10 brutal-border bg-[#FFC21A] rounded-[4px] flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial slot"
                  onClick={() => setPuppetIdx((i) => (i + 1) % testimonials.length)}
                  className="w-10 h-10 brutal-border bg-[#FFC21A] rounded-[4px] flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <blockquote className="space-y-3">
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                {activeTestimonial.quote}
              </p>
              <footer className="text-sm font-bold">
                — {activeTestimonial.author} <span aria-hidden="true">·</span>{' '}
                <span className="font-normal">{activeTestimonial.org}</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* JHAROKHA FAQS */}
      <section id="faq" className="py-16 md:py-20">
        <div className="max-w-[960px] mx-auto px-4 md:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A] mb-1">
              {t.faqSection.eyebrow}
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-tight">
              {t.faqSection.headline}
            </h2>
          </div>

          <JharokhaAccordion items={t.faqSection.items} />
        </div>
      </section>

      {/* SECTION 8: FINAL TARGET BOARD + INLINE INTERACTIVE PROJECT PLANNER */}
      <section
        id="plan-shot"
        className="py-16 md:py-20 border-t-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#F3E5CE] dark:bg-[#182235]"
      >
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-10">
          <div className="brutal-border brutal-shadow-lg bg-[#FFC21A] text-[#111111] rounded-[6px] p-7 md:p-10 text-center space-y-4">
            <div className="font-mono-num text-xs md:text-sm font-extrabold tracking-widest uppercase">
              DESIGN · DEVELOPMENT · GROWTH
            </div>
            <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              Every great business starts with a clear target. What&apos;s yours?
            </h2>
            <p className="text-sm md:text-base max-w-2xl mx-auto">
              Launch your interactive 4-step Project Planner right below, request a free 5-point
              audit, or start a WhatsApp chai chat directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <BrutalButton
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                variant="peacock"
                size="md"
                onClick={() => trackConversionEvent('whatsapp_click', { source: 'target_board' })}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </BrutalButton>
              <BrutalButton
                href={siteConfig.calendarEmbedPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                variant="ink"
                size="md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </BrutalButton>
              <BrutalButton variant="cream" size="md" onClick={openAuditModal}>
                <Search className="w-4 h-4" />
                <span>Request Free Website Audit</span>
              </BrutalButton>
            </div>
          </div>

          <ProjectPlanner mode="inline" />

          <div className="text-center text-xs font-medium text-[#4B433C] dark:text-[#E7D8C5]">
            Explore dedicated guides:{' '}
            <Link to="/website-development-jaipur" className="underline font-bold">Websites Jaipur</Link> ·{' '}
            <Link to="/ecommerce-development-jaipur" className="underline font-bold">E-Commerce</Link> ·{' '}
            <Link to="/seo-services-jaipur" className="underline font-bold">SEO &amp; AEO</Link> ·{' '}
            <Link to="/insights" className="underline font-bold">Growth Insights</Link>
          </div>
        </div>
      </section>

      <CaseStudyModalView
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </>
  );
}
