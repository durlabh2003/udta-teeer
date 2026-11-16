import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import servicesData from '../data/services.json';

export interface PageMetaConfig {
  title: string;
  description: string;
  path: string;
  ogImage: string;
}

import defaultOgImage from '../assets/images/jaipur_studio_hero_art_1794811735554.jpg';
import d2cOgImage from '../assets/images/case_d2c_illustration_1794811736009.jpg';
import hospitalityOgImage from '../assets/images/case_jaipur_hospitality_1794811736332.jpg';
import saasOgImage from '../assets/images/case_saas_automation_1794811736581.jpg';

const DEFAULT_OG_IMAGE = defaultOgImage;
const D2C_OG_IMAGE = d2cOgImage;
const HOSPITALITY_OG_IMAGE = hospitalityOgImage;
const SAAS_OG_IMAGE = saasOgImage;

export const PAGE_META_DICTIONARY: Record<string, PageMetaConfig> = {
  home: {
    title: 'Urdta Teeeeeer — Branding & Web Development Studio in Jaipur',
    description:
      'Jaipur branding agency, custom web development & digital growth studio. One accountable team for UI/UX, e-commerce, SEO & ads. Plan your project in 60s.',
    path: '/',
    ogImage: DEFAULT_OG_IMAGE,
  },
  services: {
    title: 'Branding, Web Dev & Growth Marketing Services Jaipur | Urdta Teeeeeer',
    description:
      'Explore Creative Haveli (Branding & UI/UX), Digital Karkhana (Websites, E-Commerce & SaaS), and Growth Bazaar (SEO, AEO & Ads) by Urdta Teeeeeer Jaipur.',
    path: '/services',
    ogImage: DEFAULT_OG_IMAGE,
  },
  'services-design': {
    title: 'Branding & UI/UX Design Agency in Jaipur (Creative Haveli) | Urdta Teeeeeer',
    description:
      'Custom brand identity, logo systems, packaging, and WCAG-accessible UI/UX design in Figma crafted in Jaipur for startups, D2C labels & local businesses.',
    path: '/services/design',
    ogImage: HOSPITALITY_OG_IMAGE,
  },
  'services-development': {
    title: 'Custom Web, E-Commerce & SaaS Development Jaipur | Urdta Teeeeeer',
    description:
      'High-speed React & Next.js websites, Shopify/WooCommerce stores, SaaS MVPs, mobile apps, and WhatsApp CRM automation engineered by Urdta Teeeeeer Jaipur.',
    path: '/services/development',
    ogImage: SAAS_OG_IMAGE,
  },
  'services-marketing': {
    title: 'SEO, AEO & Performance Marketing Studio in Jaipur | Urdta Teeeeeer',
    description:
      'Measurable local SEO, AI Answer Engine Optimization (AEO), Meta & Google Ads, and bilingual Hindi/English creative funnels with live client-owned dashboards.',
    path: '/services/marketing',
    ogImage: SAAS_OG_IMAGE,
  },
  industries: {
    title: 'Digital Solutions Across 10 Jaipur & Indian Industries | Urdta Teeeeeer',
    description:
      'Tailored branding, websites, CRM automation, and growth systems for Jewellery, Hospitality, Handicrafts, Education, Healthcare, Cafes, Real Estate & SaaS.',
    path: '/industries',
    ogImage: HOSPITALITY_OG_IMAGE,
  },
  work: {
    title: 'Portfolio Candidates & Case Templates | Urdta Teeeeeer Jaipur',
    description:
      'Inspect product architecture and UX breakdowns for Tapinfi, CafeOS, and Vyapaar Saathi alongside transparent conversion case study templates.',
    path: '/work',
    ogImage: D2C_OG_IMAGE,
  },
  packages: {
    title: 'Web Design & Digital Marketing Pricing Guide Jaipur | Urdta Teeeeeer',
    description:
      'Transparent investment tiers: starter micro-deliverables from ₹2,999, custom business websites from ₹40,000, D2C e-commerce from ₹1,00,000 & growth retainers.',
    path: '/packages',
    ogImage: DEFAULT_OG_IMAGE,
  },
  process: {
    title: 'Our 6-Step Brand, Web & Growth Process | Urdta Teeeeeer Jaipur',
    description:
      'From our 7–10 day Brand & Digital Diagnostic to UI/UX architecture, agile engineering, precision launch, and owned growth analytics.',
    path: '/process',
    ogImage: SAAS_OG_IMAGE,
  },
  insights: {
    title: 'Jaipur Digital Growth, SEO & Web Strategy Insights | Urdta Teeeeeer',
    description:
      'Practical playbooks for Indian founders covering Google Maps SEO, AI search (AEO), D2C checkout CRO, and choosing between websites, stores, or SaaS MVPs.',
    path: '/insights',
    ogImage: HOSPITALITY_OG_IMAGE,
  },
  about: {
    title: 'About Urdta Teeeeeer — Creative Technology Studio in Jaipur',
    description:
      'Meet the Jaipur creative, engineering, and performance marketing team turning ambitious regional and pan-India businesses into unforgettable digital brands.',
    path: '/about',
    ogImage: DEFAULT_OG_IMAGE,
  },
  contact: {
    title: 'Contact Urdta Teeeeeer Jaipur — Book a Discovery Chai or Free Audit',
    description:
      'Start a project conversation with our Jaipur studio via interactive planner, WhatsApp direct, free 5-point website audit, or scheduled discovery call.',
    path: '/contact',
    ogImage: DEFAULT_OG_IMAGE,
  },
  faq: {
    title: 'Pricing, Process & Timelines FAQs | Urdta Teeeeeer Jaipur',
    description:
      'Clear answers on custom website pricing, milestone payments, SEO timelines, code ownership, and bilingual English/Hinglish deliverables.',
    path: '/faq',
    ogImage: DEFAULT_OG_IMAGE,
  },
  'plan-your-project': {
    title: 'Plan Your Brand, Website or Growth Project (60s) | Urdta Teeeeeer',
    description:
      'Build a tailored scope across Design, Development, and Marketing in 4 simple steps with instant budget & timeline alignment from Urdta Teeeeeer.',
    path: '/plan-your-project',
    ogImage: SAAS_OG_IMAGE,
  },
  'privacy-policy': {
    title: 'Privacy Policy & Enquiry Data Handling | Urdta Teeeeeer',
    description:
      'How Urdta Teeeeeer collects, stores, and protects business enquiry information submitted through our website planner and audit forms.',
    path: '/privacy-policy',
    ogImage: DEFAULT_OG_IMAGE,
  },
  terms: {
    title: 'Terms of Service & Engagement Disclosures | Urdta Teeeeeer',
    description:
      'Studio engagement terms, milestone billing structure, intellectual property ownership, and starter deliverable scope disclosures.',
    path: '/terms',
    ogImage: DEFAULT_OG_IMAGE,
  },
  'thank-you': {
    title: 'Project Brief Confirmed — Lead Receipt | Urdta Teeeeeer',
    description:
      'Your project brief has been received with a tracked Lead ID. Connect directly via WhatsApp or schedule a discovery call with our Jaipur team.',
    path: '/thank-you',
    ogImage: DEFAULT_OG_IMAGE,
  },
};

