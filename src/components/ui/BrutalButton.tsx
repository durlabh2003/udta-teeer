import React from 'react';
import { Link } from 'react-router-dom';
import { AccentTone } from '../../styles/design-tokens';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | AccentTone | 'ink';

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

/**
 * 3 Strict Button Variants (1.6):
 * - Primary Pink (`primary` / `hotPink` / `gulabi`)
 * - Secondary Outlined (`secondary` / legacy accent aliases)
 * - Tertiary Text Link (`tertiary`)
 * Enforces >= 44x44px tap targets and WCAG focus-visible states.
 */
export function BrutalButton({
  variant = 'secondary',
  size = 'md',
  to,
  href,
  target,
  rel,
  className = '',
  children,
  ...props
}: BrutalButtonProps) {
  const canonicalVariant: 'primary' | 'secondary' | 'tertiary' =
    variant === 'primary' || variant === 'hotPink' || variant === 'gulabi'
      ? 'primary'
      : variant === 'tertiary'
        ? 'tertiary'
        : 'secondary';

  const sizeClasses =
    canonicalVariant === 'tertiary'
      ? 'px-2 py-1.5 text-sm min-h-[44px]'
      : {
          sm: 'px-3.5 py-1.5 text-xs min-h-[44px] min-w-[44px]',
          md: 'px-4 py-2 text-sm min-h-[44px] min-w-[44px]',
          lg: 'px-5 py-2.5 text-base min-h-[44px] min-w-[44px]',
        }[size];

  const variantClasses = {
    primary:
      'bg-[var(--color-gulabi)] text-[var(--text-on-gulabi)] brutal-border brutal-shadow-sm brutal-press rounded-[8px] hover:brightness-105',
    secondary:
      variant === 'marigold'
        ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)] brutal-border brutal-shadow-sm brutal-press rounded-[8px] hover:brightness-105'
        : 'bg-[var(--bg-surface)] text-[var(--text-primary)] brutal-border brutal-shadow-sm brutal-press rounded-[8px] hover:bg-[var(--bg-sandstone)]',
    tertiary:
      'bg-transparent text-[var(--text-primary)] underline decoration-2 underline-offset-4 hover:text-[var(--text-gulabi)] rounded-[6px]',
  }[canonicalVariant];

  const baseClasses = `inline-flex items-center justify-center gap-2 font-display font-bold tracking-tight text-center sm:whitespace-nowrap shrink-0 cursor-pointer select-none transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none max-w-full ${sizeClasses} ${variantClasses} ${className}`;

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
