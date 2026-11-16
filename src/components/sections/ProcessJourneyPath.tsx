import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { BrutalCard } from '../ui/BrutalCard';

const SIX_STAGES = [
  {
    num: '01',
    title: 'Understand the Target',
    activities: ['Initial consultation & business analysis', 'Audience & competitor understanding', 'Problem identification'],
    deliverables: ['Discovery discussion', 'Initial requirement brief', 'Clear project objectives'],
  },
  {
    num: '02',
    title: 'Plan the Shot',
    activities: ['Solution architecture & scope definition', 'Priority setting & milestone sequencing', 'Timeline & realistic budget estimation'],
    deliverables: ['90-day / project roadmap', 'Signed scope document', 'Milestone payment schedule'],
  },
  {
    num: '03',
    title: 'Design the Direction',
    activities: ['Brand exploration & creative direction', 'User journey mapping & wireframes', 'UI/UX design & clickable prototype'],
    deliverables: ['Visual direction concepts', 'Figma wireframes & UI screens', 'Interactive prototype'],
  },
  {
    num: '04',
    title: 'Build the Solution',
    activities: ['Frontend & backend engineering', 'Creative & bilingual content production', 'CRM, payment & analytics integrations'],
    deliverables: ['Staging website / web app', 'Creative assets', 'Functional integrations'],
  },
  {
    num: '05',
    title: 'Launch with Precision',
    activities: ['Responsive, browser & speed QA', 'Technical SEO & Schema indexing', 'Zero-downtime deployment & activation'],
    deliverables: ['QA sign-off report', 'Production deployment', 'Team handover & 30-day support'],
  },
  {
    num: '06',
    title: 'Optimise and Grow',
    activities: ['Live analytics & funnel monitoring', 'SEO/AEO & conversion rate optimization', 'Ad creative & campaign scaling'],
    deliverables: ['Owned performance dashboard', 'Monthly optimization sprint', 'Continuous improvement log'],
  },
];

export function ProcessJourneyPath() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="space-y-6">
      {/* Interactive Checkpoint Stepper Route (Amer Fort Step-by-Step Arrow Path) */}
      <div className="relative p-4 brutal-border bg-[#FFF9F0] dark:bg-[#212E46] rounded-[6px] overflow-x-auto">
        <div className="flex items-center justify-between min-w-[640px] gap-2">
          {SIX_STAGES.map((st, idx) => {
            const isCompleted = idx <= activeStep;
            const isCurrent = idx === activeStep;
            return (
              <React.Fragment key={st.num}>
                <button
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-2 px-3 py-2 brutal-border rounded-[4px] cursor-pointer transition-colors shrink-0 ${
                    isCurrent
                      ? 'bg-[#FFC21A] text-[#111111]'
                      : isCompleted
                        ? 'bg-[#1FB5B0] text-[#111111]'
                        : 'bg-[#FFFFFF] dark:bg-[#182235]'
                  }`}
                >
                  <span className="font-mono-num text-xs font-extrabold">{st.num}</span>
                  <span className="text-xs font-bold whitespace-nowrap">{st.title}</span>
                </button>
                {idx < SIX_STAGES.length - 1 && (
                  <span
                    className={`flex-1 h-1 min-w-[16px] ${
                      idx < activeStep ? 'bg-[#1FB5B0]' : 'bg-[#111111]/20 dark:bg-[#FFF9F0]/20'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Checkpoint Detail Panel + All 6 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SIX_STAGES.map((stage, idx) => {
          const isCurrent = idx === activeStep;
          return (
            <div
              key={stage.num}
              onClick={() => setActiveStep(idx)}
              className="cursor-pointer"
            >
              <BrutalCard
                tone={isCurrent ? 'marigold' : 'surface'}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-poster text-2xl text-[#B95E50] dark:text-[#FF4F8B]">
                      {stage.num}
                    </span>
                    {idx <= activeStep && (
                      <CheckCircle2 className="w-5 h-5 text-[#111111] dark:text-[#1FB5B0]" />
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold">{stage.title}</h3>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider opacity-75 mb-1">
                      Activities
                    </div>
                    <ul className="space-y-1 text-xs md:text-sm">
                      {stage.activities.map((a) => (
                        <li key={a}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20">
                  <div className="text-xs font-bold uppercase tracking-wider opacity-75 mb-1">
                    Deliverables
                  </div>
                  <p className="text-xs font-medium">{stage.deliverables.join(' · ')}</p>
                </div>
              </BrutalCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
