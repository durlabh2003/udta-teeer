import React from 'react';

export type ServiceIllustrationKey =
  | 'branding'
  | 'logo'
  | 'ui-ux'
  | 'website'
  | 'packaging'
  | 'motion'
  | 'ecommerce'
  | 'mobile-app'
  | 'saas'
  | 'dashboard'
  | 'seo'
  | 'google-ads'
  | 'meta-social'
  | 'content'
  | 'lead-gen'
  | 'performance'
  | 'crm';

interface SvgWrapperProps {
  alt?: string;
  decorative?: boolean;
  className?: string;
  viewBox?: string;
  children: React.ReactNode;
}

function IllustrationFrame({
  alt = '',
  decorative = false,
  className = 'w-full h-full',
  viewBox = '0 0 220 160',
  children,
}: SvgWrapperProps) {
  const isDecorative = decorative || alt.trim() === '';
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={isDecorative ? undefined : 'img'}
      aria-label={isDecorative ? undefined : alt}
      aria-hidden={isDecorative ? true : undefined}
    >
      {children}
    </svg>
  );
}

const SLUG_TO_KEY: Record<string, ServiceIllustrationKey> = {
  branding: 'branding',
  'brand-identity': 'branding',
  'branding-agency-jaipur': 'branding',
  logo: 'logo',
  'logo-signage': 'logo',
  'ui-ux': 'ui-ux',
  'ui-ux-design-jaipur': 'ui-ux',
  website: 'website',
  'website-development-jaipur': 'website',
  'business-websites': 'website',
  packaging: 'packaging',
  motion: 'motion',
  ecommerce: 'ecommerce',
  'ecommerce-development-jaipur': 'ecommerce',
  'mobile-app': 'mobile-app',
  'mobile-app-development-jaipur': 'mobile-app',
  saas: 'saas',
  'saas-development': 'saas',
  'automation-ai-jaipur': 'saas',
  dashboard: 'dashboard',
  seo: 'seo',
  'seo-services-jaipur': 'seo',
  'google-ads': 'google-ads',
  'digital-marketing-jaipur': 'google-ads',
  'meta-social': 'meta-social',
  'social-media-marketing-jaipur': 'meta-social',
  content: 'content',
  'lead-gen': 'lead-gen',
  performance: 'performance',
  'performance-marketing-jaipur': 'performance',
  crm: 'crm',
};

export function resolveIllustrationKey(name?: string): ServiceIllustrationKey {
  if (!name) return 'website';
  const normalized = name.toLowerCase().trim();
  if (SLUG_TO_KEY[normalized]) return SLUG_TO_KEY[normalized];
  if (normalized.includes('brand') || normalized.includes('diag')) return 'branding';
  if (normalized.includes('logo') || normalized.includes('sign')) return 'logo';
  if (normalized.includes('ui') || normalized.includes('ux') || normalized.includes('figma')) return 'ui-ux';
  if (normalized.includes('pack')) return 'packaging';
  if (normalized.includes('motion') || normalized.includes('reel') || normalized.includes('video')) return 'motion';
  if (normalized.includes('ecom') || normalized.includes('shop') || normalized.includes('store')) return 'ecommerce';
  if (normalized.includes('mobile') || normalized.includes('app') || normalized.includes('ios')) return 'mobile-app';
  if (normalized.includes('saas') || normalized.includes('auto') || normalized.includes('ai')) return 'saas';
  if (normalized.includes('dash') || normalized.includes('analyt') || normalized.includes('data')) return 'dashboard';
  if (normalized.includes('seo') || normalized.includes('aeo')) return 'seo';
  if (normalized.includes('google') || normalized.includes('ads')) return 'google-ads';
  if (normalized.includes('meta') || normalized.includes('social') || normalized.includes('insta')) return 'meta-social';
  if (normalized.includes('content') || normalized.includes('copy')) return 'content';
  if (normalized.includes('lead') || normalized.includes('funnel')) return 'lead-gen';
  if (normalized.includes('perf') || normalized.includes('roas') || normalized.includes('growth')) return 'performance';
  if (normalized.includes('crm') || normalized.includes('whatsapp')) return 'crm';
  return 'website';
}

