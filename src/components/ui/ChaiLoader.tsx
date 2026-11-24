import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

export function ChaiLoader() {
  const { t } = useApp();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !window.sessionStorage.getItem('ut_chai_ready');
  });
  const [progress, setProgress] = useState<number>(20);

  useEffect(() => {
    if (!visible) return;
    const t1 = window.setTimeout(() => setProgress(65), 240);
    const t2 = window.setTimeout(() => setProgress(100), 560);
    const t3 = window.setTimeout(() => {
      window.sessionStorage.setItem('ut_chai_ready', '1');
      setVisible(false);
    }, 850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[var(--bg-cream)] text-[var(--text-primary)] px-6 transition-opacity duration-200"
      role="status"
      aria-live="polite"
    >
      <div className="brutal-border brutal-shadow bg-[var(--color-marigold)] text-[var(--text-on-marigold)] px-8 py-6 rounded-[10px] text-center max-w-sm w-full">
        <div className="text-4xl mb-2" aria-hidden="true">
          ☕
        </div>
        <p className="font-display font-bold text-xl mb-3">{t.hero.loaderText}</p>
        <div className="w-full h-4 brutal-border bg-[var(--bg-surface)] rounded-[4px] overflow-hidden mb-2">
          <div
            className="h-full bg-[var(--color-gulabi)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between type-label">
          <span>Urdta Teeeeeer</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
