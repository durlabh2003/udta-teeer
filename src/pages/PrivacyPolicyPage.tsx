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
        description="How Urdta Teeeeeer collects, stores, and protects enquiry information submitted through our Interactive Project Planner and Free Audit forms."
        path="/privacy-policy"
      />

      <div className="max-w-[920px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-8">
        <div className="space-y-2">
          <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
            Transparency &amp; Data Protection
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono-num opacity-75">
            Last Updated: November 2026 · Aligned with Indian Digital Personal Data Protection (DPDP) Principles
          </p>
        </div>

        <BrutalCard className="space-y-5 text-sm leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="text-lg font-extrabold">1. Information We Collect</h2>
            <p>
              When you submit a brief via our Interactive Project Planner, Quick Contact form, or
              Free Audit modal, we collect only the details you actively provide: Full Name, Email
              Address, Mobile / WhatsApp Number, Business Name, Industry, Website URL, Project
              Scope Preferences, Budget Band, and Timeline.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-lg font-extrabold">2. Purpose &amp; Consent</h2>
            <p>
              We use this data strictly to prepare your tailored project estimate, respond to your
              audit or discovery request, and coordinate communication via email, phone, or
              WhatsApp. We never sell, rent, or trade your contact details with third-party data
              brokers.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-lg font-extrabold">3. Storage, Retention &amp; Your Rights</h2>
            <p>
              Submitted leads are assigned a reference Lead ID (e.g. <code>UT-2026-001</code>) and
              stored securely on our studio backend so your dedicated coordinator can review your
              requirements. You may request access, correction, or deletion of your enquiry records
              at any time by writing to{' '}
              <a href={`mailto:${siteConfig.email}`} className="underline font-bold">
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-lg font-extrabold">4. Analytics &amp; UTM Attribution</h2>
            <p>
              We record lightweight, first-party conversion milestones (such as planner completion
              and CTA interactions) to improve clarity on our site. Refer to our{' '}
              <Link to="/terms" className="underline font-bold">
                Terms of Engagement
              </Link>{' '}
              for project scoping policies.
            </p>
          </section>
        </BrutalCard>
      </div>
    </>
  );
}
