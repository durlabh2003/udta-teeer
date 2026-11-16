import React from 'react';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalModal } from '../ui/BrutalModal';
import { CaseStudyItem } from '../ui/CaseStudyCard';

interface CaseStudyModalViewProps {
  study: CaseStudyItem | null;
  onClose: () => void;
}

export function CaseStudyModalView({ study, onClose }: CaseStudyModalViewProps) {
  if (!study) return null;

  return (
    <BrutalModal
      isOpen={Boolean(study)}
      onClose={onClose}
      title={`${study.client} — Case Study Record`}
      accent={study.accent}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b-2 border-[#111111]/20 dark:border-[#FFF4E0]/20">
          <div>
            <p className="text-xs font-mono-num font-bold text-[#D9482B] dark:text-[#FFC21A]">
              {study.placeholderTag}
            </p>
            <h3 className="text-2xl font-extrabold tracking-tight">{study.client}</h3>
            <p className="text-sm text-[#3A3532] dark:text-[#E6D8C5]">
              {study.industry} <span aria-hidden="true">·</span> {study.liveLinkLabel}
            </p>
          </div>
          <BrutalButton to="/build" variant="hotPink" size="sm" onClick={onClose}>
            Build Similar System
          </BrutalButton>
        </div>

        {/* Before / After Numeric Outcomes */}
        <div>
          <h4 className="font-display font-extrabold text-sm uppercase tracking-wider mb-3">
            Measured Outcomes (Before → After)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 brutal-border bg-[#FFF4E0] dark:bg-[#14163D] rounded-[6px]"
              >
                <div className="text-xs font-bold text-[#3A3532] dark:text-[#E6D8C5] mb-1">
                  {m.label}
                </div>
                <div className="font-mono-num text-xl font-extrabold text-[#111111] dark:text-[#FFC21A]">
                  {m.after}
                </div>
                <div className="font-mono-num text-xs text-[#3A3532] dark:text-[#E6D8C5]/80">
                  Was: {m.before}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-display font-extrabold text-base mb-2">The Challenge</h4>
            <p className="text-sm leading-relaxed text-[#3A3532] dark:text-[#E6D8C5]">
              {study.challenge}
            </p>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-base mb-2">What We Built</h4>
            <ul className="space-y-1.5 text-sm">
              {study.whatWeBuilt.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="font-bold text-[#D9482B] dark:text-[#FFC21A]" aria-hidden="true">
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <blockquote className="p-4 brutal-border bg-[#F4A6B8]/40 dark:bg-[#252968] rounded-[6px]">
          <p className="text-sm md:text-base font-medium italic mb-2">{study.quote}</p>
          <footer className="text-xs font-bold text-[#3A3532] dark:text-[#E6D8C5]">
            — {study.quoteAuthor}
          </footer>
        </blockquote>
      </div>
    </BrutalModal>
  );
}
