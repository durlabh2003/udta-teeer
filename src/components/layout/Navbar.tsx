import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { buildWhatsAppLink } from '../../lib/crmAdapter';
import { BrutalButton } from '../ui/BrutalButton';

const MEGA_COLUMNS = [
  {
    title: 'Design (Creative Haveli)',
    pillarTo: '/services/design',
    accent: 'text-[#B95E50] dark:text-[#FF4F8B]',
    items: [
      { label: 'Brand Identity & Systems', to: '/branding-agency-jaipur' },
      { label: 'Logo Design & Visual Kits', to: '/branding-agency-jaipur' },
      { label: 'UI/UX & Design Systems', to: '/ui-ux-design-jaipur' },
      { label: 'Website & Storefront UX', to: '/ui-ux-design-jaipur' },
      { label: 'Graphic & Packaging Design', to: '/services/design' },
      { label: 'Motion Graphics & Pitch Decks', to: '/social-media-marketing-jaipur' },
    ],
  },
  {
    title: 'Development (Digital Karkhana)',
    pillarTo: '/services/development',
    accent: 'text-[#117A76] dark:text-[#1FB5B0]',
    items: [
      { label: 'Business Websites', to: '/website-development-jaipur' },
      { label: 'High-Converting Landing Pages', to: '/website-development-jaipur' },
      { label: 'E-Commerce (Shopify / Woo)', to: '/ecommerce-development-jaipur' },
      { label: 'Web Apps & SaaS MVPs', to: '/saas-development' },
      { label: 'Mobile Apps (iOS & Android)', to: '/mobile-app-development-jaipur' },
      { label: 'Custom Dashboards & Portals', to: '/saas-development' },
      { label: 'CRM, APIs & AI Automation', to: '/automation-ai-jaipur' },
    ],
  },
  {
    title: 'Marketing (Growth Bazaar)',
    pillarTo: '/services/marketing',
    accent: 'text-[#9A6A00] dark:text-[#FFC21A]',
    items: [
      { label: 'Technical & Local SEO', to: '/seo-services-jaipur' },
      { label: 'AEO / AI Search Optimization', to: '/seo-services-jaipur' },
      { label: 'Google Search & Shopping Ads', to: '/performance-marketing-jaipur' },
      { label: 'Meta Ads & Creative Testing', to: '/performance-marketing-jaipur' },
      { label: 'Social Media Creative Systems', to: '/social-media-marketing-jaipur' },
      { label: 'Full-Funnel Digital Marketing', to: '/digital-marketing-jaipur' },
    ],
  },
];

