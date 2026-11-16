import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { BrutalButton } from '../ui/BrutalButton';

export function Navbar() {
  const { lang, toggleLang, t, isDark, toggleDark, openPlannerModal } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/services', label: t.nav.services },
    { to: '/industries', label: 'Industries' },
    { to: '/work', label: t.nav.work },
    { to: '/process', label: t.nav.process },
    { to: '/insights', label: 'Insights' },
    { to: '/contact', label: t.nav.contact },
  ];

  const mobileExtras = [
    ...navItems,
    { to: '/packages', label: t.nav.packages },
    { to: '/about', label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#F3E5CE] dark:bg-[#182235]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single clean wordmark */}
        <Link
          to="/"
          className="font-poster text-lg md:text-xl tracking-tight text-[#111111] dark:text-[#FFF9F0] whitespace-nowrap shrink-0 hover:text-[#B95E50] dark:hover:text-[#FFC21A] transition-colors"
        >
          Urdta Teeeeeer
        </Link>

        {/* Zone 2: Clean single-line typography nav links */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(`${item.to}/`));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-bold whitespace-nowrap shrink-0 transition-colors underline-offset-4 ${
                  active
                    ? 'underline decoration-[3px] decoration-[#FF4F8B] text-[#111111] dark:text-[#FFC21A]'
                    : 'text-[#4B433C] dark:text-[#E7D8C5] hover:text-[#111111] dark:hover:text-[#FFF9F0] hover:underline'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Language toggle, Dark mode toggle, and Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={`Switch language to ${t.switchToLabel}`}
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] text-[#111111] dark:text-[#FFF9F0] rounded-[4px] whitespace-nowrap shrink-0 cursor-pointer hover:bg-[#E7B9A4] hover:text-[#111111] transition-colors"
          >
            {lang === 'hinglish' ? 'EN / HI' : 'HI / EN'}
          </button>

          <button
            type="button"
            onClick={toggleDark}
            aria-label={isDark ? 'Switch to Day Jaipur light mode' : 'Switch to Raat Ka Jaipur dark mode'}
            title={isDark ? 'Day Jaipur' : 'Raat Ka Jaipur'}
            className="w-10 h-10 brutal-border bg-[#FFF9F0] dark:bg-[#212E46] text-[#111111] dark:text-[#FFC21A] rounded-[4px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#FFC21A] hover:text-[#111111] transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 stroke-[2.5]" /> : <Moon className="w-4 h-4 stroke-[2.5]" />}
          </button>

          <div className="hidden sm:block">
            <BrutalButton
              variant="hotPink"
              size="sm"
              onClick={() => {
                trackConversionEvent('cta_click', { source: 'navbar', label: 'Plan Your Project' });
                openPlannerModal();
              }}
            >
              Plan Your Project
            </BrutalButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px] flex items-center justify-center shrink-0 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#F3E5CE] dark:bg-[#182235] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {mobileExtras.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={toggleLang}
              className="px-3 py-2 text-xs font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
            >
              Language: {t.langLabel}
            </button>
            <BrutalButton
              variant="hotPink"
              size="sm"
              onClick={() => {
                setMobileOpen(false);
                openPlannerModal();
              }}
            >
              Plan Your Project
            </BrutalButton>
          </div>
        </div>
      )}
    </header>
  );
}
