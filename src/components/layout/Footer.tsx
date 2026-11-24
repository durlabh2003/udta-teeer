import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import siteConfig from '../../data/site-config.json';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { buildWhatsAppLink } from '../../lib/crmAdapter';
import { BrutalButton } from '../ui/BrutalButton';
import { JaipurSkylineDivider } from '../ui/JaaliDivider';
import { PWAInstallButton } from '../ui/PWAInstallButton';

const CHAI_JOKES = [
  'Ek cutting adrak chai, aur ek conversion rate double — dono kadak chahiye!',
  'Jaipur rule #1: Kaam ho ya na ho, pehle chai toh thandi na ho.',
  'Good UX is like masala chai — simple ingredients, zero bitterness.',
  'Off-the-shelf themes are like lukewarm tea bags. We brew fresh.',
];

export function Footer() {
  const {
    lang,
    toggleLang,
    t,
    chaiCount,
    brewChai,
    openAuditModal,
    openPlannerModal,
    plannerModalOpen,
    auditModalOpen,
    searchModalOpen,
  } = useApp();
  const [chaiJoke, setChaiJoke] = useState<string | null>(null);
  const [chaiPulse, setChaiPulse] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setFooterVisible(Boolean(entries[0]?.isIntersecting));
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChaiClick = () => {
    brewChai();
    setChaiPulse(true);
    window.setTimeout(() => setChaiPulse(false), 320);
    const joke = CHAI_JOKES[Math.floor(Math.random() * CHAI_JOKES.length)];
    setChaiJoke(joke);
    window.setTimeout(() => setChaiJoke(null), 4200);
  };

  const anyModalOpen = plannerModalOpen || auditModalOpen || searchModalOpen;
  const hideStickyActions = footerVisible || anyModalOpen;

  return (
    <>
      <div className="mt-10">
        <JaipurSkylineDivider />
      </div>
      <footer
        ref={footerRef}
        className="border-t-2 border-[var(--border-ink)] bg-[var(--bg-sandstone)]/45 dark:bg-[var(--bg-cream)] text-[var(--text-primary)] pb-16 md:pb-0"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          {/* Clean 3-Column Jaipur Footer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b-2 border-[var(--border-ink)]/20">
            {/* Column 1: Studio Brand & Chai Counter */}
            <div className="md:col-span-5 space-y-3">
              <Link to="/" className="font-display font-bold text-2xl tracking-tight inline-block">
                Urdta Teeeeeer
              </Link>
              <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
                {t.footer.tagline}
              </p>
              <p className="text-xs font-medium text-[var(--text-secondary)]">
                {t.footer.madeWith}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleChaiClick}
                  className={`min-h-[44px] relative inline-flex items-center gap-2.5 px-3.5 py-2 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[8px] text-xs font-bold cursor-pointer brutal-press transition-transform ${
                    chaiPulse ? 'scale-105' : ''
                  }`}
                >
                  <span className="relative text-base" aria-hidden="true">
                    ☕
                    <span className="absolute -top-2 left-1 text-[10px] animate-chai-steam">~</span>
                  </span>
                  <span className="font-mono-num">
                    {chaiCount} {t.footer.chaiCounterLabel}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={openAuditModal}
                  className="min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[8px] text-xs font-bold cursor-pointer hover:bg-[var(--bg-sandstone)] transition-colors"
                >
                  {t.footer.freeAuditBtn}
                </button>
                <PWAInstallButton />
              </div>
              {chaiJoke && (
                <p className="mt-2 text-xs font-medium italic text-[var(--text-terracotta)]">
                  “{chaiJoke}”
                </p>
              )}
            </div>

            {/* Column 2: Explore */}
            <div className="md:col-span-3 space-y-2 text-sm">
              <h2 className="font-display font-bold text-base mb-3">{t.footer.studioHeading}</h2>
              <ul className="space-y-1.5">
                <li><Link to="/services" className="hover:underline">{t.nav.services}</Link></li>
                <li><Link to="/work" className="hover:underline">{t.nav.workDual}</Link></li>
                <li><Link to="/industries" className="hover:underline">{t.nav.industries}</Link></li>
                <li><Link to="/packages" className="hover:underline">{t.nav.packages}</Link></li>
                <li><Link to="/process" className="hover:underline">{t.nav.process}</Link></li>
                <li><Link to="/insights" className="hover:underline">{t.nav.insights}</Link></li>
                <li><Link to="/about" className="hover:underline">{t.nav.about}</Link></li>
                <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              </ul>
            </div>

            {/* Column 3: Direct Connect & Legal */}
            <div className="md:col-span-4 space-y-3 text-sm">
              <h2 className="font-display font-bold text-base mb-2">{t.footer.connectHeading}</h2>
              <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                <p>
                  Email:{' '}
                  <a href={`mailto:${siteConfig.email}`} className="underline font-bold text-[var(--text-primary)]">
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  Jaipur, Rajasthan ·{' '}
                  <a
                    href={siteConfig.googleBusinessProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Google Business Profile
                  </a>
                </p>
                <div className="flex flex-wrap gap-3 pt-1 font-bold text-[var(--text-primary)]">
                  <Link to="/contact" className="underline">{t.nav.contact}</Link>
                  <Link to="/privacy-policy" className="underline">{t.planner.privacyLink}</Link>
                  <Link to="/terms" className="underline">Terms</Link>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="min-h-[44px] px-3 py-1.5 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[8px] font-mono-num text-xs font-bold cursor-pointer hover:bg-[var(--bg-sandstone)]"
                >
                  {lang === 'hinglish' ? 'Switch to English' : 'Hinglish Mein Dekho'}
                </button>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversionEvent('whatsapp_click', { source: 'footer' })}
                  className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 brutal-border bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] rounded-[8px] text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
            <p>{t.footer.legalLine}</p>
            <p>{t.footer.demoBadge}</p>
          </div>
        </div>
      </footer>

      {/* Desktop Floating WhatsApp (auto-hides on footer & modal overlap) */}
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackConversionEvent('whatsapp_click', { source: 'sticky_button' })}
        aria-label="Chat with Urdta Teeeeeer on WhatsApp"
        data-testid="sticky-whatsapp-desktop"
        aria-hidden={hideStickyActions}
        tabIndex={hideStickyActions ? -1 : 0}
        className={`hidden md:inline-flex fixed bottom-5 right-5 z-[45] min-h-[44px] items-center gap-2 px-4 py-2.5 brutal-border brutal-shadow-sm brutal-press bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] rounded-[8px] font-display font-bold text-sm transition-all duration-200 ${
          hideStickyActions ? 'opacity-0 pointer-events-none translate-y-3' : 'opacity-100'
        }`}
      >
        <MessageCircle className="w-4 h-4 stroke-[2.5]" />
        <span>WhatsApp</span>
      </a>

      {/* Mobile Compact Sticky Bottom Action Bar (<= 56px tall, hides on footer & modals) */}
      <div
        data-testid="sticky-whatsapp-mobile"
        aria-hidden={hideStickyActions}
        className={`md:hidden fixed inset-x-0 bottom-0 z-[45] h-14 px-3 border-t-[3px] border-[var(--border-ink)] bg-[var(--bg-surface)] flex items-center justify-between gap-2 transition-transform duration-200 ${
          hideStickyActions ? 'translate-y-full pointer-events-none' : 'translate-y-0'
        }`}
      >
        <BrutalButton
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => {
            trackConversionEvent('cta_click', { source: 'mobile_sticky_bar', label: t.nav.cta });
            openPlannerModal();
          }}
        >
          {t.nav.cta}
        </BrutalButton>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversionEvent('whatsapp_click', { source: 'mobile_sticky_bar' })}
          aria-label="WhatsApp Jaipur Desk"
          className="min-h-[44px] min-w-[44px] px-3.5 inline-flex items-center justify-center gap-1.5 brutal-border bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] rounded-[8px] font-display font-bold text-xs shrink-0"
        >
          <MessageCircle className="w-4 h-4 stroke-[2.5]" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