export function ServiceIllustration({
  name,
  alt = '',
  decorative = false,
  className = 'w-full h-full',
}: {
  name?: string;
  alt?: string;
  decorative?: boolean;
  className?: string;
}) {
  const key = resolveIllustrationKey(name);

  switch (key) {
    case 'branding':
      // Sanganer block-print wooden stamp
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <rect x="24" y="108" width="172" height="34" rx="4" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="3" />
          {/* Block-printed lotus pattern on cloth */}
          <circle cx="62" cy="125" r="8" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
          <circle cx="158" cy="125" r="8" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2" />
          {/* Wooden Stamp Base & Handle */}
          <rect x="74" y="84" width="72" height="24" rx="3" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M96 84 C92 60 94 40 100 30 C105 22 115 22 120 30 C126 40 128 60 124 84 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="110" cy="36" r="6" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Ink sparkles */}
          <path d="M58 66 L64 72 M162 66 L156 72" stroke="var(--color-gulabi)" strokeWidth="3" strokeLinecap="round" />
        </IllustrationFrame>
      );

    case 'logo':
      // Jaipur Heritage Shop Signboard
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <line x1="55" y1="24" x2="55" y2="54" stroke="var(--border-ink)" strokeWidth="3" />
          <line x1="165" y1="24" x2="165" y2="54" stroke="var(--border-ink)" strokeWidth="3" />
          <line x1="30" y1="24" x2="190" y2="24" stroke="var(--border-ink)" strokeWidth="4" strokeLinecap="round" />
          {/* Scalloped signboard */}
          <rect x="34" y="52" width="152" height="82" rx="8" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="44" y="62" width="132" height="62" rx="4" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Lotus brand mark */}
          <path d="M110 74 C118 84 118 98 110 106 C102 98 102 84 110 74 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <path d="M90 88 C100 88 108 96 108 106 C98 106 90 98 90 88 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <path d="M130 88 C120 88 112 96 112 106 C122 106 130 98 130 88 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <line x1="76" y1="115" x2="144" y2="115" stroke="var(--border-ink)" strokeWidth="2.5" strokeLinecap="round" />
        </IllustrationFrame>
      );

    case 'ui-ux':
      // Jharokha window as interactive screen
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <path
            d="M42 142 V64 C42 42 74 36 110 18 C146 36 178 42 178 64 V142 Z"
            fill="var(--bg-sandstone)"
            stroke="var(--border-ink)"
            strokeWidth="3"
          />
          <path
            d="M56 134 V70 C56 54 84 48 110 34 C136 48 164 54 164 70 V134 Z"
            fill="var(--bg-surface)"
            stroke="var(--border-ink)"
            strokeWidth="2.5"
          />
          {/* UI Blocks inside Jharokha */}
          <rect x="70" y="68" width="80" height="16" rx="3" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="70" y="92" width="36" height="32" rx="3" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="114" y="92" width="36" height="14" rx="3" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="114" y="110" width="36" height="14" rx="3" fill="var(--bg-cream)" stroke="var(--border-ink)" strokeWidth="2" />
          {/* Cursor pointer */}
          <path d="M148 118 L160 132 L153 134 L156 142 L150 144 L147 136 L142 138 Z" fill="var(--color-indigo)" stroke="var(--bg-surface)" strokeWidth="1.5" />
        </IllustrationFrame>
      );

    case 'website':
      // Hawa Mahal facade as browser frame
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <rect x="28" y="24" width="164" height="114" rx="6" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          <line x1="28" y1="44" x2="192" y2="44" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="42" cy="34" r="3.5" fill="var(--color-gulabi)" />
          <circle cx="54" cy="34" r="3.5" fill="var(--color-marigold)" />
          <circle cx="66" cy="34" r="3.5" fill="var(--color-cobalt)" />
          {/* Mini Hawa Mahal inside browser */}
          <path d="M56 126 V88 H74 V72 H92 V56 H128 V72 H146 V88 H164 V126 Z" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="110" cy="76" r="6" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="82" y="102" width="12" height="24" rx="6" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="104" y="102" width="12" height="24" rx="6" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="126" y="102" width="12" height="24" rx="6" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2" />
        </IllustrationFrame>
      );

    case 'packaging':
      // Lac-bangle / jutti gift box
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <rect x="44" y="54" width="132" height="82" rx="6" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="36" y="40" width="148" height="24" rx="4" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="98" y="40" width="24" height="96" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Bow */}
          <path d="M110 40 C92 18 76 26 88 40 Z" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <path d="M110 40 C128 18 144 26 132 40 Z" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Pattern bangles */}
          <circle cx="70" cy="96" r="12" fill="none" stroke="var(--color-marigold)" strokeWidth="4" />
          <circle cx="150" cy="96" r="12" fill="none" stroke="var(--bg-surface)" strokeWidth="4" />
        </IllustrationFrame>
      );

    case 'motion':
      // Kathputli puppet
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <line x1="65" y1="20" x2="155" y2="20" stroke="var(--border-ink)" strokeWidth="4" strokeLinecap="round" />
          <line x1="80" y1="20" x2="88" y2="76" stroke="var(--border-ink)" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="140" y1="20" x2="132" y2="76" stroke="var(--border-ink)" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="110" y1="20" x2="110" y2="42" stroke="var(--border-ink)" strokeWidth="2" />
          {/* Puppet Turban & Head */}
          <circle cx="110" cy="56" r="16" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M92 48 C96 32 124 32 128 48 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Skirt & Sleeves */}
          <path d="M84 128 L96 74 H124 L136 128 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M74 78 L96 76 L92 92 L72 90 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <path d="M146 78 L124 76 L128 92 L148 90 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="105" cy="56" r="2" fill="var(--border-ink)" />
          <circle cx="115" cy="56" r="2" fill="var(--border-ink)" />
        </IllustrationFrame>
      );

    case 'ecommerce':
      // Bazaar stall with ₹ tag
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          {/* Awning */}
          <path d="M32 54 L46 28 H174 L188 54 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M32 54 C46 66 58 66 71 54 C84 66 96 66 110 54 C124 66 136 66 149 54 C162 66 174 66 188 54" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Stall pillars & counter */}
          <rect x="46" y="64" width="128" height="44" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="38" y="108" width="144" height="28" rx="4" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
          {/* Rupee swing price tag */}
          <circle cx="110" cy="86" r="16" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <text x="110" y="92" textAnchor="middle" fill="#1B243B" fontSize="18" fontWeight="800">₹</text>
        </IllustrationFrame>
      );

    case 'mobile-app':
      // Phone inside a jharokha arch
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <path d="M52 142 V54 C52 34 84 30 110 16 C136 30 168 34 168 54 V142 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="78" y="42" width="64" height="92" rx="10" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          <line x1="100" y1="50" x2="120" y2="50" stroke="var(--border-ink)" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="86" y="60" width="48" height="24" rx="4" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="86" y="90" width="22" height="22" rx="4" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="112" y="90" width="22" height="22" rx="4" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="2" />
          <circle cx="110" cy="124" r="4" fill="var(--border-ink)" />
        </IllustrationFrame>
      );

    case 'saas':
      // Karkhana gears with block-print lotus motif
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <circle cx="88" cy="82" r="36" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" strokeDasharray="12 6" />
          <circle cx="88" cy="82" r="24" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="88" cy="82" r="9" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="146" cy="96" r="26" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" strokeDasharray="10 5" />
          <circle cx="146" cy="96" r="14" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="146" cy="96" r="5" fill="var(--border-ink)" />
          {/* Block-print petals around center gear */}
          <circle cx="88" cy="64" r="3" fill="var(--color-gulabi)" />
          <circle cx="88" cy="100" r="3" fill="var(--color-gulabi)" />
          <circle cx="70" cy="82" r="3" fill="var(--color-gulabi)" />
          <circle cx="106" cy="82" r="3" fill="var(--color-gulabi)" />
        </IllustrationFrame>
      );

    case 'dashboard':
      // Chart on a Jaipuri carpet
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          {/* Jaipuri woven rug */}
          <rect x="26" y="34" width="168" height="94" rx="4" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="38" y="44" width="144" height="74" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Carpet fringe */}
          <line x1="18" y1="44" x2="26" y2="44" stroke="var(--border-ink)" strokeWidth="2.5" />
          <line x1="18" y1="64" x2="26" y2="64" stroke="var(--border-ink)" strokeWidth="2.5" />
          <line x1="18" y1="84" x2="26" y2="84" stroke="var(--border-ink)" strokeWidth="2.5" />
          <line x1="18" y1="104" x2="26" y2="104" stroke="var(--border-ink)" strokeWidth="2.5" />
          <line x1="194" y1="44" x2="202" y2="44" stroke="var(--border-ink)" strokeWidth="2.5" />
          <line x1="194" y1="64" x2="202" y2="64" stroke="var(--border-ink)" strokeWidth="2.5" />
          <line x1="194" y1="84" x2="202" y2="84" stroke="var(--border-ink)" strokeWidth="2.5" />
          <line x1="194" y1="104" x2="202" y2="104" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Chart Bars */}
          <rect x="54" y="84" width="18" height="24" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="82" y="70" width="18" height="38" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2" />
          <rect x="110" y="54" width="18" height="54" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
          <path d="M136 96 L150 76 L168 60" stroke="var(--color-cobalt)" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="168" cy="60" r="4" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
        </IllustrationFrame>
      );

    case 'seo':
      // Amer Fort watchtower with binoculars
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <path d="M58 136 L68 58 H114 L124 136 Z" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="58" y="46" width="66" height="14" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M72 46 L91 28 L110 46 Z" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="3" />
          {/* Binoculars */}
          <rect x="122" y="56" width="46" height="18" rx="6" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="168" cy="65" r="10" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          {/* Signal pin */}
          <circle cx="176" cy="36" r="8" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
        </IllustrationFrame>
      );

    case 'google-ads':
      // Megaphone in Johari Bazaar
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          {/* Arch backdrop */}
          <path d="M40 132 V62 C40 42 74 36 110 22 C146 36 180 42 180 62 V132 Z" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Brass/Gulabi megaphone */}
          <path d="M62 84 L132 54 V116 L62 94 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="56" y="80" width="14" height="22" rx="3" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <path d="M74 96 L82 122 H68 L62 96 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Sound waves */}
          <path d="M146 72 C154 80 154 90 146 98" stroke="var(--color-marigold)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M158 62 C170 76 170 94 158 108" stroke="var(--color-cobalt)" strokeWidth="3.5" strokeLinecap="round" />
        </IllustrationFrame>
      );

    case 'meta-social':
      // Makar Sankranti kites
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <path d="M84 26 L124 54 L94 94 L54 66 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
          <line x1="84" y1="26" x2="94" y2="94" stroke="var(--border-ink)" strokeWidth="2" />
          <line x1="54" y1="66" x2="124" y2="54" stroke="var(--border-ink)" strokeWidth="2" />
          <path d="M94 94 Q108 118 88 134" stroke="var(--border-ink)" strokeWidth="2.5" fill="none" />
          <path d="M154 44 L182 64 L160 92 L132 72 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M160 92 Q174 114 154 134" stroke="var(--color-cobalt)" strokeWidth="2.5" fill="none" />
          <circle cx="88" cy="134" r="5" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
        </IllustrationFrame>
      );

    case 'content':
      // Brass quill + scroll
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <rect x="46" y="38" width="96" height="92" rx="6" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="40" y="30" width="108" height="14" rx="7" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <rect x="40" y="122" width="108" height="14" rx="7" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <line x1="62" y1="62" x2="122" y2="62" stroke="var(--border-ink)" strokeWidth="3" strokeLinecap="round" />
          <line x1="62" y1="80" x2="112" y2="80" stroke="var(--border-ink)" strokeWidth="3" strokeLinecap="round" />
          <line x1="62" y1="98" x2="100" y2="98" stroke="var(--border-ink)" strokeWidth="3" strokeLinecap="round" />
          {/* Peacock quill */}
          <path d="M126 100 L176 26 C182 40 168 74 138 98 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="164" cy="44" r="5" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
        </IllustrationFrame>
      );

    case 'lead-gen':
      // Funnel shaped like a clay matka
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <ellipse cx="110" cy="44" rx="52" ry="12" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M58 44 C56 84 82 94 96 110 V132 H124 V110 C138 94 164 84 162 44 Z" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="94" cy="24" r="7" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="126" cy="20" r="8" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="110" cy="142" r="8" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
        </IllustrationFrame>
      );

    case 'performance':
      // Arrow hitting bullseye
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <circle cx="104" cy="84" r="48" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="104" cy="84" r="32" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="104" cy="84" r="16" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="104" cy="84" r="6" fill="var(--color-gulabi)" />
          {/* Feathered Arrow */}
          <line x1="104" y1="84" x2="176" y2="32" stroke="var(--border-ink)" strokeWidth="4" strokeLinecap="round" />
          <path d="M164 40 L182 26 L186 38 L168 48 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
          <path d="M158 34 L176 20 L166 16 L150 30 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
        </IllustrationFrame>
      );

    case 'crm':
      // Rolodex in a haveli courtyard
      return (
        <IllustrationFrame alt={alt} decorative={decorative} className={className}>
          <path d="M40 132 V50 C40 34 74 30 110 18 C146 30 180 34 180 50 V132 Z" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="2.5" />
          {/* Rolodex cards */}
          <rect x="64" y="54" width="92" height="52" rx="4" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <rect x="58" y="68" width="104" height="54" rx="5" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          <circle cx="80" cy="94" r="10" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
          <line x1="100" y1="88" x2="146" y2="88" stroke="var(--border-ink)" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="102" x2="134" y2="102" stroke="var(--color-cobalt)" strokeWidth="3" strokeLinecap="round" />
        </IllustrationFrame>
      );
  }
}

