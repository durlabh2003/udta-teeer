import React from 'react';

interface StickerBadgeProps {
  label: string;
  variant?: 'starburst' | 'diecut';
  tone?: 'hotPink' | 'marigold' | 'peacock' | 'cobalt' | 'gulabi';
  className?: string;
}

/**
 * Jaipur die-cut stamp & Starburst ("Sabse Popular") highlight.
 * Uses semantic CSS variables for Dark & Light contrast safety.
 */
export function StickerBadge({
  label,
  variant = 'diecut',
  tone = 'hotPink',
  className = '',
}: StickerBadgeProps) {
  const resolvedTone =
    tone === 'peacock' ? 'cobalt' : tone === 'hotPink' ? 'gulabi' : tone;

  const toneVars = {
    gulabi: {
      bg: 'var(--color-gulabi)',
      text: 'var(--text-on-gulabi)',
    },
    marigold: {
      bg: 'var(--color-marigold)',
      text: 'var(--text-on-marigold)',
    },
    cobalt: {
      bg: 'var(--color-cobalt)',
      text: 'var(--text-on-cobalt)',
    },
  }[resolvedTone];

  if (variant === 'starburst') {
    return (
      <div
        className={`relative inline-flex items-center justify-center w-16 h-16 select-none rotate-3 pointer-events-none ${className}`}
        aria-label={label}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[2px_2px_0_var(--border-ink)]"
          aria-hidden="true"
        >
          <polygon
            points="60,4 73,24 96,13 94,37 117,45 101,64 115,85 91,89 92,113 70,103 55,118 44,98 21,106 25,82 4,71 21,54 8,33 32,31 35,8 54,21"
            fill={toneVars.bg}
            stroke="var(--border-ink)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-center px-2.5 font-mono-num font-bold text-[8.5px] leading-[1.08] uppercase tracking-tight -rotate-3"
          style={{ color: toneVars.text }}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <span
      className={`inline-block font-mono-num text-[11px] font-bold uppercase tracking-wider px-3 py-1 brutal-border brutal-shadow-sm rounded-[4px] select-none ${className}`}
      style={{ backgroundColor: toneVars.bg, color: toneVars.text }}
    >
      {label}
    </span>
  );
}
