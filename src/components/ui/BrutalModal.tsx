import React, { useEffect } from 'react';
import { RetroWindow } from './RetroWindow';

interface BrutalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  accent?: 'marigold' | 'gulabi' | 'peacock' | 'indigo';
  children: React.ReactNode;
}

export function BrutalModal({
  isOpen,
  onClose,
  title,
  accent = 'marigold',
  children,
}: BrutalModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#111111]/75"
      onClick={onClose}
    >
      <div
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
