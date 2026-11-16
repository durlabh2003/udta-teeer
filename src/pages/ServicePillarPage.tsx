import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Megaphone, Palette } from 'lucide-react';
import servicesData from '../data/services.json';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { ServiceCard } from '../components/ui/ServiceCard';

interface ServicePillarPageProps {
  pillar: 'design' | 'development' | 'marketing';
}

const PILLAR_CONFIG = {
  design: {
    stallId: 'rang-roop',
    eyebrow: '01 · The Creative Haveli (Rang-Roop)',
    title: 'Design That Makes Your Business Recognisable',
    description:
      'Brand identity, typography systems, UI/UX prototyping, landing page design, product packaging, and motion graphics crafted for trust and conversion.',
    preselect: ['branding-identity', 'ui-ux-design'],
    groups: [
      {
        title: 'Brand Identity & Strategy',
        items: ['Brand discovery & positioning', 'Logo, colour & typography systems', 'Brand guidelines & print collateral'],
      },
      {
        title: 'UI/UX Design & Systems',
        items: ['User journeys & information architecture', 'Clickable Figma prototypes', 'WCAG AA accessible component libraries'],
      },
      {
        title: 'Website & Campaign UI',
        items: ['Homepage visual architecture', 'Conversion-oriented landing pages', 'Website UX refreshes'],
      },
      {
        title: 'Graphic, Packaging & Motion',
        items: ['Social & performance ad kits', 'Packaging & labels for D2C', 'Motion graphics & pitch decks'],
      },
    ],
  },
  development: {
    stallId: 'banawat',
    eyebrow: '02 · The Digital Karkhana (Banawat)',
    title: 'Engineering That Turns Ideas Into Working Products',
    description:
      'High-speed business websites, Shopify/WooCommerce D2C storefronts, custom web & mobile apps, SaaS MVPs, CRM pipelines, and practical workflow automation.',
    preselect: ['website-dev', 'ecommerce-dev'],
    groups: [
      {
        title: 'Business Websites & Landing Pages',
        items: ['Custom React/Next.js business sites', 'Mobile-first sub-2.5s speed', 'Technical SEO & Schema markup'],
      },
      {
        title: 'E-Commerce Storefronts',
        items: ['Shopify & WooCommerce custom themes', 'UPI, Razorpay & COD verification', 'Logistics & CAPI attribution'],
      },
      {
        title: 'Custom Web Apps, Mobile Apps & SaaS',
        items: ['Discovery-first technical architecture', 'Role-based portals & dashboards', 'iOS & Android cross-platform builds'],
      },
      {
        title: 'CRM, API & Practical Automation',
        items: ['WhatsApp Business API lead routing', 'CRM setup & webhook sync', 'Demonstrable AI operational workflows'],
      },
    ],
  },
  marketing: {
    stallId: 'hawa-banao',
    eyebrow: '03 · The Growth Bazaar (Hawa Banao)',
    title: 'Marketing That Takes Your Brand to High-Intent Buyers',
    description:
      'Technical & local SEO, AI Answer Engine Optimization (AEO/GEO), Meta & Google performance ads, regional Hindi/Hinglish storytelling, and owned analytics.',
    preselect: ['seo-aeo', 'performance-marketing'],
    groups: [
      {
        title: 'Search & AI Engine Visibility (SEO + AEO)',
        items: ['Local Jaipur Google Business Profile mastery', 'Commercial intent landing pages', 'Schema JSON-LD for ChatGPT & Google AI'],
      },
      {
        title: 'Performance Advertising (Meta + Google)',
        items: ['Google Search & Shopping campaigns', 'Meta creative angle testing', 'Retargeting funnels & CAPI hygiene'],
      },
      {
        title: 'Social Growth Systems & Bilingual Content',
        items: ['Strategic short-form reels & carousels', 'English, Hinglish & Hindi messaging', 'Founder authority & community workflows'],
      },
      {
        title: 'CRO & Owned Analytics',
        items: ['Landing-page conversion audits', 'Lead form friction reduction', 'Live dashboards your business owns'],
      },
    ],
  },
};

export function ServicePillarPage({ pillar }: ServicePillarPageProps) {
  const { openPlannerModal, openAuditModal } = useApp();
  const cfg = PILLAR_CONFIG[pillar];
  const catalogItems = servicesData.catalog.filter((s) => s.stall === cfg.stallId);

  return (
    <>
      <SEOHead
        title={`${cfg.title} | Urdta Teeeeeer Jaipur`}
        description={cfg.description}
        path={`/services/${pillar}`}
      />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        <nav aria-label="Breadcrumb" className="text-xs font-bold flex items-center gap-2">
          <Link to="/" className="underline">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services" className="underline">Services</Link>
          <span aria-hidden="true">/</span>
          <span className="capitalize">{pillar}</span>
        </nav>

        <header className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 font-mono-num text-xs font-bold text-[#B95E50] dark:text-[#FFC21A]">
            {pillar === 'design' && <Palette className="w-4 h-4" />}
            {pillar === 'development' && <Code2 className="w-4 h-4" />}
            {pillar === 'marketing' && <Megaphone className="w-4 h-4" />}
            <span>{cfg.eyebrow}</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            {cfg.title}
          </h1>
          <p className="text-base md:text-lg text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed">
            {cfg.description}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <BrutalButton
              variant="hotPink"
              size="lg"
              onClick={() => openPlannerModal(cfg.preselect)}
            >
              <span>Plan a {pillar} project</span>
              <ArrowRight className="w-5 h-5" />
            </BrutalButton>
            <BrutalButton variant="cream" size="lg" onClick={openAuditModal}>
              Request Free Audit
            </BrutalButton>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cfg.groups.map((grp) => (
            <BrutalCard key={grp.title} className="space-y-3">
              <h2 className="text-lg font-extrabold">{grp.title}</h2>
              <ul className="space-y-1.5 text-sm text-[#4B433C] dark:text-[#E7D8C5]">
                {grp.items.map((item) => (
                  <li key={item}>→ {item}</li>
                ))}
              </ul>
            </BrutalCard>
          ))}
        </section>

        <section className="space-y-5">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold">
            Deliverables &amp; Indicative Ranges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogItems.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
