import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BRAND_CONFIG } from '../data/brandConfig';
import servicesData from '../data/services.json';

export interface PageMetaConfig {
  title: string;
  description: string;
  path: string;
  ogImage: string;
}

const DEFAULT_OG_IMAGE = '/og-image.jpg';

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
    ogImage: DEFAULT_OG_IMAGE,
  },
  'services-development': {
    title: 'Custom Web, E-Commerce & SaaS Development Jaipur | Urdta Teeeeeer',
    description:
      'High-speed React & Next.js websites, Shopify/WooCommerce stores, SaaS MVPs, mobile apps, and WhatsApp CRM automation engineered by Urdta Teeeeeer Jaipur.',
    path: '/services/development',
    ogImage: DEFAULT_OG_IMAGE,
  },
  'services-marketing': {
    title: 'SEO, AEO & Performance Marketing Studio in Jaipur | Urdta Teeeeeer',
    description:
      'Measurable local SEO, AI Answer Engine Optimisation (AEO), Meta & Google Ads, and bilingual Hindi/English creative funnels with live client-owned dashboards.',
    path: '/services/marketing',
    ogImage: DEFAULT_OG_IMAGE,
  },
  industries: {
    title: 'Digital Solutions Across 10 Jaipur & Indian Industries | Urdta Teeeeeer',
    description:
      'Tailored branding, websites, CRM automation, and growth systems for Jewellery, Hospitality, Handicrafts, Education, Healthcare, Cafes, Real Estate & SaaS.',
    path: '/industries',
    ogImage: DEFAULT_OG_IMAGE,
  },
  work: {
    title: 'Featured Work & Sample Case Blueprints | Urdta Teeeeeer Jaipur',
    description:
      'Inspect product architecture and UX breakdowns for Tapinfi, CafeOS, and Vyapaar Saathi alongside sample conversion case blueprints.',
    path: '/work',
    ogImage: DEFAULT_OG_IMAGE,
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
    ogImage: DEFAULT_OG_IMAGE,
  },
  insights: {
    title: 'Jaipur Digital Growth, SEO & Web Strategy Insights | Urdta Teeeeeer',
    description:
      'Practical playbooks for Indian founders covering Google Maps SEO, AI search (AEO), D2C checkout CRO, and choosing between websites, stores, or SaaS MVPs.',
    path: '/insights',
    ogImage: DEFAULT_OG_IMAGE,
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
    ogImage: DEFAULT_OG_IMAGE,
  },
  'privacy-policy': {
    title: 'Privacy Policy & Enquiry Data Handling | Urdta Teeeeeer',
    description:
      'How Urdta Teeeeeer handles business enquiry information submitted through our interactive demo planner and audit forms.',
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
    title: 'Project Brief Confirmed — Demo Receipt | Urdta Teeeeeer',
    description:
      'Your project brief demo confirmation with a simulated Lead ID. Connect directly via WhatsApp or book a discovery chat with our Jaipur team.',
    path: '/thank-you',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '404': {
    title: '404 — Page Not Found | Urdta Teeeeeer Jaipur',
    description: 'This route drifted away. Return to Urdta Teeeeeer Jaipur home.',
    path: '/404',
    ogImage: DEFAULT_OG_IMAGE,
  },
};

for (const landing of servicesData.seoLandingPages) {
  PAGE_META_DICTIONARY[landing.slug] = {
    title: landing.metaTitle,
    description: landing.metaDescription,
    path: `/${landing.slug}`,
    ogImage: DEFAULT_OG_IMAGE,
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

  const origin = BRAND_CONFIG.domain.replace(/\/+$/, '');
  const cleanPath = resolved.path.startsWith('/') ? resolved.path : `/${resolved.path}`;
  const canonicalHref = `${origin}${cleanPath}`;
  const ogImageUrl = resolved.ogImage.startsWith('http')
    ? resolved.ogImage
    : `${origin}${resolved.ogImage}`;

  upsertMetaTag('name', 'description', resolved.description);
  upsertMetaTag('property', 'og:type', 'website');
  upsertMetaTag('property', 'og:url', canonicalHref);
  upsertMetaTag('property', 'og:title', resolved.title);
  upsertMetaTag('property', 'og:description', resolved.description);
  upsertMetaTag('property', 'og:image', ogImageUrl);
  upsertMetaTag('name', 'twitter:card', 'summary_large_image');
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

export function useRouteMetaTags() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageKey = resolvePageKeyFromPath(pathname);
    if (PAGE_META_DICTIONARY[pageKey]) {
      updateMetaTags(pageKey, { path: pathname || '/' });
    }
  }, [pathname]);
}
