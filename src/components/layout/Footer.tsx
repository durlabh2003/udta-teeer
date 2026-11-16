import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import siteConfig from '../../data/site-config.json';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { buildWhatsAppLink } from '../../lib/crmAdapter';
import { JaaliDivider } from '../ui/JaaliDivider';
import { PWAInstallButton } from '../ui/PWAInstallButton';

const CHAI_JOKES = [
  'Ek cutting adrak chai, aur ek conversion rate double — dono kadak chahiye!',
  'Jaipur rule #1: Kaam ho ya na ho, pehle chai toh thandi na ho.',
  'Good UX is like masala chai — simple ingredients, zero bitterness.',
  'Template websites are like tea bags in lukewarm water. We brew fresh.',
];

export function Footer() {
  const { t, chaiCount, brewChai, openAuditModal } = useApp();
  const [chaiJoke, setChaiJoke] = useState<string | null>(null);

  const handleChaiClick = () => {
    brewChai();
    const joke = CHAI_JOKES[Math.floor(Math.random() * CHAI_JOKES.length)];
    setChaiJoke(joke);
    window.setTimeout(() => setChaiJoke(null), 4200);
  };

  return (
    <>
      <footer className="border-t-[3px] border-[#111111] dark:border-[#FFF9F0] bg-[#F3E5CE] dark:bg-[#121A2A] text-[#111111] dark:text-[#FFF9F0] mt-16">
        <JaaliDivider />
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b-2 border-[#111111]/20 dark:border-[#FFF9F0]/20">
            <div className="md:col-span-5 space-y-3">
              <Link to="/" className="font-poster text-2xl tracking-tight inline-block">
                Urdta Teeeeeer
              </Link>
              <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5] max-w-md leading-relaxed">
                {t.footer.tagline}
              </p>
              <p className="text-xs font-medium text-[#4B433C] dark:text-[#E7D8C5]">
                {t.footer.madeWith}
              </p>

              {/* Playful Chai Counter Easter Egg */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleChaiClick}
                  className="relative inline-flex items-center gap-2.5 px-3.5 py-2 brutal-border bg-[#FFC21A] text-[#111111] rounded-[6px] text-xs font-bold cursor-pointer brutal-press"
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
                  className="px-3.5 py-2 brutal-border bg-[#FFF9F0] text-[#111111] rounded-[6px] text-xs font-bold cursor-pointer hover:bg-[#1FB5B0] transition-colors"
                >
                  Request Free Audit
                </button>
                <PWAInstallButton />
              </div>
              {chaiJoke && (
                <p className="mt-2 text-xs font-hand text-[#B95E50] dark:text-[#FFC21A]">
                  “{chaiJoke}”
                </p>
              )}
            </div>

            <div className="md:col-span-3 space-y-2 text-sm">
              <h2 className="font-display font-extrabold text-base mb-3">Studio</h2>
              <ul className="space-y-1.5">
                <li><Link to="/services" className="hover:underline">Services Bazaar</Link></li>
                <li><Link to="/industries" className="hover:underline">Industry Solutions</Link></li>
                <li><Link to="/work" className="hover:underline">Work &amp; Case Templates</Link></li>
                <li><Link to="/process" className="hover:underline">Process Journey</Link></li>
                <li><Link to="/packages" className="hover:underline">Packages &amp; Pricing</Link></li>
                <li><Link to="/insights" className="hover:underline">Insights &amp; Guides</Link></li>
                <li><Link to="/plan-your-project" className="hover:underline">Interactive Project Planner</Link></li>
                <li><Link to="/about" className="hover:underline">About Jaipur Studio</Link></li>
                <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2 text-sm">
              <h2 className="font-display font-extrabold text-base mb-3">Key Capabilities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <li><Link to="/services/design" className="hover:underline">Design Haveli</Link></li>
                <li><Link to="/services/development" className="hover:underline">Digital Karkhana</Link></li>
                <li><Link to="/services/marketing" className="hover:underline">Growth Bazaar</Link></li>
                <li><Link to="/website-development-jaipur" className="hover:underline">Websites Jaipur</Link></li>
                <li><Link to="/ecommerce-development-jaipur" className="hover:underline">D2C E-Commerce</Link></li>
                <li><Link to="/seo-services-jaipur" className="hover:underline">SEO + AEO/GEO</Link></li>
                <li><Link to="/performance-marketing-jaipur" className="hover:underline">Performance Ads</Link></li>
                <li><Link to="/automation-ai-jaipur" className="hover:underline">CRM &amp; AI Workflows</Link></li>
              </ul>
              <div className="pt-3 text-xs text-[#4B433C] dark:text-[#E7D8C5] space-y-1">
                <p>Email: <a href={`mailto:${siteConfig.email}`} className="underline font-bold">{siteConfig.email}</a></p>
                <p>Jaipur, Rajasthan · <a href={siteConfig.googleBusinessProfileUrl} className="underline">Google Business Profile</a></p>
                <p className="pt-1 flex flex-wrap gap-3 font-bold">
                  <Link to="/privacy-policy" className="underline">Privacy Policy</Link>
                  <Link to="/terms" className="underline">Terms</Link>
                  <Link to="/admin/leads" className="underline">Studio Lead Desk</Link>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#4B433C] dark:text-[#E7D8C5]">
            <p>© {new Date().getFullYear()} Urdta Teeeeeer — Creative Technology Studio, Jaipur.</p>
            <p>{siteConfig.legalEntityNote}</p>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Click-to-Chat (compact to respect <=15% mobile sticky cap) */}
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackConversionEvent('whatsapp_click', { source: 'sticky_button' })}
        aria-label="Chat with Urdta Teeeeeer on WhatsApp"
        className="fixed bottom-4 right-4 z-[45] inline-flex items-center gap-2 px-4 py-2.5 brutal-border brutal-shadow-sm brutal-press bg-[#1FB5B0] text-[#111111] rounded-[6px] font-display font-bold text-sm"
      >
        <MessageCircle className="w-4 h-4 stroke-[2.5]" />
        <span>WhatsApp</span>
      </a>
    </>
  );
}
