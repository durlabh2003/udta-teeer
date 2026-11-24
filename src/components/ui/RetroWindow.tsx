import React from 'react';
import { X } from 'lucide-react';

interface RetroWindowProps {
  title: string;
  accent?: 'marigold' | 'gulabi' | 'peacock' | 'cobalt' | 'indigo';
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * Jaipur Jharokha Modal / Panel Shell:
 * Features an arched Pink City top bar, cusped motif dot, title, and single real >=44px close button.
 */
export function RetroWindow({
  title,
  accent = 'marigold',
  onClose,
  className = '',
  children,
}: RetroWindowProps) {
  const headerTone = {
    marigold: 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)]',
    gulabi: 'bg-[var(--color-gulabi)] text-[var(--text-on-gulabi)]',
    peacock: 'bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)]',
    cobalt: 'bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)]',
    indigo: 'bg-[var(--color-indigo)] text-[#FFF7EC]',
  }[accent];

  return (
    <div
      className={`brutal-border brutal-shadow-lg rounded-t-[20px] rounded-b-[10px] overflow-hidden bg-[var(--bg-surface)] text-[var(--text-primary)] ${className}`}
    >
      <div
        className={`flex items-center justify-between gap-4 px-4 py-2.5 border-b-2 border-[var(--border-ink)] ${headerTone}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Jharokha lotus motif emblem */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
            aria-hidden="true"
          >
            <path
              d="M12 3C16 7 18 11 12 20C6 11 8 7 12 3Z"
              fill="currentColor"
              fillOpacity="0.25"
              stroke="currentColor"
              strokeWidth="2.2"
            />
          </svg>
          <span className="font-mono-num text-xs md:text-sm font-bold truncate">
            {title}
          </span>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-11 h-11 -my-1.5 -mr-1.5 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[var(--color-terracotta)] hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)]"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}