/* ============================================================================
   Dedicated Section Scene Illustrations
============================================================================ */

export function TurbanQuestionIllustration({ className = 'w-full h-36', alt = 'Rajasthani turban with question emblem' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 220 150">
      <circle cx="110" cy="78" r="56" fill="var(--color-marigold)" fillOpacity="0.3" />
      {/* Pagri / Turban */}
      <path d="M48 92 C46 52 84 34 128 40 C162 44 176 72 172 96 C152 108 66 108 48 92 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M56 76 C92 54 140 58 170 84" stroke="var(--color-marigold)" strokeWidth="6" strokeLinecap="round" />
      <path d="M64 94 C104 72 146 76 168 96" stroke="var(--bg-surface)" strokeWidth="4" strokeLinecap="round" />
      {/* Kalgi plume + big ? */}
      <circle cx="110" cy="46" r="20" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
      <text x="110" y="54" textAnchor="middle" fill="var(--color-cobalt)" fontSize="24" fontWeight="800">?</text>
    </IllustrationFrame>
  );
}

export function TrapPanelOneIllustration({ className = 'w-full h-36', alt = 'Designer and developer holding mismatched puzzle pieces' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 240 140">
      <rect x="8" y="8" width="224" height="124" rx="8" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
      <line x1="120" y1="8" x2="120" y2="132" stroke="var(--border-ink)" strokeWidth="2.5" strokeDasharray="5 4" />
      {/* Left: Designer square */}
      <rect x="34" y="42" width="54" height="54" rx="6" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
      <circle cx="61" cy="69" r="10" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2" />
      {/* Right: Developer round cog not fitting */}
      <circle cx="176" cy="69" r="26" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
      <text x="176" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800">{'</>'}</text>
      {/* Mismatch sparks */}
      <path d="M112 36 L128 46 M112 48 L128 36" stroke="var(--color-terracotta)" strokeWidth="3.5" strokeLinecap="round" />
    </IllustrationFrame>
  );
}

