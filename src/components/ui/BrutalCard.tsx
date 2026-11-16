import React from 'react';
import { ACCENT_SURFACE_MAP, AccentTone } from '../../styles/design-tokens';

interface BrutalCardProps {
  tone?: AccentTone | 'surface';
  tilt?: 'none' | 'left' | 'right';
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function BrutalCard({
  tone = 'surface',
  tilt = 'none',
  interactive = false,
  className = '',
  children,
}: BrutalCardProps) {
  const toneClasses =
    tone === 'surface'
      ? 'bg-[#FFFFFF] text-[#111111] dark:bg-[#1D2052] dark:text-[#FFF4E0]'
      : `${ACCENT_SURFACE_MAP[tone].bg} ${ACCENT_SURFACE_MAP[tone].text} ${ACCENT_SURFACE_MAP[tone].darkBg} ${ACCENT_SURFACE_MAP[tone].darkText}`;

  const tiltClasses =
    tilt === 'left'
      ? 'md:-rotate-1 hover:rotate-0 transition-transform duration-200'
      : tilt === 'right'
        ? 'md:rotate-1 hover:rotate-0 transition-transform duration-200'
        : '';

  const interactiveClasses = interactive ? 'brutal-press' : '';

  return (
    <div
      className={`brutal-border brutal-shadow rounded-[6px] p-6 ${toneClasses} ${tiltClasses} ${interactiveClasses} ${className}`}
    >
      {children}
    </div>
  );
}
