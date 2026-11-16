import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import industriesData from '../../data/industries.json';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalCard } from '../ui/BrutalCard';

export function IndustrySolutionsSection() {
  const { openPlannerModal } = useApp();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {industriesData.industries.map((ind) => {
          const isOther = ind.slug === 'other';
          return (
            <BrutalCard
              key={ind.slug}
              tone={isOther ? 'marigold' : 'surface'}
              className="p-5 flex flex-col justify-between h-full"
            >
              <div>
                <p className="text-[11px] font-mono-num font-bold opacity-75 mb-1">
                  {ind.jaipurEstablishment}
                </p>
                <h3 className="text-lg font-extrabold tracking-tight mb-2">{ind.name}</h3>
                <p className="text-xs leading-relaxed opacity-90 mb-4">{ind.tagline}</p>
              </div>

              {isOther ? (
                <BrutalButton
                  variant="ink"
                  size="sm"
                  onClick={() => {
                    trackConversionEvent('industry_view', { industry: 'other' });
                    openPlannerModal();
                  }}
                  className="w-full"
                >
                  Tell Us What You Need
                </BrutalButton>
              ) : (
                <Link
                  to={`/industries/${ind.slug}`}
                  aria-label={`View digital solutions for ${ind.name}`}
                  onClick={() => trackConversionEvent('industry_view', { industry: ind.slug })}
                  className="inline-flex items-center justify-between gap-2 text-xs font-bold pt-3 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20 hover:text-[#B95E50] dark:hover:text-[#FFC21A]"
                >
                  <span>View Industry Solutions</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </Link>
              )}
            </BrutalCard>
          );
        })}
      </div>
      <p className="text-xs text-[#4B433C] dark:text-[#E7D8C5]">{industriesData.disclaimer}</p>
    </div>
  );
}
