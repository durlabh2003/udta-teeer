import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { submitPlannerLead } from '../../lib/crmAdapter';
import { BrutalButton } from '../ui/BrutalButton';
import { RetroWindow } from '../ui/RetroWindow';
import { ThaliVisualizer } from '../ui/ThaliVisualizer';

const SESSION_STORAGE_KEY = 'ut_planner_draft_v1';

const PILLAR_GROUPS = [
  {
    group: 'Design — The Creative Haveli',
    options: ['Branding', 'Logo design', 'UI/UX', 'Website design', 'Graphic design', 'Packaging', 'Motion graphics'],
  },
  {
    group: 'Development — The Digital Karkhana',
    options: ['Business website', 'Landing page', 'E-commerce', 'Web application', 'Mobile application', 'SaaS platform', 'Dashboard', 'API & automation'],
  },
  {
    group: 'Marketing — The Growth Bazaar',
    options: ['SEO', 'Google Ads', 'Meta Ads', 'Social media', 'Content marketing', 'Lead generation', 'Performance marketing'],
  },
  {
    group: 'Complete Growth Solutions & Guidance',
    options: ['Design + Development', 'Development + Marketing', 'Design + Marketing', 'All three pillars', 'Not sure yet — I need consultation'],
  },
];

const INDUSTRIES = [
  'Retail',
  'Jewellery',
  'Hospitality',
  'Tourism',
  'Restaurant and Cafe',
  'Education',
  'Healthcare',
  'Real Estate',
  'Manufacturing',
  'Startup and Technology',
  'D2C and E-commerce',
  'Professional Services',
  'Other',
];

const OBJECTIVES = [
  'Build a new digital presence',
  'Improve an existing website',
  'Generate more leads',
  'Increase sales',
  'Improve brand identity',
  'Launch a new product',
  'Automate business operations',
  'Improve search visibility',
  'Improve customer experience',
];

const BUSINESS_STAGES = [
  'New business',
  'Growing business',
  'Established business',
  'New product or startup',
  'Rebranding or redevelopment',
];

const BUDGET_RANGES = [
  'Below ₹5,000',
  '₹5,000–₹10,000',
  '₹10,000–₹25,000',
  '₹25,000–₹50,000',
  '₹50,000–₹1,00,000',
  '₹1,00,000–₹3,00,000',
  '₹3,00,000+',
  'Not sure yet',
];

const TIMELINES = [
  'Immediately',
  'Within 7 days',
  'Within 15 days',
  'Within one month',
  '1–3 months',
  'More than 3 months',
  'Just exploring',
];

const ENGAGEMENT_TYPES = ['One-time project', 'Monthly engagement', 'Long-term partnership', 'Not sure'];

interface ProjectPlannerProps {
  mode?: 'page' | 'modal' | 'inline';
  onClose?: () => void;
}

const PRESELECT_LABEL_MAP: Record<string, string> = {
  'website-dev': 'Business website',
  'ecommerce-dev': 'E-commerce',
  'branding-identity': 'Branding',
  'ui-ux-design': 'UI/UX',
  'seo-aeo': 'SEO',
  'performance-marketing': 'Performance marketing',
  'social-growth-system': 'Social media',
  'crm-systems': 'API & automation',
  'mobile-app-dev': 'Mobile application',
  'web-app-dev': 'SaaS platform',
};

interface DraftState {
  step: number;
  selectedServices: string[];
  businessName: string;
  industry: string;
  otherIndustryText: string;
  website: string;
  primaryObjectives: string[];
  businessStage: string;
  budget: string;
  timeline: string;
  engagementType: string;
  requirementNotes: string;
}

