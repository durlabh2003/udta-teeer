import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../data/site-config.json';
import { SEOHead } from '../components/SEOHead';
import { BrutalCard } from '../components/ui/BrutalCard';

export function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Urdta Teeeeeer Jaipur"
        description="How Urdta Teeeeeer handles enquiry details in our client-side interactive demo and studio showcase."
        path="/privacy-policy"
      />

      <div className="max-w-[860px] mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6">
        <header className="space-y-2">
          <p className="type-label text-[var(--text-terracotta)]">
            Transparency &amp; Demo Privacy
          </p>
          <h1 className="type-display">Privacy Policy</h1>
          <p className="type-label opacity-75">
            Updated November 2026 · Client-Side Demo Notice
          </p>
        </header>

        <BrutalCard className="space-y-5 text-sm leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="type-h3">1. Information You Enter</h2>
            <p className="text-[var(--text-secondary)]">
              Forms in our Project Planner, Quick Contact, and Free Audit flows collect your
              submitted name, email, mobile number, and scope preferences purely inside your active
              browser session to generate a simulated preview receipt.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="type-h3">2. Zero Hidden Tracking or Resale</h2>
            <p className="text-[var(--text-secondary)]">
              This showcase stores zero form PII in persistent browser storage or remote databases.
              Direct studio outreach links open your own WhatsApp or email client only when clicked.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="type-h3">3. Studio Contact</h2>
            <p className="text-[var(--text-secondary)]">
              For enquiries or privacy questions, write to{' '}
              <a href={`mailto:${siteConfig.email}`} className="underline font-bold">
                {siteConfig.email}
              </a>
              . View our{' '}
              <Link to="/terms" className="underline font-bold">
                Terms of Engagement
              </Link>
              .
            </p>
          </section>
        </BrutalCard>
      </div>
    </>
  );
}
