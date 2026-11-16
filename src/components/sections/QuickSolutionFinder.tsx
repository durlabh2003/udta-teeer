import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Globe,
  HelpCircle,
  Layers,
  Palette,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalCard } from '../ui/BrutalCard';

interface GoalOption {
  id: string;
  label: string;
  subtitle: string;
  route?: string;
  serviceIds: string[];
  accent: 'surface' | 'gulabi' | 'marigold' | 'peacock';
  icon: React.ComponentType<{ className?: string }>;
}

const GOAL_CARDS: GoalOption[] = [
  {
    id: 'website',
    label: 'I need a website',
    subtitle: 'Fast, conversion-ready business website built from scratch.',
    route: '/website-development-jaipur',
    serviceIds: ['website-dev'],
    accent: 'surface',
    icon: Globe,
  },
  {
    id: 'brand',
    label: 'I want to build my brand',
    subtitle: 'Logo system, visual identity, UI/UX & cohesive guidelines.',
    route: '/services/design',
    serviceIds: ['branding-identity', 'ui-ux-design'],
    accent: 'gulabi',
    icon: Palette,
  },
  {
    id: 'customers',
    label: 'I need more customers',
    subtitle: 'SEO, AI-search (AEO), Meta & Google performance ads.',
    route: '/services/marketing',
    serviceIds: ['performance-marketing', 'seo-aeo'],
    accent: 'marigold',
    icon: TrendingUp,
  },
  {
    id: 'application',
    label: 'I want to build an application',
    subtitle: 'Custom SaaS MVP, portal, CRM workflow, or mobile app.',
    route: '/saas-development',
    serviceIds: ['web-app-dev', 'crm-systems'],
    accent: 'peacock',
    icon: Layers,
  },
  {
    id: 'store',
    label: 'I want to grow my online store',
    subtitle: 'Shopify/WooCommerce D2C storefront + UPI/COD & ad growth.',
    route: '/ecommerce-development-jaipur',
    serviceIds: ['ecommerce-dev', 'performance-marketing'],
    accent: 'surface',
    icon: ShoppingBag,
  },
  {
    id: 'unsure',
    label: 'I am not sure. Help me choose.',
    subtitle: 'Answer 2 quick questions to get a custom stack recommendation.',
    serviceIds: [],
    accent: 'marigold',
    icon: HelpCircle,
  },
];

type MainGoal = 'brand' | 'leads' | 'ecommerce' | 'software';
type HasWebsite = 'yes' | 'no';

