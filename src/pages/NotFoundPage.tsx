import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
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
      <div className="max-w-[760px] mx-auto px-4 py-16 md:py-20 text-center space-y-6">
        <BrutalCard tone="marigold" className="space-y-5 py-10">
          <div className="font-poster text-6xl text-[#111111]">{t.notFound.code}</div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {t.notFound.headline}
          </h1>
          <p className="text-base max-w-md mx-auto">{t.notFound.subhead}</p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <BrutalButton to="/" variant="hotPink" size="lg">
              {t.notFound.cta}
            </BrutalButton>
            <button
              type="button"
              onClick={openSearchModal}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-extrabold brutal-border bg-[#FFF9F0] text-[#111111] rounded-[4px] cursor-pointer hover:bg-[#1FB5B0] transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search Site</span>
            </button>
          </div>

          <nav
            aria-label="Recovery Navigation"
            className="pt-5 mt-4 border-t-2 border-[#111111]/20 flex flex-wrap items-center justify-center gap-4 text-sm font-bold"
          >
            <Link to="/services" className="underline hover:text-[#263650]">
              Services
            </Link>
            <Link to="/work" className="underline hover:text-[#263650]">
              Work &amp; Case Studies
            </Link>
            <Link to="/packages" className="underline hover:text-[#263650]">
              Pricing &amp; Packages
            </Link>
            <Link to="/industries" className="underline hover:text-[#263650]">
              Industries
            </Link>
            <Link to="/contact" className="underline hover:text-[#263650]">
              Contact Jaipur Desk
            </Link>
          </nav>
        </BrutalCard>
      </div>
    </>
  );
}
