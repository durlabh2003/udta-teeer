import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import insightsData from '../data/insights.json';
import { useApp } from '../context/AppContext';
import { trackConversionEvent } from '../lib/analytics';
import { SEOHead } from '../components/SEOHead';
import { ServiceIllustration } from '../components/illustrations/JaipurIllustrations';
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

      <article className="max-w-[920px] mx-auto px-4 md:px-6 py-8 md:py-12 space-y-7">
        <nav aria-label="Breadcrumb" className="type-label flex flex-wrap items-center gap-2">
          <Link to="/" className="underline min-h-[44px] inline-flex items-center">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/insights" className="underline min-h-[44px] inline-flex items-center">Insights</Link>
          <span aria-hidden="true">/</span>
          <span>{article.category}</span>
        </nav>

        <header className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <p className="type-label text-[var(--text-terracotta)]">
              {article.category} · {article.readingTime} · {article.publishedAt}
            </p>
            <h1 className="type-display">{article.title}</h1>
            <p className="type-body text-[var(--text-secondary)]">{article.excerpt}</p>
          </div>
          <div className="md:col-span-4">
            <BrutalCard arch="jharokha" tone="sandstone" className="p-4 flex items-center justify-center">
              <ServiceIllustration
                name={(article as { illustrationKey?: string }).illustrationKey}
                alt={`${article.title} cover graphic`}
                className="w-full h-36"
              />
            </BrutalCard>
          </div>
        </header>

        {/* Table of Contents */}
        <BrutalCard tone="surface" className="p-4 space-y-2">
          <div className="type-label opacity-75">In This Playbook</div>
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
              <h2 className="type-h2">{sec.heading}</h2>
              <p className="type-body text-[var(--text-secondary)]">{sec.body}</p>
            </section>
          ))}
        </div>

        {/* Related Services */}
        {article.relatedServices.length > 0 && (
          <BrutalCard tone="marigold" className="space-y-4">
            <h2 className="type-h3">Need help implementing this?</h2>
            <p className="type-small opacity-90">
              Explore matching studio services or plan your custom scope in 60 seconds.
            </p>
            <div className="flex flex-wrap gap-3">
              {article.relatedServices.map((svcSlug) => (
                <BrutalButton key={svcSlug} to={`/${svcSlug}`} variant="secondary" size="sm">
                  View /{svcSlug}
                </BrutalButton>
              ))}
              <BrutalButton
                variant="primary"
                size="sm"
                onClick={() => openPlannerModal(['website-dev', 'seo-aeo'])}
              >
                <span>Apna Package Banao</span>
                <ArrowRight className="w-4 h-4" />
              </BrutalButton>
              <BrutalButton variant="secondary" size="sm" onClick={openAuditModal}>
                Free Site Audit
              </BrutalButton>
            </div>
          </BrutalCard>
        )}

        {/* Related Articles */}
        <section className="space-y-4 pt-4 border-t-2 border-[var(--border-ink)]/15">
          <div className="flex items-center justify-between">
            <h2 className="type-h3">Continue Reading</h2>
            <Link
              to="/insights"
              className="min-h-[44px] inline-flex items-center gap-1 text-sm font-bold underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Insights</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedArticles.map((rel) => (
              <BrutalCard key={rel.slug} className="space-y-2 p-5">
                <p className="type-label text-[var(--text-terracotta)]">
                  {rel.category} · {rel.readingTime}
                </p>
                <h3 className="type-h3">{rel.title}</h3>
                <Link
                  to={`/insights/${rel.slug}`}
                  className="min-h-[44px] text-xs font-bold underline inline-flex items-center"
                >
                  Read Playbook →
                </Link>
              </BrutalCard>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
