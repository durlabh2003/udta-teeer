import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import insightsData from '../data/insights.json';
import { trackConversionEvent } from '../lib/analytics';
import { SEOHead } from '../components/SEOHead';
import {
  EmptySearchIllustration,
  ServiceIllustration,
} from '../components/illustrations/JaipurIllustrations';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

export function InsightsPage() {
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insightsData.articles.filter((a) => {
      const catMatch = category === 'All' || a.category === category;
      const qMatch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [category, query]);

  const featured = insightsData.articles.find((a) => a.featured) ?? insightsData.articles[0];

  return (
    <>
      <SEOHead pageKey="insights" path="/insights" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="max-w-xl space-y-2">
            <p className="type-label text-[var(--text-terracotta)]">
              Chai &amp; Strategy Journal
            </p>
            <h1 className="type-display">Playbooks for Indian Brands</h1>
            <p className="type-body text-[var(--text-secondary)]">
              Short guides on websites, local SEO, AEO, and paid growth without agency jargon.
            </p>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search playbooks..."
              aria-label="Search insights articles"
              className="w-full min-h-[44px] pl-10 pr-4 py-2 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[6px] text-sm"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter insights by category">
          {insightsData.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              onClick={() => setCategory(cat)}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-bold brutal-border rounded-[6px] cursor-pointer ${
                category === cat
                  ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article Banner */}
        {featured && category === 'All' && !query && (
          <BrutalCard tone="marigold" arch="scalloped" className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-4 p-3 brutal-border bg-[var(--bg-surface)] rounded-[8px] flex items-center justify-center">
              <ServiceIllustration
                name={(featured as { illustrationKey?: string }).illustrationKey}
                alt=""
                className="w-full h-28"
              />
            </div>
            <div className="md:col-span-8 space-y-3">
              <p className="type-label">
                Featured · {featured.category} · {featured.readingTime}
              </p>
              <h2 className="type-h2">{featured.title}</h2>
              <p className="type-body opacity-90 max-w-2xl">{featured.excerpt}</p>
              <div className="pt-1">
                <BrutalButton
                  to={`/insights/${featured.slug}`}
                  variant="secondary"
                  size="sm"
                  onClick={() => trackConversionEvent('blog_read', { label: featured.slug })}
                >
                  <span>Read Full Playbook</span>
                  <ArrowUpRight className="w-4 h-4" />
                </BrutalButton>
              </div>
            </div>
          </BrutalCard>
        )}

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <BrutalCard className="p-8 text-center flex flex-col items-center space-y-3">
            <EmptySearchIllustration className="w-28 h-24" />
            <p className="font-bold">No matching playbooks found for &ldquo;{query}&rdquo;.</p>
            <BrutalButton
              variant="secondary"
              size="sm"
              onClick={() => {
                setCategory('All');
                setQuery('');
              }}
            >
              Reset filters
            </BrutalButton>
          </BrutalCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((art) => (
              <BrutalCard key={art.slug} className="flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="p-3 brutal-border bg-[var(--bg-cream)] rounded-[8px] flex items-center justify-center">
                    <ServiceIllustration
                      name={(art as { illustrationKey?: string }).illustrationKey}
                      alt=""
                      className="w-full h-28"
                    />
                  </div>
                  <p className="type-label text-[var(--text-terracotta)]">
                    {art.category} <span aria-hidden="true">·</span> {art.readingTime}
                  </p>
                  <h2 className="type-h3 leading-snug">{art.title}</h2>
                  <p className="type-small text-[var(--text-secondary)] leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t-2 border-[var(--border-ink)]/15 flex items-center justify-between text-xs font-bold">
                  <span className="font-mono-num opacity-75">{art.publishedAt}</span>
                  <Link
                    to={`/insights/${art.slug}`}
                    onClick={() => trackConversionEvent('blog_read', { label: art.slug })}
                    className="min-h-[44px] inline-flex items-center gap-1 underline hover:text-[var(--text-gulabi)]"
                  >
                    <span>Read Guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </BrutalCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
