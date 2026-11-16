import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Home, MessageCircle } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import { useApp } from '../context/AppContext';
import { buildWhatsAppLink } from '../lib/crmAdapter';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

export function ThankYouPage() {
  const { lastReceipt, openAuditModal } = useApp();

  const waUrl = lastReceipt?.whatsappUrl || buildWhatsAppLink();

  return (
    <>
      <SEOHead
        title="Requirement Received — Thank You | Urdta Teeeeeer"
        description="Your project brief has been received by Urdta Teeeeeer Jaipur."
        path="/thank-you"
      />

      <div className="max-w-[880px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-8">
        <BrutalCard tone="marigold" className="p-8 md:p-10 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-mono-num font-bold uppercase">
            <CheckCircle2 className="w-5 h-5" />
            <span>Nishaana Pakka! Brief Confirmed</span>
          </div>

          <h1 className="font-editorial text-3xl md:text-5xl font-bold tracking-tight">
            {lastReceipt
              ? `Dhanyavaad, ${lastReceipt.fullName}! Your brief is in.`
              : 'Your requirement is with our Jaipur studio team.'}
          </h1>

          {lastReceipt ? (
            <div className="p-5 brutal-border bg-[#FFF9F0] text-[#111111] rounded-[6px] space-y-2.5 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b-2 border-[#111111]/15">
                <span className="font-bold">Tracked Lead ID</span>
                <span className="font-mono-num font-extrabold text-base text-[#B95E50]">
                  {lastReceipt.leadId}
                </span>
              </div>
              {lastReceipt.businessName && (
                <p><strong>Business:</strong> {lastReceipt.businessName}</p>
              )}
              {lastReceipt.industry && (
                <p><strong>Industry:</strong> {lastReceipt.industry}</p>
              )}
              <p><strong>Selected Requirements:</strong> {lastReceipt.selectedServices.join(', ')}</p>
              <p><strong>Budget Band:</strong> {lastReceipt.budget} <span aria-hidden="true">·</span> <strong>Timeline:</strong> {lastReceipt.timeline}</p>
            </div>
          ) : (
            <p className="text-base">
              Expected response window: within {siteConfig.responseSlaHours} working hours.
            </p>
          )}

          <p className="text-sm font-medium leading-relaxed">
            Our studio desk reviews every brief personally within {siteConfig.responseSlaHours}{' '}
            working hours and gets back with honest next steps — no automated spam.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <BrutalButton href={waUrl} target="_blank" rel="noopener noreferrer" variant="peacock" size="md">
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Now</span>
            </BrutalButton>
            <BrutalButton
              href={siteConfig.calendarEmbedPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              variant="cream"
              size="md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation Slot</span>
            </BrutalButton>
            <BrutalButton variant="ink" size="md" onClick={openAuditModal}>
              Request Free Website Audit
            </BrutalButton>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold underline"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </BrutalCard>
      </div>
    </>
  );
}
