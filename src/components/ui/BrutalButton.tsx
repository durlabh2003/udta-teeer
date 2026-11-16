import React from 'react';
import { Link } from 'react-router-dom';
import { ACCENT_SURFACE_MAP, AccentTone } from '../../styles/design-tokens';

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AccentTone | 'ink';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export function BrutalButton({
  variant = 'marigold',
  size = 'md',
  to,
  href,
  target,
  rel,
  className = '',
  children,
  ...props
}: BrutalButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  }[size];

  const toneClasses =
    variant === 'ink'
      ? 'bg-[#111111] text-[#FFF4E0] dark:bg-[#FFF4E0] dark:text-[#111111]'
      : `${ACCENT_SURFACE_MAP[variant].bg} ${ACCENT_SURFACE_MAP[variant].text} ${ACCENT_SURFACE_MAP[variant].darkBg} ${ACCENT_SURFACE_MAP[variant].darkText}`;

  const baseClasses = `inline-flex items-center justify-center gap-2 font-display font-bold tracking-tight brutal-border brutal-shadow-sm brutal-press rounded-[6px] whitespace-nowrap shrink-0 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${toneClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={baseClasses} {...props}>
      {children}
    </button>
  );
}
