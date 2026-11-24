import React from 'react';

interface ThaliVisualizerProps {
  selectedServices: string[];
  onRemoveSlot?: (slotId: string) => void;
}

const KATORI_SLOTS = [
  { id: 'banawat', label: 'Dev', color: 'var(--color-cobalt)', textFill: '#FFFFFF', cx: 110, cy: 74 },
  { id: 'hawa', label: 'Growth', color: 'var(--color-marigold)', textFill: '#1B243B', cx: 190, cy: 74 },
  { id: 'rang', label: 'Design', color: 'var(--color-gulabi)', textFill: '#FFFFFF', cx: 82, cy: 138 },
  { id: 'seo', label: 'SEO', color: 'var(--color-terracotta)', textFill: '#FFFFFF', cx: 218, cy: 138 },
  { id: 'auto', label: 'AI/CRM', color: 'var(--bg-sandstone)', textFill: '#1B243B', cx: 150, cy: 185 },
];

export function ThaliVisualizer({ selectedServices, onRemoveSlot }: ThaliVisualizerProps) {
  const count = selectedServices.length;

  const hasBanawat = selectedServices.some((id) =>
    ['website-dev', 'ecommerce-dev', 'web-app-dev', 'mobile-app-dev'].includes(id)
  );
  const hasHawa = selectedServices.some((id) =>
    ['performance-marketing', 'digital-marketing-system', 'social-growth-system'].includes(id)
  );
  const hasRang = selectedServices.some((id) =>
    ['branding-identity', 'ui-ux-design', 'creative-motion'].includes(id)
  );
  const hasSeo = selectedServices.includes('seo-aeo');
  const hasAuto = selectedServices.includes('crm-systems');

  const activeMap: Record<string, boolean> = {
    banawat: hasBanawat,
    hawa: hasHawa,
    rang: hasRang,
    seo: hasSeo,
    auto: hasAuto,
  };

  return (
    <div className="flex flex-col items-center p-4 brutal-border bg-[var(--bg-surface)] rounded-[10px]">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="font-display font-bold text-sm">Aapki Studio Thali</span>
        <span className="type-label text-[var(--text-cobalt)]">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
      </div>

      <svg
        viewBox="0 0 300 230"
        className="w-full max-w-[260px] h-auto"
        role="img"
        aria-label={`Studio thali visualizer showing ${count} selected capabilities`}
      >
        <ellipse
          cx="150"
          cy="122"
          rx="128"
          ry="96"
          fill="var(--color-marigold)"
          stroke="var(--border-ink)"
          strokeWidth="4"
        />
        <ellipse
          cx="150"
          cy="122"
          rx="112"
          ry="82"
          fill="var(--bg-cream)"
          stroke="var(--border-ink)"
          strokeWidth="3"
        />

        <circle
          cx="150"
          cy="122"
          r="34"
          fill={count > 0 ? 'var(--color-gulabi)' : 'var(--bg-sandstone)'}
          stroke="var(--border-ink)"
          strokeWidth="3"
          className="transition-colors duration-200"
        />
        <text
          x="150"
          y="126"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill={count > 0 ? '#FFFFFF' : 'var(--text-primary)'}
        >
          {count > 0 ? 'TEER!' : 'EMPTY'}
        </text>

        {KATORI_SLOTS.map((slot) => {
          const filled = activeMap[slot.id];
          const clickable = Boolean(filled && onRemoveSlot);
          return (
            <g
              key={slot.id}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-label={clickable ? `Remove ${slot.label} from your selection` : undefined}
              onClick={() => {
                if (clickable && onRemoveSlot) onRemoveSlot(slot.id);
              }}
              onKeyDown={(e) => {
                if (clickable && onRemoveSlot && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onRemoveSlot(slot.id);
                }
              }}
              className={clickable ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''}
            >
              <circle
                cx={slot.cx}
                cy={slot.cy}
                r={filled ? 26 : 24}
                fill={filled ? slot.color : 'var(--bg-surface)'}
                stroke="var(--border-ink)"
                strokeWidth="3"
                className="transition-all duration-200"
              />
              <text
                x={slot.cx}
                y={slot.cy + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill={filled ? slot.textFill : 'var(--text-primary)'}
              >
                {filled && onRemoveSlot ? `${slot.label} ×` : slot.label}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="text-xs text-center text-[var(--text-secondary)] mt-2">
        {count === 0
          ? 'Pick services to fill your Studio Thali.'
          : onRemoveSlot
            ? 'Tap any filled katori to remove it.'
            : count < 3
              ? 'Strong start — add another pillar anytime.'
              : 'Full Dal-Baati-Churma stack ready to launch.'}
      </p>
    </div>
  );
}
