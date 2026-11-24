import React from 'react';

const MARQUEE_ITEMS = [
  'Websites & D2C Stores',
  'Brand Identity',
  'Performance Ads',
  'SEO + AI Search (AEO)',
  'UI/UX Systems',
  'Hindi & Hinglish Content',
  'CRM & Automation',
  'SaaS & Web Apps',
];

export function ServiceMarquee() {
  return (
    <div
      className="w-full overflow-hidden border-y-2 border-[var(--border-ink)] bg-[var(--color-marigold)] text-[var(--text-on-marigold)] py-2.5 select-none"
      aria-label="Core studio capabilities"
    >
      <div className="animate-marquee flex items-center gap-5">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-5 shrink-0">
            <span className="font-display font-bold text-xs md:text-sm tracking-tight whitespace-nowrap">
              {item}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <path
                d="M12 2L20 12L12 22L4 12L12 2Z"
                fill="var(--color-gulabi)"
                stroke="var(--border-ink)"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
