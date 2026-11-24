import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectPlanner } from '../components/sections/ProjectPlanner';
import { SEOHead } from '../components/SEOHead';

export function BriefBuilderPage() {
  return (
    <>
      <SEOHead
        title="Plan Your Project — Interactive 4-Step Scope Builder | Urdta Teeeeeer"
        description="Plan your website, branding, digital product, or growth marketing scope in 60 seconds with Urdta Teeeeeer Jaipur."
        path="/plan-your-project"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="type-label text-[var(--text-terracotta)]">
              60-Second Interactive Project Planner
            </p>
            <h1 className="type-display">Let&apos;s plan your next shot.</h1>
            <p className="type-small text-[var(--text-secondary)]">
              Pick requirements across Design, Development, and Marketing. Instant simulated Lead ID.
            </p>
          </div>
          <Link
            to="/contact"
            className="min-h-[44px] inline-flex items-center text-sm font-bold underline underline-offset-4 shrink-0 hover:text-[var(--text-gulabi)]"
          >
            Prefer a quick contact form instead? →
          </Link>
        </div>

        <ProjectPlanner mode="page" />
      </div>
    </>
  );
}
