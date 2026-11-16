import React, { useState } from 'react';
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

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.q}
            className="brutal-border brutal-shadow-sm rounded-t-[28px] rounded-b-[6px] bg-[#FFFFFF] dark:bg-[#1D2052] overflow-hidden"
          >
            {/* Jharokha cusped arch top trim */}
            <div
              className="h-2.5 w-full border-b-[3px] border-[#111111] dark:border-[#FFF4E0] bg-[#F4A6B8]"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#FFF9EE] dark:hover:bg-[#252968] transition-colors"
            >
              <span className="font-display font-bold text-base md:text-lg text-[#111111] dark:text-[#FFF4E0]">
                {item.q}
              </span>
              <span
                className={`w-9 h-9 shrink-0 brutal-border bg-[#FFC21A] text-[#111111] flex items-center justify-center rounded-[4px] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-2 border-t-2 border-dashed border-[#111111]/30 dark:border-[#FFF4E0]/30 text-sm md:text-base leading-relaxed text-[#3A3532] dark:text-[#E6D8C5]">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
