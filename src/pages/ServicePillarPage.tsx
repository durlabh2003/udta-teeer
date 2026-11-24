import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import servicesData from '../data/services.json';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import {
  PillarBazaarIllustration,
  PillarHaveliIllustration,
  PillarKarkhanaIllustration,
} from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { JaaliDivider } from '../components/ui/JaaliDivider';
import { ServiceCard } from '../components/ui/ServiceCard';

interface ServicePillarPageProps {
  pillar: 'design' | 'development' | 'marketing';
}

const PILLAR_CONFIG = {
  design: {
    stallId: 'rang-roop',
    eyebrow: '01 · Creative Haveli (Design)',
    title: 'Design That Builds Instant Trust',
    description:
      'Brand identity, typography systems, UI/UX prototypes, packaging, and motion crafted for clarity.',
    preselect: ['branding-identity', 'ui-ux-design'],
    groups: [
      {
        title: 'Brand Identity & Strategy',
        items: ['Positioning & visual systems', 'Logo & shop signage tokens', 'Print & brand guidelines'],
      },
      {
        title: 'UI/UX Design & Systems',
        items: ['User journeys & wireframes', 'Clickable Figma prototypes', 'WCAG AA design libraries'],
      },
      {
        title: 'Website & Campaign UI',
        items: ['Homepage visual architecture', 'Conversion landing pages', 'Checkout flow refreshes'],
      },
      {
        title: 'Packaging & Motion',
        items: ['Meta & Google ad creative kits', 'D2C box & label systems', 'Reels motion & decks'],
      },
    ],
  },
  development: {
    stallId: 'banawat',
    eyebrow: '02 · Digital Karkhana (Engineering)',
    title: 'Fast Code Built For Real Conversions',
    description:
      'Custom React/Next.js websites, D2C storefronts, SaaS MVPs, mobile apps, and WhatsApp CRM automation.',
    preselect: ['website-dev', 'ecommerce-dev'],
    groups: [
      {
        title: 'Business Websites',
        items: ['Custom React/Next.js builds', 'Sub-2.5s mobile load speed', 'Technical SEO + Schema JSON-LD'],
      },
      {
        title: 'E-Commerce Storefronts',
        items: ['Shopify & WooCommerce stores', 'UPI, Razorpay & COD checks', 'Shipping & CAPI attribution'],
      },
      {
        title: 'Web Apps, Mobile & SaaS',
        items: ['Discovery-first architecture', 'Role-based client dashboards', 'iOS & Android builds'],
      },
      {
        title: 'CRM & Practical Automation',
        items: ['WhatsApp Business lead routing', 'CRM webhooks & alerts', 'Operational time-saving tools'],
      },
    ],
  },
  marketing: {
    stallId: 'hawa-banao',
    eyebrow: '03 · Growth Bazaar (Marketing)',
    title: 'Reach High-Intent Buyers Without Waste',
    description:
      'Local Jaipur SEO, AI Answer Engine Optimisation (AEO), Meta & Google ads, and bilingual content.',
    preselect: ['seo-aeo', 'performance-marketing'],
    groups: [
      {
        title: 'Search & AI Visibility (SEO + AEO)',
        items: ['Google Business Profile setup', 'Commercial intent pages', 'Schema JSON-LD for AI search'],
      },
      {
        title: 'Performance Ads (Meta + Google)',
        items: ['Search & Shopping campaigns', 'Meta creative angle sprints', 'CAPI & funnel tracking'],
      },
      {
        title: 'Bilingual Social Systems',
        items: ['Short-form reels & hooks', 'English, Hinglish & Hindi copy', 'Founder content workflows'],
      },
      {
        title: 'CRO & Owned Analytics',
        items: ['Landing-page leak audits', 'Form friction reduction', 'Live dashboards you own'],
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
      <SEOHead pageKey={`services-${pillar}`} path={`/services/${pillar}`} />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-10">
        <nav aria-label="Breadcrumb" className="type-label flex flex-wrap items-center gap-2">
          <Link to="/" className="underline min-h-[44px] inline-flex items-center">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services" className="underline min-h-[44px] inline-flex items-center">Services</Link>
          <span aria-hidden="true">/</span>
          <span className="capitalize">{pillar}</span>
        </nav>

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="type-label text-[var(--text-terracotta)]">{cfg.eyebrow}</p>
            <h1 className="type-display">{cfg.title}</h1>
            <p className="type-body text-[var(--text-secondary)] max-w-xl">
              {cfg.description}
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <BrutalButton
                variant="primary"
                size="md"
                onClick={() => openPlannerModal(cfg.preselect)}
              >
                <span>Plan a {pillar} shot</span>
                <ArrowRight className="w-4 h-4" />
              </BrutalButton>
              <BrutalButton variant="secondary" size="md" onClick={openAuditModal}>
                Request Free Audit
              </BrutalButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <BrutalCard arch="jharokha" tone="sandstone" className="p-4 flex items-center justify-center">
              {pillar === 'design' && <PillarHaveliIllustration className="w-full h-40" />}
              {pillar === 'development' && <PillarKarkhanaIllustration className="w-full h-40" />}
              {pillar === 'marketing' && <PillarBazaarIllustration className="w-full h-40" />}
            </BrutalCard>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cfg.groups.map((grp) => (
            <BrutalCard key={grp.title} className="space-y-2.5 !p-4">
              <h2 className="type-h3">{grp.title}</h2>
              <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                {grp.items.map((item) => (
                  <li key={item}>→ {item}</li>
                ))}
              </ul>
            </BrutalCard>
          ))}
        </section>

        <JaaliDivider />

        <section className="space-y-4">
          <h2 className="type-h2">Deliverables &amp; Indicative Ranges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalogItems.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