export function TrapPanelTwoIllustration({ className = 'w-full h-36', alt = 'Ad traffic pouring into a leaky bucket' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 240 140">
      <rect x="8" y="8" width="224" height="124" rx="8" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
      {/* Top Rupee Traffic */}
      <circle cx="96" cy="30" r="10" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <text x="96" y="34" textAnchor="middle" fill="#1B243B" fontSize="11" fontWeight="800">₹</text>
      <circle cx="136" cy="34" r="10" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
      {/* Leaky Bucket */}
      <path d="M76 52 H164 L152 108 H88 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M84 74 L62 114" stroke="var(--color-gulabi)" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" />
      <path d="M156 84 L182 118" stroke="var(--color-marigold)" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" />
      <ellipse cx="120" cy="120" rx="44" ry="6" fill="var(--color-terracotta)" fillOpacity="0.45" />
    </IllustrationFrame>
  );
}

export function TrapPanelThreeIllustration({ className = 'w-full h-36', alt = 'Tall report beside an empty cash box' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 240 140">
      <rect x="8" y="8" width="224" height="124" rx="8" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
      {/* Tall impressive vanity report */}
      <rect x="38" y="28" width="66" height="86" rx="4" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
      <line x1="50" y1="48" x2="92" y2="48" stroke="var(--border-ink)" strokeWidth="3" />
      <line x1="50" y1="64" x2="86" y2="64" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M50 96 L64 82 L76 88 L90 72" stroke="var(--color-cobalt)" strokeWidth="3" strokeLinecap="round" />
      {/* Empty gullak/cashbox */}
      <rect x="134" y="72" width="74" height="44" rx="4" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M134 72 L152 54 H196 L208 72 Z" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="3" />
      <text x="171" y="100" textAnchor="middle" fill="var(--border-ink)" fontSize="14" fontWeight="800">₹ 0</text>
    </IllustrationFrame>
  );
}