export function ProjectPlanner({ mode = 'page', onClose }: ProjectPlannerProps) {
  const {
    preselectedServiceIds,
    preselectedIndustry,
    preselectedNote,
    setLastReceipt,
    triggerKiteShower,
  } = useApp();
  const navigate = useNavigate();
  const StepHeading = mode === 'page' ? 'h2' : 'h3';
  const SubHeading = mode === 'page' ? 'h3' : 'h4';

  const loadSessionDraft = (): Partial<DraftState> => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const savedDraft = typeof window !== 'undefined' ? loadSessionDraft() : {};

  const [step, setStep] = useState<number>(() => savedDraft.step ?? 1);
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    const mapped = preselectedServiceIds.map((id) => PRESELECT_LABEL_MAP[id]).filter(Boolean);
    if (mapped.length > 0) return Array.from(new Set(mapped));
    return Array.isArray(savedDraft.selectedServices) && savedDraft.selectedServices.length > 0
      ? savedDraft.selectedServices
      : ['Business website'];
  });

  // Step 2 state (preserved on Back navigation & active session)
  const [businessName, setBusinessName] = useState(savedDraft.businessName ?? '');
  const [industry, setIndustry] = useState(
    preselectedIndustry && INDUSTRIES.includes(preselectedIndustry)
      ? preselectedIndustry
      : savedDraft.industry ?? 'Retail'
  );
  const [otherIndustryText, setOtherIndustryText] = useState(savedDraft.otherIndustryText ?? '');
  const [website, setWebsite] = useState(savedDraft.website ?? '');
  const [primaryObjectives, setPrimaryObjectives] = useState<string[]>(
    savedDraft.primaryObjectives ?? ['Generate more leads']
  );
  const [businessStage, setBusinessStage] = useState(savedDraft.businessStage ?? 'Growing business');

  // Step 3 state
  const [budget, setBudget] = useState(savedDraft.budget ?? '₹25,000–₹50,000');
  const [timeline, setTimeline] = useState(savedDraft.timeline ?? 'Within one month');
  const [engagementType, setEngagementType] = useState(savedDraft.engagementType ?? 'One-time project');
  const [requirementNotes, setRequirementNotes] = useState(
    preselectedNote || savedDraft.requirementNotes || ''
  );

  // Step 4 state (not persisted outside current step state unless submitted with consent)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  // Sync context pre-selections when modal opens with new context
  useEffect(() => {
    if (preselectedServiceIds.length > 0) {
      const mapped = preselectedServiceIds.map((id) => PRESELECT_LABEL_MAP[id]).filter(Boolean);
      if (mapped.length > 0) setSelectedServices(Array.from(new Set(mapped)));
    }
  }, [preselectedServiceIds]);

  useEffect(() => {
    if (preselectedIndustry && INDUSTRIES.includes(preselectedIndustry)) {
      setIndustry(preselectedIndustry);
    }
  }, [preselectedIndustry]);

  useEffect(() => {
    if (preselectedNote) {
      setRequirementNotes(preselectedNote);
    }
  }, [preselectedNote]);

  // Persist non-PII requirement draft during active session (UT-US-027)
  useEffect(() => {
    try {
      const draft: DraftState = {
        step,
        selectedServices,
        businessName,
        industry,
        otherIndustryText,
        website,
        primaryObjectives,
        businessStage,
        budget,
        timeline,
        engagementType,
        requirementNotes,
      };
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore storage quota errors
    }
  }, [
    step,
    selectedServices,
    businessName,
    industry,
    otherIndustryText,
    website,
    primaryObjectives,
    businessStage,
    budget,
    timeline,
    engagementType,
    requirementNotes,
  ]);

  useEffect(() => {
    trackConversionEvent('planner_start', { source: `planner_${mode}` });
    trackConversionEvent('lead_form_start', { source: `planner_${mode}` });
  }, [mode]);

  const toggleService = (opt: string) => {
    setErrorMsg(null);
    setSelectedServices((prev) =>
      prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt]
    );
  };

  const toggleObjective = (obj: string) => {
    setPrimaryObjectives((prev) =>
      prev.includes(obj) ? prev.filter((o) => o !== obj) : [...prev, obj]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedServices.length === 0) {
      setErrorMsg('Please select at least one service or "Not sure yet" to continue.');
      trackConversionEvent('planner_validation_error', { step: 1 });
      return;
    }
    if (step === 2 && industry === 'Other' && otherIndustryText.trim().length < 2) {
      setErrorMsg('Please specify your industry so we can tailor recommendations.');
      trackConversionEvent('planner_validation_error', { step: 2 });
      return;
    }
    setErrorMsg(null);
    trackConversionEvent('planner_step_complete', { step, industry });
    if (step === 1) trackConversionEvent('lead_form_step_1', { serviceCount: selectedServices.length });
    if (step === 2) trackConversionEvent('lead_form_step_2', { industry });
    if (step === 3) trackConversionEvent('lead_form_step_3', { budgetBand: budget });
    setStep((s) => Math.min(4, s + 1));
  };

  const handleBack = () => {
    setErrorMsg(null);
    trackConversionEvent('planner_back_click', { step });
    setStep((s) => Math.max(1, s - 1));
  };

  const handleModalCloseAttempt = () => {
    if (!onClose) return;
    const hasEnteredDetails =
      step > 1 || businessName.trim().length > 0 || requirementNotes.trim().length > 0 || fullName.trim().length > 0;
    if (hasEnteredDetails && !confirmDiscard) {
      setConfirmDiscard(true);
      return;
    }
    setConfirmDiscard(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      trackConversionEvent('planner_validation_error', { step: 4, label: 'name' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      trackConversionEvent('planner_validation_error', { step: 4, label: 'email' });
      return;
    }
    if (!/^[+\d\s()-]{8,16}$/.test(phone.trim())) {
      setErrorMsg('Please enter a valid phone / mobile number.');
      trackConversionEvent('planner_validation_error', { step: 4, label: 'phone' });
      return;
    }
    if (!consent) {
      setErrorMsg('Please confirm the privacy consent checkbox so we can contact you.');
      trackConversionEvent('planner_validation_error', { step: 4, label: 'consent' });
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);

    const resolvedIndustry =
      industry === 'Other' && otherIndustryText.trim()
        ? `Other: ${otherIndustryText.trim()}`
        : industry;

    const res = await submitPlannerLead({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      businessName: businessName.trim(),
      industry: resolvedIndustry,
      website: website.trim(),
      primaryObjectives,
      businessStage,
      selectedServices,
      budget,
      timeline,
      engagementType,
      requirementNotes: requirementNotes.trim(),
      consent: true,
      honeypot,
    });

    setSubmitting(false);

    if (!res.ok) {
      setErrorMsg(res.error || 'Submission failed. Please try again — your details are preserved.');
      return;
    }

    trackConversionEvent('planner_submit', {
      source: `planner_${mode}`,
      serviceCount: selectedServices.length,
      budgetBand: budget,
      industry: resolvedIndustry,
    });
    trackConversionEvent('lead_form_submit', {
      source: `planner_${mode}`,
      serviceCount: selectedServices.length,
      budgetBand: budget,
    });

    try {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // ignore
    }

    setLastReceipt({
      leadId: res.leadId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      businessName: businessName.trim(),
      industry: resolvedIndustry,
      selectedServices,
      budget,
      timeline,
      whatsappUrl: res.whatsappUrl,
    });

    triggerKiteShower();
    if (onClose) onClose();
    navigate('/thank-you');
  };

  // Map string selections into visual Thali segments
  const thaliMapping = selectedServices.map((s) => {
    const low = s.toLowerCase();
    if (low.includes('seo')) return 'seo-aeo';
    if (low.includes('api') || low.includes('automation')) return 'crm-systems';
    if (low.includes('brand') || low.includes('ui') || low.includes('design') || low.includes('pack') || low.includes('motion')) return 'branding-identity';
    if (low.includes('ads') || low.includes('social') || low.includes('marketing')) return 'performance-marketing';
    return 'website-dev';
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className={mode === 'modal' ? 'lg:col-span-12' : 'lg:col-span-8'}>
        <RetroWindow
          title={`Let's Plan Your Next Shot — Step ${step} of 4 (~60s)`}
          accent="gulabi"
          onClose={mode === 'modal' ? handleModalCloseAttempt : undefined}
        >
          {/* Discard Confirmation Guard (Scenario 09) */}
          {confirmDiscard && (
            <div
              role="alert"
              className="mb-5 p-4 brutal-border bg-[#FFC21A] text-[#111111] rounded-[6px] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <span className="text-xs md:text-sm font-extrabold">
                Close planner? Your current selections are kept for this session.
              </span>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setConfirmDiscard(false)}
                  className="px-3 py-1.5 brutal-border bg-[#FFF9F0] text-xs font-bold rounded-[4px] cursor-pointer"
                >
                  Keep Editing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmDiscard(false);
                    onClose?.();
                  }}
                  className="px-3 py-1.5 brutal-border bg-[#111111] text-[#FFF9F0] text-xs font-bold rounded-[4px] cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono-num font-bold mb-2">
              <span>Step {step} / 4</span>
              <span>{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="w-full h-3.5 brutal-border bg-[#F3E5CE] dark:bg-[#182235] rounded-[4px] overflow-hidden">
              <div
                className="h-full bg-[#1FB5B0] transition-all duration-200"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="mb-5 p-3 brutal-border bg-[#FFC21A] text-[#111111] text-sm font-bold rounded-[4px]"
            >
              {errorMsg}
            </div>
          )}

          {/* STEP 1 — What do you need? */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <StepHeading className="text-2xl font-extrabold mb-1">
                  1. What would you like us to help you with?
                </StepHeading>
                <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">
                  Select one or multiple requirements across Design, Development, and Marketing.
                </p>
              </div>

              <div className="space-y-4">
                {PILLAR_GROUPS.map((grp) => (
                  <div key={grp.group}>
                    <SubHeading className="text-xs font-mono-num font-bold uppercase tracking-wider mb-2 text-[#B95E50] dark:text-[#FFC21A]">
                      {grp.group}
                    </SubHeading>
                    <div className="flex flex-wrap gap-2">
                      {grp.options.map((opt) => {
                        const active = selectedServices.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleService(opt)}
                            aria-pressed={active}
                            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-bold brutal-border rounded-[4px] cursor-pointer transition-colors ${
                              active
                                ? 'bg-[#FFC21A] text-[#111111]'
                                : 'bg-[#FFF9F0] dark:bg-[#182235] hover:bg-[#E7B9A4]/40'
                            }`}
                          >
                            {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Understand the business */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <StepHeading className="text-2xl font-extrabold mb-1">
                  2. Tell us a little about your business.
                </StepHeading>
                <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">
                  Helps us tailor examples and recommendations to your sector.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-biz" className="block text-sm font-bold mb-1">
                    Business Name (Optional)
                  </label>
                  <input
                    id="pp-biz"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Johari Heritage Jewels"
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="pp-ind" className="block text-sm font-bold mb-1">
                    Industry
                  </label>
                  <select
                    id="pp-ind"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {industry === 'Other' && (
                <div>
                  <label htmlFor="pp-other-ind" className="block text-sm font-bold mb-1">
                    Tell us your industry / sector *
                  </label>
                  <input
                    id="pp-other-ind"
                    type="text"
                    value={otherIndustryText}
                    onChange={(e) => setOtherIndustryText(e.target.value)}
                    placeholder="e.g. Solar EPC, Logistics Fleet, Pet Care..."
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-url" className="block text-sm font-bold mb-1">
                    Existing Website (Optional)
                  </label>
                  <input
                    id="pp-url"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbusiness.in"
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  />
                  <span className="text-[11px] opacity-75">
                    Share your existing website, if available.
                  </span>
                </div>

                <div>
                  <label htmlFor="pp-stage" className="block text-sm font-bold mb-1">
                    Business Stage
                  </label>
                  <select
                    id="pp-stage"
                    value={businessStage}
                    onChange={(e) => setBusinessStage(e.target.value)}
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  >
                    {BUSINESS_STAGES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold mb-2">Primary Objectives</span>
                <div className="flex flex-wrap gap-2">
                  {OBJECTIVES.map((obj) => {
                    const checked = primaryObjectives.includes(obj);
                    return (
                      <button
                        key={obj}
                        type="button"
                        onClick={() => toggleObjective(obj)}
                        className={`px-3 py-1.5 text-xs font-bold brutal-border rounded-[4px] cursor-pointer ${
                          checked
                            ? 'bg-[#1FB5B0] text-[#111111]'
                            : 'bg-[#FFF9F0] dark:bg-[#182235]'
                        }`}
                      >
                        {checked ? '✓ ' : ''}
                        {obj}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Budget & Timeline */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <StepHeading className="text-2xl font-extrabold mb-1">
                  3. Let&apos;s understand your expected investment and timeline.
                </StepHeading>
                <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">
                  These are enquiry qualification ranges so we can recommend the right phase plan.
                </p>
              </div>

              <div>
                <span className="block text-sm font-bold mb-2">Expected Budget Range</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`p-2.5 text-xs font-mono-num font-bold brutal-border rounded-[4px] cursor-pointer ${
                        budget === b
                          ? 'bg-[#FFC21A] text-[#111111]'
                          : 'bg-[#FFF9F0] dark:bg-[#182235]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-time" className="block text-sm font-bold mb-1">
                    Target Timeline
                  </label>
                  <select
                    id="pp-time"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  >
                    {TIMELINES.map((tl) => (
                      <option key={tl} value={tl}>
                        {tl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pp-eng" className="block text-sm font-bold mb-1">
                    Engagement Preference
                  </label>
                  <select
                    id="pp-eng"
                    value={engagementType}
                    onChange={(e) => setEngagementType(e.target.value)}
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  >
                    {ENGAGEMENT_TYPES.map((et) => (
                      <option key={et} value={et}>
                        {et}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="pp-notes" className="block text-sm font-bold mb-1">
                  Describe anything important that we should know
                </label>
                <textarea
                  id="pp-notes"
                  rows={3}
                  value={requirementNotes}
                  onChange={(e) => setRequirementNotes(e.target.value)}
                  placeholder="Optional reference links, deliverables, or questions..."
                  className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                />
              </div>
            </div>
          )}

          {/* STEP 4 — Contact Details & Consent */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <StepHeading className="text-2xl font-extrabold mb-1">
                  4. Where should we send your growth plan?
                </StepHeading>
                <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">
                  Your brief gets stored with a unique Lead ID and routed to our Jaipur studio desk.
                </p>
              </div>

              {/* Hidden honeypot for spam protection */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-name" className="block text-sm font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    id="pp-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Khandelwal"
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="pp-email" className="block text-sm font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    id="pp-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.in"
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-phone" className="block text-sm font-bold mb-1">
                    Mobile Number *
                  </label>
                  <input
                    id="pp-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98290 XXXXX"
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="pp-wa" className="block text-sm font-bold mb-1">
                    WhatsApp Number (if different)
                  </label>
                  <input
                    id="pp-wa"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Same as mobile if blank"
                    className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 p-3 brutal-border bg-[#F3E5CE] dark:bg-[#182235] rounded-[4px] cursor-pointer text-xs md:text-sm">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#B95E50]"
                />
                <span>
                  I agree to be contacted regarding this enquiry and understand how my information
                  will be used under the{' '}
                  <Link to="/privacy-policy" className="underline font-bold" onClick={onClose}>
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <div className="flex items-center justify-between gap-3 pt-2">
                <BrutalButton variant="cream" size="md" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </BrutalButton>
                <BrutalButton type="submit" variant="hotPink" size="md" disabled={submitting}>
                  <Sparkles className="w-4 h-4" />
                  <span>{submitting ? 'Submitting…' : 'Submit My Requirement'}</span>
                </BrutalButton>
              </div>
            </form>
          )}

          {step < 4 && (
            <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20">
              <BrutalButton variant="cream" size="md" onClick={handleBack} disabled={step === 1}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </BrutalButton>
              <BrutalButton variant="marigold" size="md" onClick={handleNext}>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </BrutalButton>
            </div>
          )}
        </RetroWindow>
      </div>

      {mode !== 'modal' && (
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          <ThaliVisualizer selectedServices={thaliMapping} />

          <div className="brutal-border brutal-shadow bg-[#FFF9F0] dark:bg-[#212E46] rounded-[6px] p-5 space-y-3">
            <SubHeading className="font-display font-extrabold text-lg">Your Growth Plan Summary</SubHeading>
            <div className="text-xs space-y-1 text-[#4B433C] dark:text-[#E7D8C5]">
              <p><strong>Industry:</strong> {industry === 'Other' && otherIndustryText ? `Other (${otherIndustryText})` : industry}</p>
              <p><strong>Budget Band:</strong> {budget}</p>
              <p><strong>Timeline:</strong> {timeline}</p>
            </div>
            <div className="pt-2 border-t-2 border-[#111111]/15 dark:border-[#FFF9F0]/20">
              <div className="text-xs font-bold mb-1.5">
                Selected ({selectedServices.length}):
              </div>
              <p className="text-xs leading-relaxed">
                {selectedServices.join(' · ') || 'None selected'}
              </p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
