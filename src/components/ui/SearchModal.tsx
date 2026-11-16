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
import { BrutalButton } from './BrutalButton';

interface SearchResultItem {
  title: string;
  subtitle: string;
  to: string;
  category: 'Services' | 'Work & Case Studies' | 'Industries' | 'Insights';
}

export function SearchModal() {
  const { searchModalOpen, closeSearchModal, openPlannerModal } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!searchModalOpen) return;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearchModal();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [searchModalOpen, closeSearchModal]);

  const searchableIndex = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [
      {
        title: 'The Creative Haveli — Design Pillar',
        subtitle: 'Branding, Logo Systems, UI/UX, Packaging & Motion Graphics',
        to: '/services/design',
        category: 'Services',
      },
      {
        title: 'The Digital Karkhana — Development Pillar',
        subtitle: 'Websites, E-Commerce, SaaS MVPs, Mobile Apps & Automation',
        to: '/services/development',
        category: 'Services',
      },
      {
        title: 'The Growth Bazaar — Marketing Pillar',
        subtitle: 'SEO, Answer Engine Optimization (AEO), Meta & Google Performance Ads',
        to: '/services/marketing',
        category: 'Services',
      },
      {
        title: 'Packages & Transparent Pricing Guide',
        subtitle: 'Layer A Starter (from ₹2,999) · Growth (₹40k–₹1L+) · Custom Scopes',
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
        subtitle: `${cs.industry} — ${cs.placeholderTag}`,
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

  const groupedResults = useMemo(() => {
    const matches =
      trimmed.length === 0
        ? searchableIndex.filter((_, idx) => idx < 8)
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Urdta Teeeeeer services, work, industries, and insights"
      className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-12 md:pt-20 bg-[#111111]/75"
      onClick={closeSearchModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl brutal-border brutal-shadow-lg bg-[#FFF9F0] dark:bg-[#212E46] text-[#111111] dark:text-[#FFF9F0] rounded-[6px] overflow-hidden"
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#FFC21A] text-[#111111]">
          <Search className="w-5 h-5 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, pricing, Jaipur industries, Tapinfi, SEO..."
            aria-label="Search site content"
            className="w-full bg-transparent text-sm md:text-base font-bold placeholder:text-[#111111]/65 focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearchModal}
            aria-label="Close search"
            className="w-8 h-8 brutal-border bg-[#FFF9F0] text-[#111111] rounded-[4px] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grouped Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 md:p-6 space-y-5">
          {groupedResults.total === 0 ? (
            <div className="p-6 text-center space-y-4">
              <p className="font-bold text-base">
                No direct match found for &ldquo;{query}&rdquo;.
              </p>
              <p className="text-xs md:text-sm text-[#4B433C] dark:text-[#E7D8C5]">
                Jump directly to one of our main pathways or tell us what you need in the planner:
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                <BrutalButton to="/services" variant="cream" size="sm" onClick={closeSearchModal}>
                  Explore Services
                </BrutalButton>
                <BrutalButton to="/packages" variant="marigold" size="sm" onClick={closeSearchModal}>
                  View Pricing
                </BrutalButton>
                <BrutalButton to="/work" variant="cream" size="sm" onClick={closeSearchModal}>
                  View Work
                </BrutalButton>
                <BrutalButton
                  variant="hotPink"
                  size="sm"
                  onClick={() => {
                    closeSearchModal();
                    openPlannerModal();
                  }}
                >
                  Plan Your Project
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
                  <div className="font-mono-num text-[11px] font-bold uppercase tracking-wider text-[#B95E50] dark:text-[#FFC21A]">
                    {cat} ({list.length})
                  </div>
                  <div className="space-y-2">
                    {list.slice(0, 5).map((item) => (
                      <Link
                        key={`${cat}-${item.to}-${item.title}`}
                        to={item.to}
                        onClick={closeSearchModal}
                        className="flex items-center justify-between gap-3 p-3 brutal-border bg-[#FFFFFF] dark:bg-[#182235] rounded-[4px] hover:bg-[#FFC21A] hover:text-[#111111] transition-colors group"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold truncate">{item.title}</div>
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

        <div className="px-4 py-2.5 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/15 bg-[#F3E5CE] dark:bg-[#182235] flex items-center justify-between text-[11px] font-mono-num">
          <span>Tip: Press &quot;/&quot; anywhere to search · Esc to close</span>
          <Link to="/contact" onClick={closeSearchModal} className="underline font-bold">
            Need help? Contact Jaipur Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
