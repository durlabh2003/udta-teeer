import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Home, Info, MessageCircle } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import { useApp } from '../context/AppContext';
import { buildWhatsAppLink } from '../lib/crmAdapter';
import { CelebrationBullseyeIllustration } from '../components/illustrations/JaipurIllustrations';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

export function ThankYouPage() {
  const { lastReceipt, t } = useApp();

  const waUrl = lastReceipt?.whatsappUrl || buildWhatsAppLink();

  return (
    <>
      <SEOHead
        title="Requirement Confirmed — Thank You | Urdta Teeeeeer"
        description="Your project brief confirmation receipt from Urdta Teeeeeer Jaipur."
        path="/thank-you"
      />

      <div className="max-w-[780px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <BrutalCard tone="marigold" arch="jharokha" className="p-5 md:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="brutal-border bg-[var(--bg-surface)] rounded-[10px] p-2.5 shrink-0">
              <CelebrationBullseyeIllustration
                className="w-24 h-20"
                alt="Target arrow hit illustration"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 type-label text-[#1B243B]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.success.title}</span>
              </div>
              <h1 className="type-h2">
                {lastReceipt
                  ? `Dhanyavaad, ${lastReceipt.fullName}!`
                  : t.success.subtitle}
              </h1>
            </div>
          </div>

          {/* Clear Demo Preview Ribbon */}
          <div
            role="status"
            data-testid="thank-you-demo-ribbon"
            className="flex items-start gap-2.5 p-3.5 brutal-border bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] rounded-[8px] text-xs font-bold"
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{t.success.demoRibbon}</span>
          </div>

          {lastReceipt ? (
            <div className="p-5 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[8px] space-y-2 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[var(--border-ink)]/15">
                <span className="font-bold">Demo Reference ID</span>
                <span
                  data-testid="receipt-lead-id"
                  className="font-mono-num font-bold text-base text-[var(--text-gulabi)]"
                >
                  {lastReceipt.leadId}
                </span>
              </div>
              {lastReceipt.businessName && (
                <p><strong>Business:</strong> {lastReceipt.businessName}</p>
              )}
              {lastReceipt.industry && (
                <p><strong>Industry:</strong> {lastReceipt.industry}</p>
              )}
              <p><strong>Scope:</strong> {lastReceipt.selectedServices.join(', ')}</p>
              <p>
                <strong>Budget:</strong> {lastReceipt.budget}{' '}
                <span aria-hidden="true">·</span>{' '}
                <strong>Timeline:</strong> {lastReceipt.timeline}
              </p>
              {lastReceipt.engagementType && (
                <p><strong>Engagement:</strong> {lastReceipt.engagementType}</p>
              )}
              {lastReceipt.requirementNotes && (
                <p><strong>Notes:</strong> {lastReceipt.requirementNotes}</p>
              )}
            </div>
          ) : (
            <p className="text-sm font-medium">
              Response window for live studio enquiries: {siteConfig.responseSlaHours} working hours.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <BrutalButton
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.success.whatsappBtn}</span>
            </BrutalButton>

            <BrutalButton
              href={siteConfig.calendarEmbedPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              variant="tertiary"
              size="sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.success.callBtn}</span>
            </BrutalButton>

            <Link
              to="/"
              className="min-h-[44px] inline-flex items-center gap-1.5 px-2 py-2 text-sm font-bold underline underline-offset-4 hover:text-[var(--text-gulabi)]"
            >
              <Home className="w-4 h-4" />
              <span>{t.success.homeBtn}</span>
            </Link>
          </div>
        </BrutalCard>
      </div>
    </>
  );
}
