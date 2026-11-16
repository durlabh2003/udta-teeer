import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

export function NotFoundPage() {
  const { t } = useApp();

  return (
    <>
      <SEOHead
        title="404 — Patang Kat Gaya | Urdta Teeeeeer"
        description="Page not found on Urdta Teeeeeer."
        path="/404"
      />
      <div className="max-w-[760px] mx-auto px-4 py-20 text-center">
        <BrutalCard tone="marigold" className="space-y-5 py-10">
          <div className="font-poster text-6xl text-[#111111]">{t.notFound.code}</div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {t.notFound.headline}
          </h1>
          <p className="text-base max-w-md mx-auto">{t.notFound.subhead}</p>
          <div className="pt-2">
            <BrutalButton to="/" variant="hotPink" size="lg">
              {t.notFound.cta}
            </BrutalButton>
          </div>
        </BrutalCard>
      </div>
    </>
  );
}
