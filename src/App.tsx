/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { PAGE_META_DICTIONARY, resolvePageKeyFromPath, updateMetaTags } from './lib/seoMeta';
import { generateLocalBusinessSchema } from './lib/seoSchema';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { FreeAuditModal } from './components/sections/FreeAuditModal';
import { ProjectPlanner } from './components/sections/ProjectPlanner';
import { ChaiLoader } from './components/ui/ChaiLoader';
import { EasterEggs } from './components/ui/EasterEggs';
import { OfflineIndicator } from './components/ui/OfflineIndicator';
import { SearchModal } from './components/ui/SearchModal';
import { AboutPage } from './pages/AboutPage';
import { BriefBuilderPage } from './pages/BriefBuilderPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { IndustriesPage } from './pages/IndustriesPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { InsightsPage } from './pages/InsightsPage';
import { LeadDashboardPage } from './pages/LeadDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PackagesPage } from './pages/PackagesPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ProcessPage } from './pages/ProcessPage';
import { ServiceLandingPage } from './pages/ServiceLandingPage';
import { ServicePillarPage } from './pages/ServicePillarPage';
import { ServicesPage } from './pages/ServicesPage';
import { TermsPage } from './pages/TermsPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { WorkPage } from './pages/WorkPage';

function RouteMetaSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const pageKey = resolvePageKeyFromPath(pathname);
    if (PAGE_META_DICTIONARY[pageKey]) {
      updateMetaTags(pageKey, { path: pathname || '/' });
    }
    generateLocalBusinessSchema(pageKey, { path: pathname || '/' });
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function ServiceSlugRouter() {
  const { slug } = useParams<{ slug: string }>();
  return <ServiceLandingPage slug={slug ?? ''} />;
}

function PlannerModalOverlay() {
  const {
    plannerModalOpen,
    plannerDirty,
    requestClosePlannerModal,
    closePlannerModal,
  } = useApp();

  useEffect(() => {
    if (!plannerModalOpen) return;
    if (window.history.state?.plannerModal !== true) {
      window.history.pushState({ ...(window.history.state ?? {}), plannerModal: true }, '');
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        requestClosePlannerModal();
      }
    };

    const onPopState = () => {
      if (plannerDirty) {
        window.history.pushState({ plannerModal: true }, '');
        requestClosePlannerModal();
      } else {
        closePlannerModal();
      }
    };

    document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', onPopState);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onPopState);
      document.body.style.overflow = '';
    };
  }, [plannerModalOpen, plannerDirty, requestClosePlannerModal, closePlannerModal]);

  if (!plannerModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Project Planner"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[var(--color-indigo)]/75"
      onClick={requestClosePlannerModal}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ProjectPlanner mode="modal" onClose={requestClosePlannerModal} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <RouteMetaSync />
        <ScrollToTop />
        <ChaiLoader />
        <EasterEggs />
        <OfflineIndicator />
        <PlannerModalOverlay />
        <FreeAuditModal />
        <SearchModal />
        <div className="min-h-screen flex flex-col bg-[var(--bg-cream)] text-[var(--text-primary)]">
          <Navbar />
          <main id="main-content" className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/design" element={<ServicePillarPage pillar="design" />} />
              <Route path="/services/development" element={<ServicePillarPage pillar="development" />} />
              <Route path="/services/marketing" element={<ServicePillarPage pillar="marketing" />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/industries/:slug" element={<IndustryDetailPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<InsightDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/build" element={<BriefBuilderPage />} />
              <Route path="/plan-your-project" element={<BriefBuilderPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/admin/leads" element={<LeadDashboardPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              {/* 11 SEO / AEO Service Landing Slugs */}
              <Route path="/:slug" element={<ServiceSlugRouter />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