export function PillarHaveliIllustration({ className = 'w-full h-40', alt = 'Creative Haveli illustration' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 240 150">
      <path d="M36 136 V56 H64 V38 H176 V56 H204 V136 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M90 38 C98 16 142 16 150 38 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
      <rect x="74" y="64" width="92" height="72" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M102 136 V96 C102 82 138 82 138 96 V136 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
      {/* Color swatches on Haveli */}
      <circle cx="90" cy="84" r="6" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
      <circle cx="150" cy="84" r="6" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
    </IllustrationFrame>
  );
}

export function PillarKarkhanaIllustration({ className = 'w-full h-40', alt = 'Digital Karkhana illustration' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 240 150">
      <rect x="36" y="48" width="168" height="88" rx="6" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M58 48 C68 24 106 24 116 48 Z" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
      <rect x="52" y="66" width="136" height="54" rx="4" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <circle cx="96" cy="93" r="16" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" strokeDasharray="8 4" />
      <text x="150" y="99" textAnchor="middle" fill="var(--color-cobalt)" fontSize="22" fontWeight="800">{'</>'}</text>
    </IllustrationFrame>
  );
}

export function PillarBazaarIllustration({ className = 'w-full h-40', alt = 'Growth Bazaar illustration' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 240 150">
      <path d="M36 52 L54 24 H186 L204 52 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
      <rect x="48" y="52" width="144" height="84" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
      {/* Trending arrow chart */}
      <rect x="66" y="96" width="20" height="28" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2" />
      <rect x="96" y="80" width="20" height="44" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
      <rect x="126" y="62" width="20" height="62" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="2" />
      {/* Kite */}
      <path d="M168 62 L182 72 L170 88 L156 78 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
    </IllustrationFrame>
  );
}

