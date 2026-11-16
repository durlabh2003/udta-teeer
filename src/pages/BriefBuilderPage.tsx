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

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-10 md:py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
              60-Second Interactive Project Planner
            </p>
            <h1 className="font-editorial text-3xl md:text-5xl font-bold tracking-tight">
              Let&apos;s plan your next shot.
            </h1>
            <p className="text-sm md:text-base text-[#4B433C] dark:text-[#E7D8C5]">
              Pick your requirements across Design (Creative Haveli), Development (Digital Karkhana),
              and Marketing (Growth Bazaar). Your brief receives a tracked Lead ID immediately.
            </p>
          </div>
          <Link to="/contact" className="text-sm font-bold underline underline-offset-4 shrink-0">
            Prefer a quick contact form instead? →
          </Link>
        </div>

        <ProjectPlanner mode="page" />
      </div>
    </>
  );
}
