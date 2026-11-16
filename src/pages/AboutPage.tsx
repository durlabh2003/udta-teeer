import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

export function AboutPage() {
  const { t } = useApp();

  return (
    <>
      <SEOHead pageKey="about" path="/about" />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="font-hand text-base text-[#D9482B] dark:text-[#FFC21A]">
              Khamma Ghani · Jaipur Studio
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              A flying arrow, aimed at the ordinary.
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#3A3532] dark:text-[#E6D8C5]">
              For ambitious brands in Jaipur, Rajasthan and across India who want to stand out and
              grow online, <strong>Urdta Teeeeeer</strong> combines bold design, practical
              technology, and performance marketing into one accountable growth partner.
              Metro-level thinking, Jaipur-accessible partnership.
            </p>
            <p className="text-base leading-relaxed text-[#3A3532] dark:text-[#E6D8C5]">
              {t.pillarsSection.nameStory}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="brutal-border brutal-shadow-lg rounded-[6px] overflow-hidden bg-[#F4A6B8]">
              <img
                src="/src/assets/images/jaipur_studio_hero_art_1794811735554.jpg"
                alt="Illustrated Jaipur Hawa Mahal with patang kites and kulhad chai"
                width={1376}
                height={768}
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Our Five Core Differentiation Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.pillarsSection.pillars.map((p, idx) => (
              <BrutalCard key={p.title} tone={idx === 0 ? 'marigold' : 'surface'}>
                <h3 className="text-xl font-extrabold mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">{p.desc}</p>
              </BrutalCard>
            ))}
          </div>
        </section>

        <BrutalCard tone="indigo" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl font-extrabold">Provocative Name. Rigorous Work.</h2>
            <p className="text-sm md:text-base opacity-90">
              Our humour lives in our Jaipur voice, never in our delivery promises. Clear scope,
              owned analytics, zero fabricated claims, and 30-day post-launch accountability.
            </p>
          </div>
          <BrutalButton to="/build" variant="marigold" size="lg">
            Start Your Brief
          </BrutalButton>
        </BrutalCard>
      </div>
    </>
  );
}
