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

      <div className="max-w-[860px] mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6">
        <header className="space-y-2">
          <p className="type-label text-[var(--text-terracotta)]">
            Honest Scope &amp; Clear Expectations
          </p>
          <h1 className="type-display">Terms of Engagement</h1>
          <p className="type-label opacity-75">{siteConfig.legalEntityNote}</p>
        </header>

        <BrutalCard className="space-y-5 text-sm leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="type-h3">1. Indicative Pricing vs Written Scope</h2>
            <p className="text-[var(--text-secondary)]">
              Public starter prices (from ₹2,999 for starter packs and ₹40,000+ for custom
              websites) provide clear baselines. Final fixed quotes are confirmed in writing after
              discovery.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="type-h3">2. Third-Party Actuals</h2>
            <p className="text-[var(--text-secondary)]">
              Ad spend, domains, cloud hosting, and paid licenses are billed directly on client
              accounts at actuals with zero hidden markup.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="type-h3">3. Revisions &amp; Post-Launch Support</h2>
            <p className="text-[var(--text-secondary)]">
              Fixed builds include structured milestone revision rounds and a 30-day post-launch
              defect support window.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="type-h3">4. Intellectual Property Ownership</h2>
            <p className="text-[var(--text-secondary)]">
              Upon milestone completion, 100% of design files, source code, and configured
              dashboards belong to the client.
            </p>
          </section>
        </BrutalCard>
      </div>
    </>
  );
}
