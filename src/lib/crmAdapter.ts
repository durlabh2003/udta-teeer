import siteConfig from '../data/site-config.json';
import { getUtmContext } from './analytics';

export interface PlannerLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  businessName?: string;
  industry?: string;
  website?: string;
  primaryObjectives?: string[];
  businessStage?: string;
  selectedServices: string[];
  budget: string;
  timeline: string;
  engagementType: string;
  requirementNotes?: string;
  consent: boolean;
  honeypot?: string;
}

export interface LeadSubmissionResult {
  ok: boolean;
  leadId: string;
  whatsappUrl: string;
  mailtoUrl: string;
  backendStored: boolean;
  error?: string;
}

export interface AuditSubmissionPayload {
  name: string;
  email: string;
  phone: string;
  websiteUrl: string;
  focusArea: string;
}

export function buildWhatsAppLink(customMessage?: string): string {
  const text = encodeURIComponent(
    customMessage ||
      'Namaste Urdta Teeeeeer! I visited your site and want to discuss my project.'
  );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}

export async function submitPlannerLead(
  payload: PlannerLeadPayload
): Promise<LeadSubmissionResult> {
  const utm = getUtmContext();
  const summaryLines = [
    `Namaste Urdta Teeeeeer! New Project Plan`,
    `Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.businessName ? `Business: ${payload.businessName}` : '',
    payload.industry ? `Industry: ${payload.industry}` : '',
    `Services: ${payload.selectedServices.join(', ')}`,
    `Budget: ${payload.budget}`,
    `Timeline: ${payload.timeline}`,
    payload.requirementNotes ? `Notes: ${payload.requirementNotes}` : '',
  ].filter(Boolean);

  const formattedText = summaryLines.join('\n');
  let leadId = `UT-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`;
  let backendStored = false;

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        ...utm,
      }),
    });
    const json = await res.json();
    if (res.ok && json.ok) {
      leadId = json.leadId;
      backendStored = true;
    } else if (!res.ok) {
      return {
        ok: false,
        leadId: '',
        whatsappUrl: buildWhatsAppLink(formattedText),
        mailtoUrl: `mailto:${siteConfig.email}`,
        backendStored: false,
        error: json.error || 'Could not submit right now. Please try again or use WhatsApp.',
      };
    }
  } catch {
    backendStored = false;
  }

  return {
    ok: true,
    leadId,
    whatsappUrl: buildWhatsAppLink(`[${leadId}]\n${formattedText}`),
    mailtoUrl: `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `[New Growth Plan ${leadId}] ${payload.fullName}`
    )}&body=${encodeURIComponent(formattedText)}`,
    backendStored,
  };
}

export async function submitFreeAudit(payload: AuditSubmissionPayload) {
  try {
    const res = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    return {
      ok: res.ok && json.ok,
      auditId: json.auditId ?? `AUD-${Date.now().toString().slice(-4)}`,
    };
  } catch {
    return { ok: true, auditId: `AUD-${Date.now().toString().slice(-4)}` };
  }
}
