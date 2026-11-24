import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import {
  ServiceIllustration,
  ServiceIllustrationKey,
  TurbanQuestionIllustration,
} from '../illustrations/JaipurIllustrations';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalCard } from '../ui/BrutalCard';

interface GoalOption {
  id: string;
  label: string;
  subline: string;
  illustrationKey?: ServiceIllustrationKey;
  route?: string;
  serviceIds: string[];
}

const GOAL_CARDS: GoalOption[] = [
  {
    id: 'website',
    label: 'Need a Website',
    subline: 'Custom fast site',
    illustrationKey: 'website',
    route: '/website-development-jaipur',
    serviceIds: ['website-dev'],
  },
  {
    id: 'brand',
    label: 'Build My Brand',
    subline: 'Logo & UI system',
    illustrationKey: 'branding',
    route: '/services/design',
    serviceIds: ['branding-identity', 'ui-ux-design'],
  },
  {
    id: 'customers',
    label: 'Get More Customers',
    subline: 'SEO & paid ads',
    illustrationKey: 'google-ads',
    route: '/services/marketing',
    serviceIds: ['performance-marketing', 'seo-aeo'],
  },
  {
    id: 'application',
    label: 'Build an Application',
    subline: 'SaaS, app & CRM',
    illustrationKey: 'saas',
    route: '/saas-development',
    serviceIds: ['web-app-dev', 'crm-systems'],
  },
  {
    id: 'store',
    label: 'Grow Online Store',
    subline: 'D2C shop + ROAS',
    illustrationKey: 'ecommerce',
    route: '/ecommerce-development-jaipur',
    serviceIds: ['ecommerce-dev', 'performance-marketing'],
  },
  {
    id: 'unsure',
    label: 'Help Me Choose',
    subline: '2-question match',
    serviceIds: [],
  },
];

type MainGoal = 'brand' | 'leads' | 'ecommerce' | 'software';
type HasWebsite = 'yes' | 'no';

