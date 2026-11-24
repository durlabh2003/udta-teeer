import React from 'react';
import { Calendar, Mail, MapPin, MessageCircle } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import { trackConversionEvent } from '../lib/analytics';
import { buildWhatsAppLink } from '../lib/crmAdapter';
import { JaipurMapCardIllustration } from '../components/illustrations/JaipurIllustrations';
import { QuickContactForm } from '../components/sections/QuickContactForm';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

export function ContactPage() {
  return (
    <>
      <SEOHead pageKey="contact" path="/contact" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-10">
        <div className="max-w-xl space-y-2">
          <p className="type-label text-[var(--text-terracotta)]">Chai Pe Baat Karein?</p>
          <h1 className="type-display">Let&apos;s Talk Over Chai in Jaipur</h1>
          <p className="type-body text-[var(--text-secondary)]">
            Zero robotic pitch decks. Tell us what you are building and get clear next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <QuickContactForm source="contact_page" />
          </div>

          <div className="lg:col-span-5 space-y-5">
            {/* Jaipur Map Illustration Card (18.1) */}
            <BrutalCard className="!p-4 space-y-2.5">
              <JaipurMapCardIllustration
                className="w-full h-32"
                alt="Vector map of Jaipur studio corridor across C-Scheme and Johari Bazaar"
              />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">Jaipur Studio Desk · Rajasthan</span>
                <span className="font-mono-num text-[var(--text-secondary)]">26.9124° N, 75.7873° E</span>
              </div>
            </BrutalCard>

            <BrutalCard tone="marigold" className="space-y-4">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5" />
                <h2 className="type-h3">Book a 20-Min Discovery Call</h2>
              </div>
              <p className="type-small">
                Speak directly with our studio lead on Diagnostic scope and milestone timelines.
              </p>
              <BrutalButton
                href={siteConfig.calendarEmbedPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
                onClick={() => trackConversionEvent('call_click', { source: 'contact_calendar' })}
                className="w-full"
              >
                Schedule Discovery Call
              </BrutalButton>
            </BrutalCard>

            <BrutalCard className="space-y-4">
              <h2 className="type-h3">Direct Studio Channels</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 shrink-0 text-[var(--text-cobalt)]" />
                  <div>
                    <div className="font-bold">WhatsApp Direct</div>
                    <a
                      href={buildWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackConversionEvent('whatsapp_click', { source: 'contact_card' })
                      }
                      className="underline font-mono-num text-xs"
                    >
                      {siteConfig.whatsappDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 shrink-0 text-[var(--text-gulabi)]" />
                  <div>
                    <div className="font-bold">Email</div>
                    <a href={`mailto:${siteConfig.email}`} className="underline text-xs">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 text-[var(--text-terracotta)]" />
                  <div>
                    <div className="font-bold">Studio Base</div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {siteConfig.city}, {siteConfig.state}, {siteConfig.country} (Serving Jaipur &amp;
                      pan-India remotely)
                    </p>
                  </div>
                </div>
              </div>
            </BrutalCard>
          </div>
        </div>
      </div>
    </>
  );
}