export function QuickSolutionFinder() {
  const { setPreselectedServiceIds, openPlannerModal } = useApp();
  const navigate = useNavigate();

  const [guidedOpen, setGuidedOpen] = useState(false);
  const [mainGoal, setMainGoal] = useState<MainGoal>('leads');
  const [hasWebsite, setHasWebsite] = useState<HasWebsite>('no');

  const recommendation = useMemo(() => {
    if (mainGoal === 'brand') {
      if (hasWebsite === 'no') {
        return {
          title: 'Brand Identity + Business Website Launch',
          services: ['branding-identity', 'website-dev'],
          serviceNames: ['Brand Identity & Systems', 'Business Website Development'],
          explanation:
            'Since you are starting fresh, aligning your visual identity and website UX together avoids expensive rewrites later.',
          suggestedRoute: '/services/design',
          suggestedRouteLabel: 'Explore Creative Haveli',
        };
      }
      return {
        title: 'Visual Rebrand + Website UX Refresh',
        services: ['branding-identity', 'ui-ux-design'],
        serviceNames: ['Brand Identity & Systems', 'UI/UX & Design Systems'],
        explanation:
          'Keep what works on your current site while upgrading positioning, typography, and conversion-focused page layouts.',
        suggestedRoute: '/branding-agency-jaipur',
        suggestedRouteLabel: 'Explore Branding Solutions',
      };
    }

    if (mainGoal === 'leads') {
      if (hasWebsite === 'no') {
        return {
          title: 'Conversion Website + Local SEO / Ads Engine',
          services: ['website-dev', 'seo-aeo', 'performance-marketing'],
          serviceNames: ['Business Website', 'SEO + AEO', 'Performance Marketing'],
          explanation:
            'Paid ads and SEO need a fast mobile landing page with WhatsApp capture so inquiries never leak.',
          suggestedRoute: '/services/marketing',
          suggestedRouteLabel: 'Explore Growth Bazaar',
        };
      }
      return {
        title: 'SEO/AEO + Performance Marketing + CRO',
        services: ['seo-aeo', 'performance-marketing'],
        serviceNames: ['SEO + AEO', 'Performance Marketing (Meta + Google)'],
        explanation:
          'Since you already have a website, we start by fixing conversion leaks on key pages and scaling high-intent search & Meta campaigns.',
        suggestedRoute: '/performance-marketing-jaipur',
        suggestedRouteLabel: 'Explore Performance Marketing',
      };
    }

    if (mainGoal === 'ecommerce') {
      if (hasWebsite === 'no') {
        return {
          title: 'D2C Storefront Build + Launch Ads Setup',
          services: ['ecommerce-dev', 'performance-marketing'],
          serviceNames: ['E-Commerce Development', 'Meta + Google Shopping Ads'],
          explanation:
            'Custom Shopify/WooCommerce build tuned for UPI/COD checkouts paired with Pixel/CAPI tracking from day one.',
          suggestedRoute: '/ecommerce-development-jaipur',
          suggestedRouteLabel: 'Explore E-Commerce Solutions',
        };
      }
      return {
        title: 'Storefront CRO + Retention & Ad Scaling',
        services: ['ecommerce-dev', 'performance-marketing', 'social-growth-system'],
        serviceNames: ['Storefront Optimization', 'Performance Marketing', 'Reels / Creative System'],
        explanation:
          'Improve mobile product page checkout conversion while feeding fresh regional & English video hooks into Meta Ads.',
          suggestedRoute: '/ecommerce-development-jaipur',
          suggestedRouteLabel: 'View E-Commerce Architecture',
      };
    }

    return {
      title: 'Technical Discovery + SaaS MVP / Workflow Automation',
      services: ['web-app-dev', 'crm-systems'],
      serviceNames: ['Web App & SaaS MVP', 'CRM & Workflow Automation'],
      explanation:
        hasWebsite === 'no'
          ? 'We scope architecture milestones first so you build clean software and automated lead workflows without runaway costs.'
          : 'Connect your existing site directly into automated CRM pipelines or build bespoke customer portals on top.',
      suggestedRoute: '/saas-development',
      suggestedRouteLabel: 'Explore SaaS & Automation',
    };
  }, [mainGoal, hasWebsite]);

  const handleCardSelect = (card: GoalOption) => {
    if (card.id === 'unsure') {
      trackConversionEvent('solution_finder_open', { source: 'quick_solution_finder' });
      setGuidedOpen((prev) => !prev);
      return;
    }

    setPreselectedServiceIds(card.serviceIds);
    trackConversionEvent('solution_selected', {
      source: 'quick_solution_finder',
      label: card.id,
      serviceCount: card.serviceIds.length,
    });
    if (card.route) {
      navigate(card.route);
    }
  };

  return (
    <section
      id="solution-finder"
      aria-labelledby="solution-finder-heading"
      className="py-12 md:py-16 border-b-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#F3E5CE] dark:bg-[#182235]"
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-1.5">
            <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
              Quick Solution Finder · Seedha Rasta Chunein
            </p>
            <h2
              id="solution-finder-heading"
              className="font-editorial text-2xl md:text-4xl font-bold tracking-tight"
            >
              What are you looking to achieve?
            </h2>
            <p className="text-sm md:text-base text-[#4B433C] dark:text-[#E7D8C5]">
              Pick your immediate goal below — we will carry your selection straight into relevant
              solutions and your project plan.
            </p>
          </div>
          <Link
            to="/services"
            className="text-sm font-bold underline underline-offset-4 hover:text-[#B95E50] dark:hover:text-[#FFC21A] shrink-0"
          >
            Browse full service catalog →
          </Link>
        </div>

        {/* 6 Selectable Goal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {GOAL_CARDS.map((card) => {
            const Icon = card.icon;
            const isUnsureOpen = card.id === 'unsure' && guidedOpen;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardSelect(card)}
                aria-expanded={card.id === 'unsure' ? guidedOpen : undefined}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <BrutalCard
                  tone={isUnsureOpen ? 'peacock' : card.accent}
                  className="h-full flex flex-col justify-between gap-4 transition-transform group-hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 brutal-border bg-[#FFF9F0] text-[#111111] rounded-[4px] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold leading-snug">{card.label}</h3>
                    <p className="text-xs md:text-sm opacity-90 leading-relaxed">{card.subtitle}</p>
                  </div>
                </BrutalCard>
              </button>
            );
          })}
        </div>

        {/* 2-Question Guided Recommendation Widget */}
        {guidedOpen && (
          <div
            role="region"
            aria-label="Guided Solution Recommendation"
            className="brutal-border brutal-shadow-lg bg-[#FFF9F0] dark:bg-[#212E46] rounded-[6px] p-6 md:p-8 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#111111]/15 dark:border-[#FFF9F0]/20">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#B95E50] dark:text-[#FFC21A]" />
                <h3 className="font-editorial text-xl md:text-2xl font-bold">
                  Guided Stack Recommender (2 Quick Questions)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGuidedOpen(false)}
                className="text-xs font-bold underline cursor-pointer"
              >
                Hide recommender
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Questions */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-2">
                  <span className="block text-sm font-extrabold">
                    1. What is your main goal right now?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: 'brand', label: 'Launch or refresh my brand identity' },
                      { id: 'leads', label: 'Get more leads & local customers' },
                      { id: 'ecommerce', label: 'Sell products online (D2C Store)' },
                      { id: 'software', label: 'Build a custom app or automate ops' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setMainGoal(opt.id as MainGoal)}
                        aria-pressed={mainGoal === opt.id}
                        className={`p-3 text-left text-xs md:text-sm font-bold brutal-border rounded-[4px] cursor-pointer transition-colors ${
                          mainGoal === opt.id
                            ? 'bg-[#FFC21A] text-[#111111]'
                            : 'bg-[#FFFFFF] dark:bg-[#182235]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-sm font-extrabold">
                    2. Do you already have a website?
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'yes', label: 'Yes — it needs improvement or growth' },
                      { id: 'no', label: 'No — starting fresh' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHasWebsite(opt.id as HasWebsite)}
                        aria-pressed={hasWebsite === opt.id}
                        className={`px-4 py-2.5 text-xs md:text-sm font-bold brutal-border rounded-[4px] cursor-pointer transition-colors ${
                          hasWebsite === opt.id
                            ? 'bg-[#1FB5B0] text-[#111111]'
                            : 'bg-[#FFFFFF] dark:bg-[#182235]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendation Output */}
              <div className="lg:col-span-5 brutal-border bg-[#263650] text-[#FFF9F0] rounded-[6px] p-5 space-y-4">
                <div>
                  <div className="font-mono-num text-[11px] font-bold uppercase text-[#FFC21A] mb-1">
                    Recommended Path
                  </div>
                  <h4 className="font-editorial text-xl font-bold">{recommendation.title}</h4>
                </div>
                <ul className="space-y-1.5 text-xs md:text-sm font-bold">
                  {recommendation.serviceNames.map((name) => (
                    <li key={name}>✓ {name}</li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed text-[#FFF9F0]/90">
                  {recommendation.explanation}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <BrutalButton
                    variant="hotPink"
                    size="sm"
                    onClick={() => {
                      trackConversionEvent('solution_selected', {
                        source: 'guided_recommender',
                        label: `${mainGoal}_${hasWebsite}`,
                        serviceCount: recommendation.services.length,
                      });
                      openPlannerModal({
                        services: recommendation.services,
                        note: `Guided Solution Finder match: ${recommendation.title} (Existing site: ${hasWebsite}).`,
                      });
                    }}
                  >
                    <span>Build My Growth Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </BrutalButton>
                  <Link
                    to={recommendation.suggestedRoute}
                    className="text-xs font-bold underline text-[#FFC21A]"
                  >
                    {recommendation.suggestedRouteLabel} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
