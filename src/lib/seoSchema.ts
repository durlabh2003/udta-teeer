import servicesData from '../data/services.json';
import siteConfig from '../data/site-config.json';
import { PAGE_META_DICTIONARY } from './seoMeta';

const defaultOgImage = '/og-image.jpg';

export type PageSchemaType =
  | 'home'
  | 'services'
  | 'services-design'
  | 'services-development'
  | 'services-marketing'
  | 'industries'
  | 'work'
  | 'packages'
  | 'process'
  | 'insights'
  | 'about'
  | 'contact'
  | 'faq'
  | 'plan-your-project'
  | string;

export interface GenerateSchemaOptions {
  path?: string;
  origin?: string;
  title?: string;
  description?: string;
  /** Inject or update the JSON-LD script element in document.head (default: true). */
  inject?: boolean;
}

const SCHEMA_SCRIPT_ID = 'route-localbusiness-jsonld';

function resolveOrigin(explicitOrigin?: string): string {
  if (explicitOrigin) return explicitOrigin.replace(/\/+$/, '');
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }
  return 'https://udta-teeer.vercel.app';
}

function resolveAbsoluteUrl(origin: string, assetOrPath: string): string {
  if (assetOrPath.startsWith('http://') || assetOrPath.startsWith('https://')) {
    return assetOrPath;
  }
  const normalized = assetOrPath.startsWith('/') ? assetOrPath : `/${assetOrPath}`;
  return `${origin}${normalized}`;
}

function buildCoreLocalBusinessNode(origin: string, imageUrl: string) {
  return {
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${origin}/#organization`,
    name: siteConfig.brandName,
    alternateName: 'Udta Teer Creative Technology Studio',
    url: `${origin}/`,
    logo: `${origin}/pwa-512x512.png`,
    image: imageUrl,
    description:
      'Jaipur branding agency, custom web development, UI/UX design, e-commerce, and digital growth studio uniting design, engineering, and marketing under one accountable team.',
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: 'IN',
    },
    areaServed: [siteConfig.city, siteConfig.state, siteConfig.country],
    priceRange: '₹2,999 – ₹8,00,000+',
    knowsAbout: [
      'Brand Identity & UI/UX Design',
      'Custom React & Next.js Web Development',
      'Shopify & WooCommerce E-Commerce',
      'Local SEO & AI Answer Engine Optimisation (AEO)',
      'Performance Marketing & WhatsApp CRM Automation',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteConfig.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

function buildPageSpecificNodes(
  pageType: PageSchemaType,
  origin: string,
  pageUrl: string,
  title: string,
  description: string
): Array<Record<string, unknown>> {
  const nodes: Array<Record<string, unknown>> = [];
  const orgRef = { '@id': `${origin}/#organization` };

  const seoLanding = servicesData.seoLandingPages.find((p) => p.slug === pageType);
  if (seoLanding) {
    nodes.push({
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: seoLanding.title,
      serviceType: seoLanding.serviceType,
      description: seoLanding.definition,
      provider: orgRef,
      areaServed: [siteConfig.city, siteConfig.state, siteConfig.country],
      url: pageUrl,
    });
    return nodes;
  }

  switch (pageType) {
    case 'home':
      nodes.push({
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: `${origin}/`,
        name: siteConfig.brandName,
        publisher: orgRef,
      });
      nodes.push({
        '@type': 'OfferCatalog',
        '@id': `${origin}/#catalog`,
        name: 'Urdta Teeeeeer Creative, Tech & Growth Capabilities',
        itemListElement: servicesData.stalls.map((stall) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: stall.titleEn,
            serviceType: stall.titleHi,
            description: stall.subtitleEn,
            provider: orgRef,
          },
        })),
      });
      break;

    case 'services':
    case 'packages':
      nodes.push({
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        name: title,
        description,
        url: pageUrl,
        about: orgRef,
      });
      nodes.push({
        '@type': 'OfferCatalog',
        '@id': `${pageUrl}#offer-catalog`,
        name: 'Jaipur Branding, Web Development & Growth Packages',
        itemListElement: servicesData.flagships.map((flagship) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: flagship.name,
            serviceType: flagship.badge,
            description: flagship.taglineEn,
            provider: orgRef,
          },
        })),
      });
      break;

    case 'services-design':
    case 'services-development':
    case 'services-marketing': {
      const stallMap: Record<string, string> = {
        'services-design': 'rang-roop',
        'services-development': 'banawat',
        'services-marketing': 'hawa-banao',
      };
      const stall = servicesData.stalls.find((s) => s.id === stallMap[pageType]);
      nodes.push({
        '@type': 'Service',
        '@id': `${pageUrl}#pillar-service`,
        name: stall ? stall.titleEn : title,
        serviceType: stall?.titleHi ?? title,
        description: stall?.subtitleEn ?? description,
        provider: orgRef,
        areaServed: [siteConfig.city, siteConfig.state, siteConfig.country],
        url: pageUrl,
      });
      break;
    }

    case 'work':
      nodes.push({
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#work`,
        name: title,
        description,
        url: pageUrl,
        publisher: orgRef,
      });
      break;

    case 'industries':
      nodes.push({
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#industries`,
        name: title,
        description,
        url: pageUrl,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: siteConfig.industriesServed.map((industry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: industry,
          })),
        },
      });
      break;

    case 'about':
    case 'process':
      nodes.push({
        '@type': 'AboutPage',
        '@id': `${pageUrl}#about`,
        name: title,
        description,
        url: pageUrl,
        mainEntity: orgRef,
      });
      break;

    case 'contact':
    case 'plan-your-project':
      nodes.push({
        '@type': 'ContactPage',
        '@id': `${pageUrl}#contact`,
        name: title,
        description,
        url: pageUrl,
        mainEntity: orgRef,
      });
      break;

    case 'insights':
      nodes.push({
        '@type': 'Blog',
        '@id': `${pageUrl}#blog`,
        name: title,
        description,
        url: pageUrl,
        publisher: orgRef,
      });
      break;

    case 'faq':
      nodes.push({
        '@type': 'WebPage',
        '@id': `${pageUrl}#faq-page`,
        name: title,
        description,
        url: pageUrl,
        about: orgRef,
      });
      break;

    default:
      if (pageType.startsWith('industries-')) {
        nodes.push({
          '@type': 'Service',
          '@id': `${pageUrl}#industry-service`,
          name: title,
          description,
          provider: orgRef,
          areaServed: [siteConfig.city, siteConfig.state, siteConfig.country],
          url: pageUrl,
        });
      } else if (pageType.startsWith('insights-')) {
        nodes.push({
          '@type': 'Article',
          '@id': `${pageUrl}#article`,
          headline: title,
          description,
          url: pageUrl,
          publisher: orgRef,
        });
      }
      break;
  }

  return nodes;
}

