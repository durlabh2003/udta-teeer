import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Bot,
  Code2,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrutalButton } from './BrutalButton';
import { BrutalCard } from './BrutalCard';

export interface CatalogServiceItem {
  id: string;
  stall: string;
  slug: string;
  name: string;
  hookHi: string;
  hookEn: string;
  deliverables: string[];
  timeline: string;
  priceDisplay: string;
  startingPrice: number;
  customScope: boolean;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'website-dev': <Code2 className="w-5 h-5 stroke-[2.5]" />,
  'ecommerce-dev': <ShoppingBag className="w-5 h-5 stroke-[2.5]" />,
  'web-app-dev': <Code2 className="w-5 h-5 stroke-[2.5]" />,
  'mobile-app-dev': <Smartphone className="w-5 h-5 stroke-[2.5]" />,
  'crm-systems': <Bot className="w-5 h-5 stroke-[2.5]" />,
  'seo-aeo': <Search className="w-5 h-5 stroke-[2.5]" />,
  'performance-marketing': <TrendingUp className="w-5 h-5 stroke-[2.5]" />,
  'digital-marketing-system': <Megaphone className="w-5 h-5 stroke-[2.5]" />,
  'social-growth-system': <Sparkles className="w-5 h-5 stroke-[2.5]" />,
  'branding-identity': <Palette className="w-5 h-5 stroke-[2.5]" />,
  'ui-ux-design': <Palette className="w-5 h-5 stroke-[2.5]" />,
  'creative-motion': <Sparkles className="w-5 h-5 stroke-[2.5]" />,
};

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
      ? 'Banawat'
      : service.stall === 'hawa-banao'
        ? 'Hawa Banao'
        : 'Rang-Roop';

  return (
    <BrutalCard className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-11 h-11 brutal-border bg-[#FFC21A] text-[#111111] flex items-center justify-center rounded-[4px] shrink-0">
            {SERVICE_ICONS[service.id] ?? <Code2 className="w-5 h-5" />}
          </div>
          <Link
            to={`/${service.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4 hover:text-[#D9482B] dark:hover:text-[#FFC21A] whitespace-nowrap"
          >
            Details <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Unboxed clean metadata per Zero-Pill rule */}
        <p className="text-xs font-medium text-[#3A3532] dark:text-[#E6D8C5] mb-1.5">
          {stallLabel} <span aria-hidden="true">·</span> {service.timeline}
          {service.customScope ? (
            <>
              {' '}
              <span aria-hidden="true">·</span> Discovery-first
            </>
          ) : null}
        </p>

        <h3 className="text-xl font-extrabold tracking-tight mb-2">{service.name}</h3>
        <p className="text-sm font-medium text-[#3A3532] dark:text-[#E6D8C5] mb-4 leading-relaxed">
          {lang === 'hinglish' ? service.hookHi : service.hookEn}
        </p>

        <ul className="space-y-1.5 mb-5 text-sm">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="font-bold text-[#D9482B] dark:text-[#FFC21A]" aria-hidden="true">
                →
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t-2 border-[#111111]/15 dark:border-[#FFF4E0]/20 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <span className="block text-xs text-[#3A3532] dark:text-[#E6D8C5]">Starting from</span>
          <span className="font-mono-num font-bold text-base">{service.priceDisplay}</span>
        </div>
        <BrutalButton size="sm" variant="marigold" onClick={handleCustomize}>
          {t.servicesSection.customizeBtn}
        </BrutalButton>
      </div>
    </BrutalCard>
  );
}
