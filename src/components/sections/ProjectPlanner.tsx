import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Compass,
  Flame,
  HelpCircle,
  Layers,
  Loader2,
  RefreshCw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { INITIAL_PLANNER_DRAFT, useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { submitPlannerLead } from '../../lib/crmAdapter';
import {
  CoinPouchIllustration,
  ServiceIllustration,
  ServiceIllustrationKey,
} from '../illustrations/JaipurIllustrations';
import { BrutalButton } from '../ui/BrutalButton';
import { RetroWindow } from '../ui/RetroWindow';
import { ThaliVisualizer } from '../ui/ThaliVisualizer';

type PillarKey = 'design' | 'development' | 'marketing' | 'combo';

interface PillarDef {
  id: PillarKey;
  title: string;
  subtitle: string;
  illustrationKey: ServiceIllustrationKey;
  options: Array<{ label: string; illustrationKey: ServiceIllustrationKey }>;
}

const PILLARS: PillarDef[] = [
  {
    id: 'design',
    title: 'Design Haveli',
    subtitle: 'Identity, logo & UI',
    illustrationKey: 'branding',
    options: [
      { label: 'Branding & Logo', illustrationKey: 'branding' },
      { label: 'UI/UX & Prototype', illustrationKey: 'ui-ux' },
      { label: 'Website Design', illustrationKey: 'logo' },
      { label: 'Packaging & Motion', illustrationKey: 'packaging' },
    ],
  },
  {
    id: 'development',
    title: 'Dev Karkhana',
    subtitle: 'Sites, stores & apps',
    illustrationKey: 'website',
    options: [
      { label: 'Business website', illustrationKey: 'website' },
      { label: 'E-commerce store', illustrationKey: 'ecommerce' },
      { label: 'Web app / SaaS MVP', illustrationKey: 'saas' },
      { label: 'Mobile app', illustrationKey: 'mobile-app' },
      { label: 'CRM & AI automation', illustrationKey: 'crm' },
    ],
  },
  {
    id: 'marketing',
    title: 'Growth Bazaar',
    subtitle: 'SEO, ads & content',
    illustrationKey: 'performance',
    options: [
      { label: 'SEO + AI Search', illustrationKey: 'seo' },
      { label: 'Google Search Ads', illustrationKey: 'google-ads' },
      { label: 'Meta Ads & Social', illustrationKey: 'meta-social' },
      { label: 'Content & Lead Gen', illustrationKey: 'lead-gen' },
    ],
  },
  {
    id: 'combo',
    title: 'Full Studio Stack',
    subtitle: 'Combined or unsure',
    illustrationKey: 'performance',
    options: [
      { label: 'Design + Website Launch', illustrationKey: 'website' },
      { label: 'Store + Performance Ads', illustrationKey: 'ecommerce' },
      { label: 'All Three Pillars', illustrationKey: 'dashboard' },
      { label: 'Not sure yet — guide me', illustrationKey: 'content' },
    ],
  },
];

const INDUSTRIES = [
  'Retail & Jewellery',
  'Hospitality & Tourism',
  'Handicrafts & Lifestyle',
  'Restaurant & Cafe',
  'Education',
  'Healthcare',
  'Real Estate',
  'Manufacturing',
  'Startup & SaaS',
  'D2C E-Commerce',
  'Other',
];

const BUSINESS_STAGES = [
  'New business',
  'Growing business',
  'Established business',
  'New product / startup',
  'Rebranding / relaunch',
];

const BUDGET_POUCHES: Array<{
  label: string;
  pouchSize: 'sm' | 'md' | 'lg' | 'explore';
  tag: string;
}> = [
  { label: 'Under ₹10,000 (Starter)', pouchSize: 'sm', tag: 'Starter' },
  { label: '₹10,000 – ₹25,000', pouchSize: 'sm', tag: 'Compact' },
  { label: '₹25,000 – ₹60,000', pouchSize: 'md', tag: 'Standard' },
  { label: '₹60,000 – ₹1,20,000', pouchSize: 'md', tag: 'Growth' },
  { label: '₹1,20,000 – ₹3,00,000', pouchSize: 'lg', tag: 'Scale' },
  { label: '₹3,00,000+', pouchSize: 'lg', tag: 'Flagship' },
  { label: 'Not sure yet', pouchSize: 'explore', tag: 'Guide me' },
];

const TIMELINE_OPTIONS = [
  { label: 'Immediately (This week)', Icon: Flame },
  { label: 'Within 15 days', Icon: Zap },
  { label: 'Within 1 month', Icon: Calendar },
  { label: '1–3 months', Icon: Clock },
  { label: 'Just exploring', Icon: Compass },
];

const ENGAGEMENT_OPTIONS = [
  { label: 'One-time project', sub: 'Fixed scope & delivery', Icon: Briefcase },
  { label: 'Monthly sprint', sub: 'Continuous design/ads', Icon: RefreshCw },
  { label: 'Long-term partner', sub: 'Embedded studio team', Icon: Layers },
  { label: 'Not sure', sub: 'Recommend on call', Icon: HelpCircle },
];

const PRESELECT_LABEL_MAP: Record<string, string> = {
  'website-dev': 'Business website',
  'ecommerce-dev': 'E-commerce store',
  'branding-identity': 'Branding & Logo',
  'ui-ux-design': 'UI/UX & Prototype',
  'seo-aeo': 'SEO + AI Search',
  'performance-marketing': 'Google Search Ads',
  'social-growth-system': 'Meta Ads & Social',
  'crm-systems': 'CRM & AI automation',
  'mobile-app-dev': 'Mobile app',
  'web-app-dev': 'Web app / SaaS MVP',
};

const INDIAN_MOBILE_REGEX = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;
const FLEX_URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type InvalidFieldKey =
  | 'services'
  | 'otherIndustry'
  | 'website'
  | 'fullName'
  | 'email'
  | 'phone'
  | 'consent'
  | null;

interface ProjectPlannerProps {
  mode?: 'page' | 'modal' | 'inline';
  onClose?: () => void;
}

export function ProjectPlanner({ mode = 'page', onClose }: ProjectPlannerProps) {
  const {
    t,
    preselectedServiceIds,
    preselectedIndustry,
    preselectedNote,
    plannerDraft,
    setPlannerDraft,
    resetPlannerDraft,
    setPlannerDirty,
    plannerConfirmDiscard,
    setPlannerConfirmDiscard,
    requestClosePlannerModal,
    confirmDiscardAndClosePlanner,
    closePlannerModal,
    setLastReceipt,
    triggerKiteShower,
  } = useApp();
  const navigate = useNavigate();
  const StepHeading = mode === 'page' ? 'h2' : 'h3';

  const [activePillar, setActivePillar] = useState<PillarKey>(() =>
    plannerDraft.activePillar && plannerDraft.activePillar !== 'all'
      ? plannerDraft.activePillar
      : 'development'
  );
  const [step, setStep] = useState<number>(() => plannerDraft.step || 1);
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    const mapped = preselectedServiceIds.map((id) => PRESELECT_LABEL_MAP[id]).filter(Boolean);
    if (mapped.length > 0) return Array.from(new Set(mapped));
    return plannerDraft.selectedServices.length > 0
      ? plannerDraft.selectedServices
      : INITIAL_PLANNER_DRAFT.selectedServices;
  });

  const [businessName, setBusinessName] = useState(plannerDraft.businessName);
  const [industry, setIndustry] = useState(() => {
    const matched = INDUSTRIES.find(
      (i) => i.toLowerCase() === preselectedIndustry.toLowerCase() ||
             i.toLowerCase().includes(preselectedIndustry.toLowerCase())
    );
    return matched || plannerDraft.industry || INITIAL_PLANNER_DRAFT.industry;
  });
  const [otherIndustryText, setOtherIndustryText] = useState(plannerDraft.otherIndustryText);
  const [website, setWebsite] = useState(plannerDraft.website);
  const [businessStage, setBusinessStage] = useState(plannerDraft.businessStage);

  const [budget, setBudget] = useState(plannerDraft.budget || INITIAL_PLANNER_DRAFT.budget);
  const [timeline, setTimeline] = useState(plannerDraft.timeline || INITIAL_PLANNER_DRAFT.timeline);
  const [engagementType, setEngagementType] = useState(
    plannerDraft.engagementType || INITIAL_PLANNER_DRAFT.engagementType
  );
  const [requirementNotes, setRequirementNotes] = useState(
    preselectedNote || plannerDraft.requirementNotes || ''
  );

  // Step 4 contact fields (ephemeral)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [invalidField, setInvalidField] = useState<InvalidFieldKey>(null);
  const [submitting, setSubmitting] = useState(false);
  const [servicesTouched, setServicesTouched] = useState(false);
  const [mobileThaliOpen, setMobileThaliOpen] = useState(false);

  const otherIndustryRef = useRef<HTMLInputElement | null>(null);
  const websiteRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const consentRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (preselectedServiceIds.length > 0) {
      const mapped = preselectedServiceIds.map((id) => PRESELECT_LABEL_MAP[id]).filter(Boolean);
      if (mapped.length > 0) setSelectedServices(Array.from(new Set(mapped)));
    }
  }, [preselectedServiceIds]);

  useEffect(() => {
    if (preselectedIndustry) {
      const matched = INDUSTRIES.find(
        (i) => i.toLowerCase() === preselectedIndustry.toLowerCase() ||
               i.toLowerCase().includes(preselectedIndustry.toLowerCase())
      );
      if (matched) setIndustry(matched);
    }
  }, [preselectedIndustry]);

  useEffect(() => {
    if (preselectedNote) setRequirementNotes(preselectedNote);
  }, [preselectedNote]);

  // Keep dirty status & non-PII draft synced in-memory via AppContext
  useEffect(() => {
    setPlannerDraft({
      step,
      activePillar,
      selectedServices,
      businessName,
      industry,
      otherIndustryText,
      website,
      businessStage,
      budget,
      timeline,
      engagementType,
      requirementNotes,
    });

    const hasUserInput =
      servicesTouched ||
      step > 1 ||
      businessName.trim().length > 0 ||
      otherIndustryText.trim().length > 0 ||
      website.trim().length > 0 ||
      requirementNotes.trim().length > 0 ||
      fullName.trim().length > 0 ||
      email.trim().length > 0 ||
      phone.trim().length > 0 ||
      whatsapp.trim().length > 0 ||
      consent ||
      budget !== INITIAL_PLANNER_DRAFT.budget ||
      timeline !== INITIAL_PLANNER_DRAFT.timeline ||
      engagementType !== INITIAL_PLANNER_DRAFT.engagementType;

    setPlannerDirty(hasUserInput);
  }, [
    servicesTouched,
    step,
    activePillar,
    selectedServices,
    businessName,
    industry,
    otherIndustryText,
    website,
    businessStage,
    budget,
    timeline,
    engagementType,
    requirementNotes,
    fullName,
    email,
    phone,
    whatsapp,
    consent,
    setPlannerDraft,
    setPlannerDirty,
  ]);

  useEffect(() => {
    trackConversionEvent('planner_start', { source: `planner_${mode}` });
    trackConversionEvent('lead_form_start', { source: `planner_${mode}` });
  }, [mode]);

  const markDirtyAndClearError = () => {
    setErrorMsg(null);
    setInvalidField(null);
  };

  const toggleService = (opt: string) => {
    markDirtyAndClearError();
    setServicesTouched(true);
    setSelectedServices((prev) =>
      prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt]
    );
  };

  const handleRemoveFromThali = (categoryKey: string) => {
    setServicesTouched(true);
    setSelectedServices((prev) =>
      prev.filter((label) => {
        const low = label.toLowerCase();
        if (categoryKey === 'banawat') return !(low.includes('website') || low.includes('commerce') || low.includes('app') || low.includes('saas'));
        if (categoryKey === 'hawa') return !(low.includes('ads') || low.includes('social') || low.includes('marketing') || low.includes('content') || low.includes('lead'));
        if (categoryKey === 'rang') return !(low.includes('brand') || low.includes('ui') || low.includes('design') || low.includes('pack'));
        if (categoryKey === 'seo') return !low.includes('seo');
        if (categoryKey === 'auto') return !(low.includes('crm') || low.includes('automation'));
        return true;
      })
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedServices.length === 0) {
      setErrorMsg(t.errors.servicesRequired);
      setInvalidField('services');
      trackConversionEvent('planner_validation_error', { step: 1 });
      return;
    }
    if (step === 2) {
      if (industry === 'Other' && otherIndustryText.trim().length < 2) {
        setErrorMsg(t.errors.industryOtherRequired);
        setInvalidField('otherIndustry');
        trackConversionEvent('planner_validation_error', { step: 2 });
        otherIndustryRef.current?.focus();
        return;
      }
      if (website.trim() && !FLEX_URL_REGEX.test(website.trim())) {
        setErrorMsg(t.errors.urlInvalid);
        setInvalidField('website');
        trackConversionEvent('planner_validation_error', { step: 2, label: 'url' });
        websiteRef.current?.focus();
        return;
      }
    }
    markDirtyAndClearError();
    trackConversionEvent('planner_step_complete', { step, industry });
    setStep((s) => Math.min(4, s + 1));
  };

  const handleBack = () => {
    markDirtyAndClearError();
    trackConversionEvent('planner_back_click', { step });
    setStep((s) => Math.max(1, s - 1));
  };

  const handleModalCloseAttempt = () => {
    if (mode === 'modal') {
      requestClosePlannerModal();
      return;
    }
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (fullName.trim().length < 2) {
      setErrorMsg(t.errors.nameRequired);
      setInvalidField('fullName');
      fullNameRef.current?.focus();
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setErrorMsg(t.errors.emailInvalid);
      setInvalidField('email');
      emailRef.current?.focus();
      return;
    }
    if (!INDIAN_MOBILE_REGEX.test(phone.trim())) {
      setErrorMsg(t.errors.phoneInvalid);
      setInvalidField('phone');
      phoneRef.current?.focus();
      return;
    }
    if (!consent) {
      setErrorMsg(t.errors.consentRequired);
      setInvalidField('consent');
      consentRef.current?.focus();
      return;
    }

    markDirtyAndClearError();
    setSubmitting(true);

    const resolvedIndustry =
      industry === 'Other' && otherIndustryText.trim()
        ? `Other: ${otherIndustryText.trim()}`
        : industry;

    const normalizedUrl =
      website.trim() && !website.trim().startsWith('http')
        ? `https://${website.trim()}`
        : website.trim();

    const res = await submitPlannerLead({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      businessName: businessName.trim(),
      industry: resolvedIndustry,
      website: normalizedUrl,
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
      setErrorMsg(res.error || 'Submission failed. Your details remain intact.');
      return;
    }

    trackConversionEvent('planner_submit', {
      source: `planner_${mode}`,
      serviceCount: selectedServices.length,
      budgetBand: budget,
      industry: resolvedIndustry,
    });

    const receiptPayload = {
      leadId: res.leadId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      businessName: businessName.trim(),
      industry: resolvedIndustry,
      selectedServices: [...selectedServices],
      budget,
      timeline,
      engagementType,
      requirementNotes: requirementNotes.trim(),
      whatsappUrl: res.whatsappUrl,
      demoMode: true,
    };

    resetPlannerDraft();
    setLastReceipt(receiptPayload);
    triggerKiteShower();
    if (mode === 'modal') {
      closePlannerModal();
    } else if (onClose) {
      onClose();
    }
    navigate('/thank-you');
  };

  const thaliMapping = selectedServices.map((s) => {
    const low = s.toLowerCase();
    if (low.includes('seo')) return 'seo-aeo';
    if (low.includes('crm') || low.includes('automation')) return 'crm-systems';
    if (low.includes('brand') || low.includes('ui') || low.includes('design') || low.includes('pack')) return 'branding-identity';
    if (low.includes('ads') || low.includes('social') || low.includes('marketing') || low.includes('content') || low.includes('lead')) return 'performance-marketing';
    return 'website-dev';
  });

  const currentPillar = PILLARS.find((p) => p.id === activePillar) ?? PILLARS[1];
  const stepName = t.planner.stepNames[step - 1] ?? '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className={mode === 'modal' ? 'lg:col-span-12' : 'lg:col-span-8'}>
        <RetroWindow
          title={`${t.planner.windowTitle} — ${t.planner.stepOf} ${step}/4: ${stepName}`}
          accent="gulabi"
          onClose={mode === 'modal' ? handleModalCloseAttempt : undefined}
        >
          {/* Discard Confirmation Guard */}
          {plannerConfirmDiscard && mode === 'modal' && (
            <div
              role="alert"
              data-testid="planner-discard-confirm"
              className="mb-5 p-4 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <span className="text-xs md:text-sm font-bold">{t.planner.discardPrompt}</span>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setPlannerConfirmDiscard(false)}
                  className="min-h-[44px] px-4 py-1.5 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs font-bold rounded-[6px] cursor-pointer"
                >
                  {t.planner.keepEditing}
                </button>
                <button
                  type="button"
                  onClick={() => confirmDiscardAndClosePlanner()}
                  className="min-h-[44px] px-4 py-1.5 brutal-border bg-[var(--color-indigo)] text-[#FFF7EC] text-xs font-bold rounded-[6px] cursor-pointer"
                >
                  {t.planner.closeWindow}
                </button>
              </div>
            </div>
          )}

          {/* Named Progress Bar with aria-live */}
          <div className="mb-6" aria-live="polite">
            <div className="flex items-center justify-between type-label mb-2">
              <span>
                {t.planner.stepOf} {step}/4 · <span className="text-[var(--text-gulabi)]">{stepName}</span>
              </span>
              <span>{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="w-full h-3.5 brutal-border bg-[var(--bg-cream)] rounded-[6px] overflow-hidden">
              <div
                className="h-full bg-[var(--color-cobalt)] transition-all duration-200"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {errorMsg && (
            <div
              id="pp-error-alert"
              role="alert"
              className="mb-5 p-3 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] text-sm font-bold rounded-[8px]"
            >
              {errorMsg}
            </div>
          )}

          {/* STEP 1 — Progressive Pillar Selector Cards */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <StepHeading className="type-h3 mb-1">{t.planner.step1Heading}</StepHeading>
                <p className="type-small text-[var(--text-secondary)]">
                  {t.planner.step1Sub} ({selectedServices.length} selected).
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PILLARS.map((pillar) => {
                  const active = pillar.id === activePillar;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => setActivePillar(pillar.id)}
                      aria-pressed={active}
                      className={`p-3 brutal-border rounded-[8px] text-left flex flex-col items-center text-center gap-2 cursor-pointer transition-all ${
                        active
                          ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)] brutal-shadow-sm -translate-y-0.5'
                          : 'bg-[var(--bg-cream)] hover:bg-[var(--bg-sandstone)]'
                      }`}
                    >
                      <div className="w-14 h-11">
                        <ServiceIllustration name={pillar.illustrationKey} alt="" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-xs md:text-sm">{pillar.title}</div>
                        <div className="text-[11px] opacity-85">{pillar.subtitle}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 brutal-border bg-[var(--bg-cream)] rounded-[10px] space-y-3">
                <div className="type-label text-[var(--text-terracotta)]">
                  {currentPillar.title} Options
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPillar.options.map((opt) => {
                    const active = selectedServices.includes(opt.label);
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => toggleService(opt.label)}
                        aria-pressed={active}
                        className={`min-h-[52px] px-3 py-2 brutal-border rounded-[8px] flex items-center justify-between gap-2 text-left cursor-pointer transition-colors ${
                          active
                            ? 'bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)]'
                            : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-sandstone)]/60'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-8 h-7 shrink-0 bg-[var(--bg-surface)] brutal-border rounded-[4px] p-0.5">
                            <ServiceIllustration name={opt.illustrationKey} alt="" />
                          </span>
                          <span className="text-xs md:text-sm font-bold">{opt.label}</span>
                        </span>
                        {active && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Business Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <StepHeading className="type-h3 mb-1">{t.planner.step2Heading}</StepHeading>
                <p className="type-small text-[var(--text-secondary)]">{t.planner.step2Sub}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-biz" className="block text-sm font-bold mb-1">
                    {t.forms.businessName}
                  </label>
                  <input
                    id="pp-biz"
                    type="text"
                    value={businessName}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setBusinessName(e.target.value);
                    }}
                    placeholder="e.g. Johari Heritage Jewels"
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="pp-ind" className="block text-sm font-bold mb-1">
                    {t.forms.industry}
                  </label>
                  <select
                    id="pp-ind"
                    value={industry}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setIndustry(e.target.value);
                    }}
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm font-medium"
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
                    Specify Your Industry *
                  </label>
                  <input
                    ref={otherIndustryRef}
                    id="pp-other-ind"
                    type="text"
                    aria-invalid={invalidField === 'otherIndustry'}
                    aria-describedby={invalidField === 'otherIndustry' ? 'pp-error-alert' : undefined}
                    value={otherIndustryText}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setOtherIndustryText(e.target.value);
                    }}
                    placeholder="e.g. Solar EPC, Logistics Fleet..."
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-url" className="block text-sm font-bold mb-1">
                    {t.forms.website}
                  </label>
                  <input
                    ref={websiteRef}
                    id="pp-url"
                    type="text"
                    aria-invalid={invalidField === 'website'}
                    aria-describedby={invalidField === 'website' ? 'pp-error-alert' : undefined}
                    value={website}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setWebsite(e.target.value);
                    }}
                    placeholder="brand.in or https://brand.in"
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="pp-stage" className="block text-sm font-bold mb-1">
                    {t.forms.businessStage}
                  </label>
                  <select
                    id="pp-stage"
                    value={businessStage}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setBusinessStage(e.target.value);
                    }}
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm font-medium"
                  >
                    {BUSINESS_STAGES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Illustrated Coin-Pouch Budget Cards, Visual Timeline Cards & Visual Engagement Cards */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <StepHeading className="type-h3 mb-1">{t.planner.step3Heading}</StepHeading>
                <p className="type-small text-[var(--text-secondary)]">{t.planner.step3Sub}</p>
              </div>

              {/* Illustrated Coin-Pouch Budget Options */}
              <div>
                <span className="block text-sm font-bold mb-2.5">{t.planner.budgetLabel}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {BUDGET_POUCHES.map((item) => {
                    const selected = budget === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          markDirtyAndClearError();
                          setBudget(item.label);
                        }}
                        aria-pressed={selected}
                        className={`min-h-[56px] p-2.5 brutal-border rounded-[8px] cursor-pointer text-left flex items-center gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)] ${
                          selected
                            ? 'bg-[var(--color-marigold)] text-[var(--text-on-marigold)] brutal-shadow-sm -translate-y-0.5'
                            : 'bg-[var(--bg-cream)] hover:bg-[var(--bg-sandstone)]/60'
                        }`}
                      >
                        <CoinPouchIllustration tier={item.pouchSize} className="w-8 h-7 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="type-label opacity-80 leading-none mb-0.5">{item.tag}</div>
                          <div className="text-xs font-mono-num font-bold leading-tight">{item.label}</div>
                        </div>
                        {selected && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visual Target Timeline Cards */}
              <div>
                <span className="block text-sm font-bold mb-2.5">{t.planner.timelineLabel}</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TIMELINE_OPTIONS.map(({ label, Icon }) => {
                    const selected = timeline === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          markDirtyAndClearError();
                          setTimeline(label);
                        }}
                        aria-pressed={selected}
                        className={`min-h-[48px] p-2.5 brutal-border rounded-[8px] cursor-pointer text-left flex items-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)] ${
                          selected
                            ? 'bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] brutal-shadow-sm -translate-y-0.5'
                            : 'bg-[var(--bg-cream)] hover:bg-[var(--bg-sandstone)]/60'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span className="text-xs font-bold leading-tight flex-1">{label}</span>
                        {selected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visual Engagement Model Cards */}
              <div>
                <span className="block text-sm font-bold mb-2.5">{t.planner.engagementLabel}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ENGAGEMENT_OPTIONS.map(({ label, sub, Icon }) => {
                    const selected = engagementType === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          markDirtyAndClearError();
                          setEngagementType(label);
                        }}
                        aria-pressed={selected}
                        className={`min-h-[52px] p-3 brutal-border rounded-[8px] cursor-pointer text-left flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-marigold)] ${
                          selected
                            ? 'bg-[var(--color-gulabi)] text-[var(--text-on-gulabi)] brutal-shadow-sm -translate-y-0.5'
                            : 'bg-[var(--bg-cream)] hover:bg-[var(--bg-sandstone)]/60'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold leading-tight">{label}</div>
                          <div className="text-[11px] opacity-85 leading-tight">{sub}</div>
                        </div>
                        {selected && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="pp-notes" className="block text-sm font-bold mb-1">
                  {t.forms.notes}
                </label>
                <textarea
                  id="pp-notes"
                  rows={2}
                  value={requirementNotes}
                  onChange={(e) => {
                    markDirtyAndClearError();
                    setRequirementNotes(e.target.value);
                  }}
                  placeholder="Reference links, priorities, or questions..."
                  className="w-full px-3.5 py-2.5 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
                />
              </div>
            </div>
          )}

          {/* STEP 4 — Validated Contact Details & Submission */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <StepHeading className="type-h3 mb-1">{t.planner.step4Heading}</StepHeading>
                <p className="type-small text-[var(--text-secondary)]">{t.planner.step4Sub}</p>
              </div>

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
                    {t.forms.fullName}
                  </label>
                  <input
                    ref={fullNameRef}
                    id="pp-name"
                    type="text"
                    required
                    aria-invalid={invalidField === 'fullName'}
                    aria-describedby={invalidField === 'fullName' ? 'pp-error-alert' : undefined}
                    value={fullName}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setFullName(e.target.value);
                    }}
                    placeholder="e.g. Aarav Khandelwal"
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="pp-email" className="block text-sm font-bold mb-1">
                    {t.forms.email}
                  </label>
                  <input
                    ref={emailRef}
                    id="pp-email"
                    type="email"
                    required
                    aria-invalid={invalidField === 'email'}
                    aria-describedby={invalidField === 'email' ? 'pp-error-alert' : undefined}
                    value={email}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setEmail(e.target.value);
                    }}
                    placeholder="you@brand.in"
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-phone" className="block text-sm font-bold mb-1">
                    {t.forms.phone}
                  </label>
                  <input
                    ref={phoneRef}
                    id="pp-phone"
                    type="tel"
                    required
                    aria-invalid={invalidField === 'phone'}
                    aria-describedby={invalidField === 'phone' ? 'pp-error-alert' : undefined}
                    value={phone}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setPhone(e.target.value);
                    }}
                    placeholder="+91 98290 12345"
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="pp-wa" className="block text-sm font-bold mb-1">
                    {t.forms.whatsapp}
                  </label>
                  <input
                    id="pp-wa"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => {
                      markDirtyAndClearError();
                      setWhatsapp(e.target.value);
                    }}
                    placeholder="Same as mobile if blank"
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
                  />
                </div>
              </div>

              <label className="min-h-[44px] flex items-start gap-3 p-3 brutal-border bg-[var(--bg-cream)] rounded-[8px] cursor-pointer text-xs md:text-sm">
                <input
                  ref={consentRef}
                  type="checkbox"
                  checked={consent}
                  aria-invalid={invalidField === 'consent'}
                  aria-describedby={invalidField === 'consent' ? 'pp-error-alert' : undefined}
                  onChange={(e) => {
                    markDirtyAndClearError();
                    setConsent(e.target.checked);
                  }}
                  className="mt-1 w-4 h-4 accent-[var(--color-gulabi)]"
                />
                <span>
                  {t.planner.consentPrefix}{' '}
                  <Link to="/privacy-policy" className="underline font-bold" onClick={closePlannerModal}>
                    {t.planner.privacyLink}
                  </Link>
                  .
                </span>
              </label>

              {/* Mobile Collapsible Thali Summary Pill above Submit */}
              {mode !== 'modal' && (
                <div className="lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileThaliOpen((o) => !o)}
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] flex items-center justify-between text-xs font-bold"
                  >
                    <span>Thali Summary: {selectedServices.length} items · {budget}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileThaliOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileThaliOpen && (
                    <div className="mt-2">
                      <ThaliVisualizer selectedServices={thaliMapping} onRemoveSlot={handleRemoveFromThali} />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <BrutalButton variant="secondary" size="md" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.planner.backBtn}</span>
                </BrutalButton>
                <BrutalButton type="submit" variant="primary" size="md" disabled={submitting}>
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>{submitting ? t.planner.submittingBtn : t.planner.submitBtn}</span>
                </BrutalButton>
              </div>
            </form>
          )}

          {step < 4 && (
            <div className="space-y-3 pt-6 mt-6 border-t border-[var(--border-ink)]/15">
              {mode !== 'modal' && (
                <div className="lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileThaliOpen((o) => !o)}
                    className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] flex items-center justify-between text-xs font-bold"
                  >
                    <span>Aapki Thali: {selectedServices.length} items selected</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileThaliOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileThaliOpen && (
                    <div className="mt-2">
                      <ThaliVisualizer selectedServices={thaliMapping} onRemoveSlot={handleRemoveFromThali} />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <BrutalButton variant="secondary" size="md" onClick={handleBack} disabled={step === 1}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.planner.backBtn}</span>
                </BrutalButton>
                <BrutalButton variant="primary" size="md" onClick={handleNext}>
                  <span>{t.planner.continueBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </BrutalButton>
              </div>
            </div>
          )}
        </RetroWindow>
      </div>

      {mode !== 'modal' && (
        <aside className="hidden lg:block lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          <ThaliVisualizer selectedServices={thaliMapping} onRemoveSlot={handleRemoveFromThali} />

          <div className="brutal-border brutal-shadow bg-[var(--bg-surface)] rounded-[10px] p-5 space-y-3">
            <h3 className="font-display font-bold text-lg">Live Scope Summary</h3>
            <div className="text-xs space-y-1 text-[var(--text-secondary)]">
              <p><strong>Industry:</strong> {industry === 'Other' && otherIndustryText ? otherIndustryText : industry}</p>
              <p><strong>Budget:</strong> {budget}</p>
              <p><strong>Timing:</strong> {timeline}</p>
              <p><strong>Model:</strong> {engagementType}</p>
            </div>
            <div className="pt-2 border-t border-[var(--border-ink)]/15">
              <div className="text-xs font-bold mb-1">
                Selected ({selectedServices.length}):
              </div>
              <p className="text-xs leading-relaxed">
                {selectedServices.join(' · ') || 'None yet'}
              </p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
