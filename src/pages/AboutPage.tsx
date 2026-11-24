import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { PillarHaveliIllustration } from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { JaipurSkylineDivider } from '../components/ui/JaaliDivider';

export function AboutPage() {
  const { t, openPlannerModal } = useApp();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <>
      <SEOHead pageKey="about" path="/about" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="type-label text-[var(--text-terracotta)]">
              Khamma Ghani · Jaipur Studio
            </p>
            <h1 className="type-display">A flying arrow, aimed at the ordinary.</h1>
            <p className="type-body text-[var(--text-secondary)]">
              <strong>Urdta Teeeeeer</strong> brings brand craft, fast engineering, and measurable
              marketing under one Jaipur roof — metro rigour with Pink City warmth.
            </p>
            <p className="type-small text-[var(--text-secondary)]">{t.pillarsSection.nameStory}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="brutal-border brutal-shadow-lg rounded-[8px] overflow-hidden bg-[var(--color-gulabi-soft)]">
              {imgFailed ? (
                <div className="p-4 bg-[var(--bg-cream)] flex items-center justify-center">
                  <PillarHaveliIllustration className="w-full h-40" />
                </div>
              ) : (
                <img
                  src="/src/assets/images/jaipur_studio_hero_art_1794811735554.jpg"
                  alt="Illustrated Jaipur Hawa Mahal with patang kites and kulhad chai"
                  width={1376}
                  height={768}
                  decoding="async"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full aspect-[16/9] object-cover"
                />
              )}
            </div>
          </div>
        </div>

        <JaipurSkylineDivider />

        <section className="space-y-5">
          <h2 className="type-h2">{t.pillarsSection.headline}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.pillarsSection.pillars.map((p, idx) => (
              <BrutalCard key={p.title} tone={idx === 0 ? 'marigold' : 'surface'}>
                <h3 className="type-h3 mb-2">{p.title}</h3>
                <p className="type-small leading-relaxed opacity-90">{p.desc}</p>
              </BrutalCard>
            ))}
          </div>
        </section>

        <BrutalCard
          tone="indigo"
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <h2 className="type-h3">Playful Jaipur Voice. Serious Delivery.</h2>
            <p className="type-small opacity-90">
              Clear written scope, owned client dashboards, and 30-day post-launch accountability.
            </p>
          </div>
          <BrutalButton variant="primary" size="lg" onClick={() => openPlannerModal()}>
            {t.pricingSection.buildCustomCta}
          </BrutalButton>
        </BrutalCard>
      </div>
    </>
  );
}
