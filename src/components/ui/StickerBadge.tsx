import React from 'react';

interface StickerBadgeProps {
  label: string;
  variant?: 'starburst' | 'diecut';
  tone?: 'hotPink' | 'marigold' | 'peacock';
  className?: string;
}

/**
 * Hand-drawn die-cut sticker or Y2K Starburst ("Sabse Popular") accent.
 * Reserved strictly for flagship highlights (<10% UI budget).
 */
export function StickerBadge({
  label,
  variant = 'diecut',
  tone = 'hotPink',
  className = '',
}: StickerBadgeProps) {
  const fillHex = {
    hotPink: '#FF4F8B',
    marigold: '#FFC21A',
    peacock: '#1FB5B0',
  }[tone];

  if (variant === 'starburst') {
    return (
      <div
        className={`relative inline-flex items-center justify-center w-24 h-24 select-none rotate-6 ${className}`}
        aria-label={label}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[3px_3px_0_#111111]"
          aria-hidden="true"
        >
          <polygon
            points="60,4 73,24 96,13 94,37 117,45 101,64 115,85 91,89 92,113 70,103 55,118 44,98 21,106 25,82 4,71 21,54 8,33 32,31 35,8 54,21"
            fill={fillHex}
            stroke="#111111"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-center px-3 font-hand text-xs leading-tight text-[#111111] -rotate-6">
          {label}
        </span>
      </div>
    );
  }

  return (
    <span
      className={`inline-block font-hand text-sm px-3 py-1 border-[3px] border-[#111111] shadow-[3px_3px_0_#111111] -rotate-2 text-[#111111] select-none ${className}`}
      style={{ backgroundColor: fillHex }}
    >
      {label}
    </span>
  );
}
