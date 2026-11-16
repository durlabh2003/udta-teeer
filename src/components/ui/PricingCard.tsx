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
  onCtaClick,
}: PricingCardProps) {
  return (
    <div className="relative h-full pt-3">
      {isPopular && (
        <div className="absolute -top-5 -right-2 z-10">
          <StickerBadge label="Sabse Popular!" variant="starburst" tone="hotPink" />
        </div>
      )}
      <BrutalCard tone={accent} className="flex flex-col justify-between h-full">
        <div>
          <p className="text-xs font-bold tracking-tight opacity-85 mb-1.5">
            {billingModel} <span aria-hidden="true">·</span> {timeline}
          </p>
          <h3 className="text-2xl font-extrabold tracking-tight mb-2 pr-12">{title}</h3>
          <div className="font-mono-num text-2xl md:text-3xl font-extrabold mb-3">{price}</div>
          <p className="text-sm leading-relaxed mb-5 opacity-90">{description}</p>

          <ul className="space-y-2 text-sm mb-6">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="font-bold" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <BrutalButton
          variant={accent === 'marigold' ? 'ink' : 'marigold'}
          size="md"
          onClick={onCtaClick}
          className="w-full"
        >
          {ctaLabel}
        </BrutalButton>
      </BrutalCard>
    </div>
  );
}
