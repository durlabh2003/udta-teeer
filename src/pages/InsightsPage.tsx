import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import insightsData from '../data/insights.json';
import { trackConversionEvent } from '../lib/analytics';
import { SEOHead } from '../components/SEOHead';
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
      <SEOHead
        title="Insights & Digital Growth Guides | Urdta Teeeeeer Jaipur"
        description="Practical guides for Jaipur and Indian businesses on websites, e-commerce, branding vs marketing, and SEO + AI Search (AEO)."
        path="/insights"
      />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="font-hand text-base text-[#B95E50] dark:text-[#FFC21A]">
              Chai &amp; Strategy Journal
            </p>
            <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight">
              Insights for Growing Indian Brands
            </h1>
            <p className="text-base text-[#4B433C] dark:text-[#E7D8C5]">
              Practical playbooks on websites, SEO + AEO, branding, and performance marketing —
              written in plain language without fluff.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search insights articles"
              className="w-full pl-10 pr-4 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[4px] text-sm"
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
              className={`px-3.5 py-2 text-xs font-bold brutal-border rounded-[4px] cursor-pointer ${
                category === cat
                  ? 'bg-[#FFC21A] text-[#111111]'
                  : 'bg-[#FFF9F0] dark:bg-[#212E46]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article Banner */}
        {featured && category === 'All' && !query && (
          <BrutalCard tone="marigold" className="p-7 md:p-9 space-y-3">
            <div className="text-xs font-mono-num font-bold">
              Featured Playbook · {featured.category} · {featured.readingTime}
            </div>
            <h2 className="font-editorial text-2xl md:text-4xl font-bold">{featured.title}</h2>
            <p className="text-sm md:text-base max-w-3xl leading-relaxed">{featured.excerpt}</p>
            <div className="pt-2">
              <Link
                to={`/insights/${featured.slug}`}
                onClick={() => trackConversionEvent('blog_read', { label: featured.slug })}
                className="inline-flex items-center gap-2 font-bold text-sm underline underline-offset-4"
              >
                <span>Read Full Guide</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </BrutalCard>
        )}

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <BrutalCard className="p-8 text-center space-y-2">
            <p className="font-bold">No matching articles found for &ldquo;{query}&rdquo;.</p>
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setQuery('');
              }}
              className="text-sm font-bold underline cursor-pointer"
            >
              Reset filters
            </button>
          </BrutalCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((art) => (
              <BrutalCard key={art.slug} className="flex flex-col justify-between h-full">
                <div className="space-y-2.5">
                  <div className="text-xs font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A]">
                    {art.category} <span aria-hidden="true">·</span> {art.readingTime}
                  </div>
                  <h2 className="text-xl font-extrabold leading-snug">{art.title}</h2>
                  <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20 flex items-center justify-between text-xs font-bold">
                  <span>{art.publishedAt}</span>
                  <Link
                    to={`/insights/${art.slug}`}
                    onClick={() => trackConversionEvent('blog_read', { label: art.slug })}
                    className="inline-flex items-center gap-1 underline hover:text-[#B95E50] dark:hover:text-[#FFC21A]"
                  >
                    <span>Read Article</span>
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
