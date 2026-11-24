import React from 'react';

/**
 * Jaipur Jaali lattice divider, hand-drawn wobbly underline, and Jaipur Skyline silhouette divider.
 * Uses CSS variables exclusively for seamless Light & Dark ("Raat Ka Jaipur") theming.
 */
export function JaaliDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden py-4 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 28"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-7 text-[var(--border-ink)]"
      >
        <pattern id="jaali-pattern" x="0" y="0" width="40" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M20 2L34 14L20 26L6 14L20 2Z"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="20" cy="14" r="3.2" fill="var(--color-terracotta)" />
          <line x1="0" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="2.5" />
          <line x1="34" y1="14" x2="40" y2="14" stroke="currentColor" strokeWidth="2.5" />
        </pattern>
        <rect width="1200" height="28" fill="url(#jaali-pattern)" />
      </svg>
    </div>
  );
}

/**
 * Jaipur Skyline Silhouette Divider:
 * Amer Fort battlements, Nahargarh ridge, Hawa Mahal honeycomb facade,
 * Jantar Mantar Samrat Yantra sundial, and Albert Hall dome.
 */
export function JaipurSkylineDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden pt-4 pb-1 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 72"
        fill="none"
        preserveAspectRatio="xMidYMax meet"
        className="w-full h-14 md:h-16 text-[var(--border-ink)]"
      >
        {/* Subtle skyline baseline */}
        <line x1="0" y1="68" x2="1200" y2="68" stroke="currentColor" strokeWidth="3" />

        {/* Amer Fort battlements (left) */}
        <path
          d="M20 68 V36 H46 V28 H58 V36 H76 V28 H88 V36 H112 V24 H134 V36 H162 V68 Z"
          fill="var(--bg-sandstone)"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <rect x="40" y="46" width="12" height="22" rx="6" fill="var(--color-terracotta)" stroke="currentColor" strokeWidth="2" />
        <rect x="86" y="46" width="12" height="22" rx="6" fill="var(--color-terracotta)" stroke="currentColor" strokeWidth="2" />

        {/* Nahargarh Ridge & Watchtower */}
        <path
          d="M195 68 L235 42 L290 42 L320 68 Z"
          fill="var(--color-cobalt)"
          fillOpacity="0.22"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <rect x="248" y="24" width="28" height="18" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2.5" />
        <path d="M244 24 L262 12 L280 24 Z" fill="var(--color-marigold)" stroke="currentColor" strokeWidth="2.5" />

        {/* Hawa Mahal Pyramid & Jharokhas (center-left) */}
        <path
          d="M420 68 V38 H448 V24 H478 V10 H522 V24 H552 V38 H580 V68 Z"
          fill="var(--color-gulabi)"
          fillOpacity="0.28"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path d="M490 10 Q500 2 510 10" stroke="currentColor" strokeWidth="2.5" fill="var(--color-marigold)" />
        <circle cx="465" cy="46" r="4" fill="var(--color-marigold)" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="500" cy="46" r="4" fill="var(--color-marigold)" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="535" cy="46" r="4" fill="var(--color-marigold)" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="484" cy="28" r="3.5" fill="var(--color-cobalt)" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="516" cy="28" r="3.5" fill="var(--color-cobalt)" stroke="currentColor" strokeWidth="1.8" />

        {/* Jantar Mantar Sundial (Samrat Yantra) */}
        <path
          d="M655 68 L735 16 V68 Z"
          fill="var(--color-marigold)"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path d="M685 68 Q715 44 735 44" stroke="currentColor" strokeWidth="2.5" fill="none" />

        {/* Albert Hall Museum Dome & Chhatris (center-right) */}
        <rect x="815" y="42" width="150" height="26" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2.5" />
        <path d="M862 42 C862 18 918 18 918 42 Z" fill="var(--color-terracotta)" stroke="currentColor" strokeWidth="2.5" />
        <line x1="890" y1="12" x2="890" y2="24" stroke="currentColor" strokeWidth="2.5" />
        <path d="M826 42 C826 28 846 28 846 42 Z" fill="var(--color-marigold)" stroke="currentColor" strokeWidth="2" />
        <path d="M934 42 C934 28 954 28 954 42 Z" fill="var(--color-marigold)" stroke="currentColor" strokeWidth="2" />

        {/* Johari Bazaar Arch & Kite */}
        <path
          d="M1040 68 V30 H1165 V68 Z"
          fill="var(--bg-sandstone)"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path d="M1070 68 V48 C1070 38 1094 38 1094 48 V68" fill="var(--color-cobalt)" stroke="currentColor" strokeWidth="2" />
        <path d="M1114 68 V48 C1114 38 1138 38 1138 48 V68" fill="var(--color-gulabi)" stroke="currentColor" strokeWidth="2" />

        {/* Tiny flying kite above Albert Hall */}
        <path d="M1006 16 L1018 8 L1026 20 L1014 28 Z" fill="var(--color-gulabi)" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function WobblyUnderline({ color = 'var(--color-gulabi)' }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 260 16"
      fill="none"
      className="w-full max-w-[260px] h-3.5 mt-1"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 10C45 3 92 14 134 7C176 0 218 12 257 6"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
