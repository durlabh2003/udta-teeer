import React from 'react';
import { Calendar, Mail, MapPin, MessageCircle } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import { trackConversionEvent } from '../lib/analytics';
import { buildWhatsAppLink } from '../lib/crmAdapter';
import { QuickContactForm } from '../components/sections/QuickContactForm';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

export function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact & Book Discovery Call | Urdta Teeeeeer Jaipur"
        description="Talk over chai in Jaipur or book a 20-minute discovery call with Urdta Teeeeeer. Ping us on WhatsApp or send a quick project note."
        path="/contact"
      />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        <div className="max-w-2xl space-y-3">
          <p className="font-hand text-base text-[#D9482B] dark:text-[#FFC21A]">
            Chai Pe Baat Karein?
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Let&apos;s Talk Over Chai (Jaipur or Call)
          </h1>
          <p className="text-base text-[#3A3532] dark:text-[#E6D8C5]">
            Skip the robotic agency pitch decks. Share what you are building — we reply within{' '}
            {siteConfig.responseSlaHours} working hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <QuickContactForm source="contact_page" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <BrutalCard tone="marigold" className="space-y-4">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-6 h-6" />
                <h2 className="text-xl font-extrabold">Book a 20-Min Discovery Call</h2>
              </div>
              <p className="text-sm leading-relaxed">
                Pick a calendar slot directly with our studio lead to discuss Diagnostic scope,
                timelines, and honest fit.
              </p>
              <BrutalButton
                href={siteConfig.calendarEmbedPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                variant="ink"
                size="md"
                onClick={() => trackConversionEvent('call_click', { source: 'contact_calendar' })}
                className="w-full"
              >
                Open Calendar Slot (Placeholder)
              </BrutalButton>
            </BrutalCard>

            <BrutalCard className="space-y-4">
              <h2 className="text-xl font-extrabold">Direct Studio Channels</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 shrink-0 text-[#1FB5B0]" />
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
                  <Mail className="w-5 h-5 shrink-0 text-[#FF4F8B]" />
                  <div>
                    <div className="font-bold">Email</div>
                    <a href={`mailto:${siteConfig.email}`} className="underline text-xs">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 text-[#D9482B]" />
                  <div>
                    <div className="font-bold">Studio Base</div>
                    <p className="text-xs text-[#3A3532] dark:text-[#E6D8C5]">
                      {siteConfig.city}, {siteConfig.state}, {siteConfig.country} (Serving Jaipur &
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