export function ThreePillarsInterlockIllustration({ className = 'w-full h-36', alt = 'Brand, Website & Growth interlocked diagram' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 280 120">
      <circle cx="70" cy="60" r="38" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
      <circle cx="140" cy="60" r="38" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
      <circle cx="210" cy="60" r="38" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
      <text x="70" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800">BRAND</text>
      <text x="140" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800">WEB</text>
      <text x="210" y="64" textAnchor="middle" fill="#1B243B" fontSize="13" fontWeight="800">GROWTH</text>
    </IllustrationFrame>
  );
}

export function TierThaliIllustration({
  variant = 'starter',
  className = 'w-full h-24',
  alt = '',
}: {
  variant?: 'starter' | 'growth' | 'royal';
  className?: string;
  alt?: string;
}) {
  return (
    <IllustrationFrame alt={alt} decorative={!alt} className={className} viewBox="0 0 200 100">
      <ellipse cx="100" cy="54" rx="74" ry="34" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
      <ellipse cx="100" cy="54" rx="58" ry="24" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2" />
      {variant === 'starter' && (
        <>
          <circle cx="80" cy="54" r="12" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="120" cy="54" r="12" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
        </>
      )}
      {variant === 'growth' && (
        <>
          <circle cx="70" cy="52" r="11" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="100" cy="48" r="12" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="130" cy="52" r="11" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="100" cy="68" r="9" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
        </>
      )}
      {variant === 'royal' && (
        <>
          <circle cx="68" cy="52" r="10" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="100" cy="48" r="13" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <circle cx="132" cy="52" r="10" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="2.5" />
          <path d="M100 12 L106 24 L100 30 L94 24 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2" />
        </>
      )}
    </IllustrationFrame>
  );
}

export function KathputliCurtainIllustration({ className = 'w-20 h-16', alt = '' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} decorative={!alt} className={className} viewBox="0 0 120 90">
      <path d="M8 10 H112 V78 H8 Z" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M8 10 Q34 40 24 78 H8 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <path d="M112 10 Q86 40 96 78 H112 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <circle cx="60" cy="36" r="11" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <path d="M46 72 L52 48 H68 L74 72 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="2.5" />
    </IllustrationFrame>
  );
}

