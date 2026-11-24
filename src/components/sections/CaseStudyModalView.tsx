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
      title={`${study.client} — Sample Case Blueprint`}
      accent={study.accent}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border-ink)]/15">
          <div>
            <p className="type-label text-[var(--text-terracotta)]">
              Sample Case · {study.badgeLabel}
            </p>
            <h3 className="type-h3">{study.client}</h3>
            <p className="type-small text-[var(--text-secondary)]">
              {study.industry} <span aria-hidden="true">·</span> {study.liveLinkLabel}
            </p>
          </div>
          <BrutalButton to="/plan-your-project" variant="primary" size="sm" onClick={onClose}>
            Build Similar System
          </BrutalButton>
        </div>

        {/* Before / After Numeric Outcomes */}
        <div>
          <h4 className="type-label text-[var(--text-cobalt)] mb-3">
            Target Outcome Benchmark (Before → After)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 brutal-border bg-[var(--bg-cream)] rounded-[8px]"
              >
                <div className="text-xs font-bold text-[var(--text-secondary)] mb-1">
                  {m.label}
                </div>
                <div className="font-mono-num text-xl font-bold text-[var(--text-cobalt)]">
                  {m.after}
                </div>
                <div className="font-mono-num text-xs text-[var(--text-secondary)]">
                  Baseline: {m.before}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-display font-bold text-base mb-2">The Challenge</h4>
            <p className="type-small text-[var(--text-secondary)]">{study.challenge}</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-base mb-2">What We Build</h4>
            <ul className="space-y-1.5 text-sm">
              {study.whatWeBuilt.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="font-bold text-[var(--text-gulabi)]" aria-hidden="true">
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <blockquote className="p-4 brutal-border bg-[var(--bg-sandstone)]/45 rounded-[8px]">
          <p className="text-sm md:text-base font-medium italic mb-2">{study.quote}</p>
          <footer className="text-xs font-bold text-[var(--text-secondary)]">
            — {study.quoteAuthor}
          </footer>
        </blockquote>
      </div>
    </BrutalModal>
  );
}
