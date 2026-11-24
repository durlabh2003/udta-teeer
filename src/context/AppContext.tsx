import React, { createContext, useContext, useEffect, useState } from 'react';
import enCopy from '../data/en.json';
import hinglishCopy from '../data/hinglish.json';
import siteConfig from '../data/site-config.json';

export type LanguageMode = 'hinglish' | 'en';
export type CopyDictionary = typeof hinglishCopy;

export interface SubmittedLeadReceipt {
  leadId: string;
  fullName: string;
  email: string;
  phone: string;
  businessName?: string;
  industry?: string;
  selectedServices: string[];
  budget: string;
  timeline: string;
  engagementType?: string;
  requirementNotes?: string;
  whatsappUrl: string;
  demoMode?: boolean;
}

export interface PlannerLaunchContext {
  services?: string[];
  industry?: string;
  note?: string;
}

export interface InMemoryPlannerDraft {
  step: number;
  activePillar: 'design' | 'development' | 'marketing' | 'combo' | 'all';
  selectedServices: string[];
  businessName: string;
  industry: string;
  otherIndustryText: string;
  website: string;
  businessStage: string;
  budget: string;
  timeline: string;
  engagementType: string;
  requirementNotes: string;
}

export const INITIAL_PLANNER_DRAFT: InMemoryPlannerDraft = {
  step: 1,
  activePillar: 'development',
  selectedServices: ['Business website'],
  businessName: '',
  industry: 'Retail & Jewellery',
  otherIndustryText: '',
  website: '',
  businessStage: 'Growing business',
  budget: '₹25,000 – ₹60,000',
  timeline: 'Within 1 month',
  engagementType: 'One-time project',
  requirementNotes: '',
};

