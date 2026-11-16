import React from 'react';

interface ThaliVisualizerProps {
  selectedServices: string[];
}

const KATORI_SLOTS = [
  { id: 'banawat', label: 'Dev', color: '#1FB5B0', cx: 110, cy: 74 },
  { id: 'hawa', label: 'Growth', color: '#FFC21A', cx: 190, cy: 74 },
  { id: 'rang', label: 'Design', color: '#FF4F8B', cx: 82, cy: 138 },
  { id: 'seo', label: 'SEO', color: '#D9482B', cx: 218, cy: 138 },
  { id: 'auto', label: 'AI/CRM', color: '#F4A6B8', cx: 150, cy: 185 },
];

export function ThaliVisualizer({ selectedServices }: ThaliVisualizerProps) {
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
    <div className="flex flex-col items-center p-4 brutal-border bg-[#FFF4E0] dark:bg-[#14163D] rounded-[6px]">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="font-display font-bold text-sm">Aapki Studio Thali</span>
        <span className="font-mono-num text-xs font-bold">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
      </div>

      <svg
        viewBox="0 0 300 230"
        className="w-full max-w-[260px] h-auto"
        role="img"
        aria-label={`Studio thali visualizer showing ${count} selected capabilities`}
      >
        {/* Brass Thali Plate */}
        <ellipse
          cx="150"
          cy="122"
          rx="128"
          ry="96"
          fill="#FFC21A"
          stroke="#111111"
          strokeWidth="4"
        />
        <ellipse
          cx="150"
          cy="122"
          rx="112"
          ry="82"
          fill="#FFF9EE"
          stroke="#111111"
          strokeWidth="3"
        />

        {/* Center Main Dish (Diagnostic / Core) */}
        <circle
          cx="150"
          cy="122"
          r="34"
          fill={count > 0 ? '#F4A6B8' : '#E5DEC9'}
          stroke="#111111"
          strokeWidth="3"
          className="transition-colors duration-200"
        />
        <text
          x="150"
          y="126"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#111111"
        >
          {count > 0 ? 'TEER!' : 'EMPTY'}
        </text>

        {/* Surrounding Katoris */}
        {KATORI_SLOTS.map((slot) => {
          const filled = activeMap[slot.id];
          return (
            <g key={slot.id}>
              <circle
                cx={slot.cx}
                cy={slot.cy}
                r="24"
                fill={filled ? slot.color : '#EFE6D2'}
                stroke="#111111"
                strokeWidth="3"
                className="transition-all duration-200"
              />
              <text
                x={slot.cx}
                y={slot.cy + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#111111"
              >
                {slot.label}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="text-xs text-center text-[#3A3532] dark:text-[#E6D8C5] mt-2">
        {count === 0
          ? 'Services chuno — thali bharna shuru karo!'
          : count < 3
            ? 'Badiya shuruwat! Aur items add kar sakte ho.'
            : 'Ekdum Dal-Baati-Churma level full stack scene set hai!'}
      </p>
    </div>
  );
}
