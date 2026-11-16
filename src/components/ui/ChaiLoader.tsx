import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Brief non-blocking Chai loader (~900ms on first visit, skipped if cached in sessionStorage).
 * Uses low-opacity dismissible overlay so hero DOM remains immediately crawlable & fast.
 */
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
    }, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#FFF4E0] dark:bg-[#14163D] px-6 transition-opacity duration-200"
      role="status"
      aria-live="polite"
    >
      <div className="brutal-border brutal-shadow bg-[#FFC21A] text-[#111111] px-8 py-6 rounded-[6px] text-center max-w-sm w-full">
        <div className="text-4xl mb-2" aria-hidden="true">
          ☕
        </div>
        <p className="font-display font-extrabold text-xl mb-3">{t.hero.loaderText}</p>
        <div className="w-full h-4 brutal-border bg-[#FFF4E0] rounded-[3px] overflow-hidden mb-2">
          <div
            className="h-full bg-[#FF4F8B] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs font-mono-num font-bold">
          <span>Urdta Teeeeeer</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
