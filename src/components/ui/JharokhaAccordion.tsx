import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface JharokhaAccordionProps {
  items: FaqItem[];
}

export function JharokhaAccordion({ items }: JharokhaAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accordionId = useId();
  const cappedItems = items.slice(0, 6);

  return (
    <div className="space-y-3">
      {cappedItems.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${accordionId}-btn-${idx}`;
        const panelId = `${accordionId}-panel-${idx}`;

        return (
          <div
            key={item.q}
            className="brutal-border brutal-shadow-sm rounded-t-[18px] rounded-b-[8px] bg-[var(--bg-surface)] overflow-hidden"
          >
            {/* Jharokha cusped arch accent trim */}
            <div
              className="h-2 w-full border-b-2 border-[var(--border-ink)] bg-[var(--color-gulabi)]/25"
              aria-hidden="true"
            />
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full min-h-[48px] flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-[var(--bg-sandstone)]/40 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]"
            >
              <span className="font-display font-bold text-sm md:text-base text-[var(--text-primary)] pr-2">
                {item.q}
              </span>
              <span
                className={`w-9 h-9 shrink-0 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] flex items-center justify-center rounded-[6px] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-2.5 border-t-2 border-dashed border-[var(--border-ink)]/25 text-sm leading-relaxed text-[var(--text-secondary)] break-words">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
