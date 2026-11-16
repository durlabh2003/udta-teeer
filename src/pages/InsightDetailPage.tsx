import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import insightsData from '../data/insights.json';
import { useApp } from '../context/AppContext';
import { trackConversionEvent } from '../lib/analytics';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';
import { NotFoundPage } from './NotFoundPage';

export function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openPlannerModal, openAuditModal } = useApp();

  const article = insightsData.articles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      trackConversionEvent('blog_read', { label: article.slug });
    }
  }, [article]);

  if (!article) {
    return <NotFoundPage />;
  }

  const relatedArticles = insightsData.articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${article.title} | Urdta Teeeeeer Insights`}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
      />

      <article className="max-w-[960px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs font-bold flex items-center gap-2">
          <Link to="/" className="underline">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/insights" className="underline">Insights</Link>
          <span aria-hidden="true">/</span>
          <span>{article.category}</span>
        </nav>

        <header className="space-y-4">
          <div className="text-xs font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A]">
            {article.category} · {article.readingTime} · Published {article.publishedAt}
          </div>
          <h1 className="font-editorial text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            {article.title}
          </h1>
          <p className="text-base md:text-lg text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Table of Contents */}
        <BrutalCard tone="surface" className="p-5 space-y-2">
          <div className="text-xs font-mono-num font-bold uppercase opacity-75">
            In This Playbook
          </div>
          <ul className="space-y-1.5 text-sm font-bold">
            {article.sections.map((sec, idx) => (
              <li key={sec.heading}>
                <a href={`#sec-${idx}`} className="hover:underline">
                  {sec.heading}
                </a>
              </li>
            ))}
          </ul>
        </BrutalCard>

        {/* Article Sections */}
        <div className="space-y-8">
          {article.sections.map((sec, idx) => (
            <section key={sec.heading} id={`sec-${idx}`} className="space-y-2.5">
              <h2 className="font-editorial text-2xl md:text-3xl font-bold">{sec.heading}</h2>
              <p className="text-base leading-relaxed text-[#282522] dark:text-[#FFF9F0]/90">
                {sec.body}
              </p>
            </section>
          ))}
        </div>

        {/* Related Services */}
        {article.relatedServices.length > 0 && (
          <BrutalCard tone="marigold" className="space-y-3">
            <h2 className="text-xl font-extrabold">Need help implementing this?</h2>
            <p className="text-sm">
              Explore our matching studio capabilities or start a 60-second custom project plan.
            </p>
            <div className="flex flex-wrap gap-3">
              {article.relatedServices.map((svcSlug) => (
                <BrutalButton key={svcSlug} to={`/${svcSlug}`} variant="cream" size="sm">
                  View /{svcSlug}
                </BrutalButton>
              ))}
              <BrutalButton
                variant="hotPink"
                size="sm"
                onClick={() => openPlannerModal(['website-dev', 'seo-aeo'])}
              >
                <span>Plan Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </BrutalButton>
              <BrutalButton variant="ink" size="sm" onClick={openAuditModal}>
                Request Free Audit
              </BrutalButton>
            </div>
          </BrutalCard>
        )}

        {/* Related Articles */}
        <section className="space-y-4 pt-4 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">Continue Reading</h2>
            <Link to="/insights" className="inline-flex items-center gap-1 text-sm font-bold underline">
              <ArrowLeft className="w-4 h-4" />
              <span>All Insights</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedArticles.map((rel) => (
              <BrutalCard key={rel.slug} className="space-y-2">
                <div className="text-xs font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A]">
                  {rel.category} · {rel.readingTime}
                </div>
                <h3 className="text-lg font-extrabold">{rel.title}</h3>
                <Link to={`/insights/${rel.slug}`} className="text-xs font-bold underline inline-block">
                  Read Article →
                </Link>
              </BrutalCard>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
