import React from 'react';
import siteConfig from '../data/site-config.json';
import { SEOHead } from '../components/SEOHead';
import { BrutalCard } from '../components/ui/BrutalCard';

export function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Engagement | Urdta Teeeeeer Jaipur"
        description="Clear scoping, milestone billing, third-party actuals, IP ownership, and 30-day warranty terms at Urdta Teeeeeer."
        path="/terms"
      />

      <div className="max-w-[920px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-8">
        <div className="space-y-2">
          <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
            Honest Scope &amp; Clear Expectations
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            Terms of Engagement
          </h1>
          <p className="text-xs font-mono-num opacity-75">{siteConfig.legalEntityNote}</p>
        </div>

        <BrutalCard className="space-y-5 text-sm leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="text-lg font-extrabold">1. Indicative Pricing vs Final Written Scope</h2>
            <p>
              Public starter prices (beginning from ₹2,999 for focused starter deliverables and
              ₹40,000+ for custom websites) serve as transparent guidance. Exact fixed quotes or
              milestone schedules are confirmed in a written Statement of Work (SoW) after discovery.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-lg font-extrabold">2. Third-Party Actuals</h2>
            <p>
              Meta/Google ad spend, domain registration, cloud hosting, paid plugins, stock media
              licenses, and third-party API/AI usage are billed directly to the client at actuals so
              your business retains direct ownership of every account.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-lg font-extrabold">3. Structured Revisions &amp; Post-Launch Support</h2>
            <p>
              Fixed projects include structured revision rounds (typically 2 rounds per milestone)
              and a 30-day post-launch warranty window covering defect fixes. Ongoing enhancements
              and growth retainers are scoped separately.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-lg font-extrabold">4. Intellectual Property Ownership</h2>
            <p>
              Upon full milestone settlement, 100% of custom design assets, source code, and
              configured analytics dashboards belong to the client.
            </p>
          </section>
        </BrutalCard>
      </div>
    </>
  );
}
