import { BRAND_CONFIG } from '../data/brandConfig';

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
  demoMode: boolean;
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
      `Namaste ${BRAND_CONFIG.name}! I visited your site and want to discuss my project.`
  );
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`;
}

const usedLeadSuffixes = new Set<number>();

/**
 * Pure client-side simulated lead submission (demo mode — zero backend writes).
 * Prevents spam honeypot, returns unique tracked 4-digit Lead ID and formatted WhatsApp brief.
 */
export async function submitPlannerLead(
  payload: PlannerLeadPayload
): Promise<LeadSubmissionResult> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return {
      ok: true,
      leadId: 'UT-DEMO-0000',
      whatsappUrl: buildWhatsAppLink(),
      mailtoUrl: `mailto:${BRAND_CONFIG.email}`,
      demoMode: true,
    };
  }

  let suffix = Math.floor(1000 + Math.random() * 9000);
  while (usedLeadSuffixes.has(suffix)) {
    suffix = ((suffix + 137 - 1000) % 9000) + 1000;
  }
  usedLeadSuffixes.add(suffix);
  const leadId = `UT-${new Date().getFullYear()}-${suffix}`;

  const summaryLines = [
    `Namaste ${BRAND_CONFIG.name}! Project Brief (${leadId})`,
    `Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.businessName ? `Business: ${payload.businessName}` : '',
    payload.industry ? `Industry: ${payload.industry}` : '',
    `Services: ${payload.selectedServices.join(', ')}`,
    `Budget: ${payload.budget}`,
    `Timeline: ${payload.timeline}`,
    `Engagement: ${payload.engagementType}`,
    payload.requirementNotes ? `Notes: ${payload.requirementNotes}` : '',
  ].filter(Boolean);

  const formattedText = summaryLines.join('\n');

  return {
    ok: true,
    leadId,
    whatsappUrl: buildWhatsAppLink(formattedText),
    mailtoUrl: `mailto:${BRAND_CONFIG.email}?subject=${encodeURIComponent(
      `[Project Plan ${leadId}] ${payload.fullName}`
    )}&body=${encodeURIComponent(formattedText)}`,
    demoMode: true,
  };
}

export async function submitFreeAudit(payload: AuditSubmissionPayload) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const auditId = `AUD-${new Date().getFullYear()}-${String(
    Math.floor(100 + Math.random() * 899)
  )}`;
  return {
    ok: true,
    auditId,
    demoMode: true,
    websiteUrl: payload.websiteUrl,
  };
}
