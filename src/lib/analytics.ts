/**
 * Full Conversion Funnel Event Tracking Adapter (PRD Section 38)
 * Hooks cleanly into GTM dataLayer or gtag if present; safe no-op otherwise.
 */

export type ConversionEventName =
  | 'page_view'
  | 'hero_cta_click'
  | 'arrow_journey_start'
  | 'service_view'
  | 'service_cta_click'
  | 'industry_view'
  | 'case_study_view'
  | 'lead_form_start'
  | 'lead_form_step_1'
  | 'lead_form_step_2'
  | 'lead_form_step_3'
  | 'lead_form_submit'
  | 'form_submit'
  | 'brief_completed'
  | 'whatsapp_click'
  | 'phone_click'
  | 'call_click'
  | 'audit_submit'
  | 'consultation_click'
  | 'cta_click'
  | 'blog_read'
  | 'kite_cut';

export interface ConversionPayload {
  source?: string;
  serviceCount?: number;
  budgetBand?: string;
  label?: string;
  industry?: string;
  step?: number;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function getUtmContext() {
  if (typeof window === 'undefined') {
    return { sourcePage: '/', utmSource: '', utmMedium: '', utmCampaign: '' };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePage: window.location.pathname,
    utmSource: params.get('utm_source') ?? '',
    utmMedium: params.get('utm_medium') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
  };
}

export function trackConversionEvent(
  eventName: ConversionEventName,
  payload: ConversionPayload = {}
) {
  if (typeof window === 'undefined') return;

  const utm = getUtmContext();
  const eventObj = {
    event: eventName,
    brand: 'Urdta Teeeeeer',
    timestamp: new Date().toISOString(),
    ...utm,
    ...payload,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventObj);
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, { ...utm, ...payload });
  }
}
