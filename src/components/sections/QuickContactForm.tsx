import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { LeadSubmissionResult, submitPlannerLead } from '../../lib/crmAdapter';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalCard } from '../ui/BrutalCard';

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
      .regex(/^[+\d\s()-]{8,16}$/, t.errors.phoneInvalid),
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
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 shrink-0" />
          <h3 className="text-2xl font-extrabold">{t.success.title}</h3>
        </div>
        <p className="text-sm md:text-base font-medium">{t.success.subtitle}</p>
        <p className="font-mono-num text-xs font-bold">Lead ID: {submitted.leadId}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <BrutalButton
            href={submitted.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="peacock"
            size="sm"
            onClick={() => trackConversionEvent('whatsapp_click', { source: 'quick_form_success' })}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send on WhatsApp Now</span>
          </BrutalButton>
          <BrutalButton variant="cream" size="sm" onClick={() => setSubmitted(null)}>
            Send Another Note
          </BrutalButton>
        </div>
      </BrutalCard>
    );
  }

  return (
    <BrutalCard className="space-y-5">
      <div>
        <h3 className="text-2xl font-extrabold tracking-tight mb-1">
          Quick Chai Note (Skip the Planner)
        </h3>
        <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">
          Short mein batao kya chahiye — your note is saved to our lead desk immediately.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qc-name" className="block text-sm font-bold mb-1.5">
              Your Name *
            </label>
            <input
              id="qc-name"
              type="text"
              placeholder="e.g. Aarav Sharma"
              {...register('name')}
              className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-xs font-bold text-[#B95E50] dark:text-[#FFC21A]">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="qc-email" className="block text-sm font-bold mb-1.5">
              Email *
            </label>
            <input
              id="qc-email"
              type="email"
              placeholder="you@brand.in"
              {...register('email')}
              className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-xs font-bold text-[#B95E50] dark:text-[#FFC21A]">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qc-phone" className="block text-sm font-bold mb-1.5">
              WhatsApp / Phone Number *
            </label>
            <input
              id="qc-phone"
              type="tel"
              placeholder="+91 98290 XXXXX"
              {...register('phone')}
              className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
            />
            {errors.phone && (
              <p className="mt-1 text-xs font-bold text-[#B95E50] dark:text-[#FFC21A]">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="qc-need" className="block text-sm font-bold mb-1.5">
              Primary Need
            </label>
            <select
              id="qc-need"
              {...register('need')}
              className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
            >
              <option value="Brand & Digital Diagnostic">Brand & Digital Diagnostic</option>
              <option value="Creative Website / D2C Store">Creative Website / D2C Store</option>
              <option value="Growth Partnership (Ads + Content)">Growth Partnership (Ads + Content)</option>
              <option value="Brand Identity & UI/UX">Brand Identity & UI/UX</option>
              <option value="Custom App / CRM / Automation">Custom App / CRM / Automation</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="qc-msg" className="block text-sm font-bold mb-1.5">
            Project Summary *
          </label>
          <textarea
            id="qc-msg"
            rows={3}
            placeholder="Business ke baare mein 2–3 lines aur aapka main goal..."
            {...register('message')}
            className="w-full px-3.5 py-2.5 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
          />
          {errors.message && (
            <p className="mt-1 text-xs font-bold text-[#B95E50] dark:text-[#FFC21A]">
              {errors.message.message}
            </p>
          )}
        </div>

        <BrutalButton type="submit" variant="hotPink" size="md" disabled={isSubmitting} className="w-full">
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Saving…' : 'Send Note'}</span>
        </BrutalButton>
      </form>
    </BrutalCard>
  );
}