export function QuickSolutionFinder() {
  const { setPreselectedServiceIds, openPlannerModal } = useApp();
  const navigate = useNavigate();

  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [guidedOpen, setGuidedOpen] = useState(false);
  const [mainGoal, setMainGoal] = useState<MainGoal>('leads');
  const [hasWebsite, setHasWebsite] = useState<HasWebsite>('no');

  const recommendation = useMemo(() => {
    if (mainGoal === 'brand') {
      return hasWebsite === 'no'
        ? {
            title: 'Brand Identity + Business Website Launch',
            services: ['branding-identity', 'website-dev'],
            serviceNames: ['Brand Identity & Systems', 'Business Website'],
            explanation: 'Lock visual identity and website UX together from day one.',
            suggestedRoute: '/services/design',
            suggestedRouteLabel: 'Explore Design Haveli',
          }
        : {
            title: 'Visual Rebrand + UX Refresh',
            services: ['branding-identity', 'ui-ux-design'],
            serviceNames: ['Brand Identity', 'UI/UX Design Systems'],
            explanation: 'Upgrade positioning and page clarity without discarding working pages.',
            suggestedRoute: '/branding-agency-jaipur',
            suggestedRouteLabel: 'Explore Branding',
          };
    }

    if (mainGoal === 'leads') {
      return hasWebsite === 'no'
        ? {
            title: 'Conversion Website + Local SEO & Ads',
            services: ['website-dev', 'seo-aeo', 'performance-marketing'],
            serviceNames: ['Business Website', 'SEO + AEO', 'Performance Ads'],
            explanation: 'Fast mobile landing pages ensure ad clicks become WhatsApp leads.',
            suggestedRoute: '/services/marketing',
            suggestedRouteLabel: 'Explore Growth Bazaar',
          }
        : {
            title: 'SEO/AEO + Performance Ads + CRO',
            services: ['seo-aeo', 'performance-marketing'],
            serviceNames: ['SEO + AEO', 'Performance Ads (Meta + Google)'],
            explanation: 'Patch landing conversion leaks while scaling high-intent local search.',
            suggestedRoute: '/performance-marketing-jaipur',
            suggestedRouteLabel: 'Explore Ads',
          };
    }

    if (mainGoal === 'ecommerce') {
      return hasWebsite === 'no'
        ? {
            title: 'D2C Storefront Build + Launch Ads',
            services: ['ecommerce-dev', 'performance-marketing'],
            serviceNames: ['E-Commerce Storefront', 'Shopping & Meta Ads'],
            explanation: 'Shopify/Woo build tuned for UPI/COD checkouts with clean tracking.',
            suggestedRoute: '/ecommerce-development-jaipur',
            suggestedRouteLabel: 'Explore E-Commerce',
          }
        : {
            title: 'Storefront CRO + Creative Scaling',
            services: ['ecommerce-dev', 'performance-marketing', 'social-growth-system'],
            serviceNames: ['Checkout CRO', 'Performance Ads', 'Reels Hooks'],
            explanation: 'Boost cart completion while feeding bilingual reels into Meta Ads.',
            suggestedRoute: '/ecommerce-development-jaipur',
            suggestedRouteLabel: 'View Store UX',
          };
    }

    return {
      title: 'Technical Scoping + SaaS MVP / CRM',
      services: ['web-app-dev', 'crm-systems'],
      serviceNames: ['SaaS MVP / Web App', 'WhatsApp CRM Automation'],
      explanation: 'Milestone-based builds paired cleanly with automated enquiry pipelines.',
      suggestedRoute: '/saas-development',
      suggestedRouteLabel: 'Explore SaaS & Automation',
    };
  }, [mainGoal, hasWebsite]);

  const handleCardSelect = (card: GoalOption) => {
    setSelectedGoalId(card.id);
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
      className="py-10 md:py-12 border-b-2 border-[var(--border-ink)] bg-[var(--bg-cream)]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl space-y-1">
            <p className="type-label text-[var(--text-terracotta)]">
              Quick Finder · Seedha Rasta Chunein
            </p>
            <h2 id="solution-finder-heading" className="type-h2">
              What are you looking to achieve?
            </h2>
            <p className="type-small text-[var(--text-secondary)]">
              Tap your goal card to jump straight to solutions and prefill your project plan.
            </p>
          </div>
          <BrutalButton to="/services" variant="tertiary" size="sm">
            Browse full service catalog →
          </BrutalButton>
        </div>

        {/* 6 Visual-First Goal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOAL_CARDS.map((card) => {
            const isSelected = selectedGoalId === card.id || (card.id === 'unsure' && guidedOpen);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardSelect(card)}
                aria-pressed={isSelected}
                aria-expanded={card.id === 'unsure' ? guidedOpen : undefined}
                className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)] rounded-[8px]"
              >
                <BrutalCard
                  tone={isSelected ? 'marigold' : 'surface'}
                  className={`h-full !p-3.5 flex flex-col justify-between gap-2.5 transition-transform group-hover:-translate-y-1 ${
                    isSelected ? 'ring-3 ring-[var(--color-gulabi)]' : ''
                  }`}
                >
                  {/* Visual illustration frame */}
                  <div className="relative h-24 w-full brutal-border bg-[var(--bg-cream)] rounded-[8px] p-1.5 flex items-center justify-center overflow-hidden">
                    {card.id === 'unsure' ? (
                      <TurbanQuestionIllustration className="w-28 h-20" alt={card.label} />
                    ) : (
                      <ServiceIllustration
                        name={card.illustrationKey}
                        alt={card.label}
                        className="w-28 h-20"
                      />
                    )}
                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 right-1.5 w-6 h-6 brutal-border bg-[var(--color-gulabi)] text-[var(--text-on-gulabi)] rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Short 3-word title + 1 tiny line */}
                  <div className="flex items-end justify-between gap-2 pt-0.5">
                    <div>
                      <h3 className="font-display font-bold text-base leading-tight">
                        {card.label}
                      </h3>
                      <p className="text-xs font-medium opacity-80 mt-0.5">{card.subline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
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
            className="brutal-border brutal-shadow-lg bg-[var(--bg-surface)] rounded-[10px] p-6 md:p-8 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-ink)]/15">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[var(--text-gulabi)]" />
                <h3 className="type-h3">Guided Stack Recommender</h3>
              </div>
              <button
                type="button"
                onClick={() => setGuidedOpen(false)}
                className="min-h-[44px] px-3 text-xs font-bold underline cursor-pointer"
              >
                Hide recommender
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-2">
                  <span className="block text-sm font-bold">
                    1. Main business focus right now?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: 'brand', label: 'Launch or refresh brand' },
                      { id: 'leads', label: 'Get more local leads' },
                      { id: 'ecommerce', label: 'Sell products online (D2C)' },
                      { id: 'software', label: 'Build custom app or CRM' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setMainGoal(opt.id as MainGoal)}
                        aria-pressed={mainGoal === opt.id}
                        className={`min-h-[44px] p-3 text-left text-xs md:text-sm font-bold brutal-border rounded-[8px] cursor-pointer transition-colors ${
                          mainGoal === opt.id
                            ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)]'
                            : 'bg-[var(--bg-cream)]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-sm font-bold">
                    2. Do you already have a live website?
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'yes', label: 'Yes — needs upgrade or growth' },
                      { id: 'no', label: 'No — starting fresh' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHasWebsite(opt.id as HasWebsite)}
                        aria-pressed={hasWebsite === opt.id}
                        className={`min-h-[44px] px-4 py-2.5 text-xs md:text-sm font-bold brutal-border rounded-[8px] cursor-pointer transition-colors ${
                          hasWebsite === opt.id
                            ? 'bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)]'
                            : 'bg-[var(--bg-cream)]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 brutal-border bg-[var(--color-indigo)] text-[#FFF7EC] rounded-[10px] p-5 space-y-4">
                <div>
                  <div className="type-label text-[var(--color-marigold)] mb-1">
                    Recommended Path
                  </div>
                  <h4 className="font-display text-xl font-bold">{recommendation.title}</h4>
                </div>
                <ul className="space-y-1.5 text-xs md:text-sm font-bold">
                  {recommendation.serviceNames.map((name) => (
                    <li key={name}>✓ {name}</li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed opacity-90">
                  {recommendation.explanation}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <BrutalButton
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      trackConversionEvent('solution_selected', {
                        source: 'guided_recommender',
                        label: `${mainGoal}_${hasWebsite}`,
                        serviceCount: recommendation.services.length,
                      });
                      openPlannerModal({
                        services: recommendation.services,
                        note: `Guided Finder: ${recommendation.title} (Existing site: ${hasWebsite}).`,
                      });
                    }}
                  >
                    <span>Build My Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </BrutalButton>
                  <Link
                    to={recommendation.suggestedRoute}
                    className="text-xs font-bold underline text-[var(--color-marigold)]"
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
