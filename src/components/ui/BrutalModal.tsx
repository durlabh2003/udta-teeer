import React, { useEffect, useRef } from 'react';
import { useFocusTrap } from '../../lib/focusTrap';
import { RetroWindow } from './RetroWindow';

interface BrutalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  accent?: 'marigold' | 'gulabi' | 'peacock' | 'cobalt' | 'indigo';
  children: React.ReactNode;
}

export function BrutalModal({
  isOpen,
  onClose,
  title,
  accent = 'marigold',
  children,
}: BrutalModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(panelRef, isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#111827]/75 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <RetroWindow title={title} accent={accent} onClose={onClose}>
          {children}
        </RetroWindow>
      </div>
    </div>
  );
}
