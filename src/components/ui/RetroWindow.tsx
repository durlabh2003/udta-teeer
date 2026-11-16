import React from 'react';
import { Minus, Square, X } from 'lucide-react';

interface RetroWindowProps {
  title: string;
  accent?: 'marigold' | 'gulabi' | 'peacock' | 'indigo';
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * Layer 3 Y2K Accent Component (used strictly for Case Study modals & Project Brief Builder)
 */
export function RetroWindow({
  title,
  accent = 'marigold',
  onClose,
  className = '',
  children,
}: RetroWindowProps) {
  const headerTone = {
    marigold: 'bg-[#FFC21A] text-[#111111]',
    gulabi: 'bg-[#F4A6B8] text-[#111111]',
    peacock: 'bg-[#1FB5B0] text-[#111111]',
    indigo: 'bg-[#2B2F77] text-[#FFF4E0]',
  }[accent];

  return (
    <div
      className={`brutal-border brutal-shadow-lg rounded-[6px] overflow-hidden bg-[#FFFFFF] text-[#111111] dark:bg-[#1D2052] dark:text-[#FFF4E0] ${className}`}
    >
      <div
        className={`flex items-center justify-between gap-4 px-4 py-2.5 border-b-[3px] border-[#111111] dark:border-[#FFF4E0] ${headerTone}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-block w-3 h-3 border-2 border-[#111111] bg-[#FFF4E0]" aria-hidden="true" />
          <span className="font-mono-num text-xs md:text-sm font-bold truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            aria-hidden="true"
            className="w-6 h-6 border-2 border-[#111111] bg-[#FFF4E0] text-[#111111] flex items-center justify-center"
          >
            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
          <span
            aria-hidden="true"
            className="w-6 h-6 border-2 border-[#111111] bg-[#FFF4E0] text-[#111111] flex items-center justify-center"
          >
            <Square className="w-3 h-3 stroke-[2.5]" />
          </span>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close window"
              className="w-6 h-6 border-2 border-[#111111] bg-[#D9482B] text-[#FFF4E0] flex items-center justify-center cursor-pointer hover:brightness-110"
            >
              <X className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          ) : (
            <span
              aria-hidden="true"
              className="w-6 h-6 border-2 border-[#111111] bg-[#FFF4E0] text-[#111111] flex items-center justify-center"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          )}
        </div>
      </div>
      <div className="p-5 md:p-7">{children}</div>
    </div>
  );
}