/**
 * Generates Schema.org JSON-LD structured data tailored to the current pageType
 * (including LocalBusiness, Organization, ProfessionalService, WebPage, and route-specific schemas)
 * and dynamically injects/updates it inside document.head.
 */
export function generateLocalBusinessSchema(
  pageType: PageSchemaType,
  options: GenerateSchemaOptions = {}
): Record<string, unknown> {
  const origin = resolveOrigin(options.origin);
  const metaEntry = PAGE_META_DICTIONARY[pageType] ?? PAGE_META_DICTIONARY.home;

  const resolvedPath = options.path ?? metaEntry.path ?? '/';
  const cleanPath = resolvedPath === '/' ? '/' : resolvedPath.replace(/\/+$/, '');
  const pageUrl = `${origin}${cleanPath}`;
  const title = options.title || metaEntry.title;
  const description = options.description || metaEntry.description;
  const imageUrl = resolveAbsoluteUrl(origin, metaEntry.ogImage || defaultOgImage);

  const breadcrumbItems: Array<Record<string, unknown>> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
  ];
  if (cleanPath !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: title.split('|')[0].trim(),
      item: pageUrl,
    });
  }

  const graph: Array<Record<string, unknown>> = [
    buildCoreLocalBusinessNode(origin, imageUrl),
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { '@id': `${origin}/#website` },
      about: { '@id': `${origin}/#organization` },
      inLanguage: 'en-IN',
    },
    ...(cleanPath !== '/'
      ? [
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: breadcrumbItems,
          },
        ]
      : []),
    ...buildPageSpecificNodes(pageType, origin, pageUrl, title, description),
  ];

  const schemaDocument: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  const shouldInject = options.inject !== false;
  if (shouldInject && typeof document !== 'undefined') {
    let scriptEl = document.getElementById(SCHEMA_SCRIPT_ID) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = SCHEMA_SCRIPT_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemaDocument);
  }

  return schemaDocument;
}
