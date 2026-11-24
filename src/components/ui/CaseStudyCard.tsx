import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceIllustration } from '../illustrations/JaipurIllustrations';
import { BrutalButton } from './BrutalButton';
import { BrutalCard } from './BrutalCard';

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudyItem {
  id: string;
  isSample: boolean;
  badgeLabel: string;
  client: string;
  industry: string;
  illustrationKey?: string;
  image: string;
  imageAlt: string;
  accent: 'marigold' | 'gulabi' | 'peacock' | 'cobalt';
  challenge: string;
  whatWeBuilt: string[];
  metrics: CaseStudyMetric[];
  quote: string;
  quoteAuthor: string;
  liveLinkLabel: string;
}

interface CaseStudyCardProps {
  study: CaseStudyItem;
  buttonLabel: string;
  onInspect: (study: CaseStudyItem) => void;
  headingTag?: 'h3' | 'h4';
}

export function CaseStudyCard({
  study,
  buttonLabel,
  onInspect,
  headingTag = 'h3',
}: CaseStudyCardProps) {
  const [imgError, setImgError] = useState(false);
  const Heading = headingTag;

  return (
    <BrutalCard className="flex flex-col justify-between h-full !p-0 overflow-hidden">
      <div>
        <div className="relative aspect-[16/10] w-full border-b-2 border-[var(--border-ink)] bg-[var(--bg-cream)] overflow-hidden">
          {!imgError ? (
            <img
              src={study.image}
              alt={study.imageAlt}
              width={1200}
              height={896}
              decoding="async"
              referrerPolicy="no-referrer"
              loading="eager"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <ServiceIllustration
                name={study.illustrationKey || 'website'}
                alt={study.imageAlt}
                className="w-32 h-24"
              />
            </div>
          )}
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 type-label brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[4px]">
            Sample Case
          </span>
        </div>

        <div className="p-4 md:p-5">
          <p className="type-label text-[var(--text-terracotta)] mb-1">
            {study.industry} · {study.badgeLabel}
          </p>
          <Heading className="type-h3 mb-2.5">{study.client}</Heading>

          {/* Compact 3-Metric Engine */}
          <div className="grid grid-cols-3 gap-2 p-2.5 brutal-border bg-[var(--bg-cream)] rounded-[8px] mb-3">
            {study.metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <div className="text-[11px] font-medium text-[var(--text-secondary)] truncate">
                  {m.label}
                </div>
                <div className="font-mono-num text-xs font-bold text-[var(--text-cobalt)] truncate">
                  {m.after}
                </div>
                <div className="font-mono-num text-[10px] text-[var(--text-secondary)] opacity-75 truncate">
                  {m.before}
                </div>
              </div>
            ))}
          </div>

          <p className="type-small text-[var(--text-secondary)] leading-snug">
            {study.challenge}
          </p>
        </div>
      </div>

      <div className="px-4 md:px-5 pb-4 md:pb-5">
        <BrutalButton
          variant="secondary"
          size="sm"
          onClick={() => onInspect(study)}
          className="w-full"
        >
          <span>{buttonLabel}</span>
          <ArrowUpRight className="w-4 h-4" />
        </BrutalButton>
      </div>
    </BrutalCard>
  );
}
