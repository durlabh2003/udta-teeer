/**
 * Single Source of Truth for Brand Spelling, Contact Info & Pricing.
 * Every pricing card, Hero badge, Service Bazaar pillar, Packages Rate Guide,
 * and SEO Service page reads from this module.
 */

export const BRAND_CONFIG = {
  name: 'Urdta Teeeeeer',
  shortName: 'UrdtaTeer',
  taglineEn: 'You bring the ambition. We bring the aim.',
  taglineHi: 'Aap aim rakho. Udaan hum denge.',
  city: 'Jaipur',
  state: 'Rajasthan',
  country: 'India',
  studioDistrict: 'C-Scheme & Johari Bazaar, Jaipur',
  domain: 'https://udta-teeer.vercel.app',
  email: 'namaste@urdtateeeeeer.in',
  whatsappNumber: '919829000000',
  whatsappDisplay: '+91 98290 00000 (Sample Desk)',
  calendarUrl: 'https://cal.com/urdta-teeeeeer/discovery-chai',
  legalNotice:
    'Urdta Teeeeeer Studio (Jaipur, India) · Demo Portfolio & Scoped Estimate Showcase.',
  responseSlaHours: 24,
} as const;

export interface CanonicalPriceEntry {
  id: string;
  name: string;
  pillar: 'design' | 'development' | 'marketing' | 'starter' | 'flagship';
  startingFrom: number;
  displayPrice: string;
  billingModel: string;
  timeline: string;
  customScope?: boolean;
}

export const CANONICAL_PRICING: Record<string, CanonicalPriceEntry> = {
  'starter-micro': {
    id: 'starter-micro',
    name: 'Starter Creative Pack / Quick Fix',
    pillar: 'starter',
    startingFrom: 2999,
    displayPrice: 'From ₹2,999',
    billingModel: 'One-time starter',
    timeline: '3–5 days',
  },
  diagnostic: {
    id: 'diagnostic',
    name: 'Brand & Digital Diagnostic',
    pillar: 'flagship',
    startingFrom: 25000,
    displayPrice: 'From ₹25,000',
    billingModel: 'One-time, paid',
    timeline: '7–10 days',
  },
  'ui-ux-design': {
    id: 'ui-ux-design',
    name: 'UI/UX & Design Systems',
    pillar: 'design',
    startingFrom: 45000,
    displayPrice: 'From ₹45,000',
    billingModel: 'Fixed project',
    timeline: '2–5 weeks',
  },
  'brand-identity': {
    id: 'brand-identity',
    name: 'Brand Identity System',
    pillar: 'design',
    startingFrom: 60000,
    displayPrice: 'From ₹60,000',
    billingModel: 'Fixed project',
    timeline: '3–4 weeks',
  },
  'business-website': {
    id: 'business-website',
    name: 'Business Website (5–7 Pages)',
    pillar: 'development',
    startingFrom: 40000,
    displayPrice: 'From ₹40,000',
    billingModel: 'Fixed project',
    timeline: '2–3 weeks',
  },
  'creative-web-experience': {
    id: 'creative-web-experience',
    name: 'Creative Web Experience',
    pillar: 'flagship',
    startingFrom: 100000,
    displayPrice: 'From ₹1,00,000',
    billingModel: 'Fixed project',
    timeline: '4–6 weeks',
  },
  'ecommerce-site': {
    id: 'ecommerce-site',
    name: 'E-Commerce Storefront',
    pillar: 'development',
    startingFrom: 100000,
    displayPrice: 'From ₹1,00,000',
    billingModel: 'Fixed project',
    timeline: '4–6 weeks',
  },
  'automation-ai': {
    id: 'automation-ai',
    name: 'CRM & Practical AI Workflow',
    pillar: 'development',
    startingFrom: 75000,
    displayPrice: 'From ₹75,000',
    billingModel: 'Audit + Build',
    timeline: '2–4 weeks',
    customScope: true,
  },
  'crm-implementation': {
    id: 'crm-implementation',
    name: 'Full CRM Implementation',
    pillar: 'development',
    startingFrom: 150000,
    displayPrice: 'From ₹1,50,000',
    billingModel: 'Setup + Support',
    timeline: '4–8 weeks',
    customScope: true,
  },
  'custom-web-app': {
    id: 'custom-web-app',
    name: 'Custom Web Application',
    pillar: 'development',
    startingFrom: 300000,
    displayPrice: 'From ₹3,00,000',
    billingModel: 'Discovery + Milestones',
    timeline: '8–14 weeks',
    customScope: true,
  },
  'mobile-app': {
    id: 'mobile-app',
    name: 'Mobile App (iOS & Android)',
    pillar: 'development',
    startingFrom: 500000,
    displayPrice: 'From ₹5,00,000',
    billingModel: 'Discovery + Milestones',
    timeline: '10–16 weeks',
    customScope: true,
  },
  'saas-mvp': {
    id: 'saas-mvp',
    name: 'SaaS MVP Build',
    pillar: 'development',
    startingFrom: 800000,
    displayPrice: 'From ₹8,00,000',
    billingModel: 'Discovery + Milestones',
    timeline: '12–20 weeks',
    customScope: true,
  },
  'seo-retainer': {
    id: 'seo-retainer',
    name: 'SEO + AEO/GEO Retainer',
    pillar: 'marketing',
    startingFrom: 25000,
    displayPrice: 'From ₹25,000/mo',
    billingModel: 'Monthly Retainer',
    timeline: '3–6 mo horizon',
  },
  'social-creative-retainer': {
    id: 'social-creative-retainer',
    name: 'Social Creative System',
    pillar: 'marketing',
    startingFrom: 20000,
    displayPrice: 'From ₹20,000/mo',
    billingModel: 'Monthly Bundle',
    timeline: 'Monthly sprint',
  },
  'growth-partnership': {
    id: 'growth-partnership',
    name: 'Growth Partnership (Ads + Content)',
    pillar: 'flagship',
    startingFrom: 35000,
    displayPrice: 'From ₹35,000/mo',
    billingModel: 'Monthly Retainer',
    timeline: 'Min 3-month sprint',
  },
};

export const PILLAR_SUMMARY_PRICING = {
  design: {
    price: CANONICAL_PRICING['ui-ux-design'].displayPrice,
    timeline: CANONICAL_PRICING['ui-ux-design'].timeline,
  },
  development: {
    price: CANONICAL_PRICING['business-website'].displayPrice,
    timeline: CANONICAL_PRICING['business-website'].timeline,
  },
  marketing: {
    price: CANONICAL_PRICING['seo-retainer'].displayPrice,
    timeline: 'Monthly sprint',
  },
} as const;
