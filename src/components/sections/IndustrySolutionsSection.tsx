import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import industriesData from '../../data/industries.json';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { ServiceIllustration } from '../illustrations/JaipurIllustrations';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalCard } from '../ui/BrutalCard';

export function IndustrySolutionsSection() {
  const { openPlannerModal } = useApp();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {industriesData.industries.map((ind) => {
          const isOther = ind.slug === 'other';
          return (
            <BrutalCard
              key={ind.slug}
              tone={isOther ? 'marigold' : 'surface'}
              className="!p-3.5 flex flex-col justify-between h-full"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-8 brutal-border bg-[var(--bg-cream)] rounded-[6px] p-1 flex items-center justify-center shrink-0">
                    <ServiceIllustration
                      name={(ind as { illustrationKey?: string }).illustrationKey}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <p className="type-label opacity-70 text-right truncate">
                    {ind.jaipurEstablishment}
                  </p>
                </div>

                <h3 className="font-display font-bold text-sm md:text-base leading-snug">{ind.name}</h3>
                <p className="text-xs leading-snug opacity-85">{ind.tagline}</p>
              </div>

              {isOther ? (
                <BrutalButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    trackConversionEvent('industry_view', { industry: 'other' });
                    openPlannerModal();
                  }}
                  className="w-full mt-4"
                >
                  Scope Custom Model
                </BrutalButton>
              ) : (
                <Link
                  to={`/industries/${ind.slug}`}
                  aria-label={`View solutions for ${ind.name}`}
                  onClick={() => trackConversionEvent('industry_view', { industry: ind.slug })}
                  className="min-h-[44px] mt-3 pt-2 border-t border-[var(--border-ink)]/15 inline-flex items-center justify-between gap-2 text-xs font-bold hover:text-[var(--text-gulabi)]"
                >
                  <span>Explore Sector</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </Link>
              )}
            </BrutalCard>
          );
        })}
      </div>
      <p className="text-xs text-[var(--text-secondary)]">{industriesData.disclaimer}</p>
    </div>
  );
}