export function ChaiFaqIllustration({ className = 'w-36 h-32', alt = 'Jaipur chai-seller pouring steaming masala chai while answering questions' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 180 150">
      {/* Chai-seller character (pagri, smiling face, kurta, kettle) */}
      <circle cx="54" cy="48" r="20" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M32 42 C34 22 72 22 76 42 C64 46 44 46 32 42 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
      <path d="M36 35 Q54 27 72 35" stroke="var(--color-marigold)" strokeWidth="4" strokeLinecap="round" />
      {/* Eyes + cheerful moustache */}
      <circle cx="48" cy="49" r="2" fill="var(--border-ink)" />
      <circle cx="60" cy="49" r="2" fill="var(--border-ink)" />
      <path d="M44 58 Q54 54 64 58" stroke="var(--border-ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Body & arm holding kettle */}
      <path d="M26 122 C28 84 40 72 54 72 C68 72 80 84 82 122 Z" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
      {/* Brass kettle pouring */}
      <rect x="78" y="62" width="32" height="24" rx="6" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <path d="M110 74 L124 68" stroke="var(--border-ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M124 72 Q128 84 128 96" stroke="var(--color-terracotta)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Clay Kulhad on counter */}
      <path d="M110 96 H148 L142 128 H116 Z" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="3" />
      <ellipse cx="129" cy="96" rx="19" ry="5" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <path d="M20 128 H160" stroke="var(--border-ink)" strokeWidth="3" strokeLinecap="round" />
      {/* Answer Speech Bubble ? */}
      <circle cx="140" cy="34" r="18" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
      <text x="140" y="41" textAnchor="middle" fill="var(--color-gulabi)" fontSize="20" fontWeight="800">?</text>
      {/* Steam */}
      <path d="M126 84 Q130 76 126 70" stroke="var(--color-gulabi)" strokeWidth="2.5" strokeLinecap="round" className="animate-chai-steam" />
    </IllustrationFrame>
  );
}

export function CoinPouchIllustration({
  tier = 'sm',
  className = 'w-10 h-10',
}: {
  tier?: 'sm' | 'md' | 'lg' | 'explore';
  className?: string;
}) {
  const scale = tier === 'sm' ? 0.78 : tier === 'md' ? 0.92 : 1.05;
  return (
    <IllustrationFrame alt="" decorative className={className} viewBox="0 0 64 64">
      {tier === 'explore' ? (
        <>
          <circle cx="32" cy="32" r="22" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M24 32 L32 20 L40 32 L32 44 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
        </>
      ) : (
        <g transform={`translate(32 34) scale(${scale}) translate(-32 -34)`}>
          <path d="M22 18 L27 10 H37 L42 18 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
          <path d="M16 38 C16 24 22 18 32 18 C42 18 48 24 48 38 C48 48 42 54 32 54 C22 54 16 48 16 38 Z" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="3" />
          <line x1="21" y1="20" x2="43" y2="20" stroke="var(--color-marigold)" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="32" cy="37" r="9" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
          <text x="32" y="41" textAnchor="middle" fill="#171A26" fontSize="12" fontWeight="800">₹</text>
        </g>
      )}
    </IllustrationFrame>
  );
}

export function CelebrationBullseyeIllustration({ className = 'w-36 h-36', alt = 'Flying arrow hitting the bullseye' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 200 180">
      <circle cx="96" cy="96" r="62" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="3.5" />
      <circle cx="96" cy="96" r="42" fill="var(--color-cobalt)" stroke="var(--border-ink)" strokeWidth="3" />
      <circle cx="96" cy="96" r="22" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="3" />
      <circle cx="96" cy="96" r="8" fill="var(--color-gulabi)" />
      {/* Arrow */}
      <line x1="96" y1="96" x2="176" y2="28" stroke="var(--border-ink)" strokeWidth="5" strokeLinecap="round" />
      <path d="M162 40 L182 22 L188 34 L168 48 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <path d="M154 32 L174 16 L162 10 L146 28 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
      {/* Confetti */}
      <circle cx="28" cy="40" r="5" fill="var(--color-gulabi)" />
      <circle cx="172" cy="138" r="6" fill="var(--color-marigold)" />
      <rect x="26" y="138" width="10" height="10" rx="2" fill="var(--color-cobalt)" />
    </IllustrationFrame>
  );
}