interface AppContextValue {
  lang: LanguageMode;
  setLang: (lang: LanguageMode) => void;
  toggleLang: () => void;
  t: CopyDictionary;
  isDark: boolean;
  toggleDark: () => void;
  preselectedServiceIds: string[];
  setPreselectedServiceIds: React.Dispatch<React.SetStateAction<string[]>>;
  preselectedIndustry: string;
  setPreselectedIndustry: React.Dispatch<React.SetStateAction<string>>;
  preselectedNote: string;
  setPreselectedNote: React.Dispatch<React.SetStateAction<string>>;
  plannerDraft: InMemoryPlannerDraft;
  setPlannerDraft: React.Dispatch<React.SetStateAction<InMemoryPlannerDraft>>;
  resetPlannerDraft: () => void;
  plannerModalOpen: boolean;
  plannerDirty: boolean;
  setPlannerDirty: React.Dispatch<React.SetStateAction<boolean>>;
  plannerConfirmDiscard: boolean;
  setPlannerConfirmDiscard: React.Dispatch<React.SetStateAction<boolean>>;
  requestClosePlannerModal: () => void;
  confirmDiscardAndClosePlanner: () => void;
  openPlannerModal: (preselect?: string[] | PlannerLaunchContext) => void;
  closePlannerModal: () => void;
  auditModalOpen: boolean;
  openAuditModal: () => void;
  closeAuditModal: () => void;
  searchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  lastReceipt: SubmittedLeadReceipt | null;
  setLastReceipt: (r: SubmittedLeadReceipt | null) => void;
  chaiCount: number;
  brewChai: () => void;
  kiteShowerCount: number;
  triggerKiteShower: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageMode>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem('ut_lang');
    return saved === 'en' || saved === 'hinglish' ? saved : 'hinglish';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('ut_theme') === 'dark';
  });

  const [preselectedServiceIds, setPreselectedServiceIds] = useState<string[]>([]);
  const [preselectedIndustry, setPreselectedIndustry] = useState<string>('Retail & Jewellery');
  const [preselectedNote, setPreselectedNote] = useState<string>('');
  const [plannerDraft, setPlannerDraft] = useState<InMemoryPlannerDraft>(INITIAL_PLANNER_DRAFT);
  const [plannerModalOpen, setPlannerModalOpen] = useState(false);
  const [plannerDirty, setPlannerDirty] = useState(false);
  const [plannerConfirmDiscard, setPlannerConfirmDiscard] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<SubmittedLeadReceipt | null>(null);
  const [chaiCount, setChaiCount] = useState<number>(siteConfig.statsConfig.cupsOfChaiBrewed);
  const [kiteShowerCount, setKiteShowerCount] = useState<number>(0);

  // Clear legacy storage drafts per 15.8 (keep planner draft in-memory only)
  useEffect(() => {
    try {
      window.sessionStorage.removeItem('ut_planner_draft_v1');
      window.localStorage.removeItem('ut_planner_draft_v1');
    } catch {
      // ignore
    }
  }, []);

  // Keep <html lang="..."> synced with language toggle (3.7)
  useEffect(() => {
    document.documentElement.lang = lang === 'hinglish' ? 'en-IN' : 'en';
    document.documentElement.setAttribute('data-ut-lang', lang);
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem('ut_theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('ut_theme', 'light');
    }
  }, [isDark]);

  const setLang = (next: LanguageMode) => {
    setLangState(next);
    try {
      window.localStorage.setItem('ut_lang', next);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => setLang(lang === 'hinglish' ? 'en' : 'hinglish');
  const toggleDark = () => setIsDark((prev) => !prev);
  const brewChai = () => setChaiCount((c) => c + 1);
  const triggerKiteShower = () => setKiteShowerCount((c) => c + 1);

  const resetPlannerDraft = () => {
    setPlannerDraft(INITIAL_PLANNER_DRAFT);
    setPreselectedServiceIds([]);
    setPreselectedNote('');
    setPlannerDirty(false);
    setPlannerConfirmDiscard(false);
  };

  const openPlannerModal = (preselect?: string[] | PlannerLaunchContext) => {
    if (Array.isArray(preselect)) {
      if (preselect.length > 0) setPreselectedServiceIds(preselect);
    } else if (preselect) {
      if (preselect.services && preselect.services.length > 0) {
        setPreselectedServiceIds(preselect.services);
      }
      if (preselect.industry) {
        setPreselectedIndustry(preselect.industry);
      }
      if (preselect.note !== undefined) {
        setPreselectedNote(preselect.note);
      }
    }
    setPlannerConfirmDiscard(false);
    setPlannerModalOpen(true);
  };

  const closePlannerModal = () => {
    setPlannerConfirmDiscard(false);
    setPlannerModalOpen(false);
  };

  const requestClosePlannerModal = () => {
    if (plannerDirty) {
      setPlannerConfirmDiscard(true);
      return;
    }
    setPlannerConfirmDiscard(false);
    setPlannerModalOpen(false);
  };

  const confirmDiscardAndClosePlanner = () => {
    resetPlannerDraft();
    setPlannerConfirmDiscard(false);
    setPlannerModalOpen(false);
  };

  const openAuditModal = () => setAuditModalOpen(true);
  const closeAuditModal = () => setAuditModalOpen(false);
  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);
      if (!isInput && (e.key === 'k' || e.key === 'K') && !e.metaKey && !e.ctrlKey) {
        setKiteShowerCount((c) => c + 1);
      }
      if (!isInput && e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const t = lang === 'hinglish' ? hinglishCopy : enCopy;

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        isDark,
        toggleDark,
        preselectedServiceIds,
        setPreselectedServiceIds,
        preselectedIndustry,
        setPreselectedIndustry,
        preselectedNote,
        setPreselectedNote,
        plannerDraft,
        setPlannerDraft,
        resetPlannerDraft,
        plannerModalOpen,
        plannerDirty,
        setPlannerDirty,
        plannerConfirmDiscard,
        setPlannerConfirmDiscard,
        requestClosePlannerModal,
        confirmDiscardAndClosePlanner,
        openPlannerModal,
        closePlannerModal,
        auditModalOpen,
        openAuditModal,
        closeAuditModal,
        searchModalOpen,
        openSearchModal,
        closeSearchModal,
        lastReceipt,
        setLastReceipt,
        chaiCount,
        brewChai,
        kiteShowerCount,
        triggerKiteShower,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
