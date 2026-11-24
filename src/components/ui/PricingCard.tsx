import React from 'react';
import { AccentTone } from '../../styles/design-tokens';
import { BrutalButton } from './BrutalButton';
import { BrutalCard } from './BrutalCard';
import { StickerBadge } from './StickerBadge';

interface PricingCardProps {
  title: string;
  price: string;
  billingModel: string;
  timeline: string;
  description: string;
  deliverables: string[];
  accent?: AccentTone;
  isPopular?: boolean;
  ctaLabel: string;
  subCtaCaption?: string;
  illustration?: React.ReactNode;
  onCtaClick: () => void;
}

export function PricingCard({
  title,
  price,
  billingModel,
  timeline,
  description,
  deliverables,
  accent = 'cream',
  isPopular = false,
  ctaLabel,
  subCtaCaption,
  illustration,
  onCtaClick,
}: PricingCardProps) {
  return (
    <div className="relative h-full pt-4 overflow-visible">
      {isPopular && (
        <div className="absolute -top-2 right-3 z-10 overflow-visible">
          <StickerBadge label="MOST POPULAR" variant="starburst" tone="gulabi" />
        </div>
      )}
      <BrutalCard
        tone={accent}
        arch="scalloped"
        className="flex flex-col justify-between h-full pt-5 overflow-visible"
      >
        <div>
          {illustration && (
            <div className="mb-3 p-2 brutal-border bg-[var(--bg-surface)] rounded-[8px] flex items-center justify-center">
              {illustration}
            </div>
          )}

          <p className={`type-label opacity-85 mb-1 ${isPopular ? 'pr-16' : ''}`}>
            {billingModel} <span aria-hidden="true">·</span> {timeline}
          </p>
          <h3 className={`type-h3 mb-1.5 ${isPopular ? 'pr-16' : ''}`}>{title}</h3>
          <div
            data-testid="tier-price"
            className={`font-mono-num text-xl md:text-2xl font-bold mb-2 ${isPopular ? 'pr-16' : ''}`}
          >
            {price}
          </div>
          <p className="type-small leading-snug mb-3.5 opacity-90">{description}</p>

          <ul className="space-y-1.5 text-sm mb-4">
            {deliverables.map((item) => {
              const isColoredSurface =
                accent === 'marigold' || accent === 'gulabi' || accent === 'cobalt' || accent === 'indigo';
              return (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className={`font-bold ${isColoredSurface ? 'text-current' : 'text-[var(--text-gulabi)]'}`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-1.5">
          <BrutalButton
            variant={isPopular ? 'primary' : 'secondary'}
            size="md"
            onClick={onCtaClick}
            className="w-full"
          >
            {ctaLabel}
          </BrutalButton>
          {subCtaCaption && (
            <p className="text-center font-mono-num text-[11px] opacity-75">
              {subCtaCaption}
            </p>
          )}
        </div>
      </BrutalCard>
    </div>
  );
}
