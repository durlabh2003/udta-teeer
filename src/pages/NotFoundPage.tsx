import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { LostKite404Illustration } from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

export function NotFoundPage() {
  const { t, openSearchModal } = useApp();

  return (
    <>
      <SEOHead
        title="404 — Patang Kat Gaya | Urdta Teeeeeer"
        description="Page not found on Urdta Teeeeeer."
        path="/404"
      />
      <div className="max-w-[720px] mx-auto px-4 py-10 md:py-14 text-center space-y-5">
        <BrutalCard tone="marigold" arch="jharokha" className="space-y-4 py-7 flex flex-col items-center">
          <div className="p-3 brutal-border bg-[var(--bg-surface)] rounded-[10px]">
            <LostKite404Illustration className="w-44 h-32" />
          </div>
          <p className="type-label text-[var(--text-terracotta)]">{t.notFound.code}</p>
          <h1 className="type-h2">{t.notFound.headline}</h1>
          <p className="type-body max-w-md mx-auto opacity-90">{t.notFound.subhead}</p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <BrutalButton to="/" variant="primary" size="lg">
              {t.notFound.cta}
            </BrutalButton>
            <BrutalButton variant="secondary" size="lg" onClick={openSearchModal}>
              <Search className="w-4 h-4" />
              <span>{t.nav.searchLabel}</span>
            </BrutalButton>
          </div>

          <nav
            aria-label="Recovery Navigation"
            className="pt-5 mt-2 w-full border-t-2 border-[var(--border-ink)]/20 flex flex-wrap items-center justify-center gap-4 text-sm font-bold"
          >
            <Link to="/services" className="min-h-[44px] inline-flex items-center underline">
              {t.nav.services}
            </Link>
            <Link to="/work" className="min-h-[44px] inline-flex items-center underline">
              {t.nav.workDual}
            </Link>
            <Link to="/packages" className="min-h-[44px] inline-flex items-center underline">
              {t.nav.packages}
            </Link>
            <Link to="/industries" className="min-h-[44px] inline-flex items-center underline">
              {t.nav.industries}
            </Link>
            <Link to="/contact" className="min-h-[44px] inline-flex items-center underline">
              {t.nav.contact}
            </Link>
          </nav>
        </BrutalCard>
      </div>
    </>
  );
}
