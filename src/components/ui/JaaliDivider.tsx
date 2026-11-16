import React from 'react';

/**
 * Jaipur Jaali lattice divider + hand-drawn wobbly underline SVG helpers
 */
export function JaaliDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden py-4 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 28"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-7 text-[#111111] dark:text-[#FFF4E0]"
      >
        <pattern id="jaali-pattern" x="0" y="0" width="40" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M20 2L34 14L20 26L6 14L20 2Z"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="20" cy="14" r="3" fill="#D9482B" />
          <line x1="0" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="2.5" />
          <line x1="34" y1="14" x2="40" y2="14" stroke="currentColor" strokeWidth="2.5" />
        </pattern>
        <rect width="1200" height="28" fill="url(#jaali-pattern)" />
      </svg>
    </div>
  );
}

export function WobblyUnderline({ color = '#FF4F8B' }: { color?: string }) {
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
