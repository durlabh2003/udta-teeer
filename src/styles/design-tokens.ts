/**
 * Urdta Teeeeeer — Jaipur Pink City Visual Design Tokens
 * Single source of truth for design tokens (colours, 3 font families, 8px spacing grid, radii, borders, shadows).
 */

export const DESIGN_TOKENS = {
  brand: {
    name: 'Urdta Teeeeeer',
    tagline: 'You bring the ambition. We bring the aim.',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
  },
  colors: {
    cream: '#FFF7EC',
    sandstone: '#F5E6D3',
    offWhite: '#FFFDF8',
    gulabi: '#E83E79',
    gulabiSoft: '#F6B1C7',
    marigold: '#FFC21A',
    cobalt: '#1E56A0',
    cobaltBright: '#4C8DF6',
    terracotta: '#C2523C',
    indigo: '#1B243B',
    ink: '#171A26',
    darkCanvas: '#131929',
    darkSurface: '#1B243B',
    darkElevated: '#24304D',
  },
  typography: {
    display: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  scale: {
    display: 'clamp(2.25rem, 4.4vw, 3.75rem)',
    h2: 'clamp(1.75rem, 3vw, 2.75rem)',
    h3: 'clamp(1.25rem, 2vw, 1.625rem)',
    body: '1rem',
    small: '0.875rem',
    label: '0.75rem',
  },
  spacingGridPx: 8,
  borders: {
    width: '3px',
    radiusCard: '8px',
    radiusControl: '6px',
    radiusArch: '32px 32px 8px 8px',
  },
  shadows: {
    sm: '3px 3px 0 0 var(--shadow-color)',
    md: '5px 5px 0 0 var(--shadow-color)',
    lg: '7px 7px 0 0 var(--shadow-color)',
  },
} as const;

export type AccentTone =
  | 'marigold'
  | 'gulabi'
  | 'hotPink'
  | 'cobalt'
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
    bg: 'bg-[var(--color-marigold)]',
    text: 'text-[var(--ink-on-accent)]',
    darkBg: 'dark:bg-[var(--color-marigold)]',
    darkText: 'dark:text-[var(--ink-on-accent)]',
  },
  gulabi: {
    bg: 'bg-[var(--color-gulabi-soft)]',
    text: 'text-[var(--ink-on-accent)]',
    darkBg: 'dark:bg-[var(--color-gulabi-soft)]',
    darkText: 'dark:text-[var(--ink-on-accent)]',
  },
  hotPink: {
    bg: 'bg-[var(--color-gulabi)]',
    text: 'text-[var(--text-on-gulabi)]',
    darkBg: 'dark:bg-[var(--color-gulabi)]',
    darkText: 'dark:text-[var(--text-on-gulabi)]',
  },
  cobalt: {
    bg: 'bg-[var(--color-cobalt)]',
    text: 'text-[var(--text-on-cobalt)]',
    darkBg: 'dark:bg-[var(--color-cobalt-dark)]',
    darkText: 'dark:text-[var(--ink-on-accent)]',
  },
  peacock: {
    // Legacy alias mapped cleanly to Blue-Pottery Cobalt
    bg: 'bg-[var(--color-cobalt)]',
    text: 'text-[var(--text-on-cobalt)]',
    darkBg: 'dark:bg-[var(--color-cobalt-dark)]',
    darkText: 'dark:text-[var(--ink-on-accent)]',
  },
  terracotta: {
    bg: 'bg-[var(--color-terracotta)]',
    text: 'text-[var(--text-on-dark)]',
    darkBg: 'dark:bg-[var(--color-terracotta)]',
    darkText: 'dark:text-[var(--text-on-dark)]',
  },
  indigo: {
    bg: 'bg-[var(--color-indigo)]',
    text: 'text-[var(--text-on-dark)]',
    darkBg: 'dark:bg-[var(--bg-elevated)]',
    darkText: 'dark:text-[var(--text-primary)]',
  },
  cream: {
    bg: 'bg-[var(--bg-surface)]',
    text: 'text-[var(--text-primary)]',
    darkBg: 'dark:bg-[var(--bg-surface)]',
    darkText: 'dark:text-[var(--text-primary)]',
  },
  sandstone: {
    bg: 'bg-[var(--bg-sandstone)]',
    text: 'text-[var(--text-primary)]',
    darkBg: 'dark:bg-[var(--bg-canvas)]',
    darkText: 'dark:text-[var(--text-primary)]',
  },
};
