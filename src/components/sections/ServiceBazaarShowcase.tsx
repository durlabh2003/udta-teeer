import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Layers, Megaphone, Palette, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalCard } from '../ui/BrutalCard';

type EstablishmentId = 'design' | 'development' | 'marketing';

const ESTABLISHMENTS = [
  {
    id: 'design' as const,
    name: 'The Creative Haveli',
    pillar: '01 · Design',
    message: 'We make your business recognisable.',
    accent: '#F4A6B8',
    exploreUrl: '/services/design',
    exploreLabel: 'Explore Design Services',
    actionLabel: 'Build My Brand',
    preselect: ['branding-identity', 'ui-ux-design'],
    groups: [
      { title: 'Brand Identity & Strategy', items: ['Brand discovery & positioning', 'Logo, colour & typography systems', 'Brand guidelines & collateral'] },
      { title: 'UI/UX Design', items: ['User research, journeys & wireframes', 'Interactive Figma prototypes', 'Responsive design systems'] },
      { title: 'Website & Landing Page Design', items: ['Conversion-oriented homepage UI', 'Campaign landing pages', 'Website redesigns'] },
      { title: 'Graphic, Packaging & Motion', items: ['Social & ad creatives, pitch decks', 'Product packaging & labels', 'Motion graphics & promo reels'] },
    ],
  },
  {
    id: 'development' as const,
    name: 'The Digital Karkhana',
    pillar: '02 · Development',
    message: 'We turn ideas into working digital products.',
    accent: '#1FB5B0',
    exploreUrl: '/services/development',
    exploreLabel: 'Explore Development Services',
    actionLabel: 'Build My Product',
    preselect: ['website-dev', 'ecommerce-dev'],
    groups: [
      { title: 'Business Websites & E-Commerce', items: ['Corporate, agency & service sites', 'Online stores, cart & UPI/Razorpay checkout', 'Speed, SEO & maintenance'] },
      { title: 'Custom Web & Mobile Apps', items: ['Booking portals & internal ops tools', 'iOS & Android cross-platform apps', 'Testing & store deployment'] },
      { title: 'SaaS & Dashboards', items: ['SaaS MVPs & subscription billing', 'Admin & analytics dashboards', 'Role-based client portals'] },
      { title: 'API, Automation & Integration', items: ['CRM & WhatsApp API routing', 'Payment & inventory webhooks', 'Business-process automation'] },
    ],
  },
  {
    id: 'marketing' as const,
    name: 'The Growth Bazaar',
    pillar: '03 · Marketing',
    message: 'We take your business to the right audience.',
    accent: '#FFC21A',
    exploreUrl: '/services/marketing',
    exploreLabel: 'Explore Marketing Services',
    actionLabel: 'Grow My Business',
    preselect: ['seo-aeo', 'performance-marketing'],
    groups: [
      { title: 'Search Engine Optimisation (SEO)', items: ['Technical & on-page SEO', 'Local Jaipur & Google Business Profile', 'AEO/GEO AI-search visibility'] },
      { title: 'Paid & Performance Marketing', items: ['Google Search & Shopping Ads', 'Meta Ads & retargeting funnels', 'Conversion tracking & ROAS dashboards'] },
      { title: 'Social Media & Content', items: ['Strategic content calendars & reels', 'Website & campaign copywriting', 'English, Hinglish & Hindi messaging'] },
      { title: 'Lead Gen & CRO', items: ['Landing-page conversion optimization', 'Enquiry-form & funnel audits', 'Lead attribution reporting'] },
    ],
  },
];