const SLUG_IMAGE_MAP: Record<string, string> = {
  'ecommerce-development-jaipur': D2C_OG_IMAGE,
  'branding-agency-jaipur': D2C_OG_IMAGE,
  'ui-ux-design-jaipur': HOSPITALITY_OG_IMAGE,
  'saas-development': SAAS_OG_IMAGE,
  'automation-ai-jaipur': SAAS_OG_IMAGE,
  'mobile-app-development-jaipur': SAAS_OG_IMAGE,
};

// Register all 11 dedicated SEO service pages from services.json
for (const landing of servicesData.seoLandingPages) {
  PAGE_META_DICTIONARY[landing.slug] = {
    title: landing.metaTitle,
    description: landing.metaDescription,
    path: `/${landing.slug}`,
    ogImage: SLUG_IMAGE_MAP[landing.slug] ?? DEFAULT_OG_IMAGE,
  };
}

export function resolvePageKeyFromPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') return 'home';
  if (clean === '/services') return 'services';
  if (clean === '/services/design') return 'services-design';
  if (clean === '/services/development') return 'services-development';
  if (clean === '/services/marketing') return 'services-marketing';
  if (clean === '/build' || clean === '/plan-your-project') return 'plan-your-project';

  const normalized = clean.slice(1);
  if (PAGE_META_DICTIONARY[normalized]) {
    return normalized;
  }
  return normalized.replace(/\//g, '-');
}

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Updates document title, meta description, OpenGraph (og:title, og:description,
 * og:url, og:image), Twitter cards, and canonical URL from PAGE_META_DICTIONARY.
 */
export function updateMetaTags(
  pageKey: string,
  overrides?: { title?: string; description?: string; path?: string; ogImage?: string }
): PageMetaConfig {
  const base = PAGE_META_DICTIONARY[pageKey] ?? PAGE_META_DICTIONARY.home;
  const resolved: PageMetaConfig = {
    title: overrides?.title || base.title,
    description: overrides?.description || base.description,
    path: overrides?.path || base.path,
    ogImage: overrides?.ogImage || base.ogImage,
  };

  if (typeof document === 'undefined') return resolved;

  document.title = resolved.title;

  const origin = window.location.origin;
  const canonicalHref = `${origin}${resolved.path}`;
  const ogImageUrl = resolved.ogImage.startsWith('http')
    ? resolved.ogImage
    : `${origin}${resolved.ogImage}`;

  upsertMetaTag('name', 'description', resolved.description);
  upsertMetaTag('property', 'og:url', canonicalHref);
  upsertMetaTag('property', 'og:title', resolved.title);
  upsertMetaTag('property', 'og:description', resolved.description);
  upsertMetaTag('property', 'og:image', ogImageUrl);
  upsertMetaTag('name', 'twitter:title', resolved.title);
  upsertMetaTag('name', 'twitter:description', resolved.description);
  upsertMetaTag('name', 'twitter:image', ogImageUrl);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalHref);

  return resolved;
}

/**
 * Custom React hook to synchronize page-specific meta tags when the route changes.
 */
export function useRouteMetaTags() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageKey = resolvePageKeyFromPath(pathname);
    if (PAGE_META_DICTIONARY[pageKey]) {
      updateMetaTags(pageKey, { path: pathname || '/' });
    }
  }, [pathname]);
}
