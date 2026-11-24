import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import caseStudiesData from '../../data/case-studies.json';
import industriesData from '../../data/industries.json';
import insightsData from '../../data/insights.json';
import portfolioData from '../../data/portfolio.json';
import servicesData from '../../data/services.json';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { useFocusTrap } from '../../lib/focusTrap';
import { EmptySearchIllustration } from '../illustrations/JaipurIllustrations';
import { BrutalButton } from './BrutalButton';

interface SearchResultItem {
  title: string;
  subtitle: string;
  to: string;
  category: 'Services' | 'Work & Case Studies' | 'Industries' | 'Insights';
}

const POPULAR_CHIPS = ['Websites', 'SEO Jaipur', 'E-Commerce', 'Tapinfi', 'Pricing'];

export function SearchModal() {
  const { searchModalOpen, closeSearchModal, openPlannerModal, t } = useApp();
  const [query, setQuery] = useState('');
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useFocusTrap(modalRef, searchModalOpen, closeSearchModal);

  useEffect(() => {
    if (!searchModalOpen) return;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [searchModalOpen]);

  const searchableIndex = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [
      {
        title: 'Design Haveli — Branding & UI/UX Pillar',
        subtitle: 'Brand Identity, Signboards, UI/UX, Packaging & Motion',
        to: '/services/design',
        category: 'Services',
      },
      {
        title: 'Digital Karkhana — Engineering Pillar',
        subtitle: 'Websites, E-Commerce, SaaS MVPs, Mobile Apps & Automation',
        to: '/services/development',
        category: 'Services',
      },
      {
        title: 'Growth Bazaar — Marketing Pillar',
        subtitle: 'Local SEO, AEO, Google Search & Meta Ads',
        to: '/services/marketing',
        category: 'Services',
      },
      {
        title: 'Packages & Transparent Pricing Guide',
        subtitle: 'Starter packs from ₹2,999 · Websites from ₹40,000 · Stores from ₹1,00,000',
        to: '/packages',
        category: 'Services',
      },
    ];

    for (const page of servicesData.seoLandingPages) {
      items.push({
        title: page.title,
        subtitle: `${page.priceRef} · ${page.definition}`,
        to: `/${page.slug}`,
        category: 'Services',
      });
    }

    for (const proj of portfolioData.projects) {
      items.push({
        title: proj.name,
        subtitle: `${proj.industry} — ${proj.shortDesc}`,
        to: `/work/${proj.slug}`,
        category: 'Work & Case Studies',
      });
    }

    for (const cs of caseStudiesData.caseStudies) {
      items.push({
        title: cs.client,
        subtitle: `${cs.industry} — ${cs.badgeLabel}`,
        to: `/work/${cs.id}`,
        category: 'Work & Case Studies',
      });
    }

    for (const ind of industriesData.industries) {
      items.push({
        title: ind.name,
        subtitle: `${ind.jaipurEstablishment} — ${ind.tagline}`,
        to: `/industries/${ind.slug}`,
        category: 'Industries',
      });
    }

    for (const art of insightsData.articles) {
      items.push({
        title: art.title,
        subtitle: `${art.category} · ${art.readingTime} — ${art.excerpt}`,
        to: `/insights/${art.slug}`,
        category: 'Insights',
      });
    }

    return items;
  }, []);

  const trimmed = query.trim().toLowerCase();

  useEffect(() => {
    if (trimmed.length >= 2) {
      trackConversionEvent('site_search', { label: trimmed });
    }
  }, [trimmed]);

  const handleChipClick = (chip: string) => {
    setQuery(chip);
    setRecentQueries((prev) => [chip, ...prev.filter((c) => c !== chip)].slice(0, 4));
    inputRef.current?.focus();
  };

  const handleResultSelect = () => {
    const clean = query.trim();
    if (clean.length >= 2) {
      setRecentQueries((prev) => [clean, ...prev.filter((c) => c !== clean)].slice(0, 4));
    }
    closeSearchModal();
  };

  const groupedResults = useMemo(() => {
    const matches =
      trimmed.length === 0
        ? searchableIndex.slice(0, 6)
        : searchableIndex.filter(
            (item) =>
              item.title.toLowerCase().includes(trimmed) ||
              item.subtitle.toLowerCase().includes(trimmed) ||
              item.category.toLowerCase().includes(trimmed)
          );

    const groups: Record<SearchResultItem['category'], SearchResultItem[]> = {
      Services: [],
      'Work & Case Studies': [],
      Industries: [],
      Insights: [],
    };
    for (const m of matches) {
      groups[m.category].push(m);
    }
    return { total: matches.length, groups };
  }, [searchableIndex, trimmed]);

  if (!searchModalOpen) return null;

  const chipsToRender = Array.from(new Set([...recentQueries, ...POPULAR_CHIPS])).slice(0, 6);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.modals.searchTitle}
      className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-12 md:pt-20 bg-[#111827]/75 backdrop-blur-[2px]"
      onClick={closeSearchModal}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl brutal-border brutal-shadow-lg bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-t-[20px] rounded-b-[10px] overflow-hidden"
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b-2 border-[var(--border-ink)] bg-[var(--color-marigold)] text-[var(--text-on-marigold)]">
          <Search className="w-5 h-5 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.modals.searchPlaceholder}
            aria-label={t.modals.searchTitle}
            className="w-full bg-transparent text-sm md:text-base font-bold placeholder:text-[#1B243B]/65 focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearchModal}
            aria-label="Close search"
            className="w-11 h-11 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[var(--bg-sandstone)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Popular & Recent Chips */}
        <div className="px-4 py-2.5 border-b border-[var(--border-ink)]/15 bg-[var(--bg-cream)] flex flex-wrap items-center gap-2">
          <span className="type-label opacity-75 mr-1">{t.modals.searchRecentLabel}:</span>
          {chipsToRender.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="px-2.5 py-1 text-xs font-bold brutal-border bg-[var(--bg-surface)] rounded-[6px] hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Grouped Results Body */}
        <div className="max-h-[58vh] overflow-y-auto p-4 md:p-6 space-y-5">
          {groupedResults.total === 0 ? (
            <div className="p-4 text-center flex flex-col items-center space-y-4">
              <EmptySearchIllustration className="w-32 h-24" alt={t.modals.searchEmpty} />
              <p className="font-bold text-base">
                {t.modals.searchEmpty} &ldquo;{query}&rdquo;.
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                <BrutalButton to="/services" variant="secondary" size="sm" onClick={closeSearchModal}>
                  {t.nav.services}
                </BrutalButton>
                <BrutalButton to="/packages" variant="secondary" size="sm" onClick={closeSearchModal}>
                  {t.nav.packages}
                </BrutalButton>
                <BrutalButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    closeSearchModal();
                    openPlannerModal();
                  }}
                >
                  {t.nav.cta}
                </BrutalButton>
              </div>
            </div>
          ) : (
            (Object.entries(groupedResults.groups) as Array<
              [SearchResultItem['category'], SearchResultItem[]]
            >).map(([cat, list]) => {
              if (list.length === 0) return null;
              return (
                <div key={cat} className="space-y-2">
                  <div className="type-label text-[var(--text-cobalt)]">
                    {cat} ({list.length})
                  </div>
                  <div className="space-y-2">
                    {list.slice(0, 5).map((item) => (
                      <Link
                        key={`${cat}-${item.to}-${item.title}`}
                        to={item.to}
                        onClick={handleResultSelect}
                        className="min-h-[48px] flex items-center justify-between gap-3 p-3 brutal-border bg-[var(--bg-cream)] rounded-[8px] hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors group"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-bold truncate">{item.title}</div>
                          <div className="text-xs opacity-80 truncate">{item.subtitle}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-[var(--border-ink)]/15 bg-[var(--bg-cream)] flex items-center justify-between text-[11px] font-mono-num">
          <span>{t.modals.searchTip}</span>
          <Link to="/contact" onClick={closeSearchModal} className="underline font-bold">
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
