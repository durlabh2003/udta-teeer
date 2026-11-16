import React, { useState } from 'react';
import { ArrowUpRight, ImageIcon } from 'lucide-react';
import { BrutalButton } from './BrutalButton';
import { BrutalCard } from './BrutalCard';

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudyItem {
  id: string;
  isPlaceholder: boolean;
  placeholderTag: string;
  client: string;
  industry: string;
  image: string;
  imageAlt: string;
  accent: 'marigold' | 'gulabi' | 'peacock';
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
    <BrutalCard className="flex flex-col justify-between h-full p-0 overflow-hidden">
      <div>
        {/* Illustrated thumbnail with resilient fallback */}
        <div className="relative aspect-[4/3] w-full border-b-[3px] border-[#111111] dark:border-[#FFF4E0] bg-[#FFF4E0] overflow-hidden">
          {!imgError ? (
            <img
              src={study.image}
              alt={study.imageAlt}
              width={1200}
              height={896}
              decoding="async"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4A6B8] text-[#111111]">
              <ImageIcon className="w-10 h-10 mb-2" />
              <span className="font-display font-bold text-sm">{study.client}</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-xs font-mono-num font-bold text-[#D9482B] dark:text-[#FFC21A] mb-1.5">
            {study.placeholderTag}
          </p>
          <p className="text-xs text-[#3A3532] dark:text-[#E6D8C5] mb-1">
            {study.industry} <span aria-hidden="true">·</span> Verified Template Slot
          </p>
          <Heading className="text-xl font-extrabold tracking-tight mb-3">{study.client}</Heading>

          {/* Prominent Metrics Engine Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 brutal-border bg-[#FFF4E0] dark:bg-[#14163D] rounded-[4px] mb-4">
            {study.metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <div className="text-[11px] font-medium text-[#3A3532] dark:text-[#E6D8C5] truncate">
                  {m.label}
                </div>
                <div className="font-mono-num text-xs font-bold text-[#111111] dark:text-[#FFC21A] truncate">
                  {m.after}
                </div>
                <div className="font-mono-num text-[10px] text-[#3A3532] dark:text-[#E6D8C5]/80 truncate">
                  {m.before}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#3A3532] dark:text-[#E6D8C5] leading-relaxed mb-5">
            {study.challenge}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <BrutalButton
          variant={study.accent}
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
