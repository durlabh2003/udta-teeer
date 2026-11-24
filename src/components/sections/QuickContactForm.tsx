import React, { useState } from 'react';
import { Loader2, MessageCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { LeadSubmissionResult, submitPlannerLead } from '../../lib/crmAdapter';
import { CelebrationBullseyeIllustration } from '../illustrations/JaipurIllustrations';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalCard } from '../ui/BrutalCard';

const INDIAN_MOBILE_REGEX = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

export function QuickContactForm({ source = 'contact_page' }: { source?: string }) {
  const { t } = useApp();
  const [submitted, setSubmitted] = useState<LeadSubmissionResult | null>(null);

  const schema = z.object({
    name: z.string().trim().min(2, t.errors.nameRequired),
    email: z.string().trim().email(t.errors.emailInvalid),
    phone: z
      .string()
      .trim()
      .min(8, t.errors.phoneRequired)
      .regex(INDIAN_MOBILE_REGEX, t.errors.phoneInvalid),
    need: z.string().min(1),
    message: z.string().trim().min(5, t.errors.messageRequired),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      need: 'Brand & Digital Diagnostic',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await submitPlannerLead({
      fullName: values.name,
      email: values.email,
      phone: values.phone,
      selectedServices: [values.need],
      budget: 'Not sure yet',
      timeline: 'Exploring',
      engagementType: 'Not sure',
      requirementNotes: values.message,
      consent: true,
    });
    trackConversionEvent('form_submit', { source, label: values.need });
    setSubmitted(res);
    reset();
  };

  if (submitted) {
    return (
      <BrutalCard tone="marigold" className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="brutal-border bg-[var(--bg-surface)] rounded-[8px] p-2 shrink-0">
            <CelebrationBullseyeIllustration className="w-20 h-16" alt={t.success.title} />
          </div>
          <div>
            <h3 className="type-h3">{t.success.title}</h3>
            <p className="type-small opacity-90">{t.success.subtitle}</p>
          </div>
        </div>
        <p className="font-mono-num text-xs font-bold">
          Demo Reference ID: {submitted.leadId}
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <BrutalButton
            href={submitted.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            onClick={() => trackConversionEvent('whatsapp_click', { source: 'quick_form_success' })}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Note Now</span>
          </BrutalButton>
          <BrutalButton variant="secondary" size="sm" onClick={() => setSubmitted(null)}>
            Send Another Note
          </BrutalButton>
        </div>
      </BrutalCard>
    );
  }

  return (
    <BrutalCard arch="scalloped" className="space-y-5">
      <div>
        <h3 className="type-h3 mb-1">Quick Chai Note</h3>
        <p className="type-small text-[var(--text-secondary)]">
          Short brief — instant simulated Lead ID and prefilled WhatsApp note.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qc-name" className="block text-sm font-bold mb-1">
              {t.forms.fullName}
            </label>
            <input
              id="qc-name"
              type="text"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'qc-name-err' : undefined}
              placeholder="e.g. Aarav Sharma"
              {...register('name')}
              className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
            />
            {errors.name && (
              <p id="qc-name-err" role="alert" className="mt-1 text-xs font-bold text-[var(--text-terracotta)]">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="qc-email" className="block text-sm font-bold mb-1">
              {t.forms.email}
            </label>
            <input
              id="qc-email"
              type="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'qc-email-err' : undefined}
              placeholder="you@brand.in"
              {...register('email')}
              className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
            />
            {errors.email && (
              <p id="qc-email-err" role="alert" className="mt-1 text-xs font-bold text-[var(--text-terracotta)]">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qc-phone" className="block text-sm font-bold mb-1">
              {t.forms.phone}
            </label>
            <input
              id="qc-phone"
              type="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'qc-phone-err' : undefined}
              placeholder="+91 98290 12345"
              {...register('phone')}
              className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
            />
            {errors.phone && (
              <p id="qc-phone-err" role="alert" className="mt-1 text-xs font-bold text-[var(--text-terracotta)]">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="qc-need" className="block text-sm font-bold mb-1">
              Primary Need
            </label>
            <select
              id="qc-need"
              {...register('need')}
              className="w-full min-h-[44px] px-3.5 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
            >
              <option value="Brand & Digital Diagnostic">Brand &amp; Digital Diagnostic</option>
              <option value="Creative Website / D2C Store">Creative Website / D2C Store</option>
              <option value="Growth Partnership (Ads + Content)">Growth Partnership (Ads + Content)</option>
              <option value="Brand Identity & UI/UX">Brand Identity &amp; UI/UX</option>
              <option value="Custom App / CRM / Automation">Custom App / CRM / Automation</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="qc-msg" className="block text-sm font-bold mb-1">
            {t.forms.notes} *
          </label>
          <textarea
            id="qc-msg"
            rows={3}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'qc-msg-err' : undefined}
            placeholder="Share 2–3 lines about your brand and goal..."
            {...register('message')}
            className="w-full px-3.5 py-2.5 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
          />
          {errors.message && (
            <p id="qc-msg-err" role="alert" className="mt-1 text-xs font-bold text-[var(--text-terracotta)]">
              {errors.message.message}
            </p>
          )}
        </div>

        <BrutalButton type="submit" variant="primary" size="md" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span>{isSubmitting ? t.forms.sending : t.forms.sendNote}</span>
        </BrutalButton>
      </form>
    </BrutalCard>
  );
}
