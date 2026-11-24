import React from 'react';
import { ACCENT_SURFACE_MAP, AccentTone } from '../../styles/design-tokens';

interface BrutalCardProps {
  tone?: AccentTone | 'surface';
  tilt?: 'none' | 'left' | 'right';
  arch?: 'none' | 'jharokha' | 'scalloped';
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function BrutalCard({
  tone = 'surface',
  tilt = 'none',
  arch = 'none',
  interactive = false,
  className = '',
  children,
}: BrutalCardProps) {
  const toneClasses =
    tone === 'surface'
      ? 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
      : `${ACCENT_SURFACE_MAP[tone].bg} ${ACCENT_SURFACE_MAP[tone].text} ${ACCENT_SURFACE_MAP[tone].darkBg} ${ACCENT_SURFACE_MAP[tone].darkText}`;

  const tiltClasses =
    tilt === 'left'
      ? 'md:-rotate-[0.75deg] hover:rotate-0 transition-transform duration-200 transform-gpu'
      : tilt === 'right'
        ? 'md:rotate-[0.75deg] hover:rotate-0 transition-transform duration-200 transform-gpu'
        : '';

  const archClasses =
    arch === 'jharokha'
      ? 'rounded-t-[20px] rounded-b-[8px]'
      : arch === 'scalloped'
        ? 'rounded-t-[16px] rounded-b-[8px]'
        : 'rounded-[8px]';

  const interactiveClasses = interactive ? 'brutal-press' : '';

  return (
    <div
      className={`brutal-border brutal-shadow p-4 md:p-5 ${archClasses} ${toneClasses} ${tiltClasses} ${interactiveClasses} ${className}`}
    >
      {children}
    </div>
  );
}