export function Navbar() {
  const {
    lang,
    toggleLang,
    t,
    isDark,
    toggleDark,
    openPlannerModal,
    openSearchModal,
  } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>('Design');
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { to: '/industries', label: 'Industries' },
    { to: '/work', label: t.nav.work },
    { to: '/packages', label: t.nav.packages },
    { to: '/process', label: t.nav.process },
    { to: '/insights', label: 'Insights' },
    { to: '/contact', label: t.nav.contact },
  ];

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  // Body scroll lock for full-screen mobile overlay & Escape handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const servicesActive =
    location.pathname === '/services' || location.pathname.startsWith('/services/');

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#F3E5CE] dark:bg-[#182235]"
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3 lg:gap-6">
        {/* Zone 1: Single clean wordmark */}
        <Link
          to="/"
          className="font-poster text-lg md:text-xl tracking-tight text-[#111111] dark:text-[#FFF9F0] whitespace-nowrap shrink-0 hover:text-[#B95E50] dark:hover:text-[#FFC21A] transition-colors"
        >
          Urdta Teeeeeer
        </Link>

        {/* Zone 2: Clean single-line typography nav links + Services Mega-Menu trigger */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-5">
          <div
            className="relative flex items-center gap-1"
            onMouseEnter={() => {
              setMegaOpen(true);
              trackConversionEvent('service_menu_open', { source: 'navbar_hover' });
            }}
          >
            <Link
              to="/services"
              className={`text-sm font-bold whitespace-nowrap shrink-0 transition-colors underline-offset-4 ${
                servicesActive || megaOpen
                  ? 'underline decoration-[3px] decoration-[#FF4F8B] text-[#111111] dark:text-[#FFC21A]'
                  : 'text-[#4B433C] dark:text-[#E7D8C5] hover:text-[#111111] dark:hover:text-[#FFF9F0] hover:underline'
              }`}
            >
              {t.nav.services}
            </Link>
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-label="Toggle Services Mega-Menu"
              onClick={() => {
                const next = !megaOpen;
                setMegaOpen(next);
                if (next) {
                  trackConversionEvent('service_menu_open', { source: 'navbar_click' });
                }
              }}
              className="p-0.5 rounded-[4px] text-[#4B433C] dark:text-[#E7D8C5] hover:text-[#111111] dark:hover:text-[#FFC21A] cursor-pointer"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {navItems.map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(`${item.to}/`));
            return (
              <Link
                key={item.to}
                to={item.to}
                onMouseEnter={() => setMegaOpen(false)}
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

        {/* Zone 3: Search, Language toggle, Dark mode toggle, and Primary CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={openSearchModal}
            aria-label="Search services, work, and insights (shortcut /)"
            title="Search (/)"
            className="w-10 h-10 brutal-border bg-[#FFF9F0] dark:bg-[#212E46] text-[#111111] dark:text-[#FFF9F0] rounded-[4px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#FFC21A] hover:text-[#111111] transition-colors"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={`Switch language to ${t.switchToLabel}`}
            className="hidden sm:inline-flex items-center px-2.5 py-2 text-xs font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] text-[#111111] dark:text-[#FFF9F0] rounded-[4px] whitespace-nowrap shrink-0 cursor-pointer hover:bg-[#E7B9A4] hover:text-[#111111] transition-colors"
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

      {/* Desktop 4-Column Services Mega-Menu */}
      {megaOpen && (
        <div
          role="region"
          aria-label="Services Mega Menu"
          className="hidden lg:block absolute left-0 right-0 top-16 z-50 border-b-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#FFF9F0] dark:bg-[#212E46] shadow-xl"
        >
          <div className="max-w-[1320px] mx-auto px-6 py-7 grid grid-cols-12 gap-6">
            {MEGA_COLUMNS.map((col) => (
              <div key={col.title} className="col-span-3 space-y-3">
                <Link
                  to={col.pillarTo}
                  onClick={() => setMegaOpen(false)}
                  className={`block text-xs font-mono-num font-extrabold uppercase tracking-wider hover:underline ${col.accent}`}
                >
                  {col.title} →
                </Link>
                <ul className="space-y-1.5 text-sm">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        onClick={() => setMegaOpen(false)}
                        className="block py-1 font-semibold text-[#282522] dark:text-[#FFF9F0] hover:text-[#B95E50] dark:hover:text-[#FFC21A] hover:translate-x-0.5 transition-all"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 4: Help Choosing + Featured Work + Explore All */}
            <div className="col-span-3 space-y-4 pl-4 border-l-2 border-[#111111]/15 dark:border-[#FFF9F0]/15">
              <div className="p-3.5 brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono-num font-extrabold uppercase">
                  Need Help Choosing?
                </div>
                <p className="text-xs leading-snug">
                  Answer 2 quick questions or jump to our Interactive Solution Finder.
                </p>
                <Link
                  to="/#solution-finder"
                  onClick={() => setMegaOpen(false)}
                  className="inline-flex items-center gap-1 text-xs font-extrabold underline"
                >
                  <span>Not sure what you need?</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-3.5 brutal-border bg-[#F3E5CE] dark:bg-[#182235] rounded-[4px] space-y-1">
                <div className="text-[11px] font-mono-num font-bold uppercase text-[#B95E50] dark:text-[#FFC21A]">
                  Featured Work Candidate
                </div>
                <Link
                  to="/work/tapinfi"
                  onClick={() => setMegaOpen(false)}
                  className="block font-extrabold text-sm hover:underline"
                >
                  Tapinfi — NFC Digital Identity →
                </Link>
                <p className="text-[11px] opacity-80">
                  Mobile-first vCard experience + product presentation.
                </p>
              </div>

              <Link
                to="/services"
                onClick={() => setMegaOpen(false)}
                className="inline-flex items-center gap-1.5 text-sm font-extrabold underline hover:text-[#B95E50] dark:hover:text-[#FFC21A]"
              >
                <span>Explore All Services &amp; Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Accessible Mobile Navigation Overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-[#F3E5CE] dark:bg-[#182235] flex flex-col justify-between overflow-y-auto border-t-[3px] border-[#111111] dark:border-[#FFF9F0]"
        >
          <div className="p-4 space-y-6">
            {/* Group 1: WHAT WE DO (expandable) */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono-num font-extrabold uppercase tracking-wider text-[#B95E50] dark:text-[#FFC21A]">
                WHAT WE DO
              </div>
              <div className="space-y-2">
                {MEGA_COLUMNS.map((col) => {
                  const key = col.title.split(' ')[0];
                  const expanded = mobileGroupOpen === key;
                  return (
                    <div
                      key={col.title}
                      className="brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px] overflow-hidden"
                    >
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setMobileGroupOpen(expanded ? null : key)}
                        className="w-full px-3.5 py-2.5 flex items-center justify-between text-sm font-extrabold text-left cursor-pointer"
                      >
                        <span>{col.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {expanded && (
                        <div className="px-3.5 pb-3 pt-1 border-t border-[#111111]/15 dark:border-[#FFF9F0]/15 space-y-1.5">
                          <Link
                            to={col.pillarTo}
                            onClick={() => setMobileOpen(false)}
                            className="block text-xs font-extrabold underline text-[#B95E50] dark:text-[#FFC21A] py-1"
                          >
                            View {key} Pillar Overview →
                          </Link>
                          {col.items.map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              onClick={() => setMobileOpen(false)}
                              className="block text-xs font-semibold py-1"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link
                  to="/services"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3.5 py-2.5 text-sm font-extrabold brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px]"
                >
                  All Services Catalog →
                </Link>
              </div>
            </div>

            {/* Group 2: WHO WE HELP */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono-num font-extrabold uppercase tracking-wider text-[#B95E50] dark:text-[#FFC21A]">
                WHO WE HELP
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/industries"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
                >
                  10 Industries
                </Link>
                <Link
                  to="/work"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
                >
                  Work &amp; Cases
                </Link>
              </div>
            </div>

            {/* Group 3: EXPLORE */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono-num font-extrabold uppercase tracking-wider text-[#B95E50] dark:text-[#FFC21A]">
                EXPLORE
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/packages"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
                >
                  Pricing &amp; Packages
                </Link>
                <Link
                  to="/process"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
                >
                  6-Step Process
                </Link>
                <Link
                  to="/insights"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
                >
                  Insights Blog
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
                >
                  About Studio
                </Link>
              </div>
            </div>

            {/* Group 4: GET IN TOUCH */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono-num font-extrabold uppercase tracking-wider text-[#B95E50] dark:text-[#FFC21A]">
                GET IN TOUCH
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px]"
                >
                  Contact Jaipur Desk
                </Link>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 text-sm font-bold brutal-border bg-[#1FB5B0] text-[#111111] rounded-[4px] inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Overlay Bar */}
          <div className="sticky bottom-0 p-4 border-t-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#FFF9F0] dark:bg-[#212E46] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={toggleLang}
              className="px-3 py-2 text-xs font-bold brutal-border bg-[#F3E5CE] dark:bg-[#182235] rounded-[4px] cursor-pointer"
            >
              {t.langLabel}
            </button>
            <BrutalButton
              variant="hotPink"
              size="md"
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
