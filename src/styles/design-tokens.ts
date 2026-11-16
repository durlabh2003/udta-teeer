/**
 * Urdta Teeeeeer — Consolidated Digital Pink City + Neo-Brutalist Design Tokens
 * Combines Jaipur sandstone/terracotta/indigo warmth with bold tactile structure.
 */

export const DESIGN_TOKENS = {
  brand: {
    name: 'Urdta Teeeeeer',
    tagline: 'You bring the ambition. We bring the aim.',
    devanagariTagline: 'जयपुर से, दुनिया के लिए।',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
  },
  colors: {
    // Consolidated Pink City & Neo-Brutalist Palette
    sandstone: '#F3E5CE',
    ivory: '#FFF9F0',
    terracotta: '#B95E50',
    terracottaBright: '#D9482B',
    jaipurPink: '#E7B9A4',
    gulabi: '#F4A6B8',
    hotPink: '#FF4F8B',
    rose: '#D9776B',
    marigold: '#FFC21A',
    saffron: '#D99B35',
    peacock: '#1FB5B0',
    indigo: '#263650',
    charcoal: '#282522',
    ink: '#111111',
    cream: '#FFF4E0',
    darkCanvas: '#182235',
    darkSurface: '#212E46',
    darkElevated: '#263650',
  },
  typography: {
    display: "'Bricolage Grotesque', system-ui, sans-serif",
    editorial: "'Playfair Display', Georgia, serif",
    poster: "'Bowlby One', 'Bricolage Grotesque', sans-serif",
    body: "'DM Sans', system-ui, sans-serif",
    hand: "'Permanent Marker', cursive",
    devanagari: "'Noto Serif Devanagari', serif",
    mono: "'JetBrains Mono', monospace",
  },
  borders: {
    width: '3px',
    heavyWidth: '4px',
    radiusBrutal: '6px',
    radiusArch: '999px 999px 0 0',
  },
  shadows: {
    sm: '4px 4px 0 0 var(--shadow-color)',
    md: '6px 6px 0 0 var(--shadow-color)',
    lg: '8px 8px 0 0 var(--shadow-color)',
  },
} as const;

export type AccentTone =
  | 'marigold'
  | 'gulabi'
  | 'hotPink'
  | 'peacock'
  | 'terracotta'
  | 'indigo'
  | 'cream'
  | 'sandstone';

export const ACCENT_SURFACE_MAP: Record<
  AccentTone,
  { bg: string; text: string; darkBg: string; darkText: string }
> = {
  marigold: {
    bg: 'bg-[#FFC21A]',
    text: 'text-[#111111]',
    darkBg: 'dark:bg-[#FFC21A]',
    darkText: 'dark:text-[#111111]',
  },
  gulabi: {
    bg: 'bg-[#F4A6B8]',
    text: 'text-[#111111]',
    darkBg: 'dark:bg-[#E7B9A4]',
    darkText: 'dark:text-[#111111]',
  },
  hotPink: {
    bg: 'bg-[#FF4F8B]',
    text: 'text-[#111111]',
    darkBg: 'dark:bg-[#FF4F8B]',
    darkText: 'dark:text-[#111111]',
  },
  peacock: {
    bg: 'bg-[#1FB5B0]',
    text: 'text-[#111111]',
    darkBg: 'dark:bg-[#1FB5B0]',
    darkText: 'dark:text-[#111111]',
  },
  terracotta: {
    bg: 'bg-[#B95E50]',
    text: 'text-[#FFF9F0]',
    darkBg: 'dark:bg-[#B95E50]',
    darkText: 'dark:text-[#FFF9F0]',
  },
  indigo: {
    bg: 'bg-[#263650]',
    text: 'text-[#FFF9F0]',
    darkBg: 'dark:bg-[#263650]',
    darkText: 'dark:text-[#FFF9F0]',
  },
  cream: {
    bg: 'bg-[#FFF9F0]',
    text: 'text-[#282522]',
    darkBg: 'dark:bg-[#212E46]',
    darkText: 'dark:text-[#FFF9F0]',
  },
  sandstone: {
    bg: 'bg-[#F3E5CE]',
    text: 'text-[#282522]',
    darkBg: 'dark:bg-[#182235]',
    darkText: 'dark:text-[#FFF9F0]',
  },
};