export function JaipurMapCardIllustration({ className = 'w-full h-44', alt = 'Vector map of Jaipur studio location across C-Scheme and Johari Bazaar' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 320 170">
      <rect x="6" y="6" width="308" height="158" rx="8" fill="var(--bg-cream)" stroke="var(--border-ink)" strokeWidth="3" />
      {/* Jaipur Pink City Walled Grid Roads */}
      <line x1="20" y1="54" x2="300" y2="54" stroke="var(--border-ink)" strokeWidth="2" strokeOpacity="0.3" />
      <line x1="20" y1="112" x2="300" y2="112" stroke="var(--border-ink)" strokeWidth="2" strokeOpacity="0.3" />
      <line x1="92" y1="14" x2="92" y2="156" stroke="var(--border-ink)" strokeWidth="2" strokeOpacity="0.3" />
      <line x1="210" y1="14" x2="210" y2="156" stroke="var(--border-ink)" strokeWidth="2" strokeOpacity="0.3" />
      {/* Highlighted MI Road / C-Scheme Corridor */}
      <path d="M24 128 Q120 84 294 40" stroke="var(--color-cobalt)" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 6" />
      {/* Landmarks */}
      <rect x="218" y="60" width="66" height="24" rx="4" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2" />
      <text x="251" y="75" textAnchor="middle" fill="var(--border-ink)" fontSize="9" fontWeight="700">Johari Bazaar</text>
      <rect x="24" y="24" width="66" height="22" rx="4" fill="var(--bg-surface)" stroke="var(--border-ink)" strokeWidth="2" />
      <text x="57" y="38" textAnchor="middle" fill="var(--border-ink)" fontSize="9" fontWeight="700">C-Scheme</text>
      {/* Studio Pin */}
      <path d="M148 34 C132 34 120 46 120 62 C120 82 148 106 148 106 C148 106 176 82 176 62 C176 46 164 34 148 34 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
      <circle cx="148" cy="60" r="10" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
    </IllustrationFrame>
  );
}

export function EmptySearchIllustration({ className = 'w-28 h-24', alt = 'No matching search results' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 160 120">
      <circle cx="70" cy="56" r="30" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="3" />
      <line x1="92" y1="78" x2="118" y2="104" stroke="var(--border-ink)" strokeWidth="6" strokeLinecap="round" />
      <path d="M56 50 L68 42 L78 56 L66 64 Z" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2" />
      <path d="M74 62 Q86 72 78 78" stroke="var(--color-gulabi)" strokeWidth="2" fill="none" />
    </IllustrationFrame>
  );
}

export function LostKite404Illustration({ className = 'w-52 h-40', alt = 'A cut kite floating past Jaipur rooftops (404 page not found)' }: { className?: string; alt?: string }) {
  return (
    <IllustrationFrame alt={alt} className={className} viewBox="0 0 260 170">
      <path d="M24 150 H236" stroke="var(--border-ink)" strokeWidth="3" />
      <rect x="44" y="102" width="54" height="48" fill="var(--bg-sandstone)" stroke="var(--border-ink)" strokeWidth="3" />
      <rect x="160" y="92" width="60" height="58" fill="var(--color-terracotta)" stroke="var(--border-ink)" strokeWidth="3" />
      {/* Lost drifting patang */}
      <path d="M126 22 L162 46 L136 82 L100 58 Z" fill="var(--color-gulabi)" stroke="var(--border-ink)" strokeWidth="3" />
      <line x1="126" y1="22" x2="136" y2="82" stroke="var(--border-ink)" strokeWidth="2" />
      <line x1="100" y1="58" x2="162" y2="46" stroke="var(--border-ink)" strokeWidth="2" />
      <path d="M136 82 Q154 108 128 124 Q112 134 120 144" stroke="var(--color-cobalt)" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
      <circle cx="72" cy="48" r="14" fill="var(--color-marigold)" stroke="var(--border-ink)" strokeWidth="2.5" />
      <text x="72" y="53" textAnchor="middle" fill="#1B243B" fontSize="12" fontWeight="800">404</text>
    </IllustrationFrame>
  );
}
