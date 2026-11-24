import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceIllustration } from '../illustrations/JaipurIllustrations';
import { BrutalButton } from './BrutalButton';
import { BrutalCard } from './BrutalCard';

export interface CatalogServiceItem {
  id: string;
  stall: string;
  slug: string;
  illustrationKey?: string;
  name: string;
  hookHi: string;
  hookEn: string;
  deliverables: string[];
  timeline: string;
  priceDisplay: string;
  startingPrice: number;
  customScope: boolean;
}

export function ServiceCard({ service }: { service: CatalogServiceItem }) {
  const { lang, t, setPreselectedServiceIds } = useApp();
  const navigate = useNavigate();

  const handleCustomize = () => {
    setPreselectedServiceIds((prev) =>
      prev.includes(service.id) ? prev : [...prev, service.id]
    );
    navigate('/build');
  };

  const stallLabel =
    service.stall === 'banawat'
      ? 'Digital Karkhana'
      : service.stall === 'hawa-banao'
        ? 'Growth Bazaar'
        : 'Creative Haveli';

  return (
    <BrutalCard className="flex flex-col justify-between h-full">
      <div>
        <div className="mb-3 p-2.5 brutal-border bg-[var(--bg-cream)] rounded-[8px] flex items-center justify-center relative">
          <ServiceIllustration
            name={service.illustrationKey ?? service.id}
            alt={`${service.name} Jaipur illustration`}
            className="w-full h-24"
          />
          <Link
            to={`/${service.slug}`}
            aria-label={`Inspect ${service.name} details`}
            className="absolute top-2 right-2 min-h-[44px] min-w-[44px] px-2.5 inline-flex items-center justify-center gap-1 text-xs font-bold brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[6px] hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="type-label text-[var(--text-secondary)] mb-1">
          {stallLabel} <span aria-hidden="true">·</span> {service.timeline}
          {service.customScope ? (
            <>
              {' '}
              <span aria-hidden="true">·</span> Discovery-first
            </>
          ) : null}
        </p>

        <h3 className="type-h3 mb-1.5">{service.name}</h3>
        <p className="type-small text-[var(--text-secondary)] mb-3 leading-snug">
          {lang === 'hinglish' ? service.hookHi : service.hookEn}
        </p>

        <ul className="space-y-1 mb-4 text-xs sm:text-sm">
          {service.deliverables.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="font-bold text-[var(--text-terracotta)]" aria-hidden="true">
                →
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-3 border-t-2 border-[var(--border-ink)]/15 flex items-center justify-between gap-2 flex-wrap">
        <div>
          <span className="block type-label text-[var(--text-secondary)]">Starting from</span>
          <span className="font-mono-num font-bold text-sm md:text-base">{service.priceDisplay}</span>
        </div>
        <BrutalButton size="sm" variant="secondary" onClick={handleCustomize}>
          {t.servicesSection.customizeBtn}
        </BrutalButton>
      </div>
    </BrutalCard>
  );
}