export function ServiceBazaarShowcase() {
  const { openPlannerModal } = useApp();
  const [activeId, setActiveId] = useState<EstablishmentId>('design');
  const [karkhanaDigitalMode, setKarkhanaDigitalMode] = useState<boolean>(true);
  const [hqSelected, setHqSelected] = useState<string[]>(['Design', 'Development']);

  const active = ESTABLISHMENTS.find((e) => e.id === activeId) ?? ESTABLISHMENTS[0];

  const toggleHq = (pillar: string) => {
    setHqSelected((prev) =>
      prev.includes(pillar) ? prev.filter((p) => p !== pillar) : [...prev, pillar]
    );
  };

  const handleHqLaunch = () => {
    const mapped: string[] = [];
    if (hqSelected.includes('Design')) mapped.push('branding-identity', 'ui-ux-design');
    if (hqSelected.includes('Development')) mapped.push('website-dev');
    if (hqSelected.includes('Marketing')) mapped.push('seo-aeo', 'performance-marketing');
    trackConversionEvent('service_cta_click', { source: 'growth_hq', label: hqSelected.join('+') });
    openPlannerModal(mapped.length ? mapped : ['website-dev']);
  };

  return (
    <div className="space-y-8">
      {/* Arrow Stop Switcher (3 Jaipur Establishments) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="tablist" aria-label="Jaipur Service Establishments">
        {ESTABLISHMENTS.map((est) => {
          const isSelected = est.id === activeId;
          return (
            <button
              key={est.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                setActiveId(est.id);
                trackConversionEvent('service_view', { source: 'service_bazaar', label: est.id });
              }}
              className={`text-left p-5 brutal-border rounded-[6px] cursor-pointer transition-all ${
                isSelected
                  ? 'brutal-shadow-lg -translate-y-0.5 bg-[#FFF9F0] dark:bg-[#263650]'
                  : 'bg-[#FFFFFF]/70 dark:bg-[#1D2052]/70 hover:bg-[#FFF9F0] dark:hover:bg-[#212E46]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="px-2.5 py-1 text-xs font-mono-num font-bold brutal-border text-[#111111] rounded-[3px]"
                  style={{ backgroundColor: est.accent }}
                >
                  {est.pillar}
                </span>
                {isSelected && (
                  <span className="font-hand text-xs text-[#B95E50] dark:text-[#FFC21A]">
                    Arrow Landed ➔
                  </span>
                )}
              </div>
              <h3 className="font-editorial text-2xl font-bold mb-1">{est.name}</h3>
              <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">{est.message}</p>
            </button>
          );
        })}
      </div>

      {/* Illuminated Establishment Stage */}
      <BrutalCard className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b-2 border-[#111111]/15 dark:border-[#FFF9F0]/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-num font-bold text-[#B95E50] dark:text-[#FFC21A]">
              {active.id === 'design' && <Palette className="w-4 h-4" />}
              {active.id === 'development' && <Code2 className="w-4 h-4" />}
              {active.id === 'marketing' && <Megaphone className="w-4 h-4" />}
              <span>{active.pillar} Establishment</span>
            </div>
            <h3 className="font-editorial text-3xl md:text-4xl font-bold">
              {active.name} — {active.message}
            </h3>
          </div>

          {active.id === 'development' && (
            <button
              type="button"
              onClick={() => setKarkhanaDigitalMode((v) => !v)}
              className="px-4 py-2 text-xs font-bold brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px] whitespace-nowrap cursor-pointer"
            >
              {karkhanaDigitalMode
                ? 'View Heritage Workshop View'
                : 'Transform Facade → Digital Interface'}
            </button>
          )}
        </div>

        {/* Establishment Visual + 4 Service Groups */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Architectural Illustration Frame */}
          <div className="lg:col-span-5 brutal-border rounded-t-[40px] rounded-b-[6px] overflow-hidden bg-[#F3E5CE] dark:bg-[#182235] p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-num font-bold">
              <span>{active.name}</span>
              <span>Jaipur Pink City</span>
            </div>

            {active.id === 'design' && (
              <div className="grid grid-cols-3 gap-2 pt-2">
                {['Brand Marks', 'UI Systems', 'Packaging'].map((label, i) => (
                  <div
                    key={label}
                    className="brutal-border rounded-t-full p-3 text-center bg-[#FFF9F0] text-[#111111] min-h-[112px] flex flex-col justify-between"
                    style={{ backgroundColor: i === 1 ? '#F4A6B8' : '#FFF9F0' }}
                  >
                    <span className="text-lg font-editorial font-bold">0{i + 1}</span>
                    <span className="text-[11px] font-bold leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            )}

            {active.id === 'development' && (
              <div className="brutal-border bg-[#263650] text-[#FFF9F0] rounded-[6px] p-4 space-y-2 transition-all">
                <div className="flex items-center justify-between text-[11px] font-mono-num">
                  <span>
                    {karkhanaDigitalMode ? 'Live Product Interface' : 'Heritage Karkhana Facade'}
                  </span>
                  <span className="text-[#FFC21A]">● ● ●</span>
                </div>
                {karkhanaDigitalMode ? (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 bg-[#1FB5B0] text-[#111111] brutal-border rounded-[4px] text-xs font-bold">
                      Storefront & Checkout
                    </div>
                    <div className="p-2.5 bg-[#FFC21A] text-[#111111] brutal-border rounded-[4px] text-xs font-bold">
                      SaaS / Admin Portal
                    </div>
                    <div className="col-span-2 p-2.5 bg-[#FFF9F0] text-[#111111] brutal-border rounded-[4px] text-xs font-mono-num">
                      API + CRM + WhatsApp Automated Pipeline ✓
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center font-editorial text-lg">
                    Traditional Jaipur Workshop Shutters — Click toggle to morph into UI
                  </div>
                )}
              </div>
            )}

            {active.id === 'marketing' && (
              <div className="space-y-2.5">
                <div className="p-3 brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px] flex items-center justify-between text-xs font-bold">
                  <span>Search & AI Overviews (SEO/AEO)</span>
                  <span className="font-mono-num">Intent Traffic ↑</span>
                </div>
                <div className="p-3 brutal-border bg-[#FFF9F0] text-[#111111] rounded-[4px] flex items-center justify-between text-xs font-bold">
                  <span>Meta + Google Campaign Boards</span>
                  <span className="font-mono-num">CPL / ROAS</span>
                </div>
                <div className="p-3 brutal-border bg-[#E7B9A4] text-[#111111] rounded-[4px] flex items-center justify-between text-xs font-bold">
                  <span>Hindi + English Reels & Funnels</span>
                  <span className="font-mono-num">73%+ Reach</span>
                </div>
              </div>
            )}

            <p className="text-xs text-[#4B433C] dark:text-[#E7D8C5] leading-relaxed">
              Every engagement starts by mapping your actual business friction — never a pre-boxed
              template.
            </p>
          </div>

          {/* Service Groups Breakdown */}
          <div className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {active.groups.map((grp) => (
                <div
                  key={grp.title}
                  className="p-4 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[6px]"
                >
                  <h4 className="font-display font-extrabold text-base mb-2">{grp.title}</h4>
                  <ul className="space-y-1 text-xs md:text-sm text-[#4B433C] dark:text-[#E7D8C5]">
                    {grp.items.map((it) => (
                      <li key={it} className="flex items-start gap-1.5">
                        <span className="font-bold text-[#B95E50] dark:text-[#FFC21A]" aria-hidden="true">
                          →
                        </span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <BrutalButton to={active.exploreUrl} variant="marigold" size="md">
                <span>{active.exploreLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </BrutalButton>
              <BrutalButton
                variant="hotPink"
                size="md"
                onClick={() => {
                  trackConversionEvent('service_cta_click', {
                    source: 'service_bazaar_panel',
                    label: active.actionLabel,
                  });
                  openPlannerModal(active.preselect);
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>{active.actionLabel}</span>
              </BrutalButton>
            </div>
          </div>
        </div>
      </BrutalCard>

      {/* 6.4 The Growth Headquarters — Combine Multiple Pillars */}
      <div className="p-6 md:p-8 brutal-border brutal-shadow bg-[#263650] text-[#FFF9F0] rounded-[6px] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono-num font-bold text-[#FFC21A]">
            <Layers className="w-4 h-4" />
            <span>The Growth Headquarters · Combined System</span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl font-bold">
            Need Brand + Website + Marketing working together?
          </h3>
          <p className="text-sm text-[#FFF9F0]/85">
            Select the pillars you want unified under one accountable plan — e.g. Branding + Website,
            E-Commerce + Ads, or Complete Digital Business Setup.
          </p>
        </div>

        <div className="space-y-3 shrink-0">
          <div className="flex flex-wrap gap-2">
            {['Design', 'Development', 'Marketing'].map((pillar) => {
              const checked = hqSelected.includes(pillar);
              return (
                <button
                  key={pillar}
                  type="button"
                  onClick={() => toggleHq(pillar)}
                  aria-pressed={checked}
                  className={`px-3.5 py-2 text-xs font-bold brutal-border rounded-[4px] cursor-pointer transition-colors ${
                    checked
                      ? 'bg-[#FFC21A] text-[#111111]'
                      : 'bg-[#182235] text-[#FFF9F0] hover:bg-[#FFF9F0]/15'
                  }`}
                >
                  {checked ? '✓ ' : '+ '}
                  {pillar}
                </button>
              );
            })}
          </div>
          <BrutalButton variant="hotPink" size="md" onClick={handleHqLaunch} className="w-full">
            <span>Build My Complete Growth Plan</span>
            <ArrowRight className="w-4 h-4" />
          </BrutalButton>
        </div>
      </div>
    </div>
  );
}
