import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronDown,
  Compass,
  FileText,
  Layers,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Search,
  Sparkles,
  Sun,
  Tag,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { buildWhatsAppLink } from '../../lib/crmAdapter';
import { useFocusTrap } from '../../lib/focusTrap';
import {
  PillarBazaarIllustration,
  PillarHaveliIllustration,
  PillarKarkhanaIllustration,
} from '../illustrations/JaipurIllustrations';
import { BrutalButton } from '../ui/BrutalButton';

const MEGA_COLUMNS = [
  {
    key: 'design',
    titleEn: 'Design (Haveli)',
    titleHi: 'Design · Rang Roop',
    pillarTo: '/services/design',
    accentClass: 'text-[var(--text-gulabi)]',
    Illustration: PillarHaveliIllustration,
    items: [
      { label: 'Brand Identity & Systems', to: '/branding-agency-jaipur' },
      { label: 'Logo Design & Signboards', to: '/branding-agency-jaipur' },
      { label: 'UI/UX & Design Systems', to: '/ui-ux-design-jaipur' },
      { label: 'Graphic & Packaging', to: '/services/design' },
      { label: 'Motion & Pitch Decks', to: '/social-media-marketing-jaipur' },
    ],
  },
  {
    key: 'development',
    titleEn: 'Development (Karkhana)',
    titleHi: 'Code · Banawat',
    pillarTo: '/services/development',
    accentClass: 'text-[var(--text-cobalt)]',
    Illustration: PillarKarkhanaIllustration,
    items: [
      { label: 'Business Websites', to: '/website-development-jaipur' },
      { label: 'E-Commerce (Shopify / Woo)', to: '/ecommerce-development-jaipur' },
      { label: 'Web Apps & SaaS MVPs', to: '/saas-development' },
      { label: 'Mobile Apps (iOS & Android)', to: '/mobile-app-development-jaipur' },
      { label: 'CRM, APIs & AI Automation', to: '/automation-ai-jaipur' },
    ],
  },
  {
    key: 'marketing',
    titleEn: 'Marketing (Bazaar)',
    titleHi: 'Growth · Hawa Banao',
    pillarTo: '/services/marketing',
    accentClass: 'text-[var(--text-terracotta)]',
    Illustration: PillarBazaarIllustration,
    items: [
      { label: 'Technical & Local SEO', to: '/seo-services-jaipur' },
      { label: 'AEO / AI Search Optimise', to: '/seo-services-jaipur' },
      { label: 'Google Search & Meta Ads', to: '/performance-marketing-jaipur' },
      { label: 'Social Media Systems', to: '/social-media-marketing-jaipur' },
      { label: 'Full-Funnel Growth', to: '/digital-marketing-jaipur' },
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
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>('design');
  const [activeHomeSection, setActiveHomeSection] = useState<string | null>(null);
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);
  const megaMenuRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { to: '/industries', label: t.nav.industries, sectionId: 'industries' },
    { to: '/work', label: t.nav.workDual, sectionId: 'work' },
    { to: '/packages', label: t.nav.packages, sectionId: 'packages' },
    { to: '/process', label: t.nav.process, sectionId: 'process' },
    { to: '/insights', label: t.nav.insights, sectionId: 'insights' },
    { to: '/contact', label: t.nav.contact, sectionId: 'plan-shot' },
  ];

  // Trap focus inside full-screen mobile drawer when open
  useFocusTrap(mobileDrawerRef, mobileOpen, () => setMobileOpen(false));

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  // Scroll-spy for HomePage section underlines
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveHomeSection(null);
      return;
    }

    const sectionIds = ['services', 'industries', 'work', 'process', 'packages', 'plan-shot'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHomeSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.05 }
    );

    for (const el of elements) observer.observe(el);

    const handleTopReset = () => {
      if (window.scrollY < 180) setActiveHomeSection(null);
    };
    window.addEventListener('scroll', handleTopReset, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleTopReset);
    };
  }, [location.pathname]);

  // Body scroll lock, outside click, & Escape handler
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
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMegaKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setMegaOpen(false);
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const links = Array.from(
        megaMenuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []
      );
      if (links.length === 0) return;
      const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
      e.preventDefault();
      const nextIdx =
        e.key === 'ArrowDown'
          ? (idx + 1) % links.length
          : (idx - 1 + links.length) % links.length;
      links[nextIdx]?.focus();
    }
  };

  const servicesActive =
    location.pathname === '/services' ||
    location.pathname.startsWith('/services/') ||
    (location.pathname === '/' && activeHomeSection === 'services');

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b-2 border-[var(--border-ink)] bg-[var(--bg-cream)] text-[var(--text-primary)] shadow-[0_2px_0_0_var(--shadow-color)]"
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-3">
        {/* Zone 1: Studio Wordmark */}
        <Link
          to="/"
          className="font-display font-bold text-lg md:text-xl tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 hover:text-[var(--text-gulabi)] transition-colors rounded-[4px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)]"
        >
          Urdta Teeeeeer
        </Link>

        {/* Zone 2: Clean Desktop Navigation (xl+ avoids 1024px overflow across EN/HI) */}
        <nav aria-label="Primary" className="hidden xl:flex items-center gap-3 2xl:gap-4">
          <div
            className="relative flex items-center gap-0.5"
            onMouseEnter={() => {
              setMegaOpen(true);
              trackConversionEvent('service_menu_open', { source: 'navbar_hover' });
            }}
          >
            <Link
              to="/services"
              className={`min-h-[44px] inline-flex items-center px-1 text-[13px] font-bold whitespace-nowrap shrink-0 transition-colors underline-offset-8 ${
                servicesActive || megaOpen
                  ? 'underline decoration-2 decoration-[var(--color-gulabi)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline'
              }`}
            >
              {t.nav.services}
            </Link>
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls="navbar-mega-menu"
              aria-label="Toggle Services Mega-Menu"
              onClick={() => {
                const next = !megaOpen;
                setMegaOpen(next);
                if (next) {
                  trackConversionEvent('service_menu_open', { source: 'navbar_click' });
                }
              }}
              className="w-11 h-11 inline-flex items-center justify-center rounded-[4px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)]"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {navItems.map((item) => {
            const routeMatch =
              location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(`${item.to}/`));
            const scrollMatch =
              location.pathname === '/' && activeHomeSection === item.sectionId;
            const active = routeMatch || scrollMatch;
            return (
              <Link
                key={item.to}
                to={item.to}
                onMouseEnter={() => setMegaOpen(false)}
                className={`min-h-[44px] inline-flex items-center px-1 text-[13px] font-bold whitespace-nowrap shrink-0 transition-colors underline-offset-8 rounded-[4px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)] ${
                  active
                    ? 'underline decoration-2 decoration-[var(--color-gulabi)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Search, Language, Dark Mode & Primary Pink CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={openSearchModal}
            aria-label={`${t.nav.searchLabel} (shortcut /)`}
            title={`${t.nav.searchLabel} (/)`}
            className="w-11 h-11 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)]"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={`Switch language to ${t.switchToLabel}`}
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 text-xs font-mono-num font-bold brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[8px] whitespace-nowrap shrink-0 cursor-pointer hover:bg-[var(--bg-sandstone)] transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)]"
          >
            {lang === 'hinglish' ? 'EN / HI' : 'HI / EN'}
          </button>

          <button
            type="button"
            onClick={toggleDark}
            aria-label={isDark ? 'Switch to Pink City light mode' : 'Switch to Raat Ka Jaipur dark mode'}
            title={isDark ? 'Day Jaipur' : 'Raat Ka Jaipur'}
            className="w-11 h-11 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)]"
          >
            {isDark ? <Sun className="w-4 h-4 stroke-[2.5]" /> : <Moon className="w-4 h-4 stroke-[2.5]" />}
          </button>

          <div className="hidden sm:block">
            <BrutalButton
              variant="primary"
              size="sm"
              onClick={() => {
                trackConversionEvent('cta_click', { source: 'navbar', label: t.nav.cta });
                openPlannerModal();
              }}
            >
              {t.nav.cta}
            </BrutalButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Toggle navigation menu"
            className="xl:hidden w-11 h-11 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-gulabi)]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Services Mega-Menu with Pillar Illustrations (overlay, zero layout shift) */}
      {megaOpen && (
        <div
          id="navbar-mega-menu"
          ref={megaMenuRef}
          role="region"
          aria-label="Services Mega Menu"
          onKeyDown={handleMegaKeyDown}
          className="hidden xl:block absolute left-0 right-0 top-14 z-50 border-b-2 border-[var(--border-ink)] bg-[var(--bg-surface)] shadow-xl"
        >
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-12 gap-5">
            {MEGA_COLUMNS.map((col) => {
              const IconIllus = col.Illustration;
              const colTitle = lang === 'hinglish' ? col.titleHi : col.titleEn;
              return (
                <div key={col.key} className="col-span-3 space-y-3">
                  <Link
                    to={col.pillarTo}
                    onClick={() => setMegaOpen(false)}
                    className="flex items-center gap-3 p-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] hover:bg-[var(--bg-sandstone)] transition-colors group"
                  >
                    <div className="w-14 h-11 shrink-0 overflow-hidden">
                      <IconIllus className="w-full h-full" alt="" />
                    </div>
                    <span className={`font-display font-bold text-sm group-hover:underline ${col.accentClass}`}>
                      {colTitle} →
                    </span>
                  </Link>
                  <ul className="space-y-1 text-sm">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          onClick={() => setMegaOpen(false)}
                          className="block py-1.5 px-2 rounded-[6px] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-sandstone)]/60 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {/* Column 4: Guided Help & Catalog */}
            <div className="col-span-3 space-y-4 pl-4 border-l-2 border-[var(--border-ink)]/15 flex flex-col justify-between">
              <div className="p-4 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[8px] space-y-2">
                <div className="type-label">{t.nav.needHelp}</div>
                <p className="text-xs leading-snug font-medium">{t.nav.needHelpDesc}</p>
                <Link
                  to="/#solution-finder"
                  onClick={() => setMegaOpen(false)}
                  className="inline-flex items-center gap-1 text-xs font-bold underline"
                >
                  <span>{t.nav.notSureLink}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-4 brutal-border bg-[var(--bg-cream)] rounded-[8px] space-y-1.5">
                <div className="type-label text-[var(--text-cobalt)]">Sample Blueprint</div>
                <Link
                  to="/work/tapinfi"
                  onClick={() => setMegaOpen(false)}
                  className="block font-bold text-sm hover:underline"
                >
                  Tapinfi — NFC Digital Card →
                </Link>
              </div>

              <Link
                to="/services"
                onClick={() => setMegaOpen(false)}
                className="inline-flex items-center gap-1.5 text-sm font-bold underline hover:text-[var(--text-gulabi)]"
              >
                <span>{t.nav.services} Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Full-Height Mobile Drawer with Focus Trap & Large Icon Rows */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="xl:hidden fixed inset-x-0 top-14 bottom-0 z-50 bg-[var(--bg-cream)] text-[var(--text-primary)] flex flex-col justify-between overflow-y-auto border-t-2 border-[var(--border-ink)]"
        >
          <div className="p-4 space-y-5">
            {/* Large Primary Icon Navigation Rows */}
            <div className="grid grid-cols-1 gap-2">
              {[
                { to: '/services', label: t.nav.services, Icon: Layers },
                { to: '/industries', label: t.nav.industries, Icon: Building2 },
                { to: '/work', label: t.nav.workDual, Icon: Briefcase },
                { to: '/packages', label: t.nav.packages, Icon: Tag },
                { to: '/process', label: t.nav.process, Icon: Compass },
                { to: '/insights', label: t.nav.insights, Icon: FileText },
                { to: '/about', label: t.nav.about, Icon: Sparkles },
                { to: '/contact', label: t.nav.contact, Icon: Phone },
              ].map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="min-h-[48px] px-4 py-3 brutal-border bg-[var(--bg-surface)] rounded-[8px] flex items-center justify-between font-display font-bold text-base hover:bg-[var(--bg-sandstone)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[var(--text-gulabi)] stroke-[2.2]" aria-hidden="true" />
                    <span>{label}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-70" aria-hidden="true" />
                </Link>
              ))}
            </div>

            {/* Expandable Service Pillars Accordion */}
            <div className="space-y-2">
              <div className="type-label text-[var(--text-cobalt)]">
                {t.nav.services}
              </div>
              {MEGA_COLUMNS.map((col) => {
                const expanded = mobileGroupOpen === col.key;
                const colTitle = lang === 'hinglish' ? col.titleHi : col.titleEn;
                return (
                  <div
                    key={col.key}
                    className="brutal-border bg-[var(--bg-surface)] rounded-[8px] overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setMobileGroupOpen(expanded ? null : col.key)}
                      className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-sm font-bold text-left cursor-pointer"
                    >
                      <span>{colTitle}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expanded && (
                      <div className="px-4 pb-3 pt-1 border-t border-[var(--border-ink)]/15 space-y-1">
                        {col.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className="block text-xs font-medium py-1.5 hover:underline"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-4 py-3 brutal-border bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] rounded-[8px] flex items-center justify-center gap-2 font-display font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Jaipur Desk</span>
            </a>
          </div>

          {/* Sticky Bottom Overlay Bar */}
          <div className="sticky bottom-0 p-3.5 border-t-[3px] border-[var(--border-ink)] bg-[var(--bg-surface)] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={toggleLang}
              className="min-h-[44px] px-3.5 py-2 text-xs font-mono-num font-bold brutal-border bg-[var(--bg-cream)] rounded-[8px] cursor-pointer"
            >
              {lang === 'hinglish' ? 'EN / HI' : 'HI / EN'}
            </button>
            <BrutalButton
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => {
                setMobileOpen(false);
                openPlannerModal();
              }}
            >
              {t.nav.cta}
            </BrutalButton>
          </div>
        </div>
      )}
    </header>
  );
}
