import React, { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { submitFreeAudit } from '../../lib/crmAdapter';
import { CelebrationBullseyeIllustration } from '../illustrations/JaipurIllustrations';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalModal } from '../ui/BrutalModal';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FLEX_URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
const INDIAN_MOBILE_REGEX = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

export function FreeAuditModal() {
  const { auditModalOpen, closeAuditModal, t } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [focusArea, setFocusArea] = useState('Website Speed & Conversion Audit');
  const [error, setError] = useState<string | null>(null);
  const [invalidField, setInvalidField] = useState<'name' | 'email' | 'url' | 'phone' | null>(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const nameRef = React.useRef<HTMLInputElement | null>(null);
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const urlRef = React.useRef<HTMLInputElement | null>(null);
  const phoneRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (name.trim().length < 2) {
      setError(t.errors.nameRequired);
      setInvalidField('name');
      nameRef.current?.focus();
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError(t.errors.emailInvalid);
      setInvalidField('email');
      emailRef.current?.focus();
      return;
    }
    if (!FLEX_URL_REGEX.test(websiteUrl.trim())) {
      setError(t.errors.urlInvalid);
      setInvalidField('url');
      urlRef.current?.focus();
      return;
    }
    if (phone.trim() && !INDIAN_MOBILE_REGEX.test(phone.trim())) {
      setError(t.errors.phoneInvalid);
      setInvalidField('phone');
      phoneRef.current?.focus();
      return;
    }

    setError(null);
    setInvalidField(null);
    setSubmitting(true);
    const res = await submitFreeAudit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || 'Not provided',
      websiteUrl: websiteUrl.trim().startsWith('http') ? websiteUrl.trim() : `https://${websiteUrl.trim()}`,
      focusArea,
    });
    setSubmitting(false);
    trackConversionEvent('audit_submit', { label: focusArea });
    setAuditId(res.auditId);
  };

  return (
    <BrutalModal
      isOpen={auditModalOpen}
      onClose={() => {
        setAuditId(null);
        setError(null);
        setInvalidField(null);
        closeAuditModal();
      }}
      title={t.modals.auditTitle}
      accent="cobalt"
    >
      {auditId ? (
        <div className="space-y-4 py-4 text-center flex flex-col items-center">
          <CelebrationBullseyeIllustration className="w-32 h-28" alt={t.modals.auditSuccessTitle} />
          <h3 className="type-h3">{t.modals.auditSuccessTitle}</h3>
          <p className="type-small max-w-md text-[var(--text-secondary)]">
            ID <span className="font-mono-num font-bold text-[var(--text-cobalt)]">{auditId}</span> —{' '}
            {t.modals.auditSuccessNote}
          </p>
          <BrutalButton
            variant="primary"
            size="md"
            onClick={() => {
              setAuditId(null);
              closeAuditModal();
            }}
          >
            {t.modals.auditDone}
          </BrutalButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <p className="type-small text-[var(--text-secondary)]">{t.modals.auditIntro}</p>

          {error && (
            <div
              id="fa-error-alert"
              role="alert"
              className="p-2.5 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] text-xs font-bold rounded-[8px]"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="fa-name" className="block text-xs font-bold mb-1">
                {t.forms.fullName}
              </label>
              <input
                ref={nameRef}
                id="fa-name"
                type="text"
                aria-invalid={invalidField === 'name'}
                aria-describedby={invalidField === 'name' ? 'fa-error-alert' : undefined}
                value={name}
                onChange={(e) => {
                  setError(null);
                  setInvalidField(null);
                  setName(e.target.value);
                }}
                className="w-full min-h-[44px] px-3 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
              />
            </div>
            <div>
              <label htmlFor="fa-email" className="block text-xs font-bold mb-1">
                {t.forms.email}
              </label>
              <input
                ref={emailRef}
                id="fa-email"
                type="email"
                aria-invalid={invalidField === 'email'}
                aria-describedby={invalidField === 'email' ? 'fa-error-alert' : undefined}
                value={email}
                onChange={(e) => {
                  setError(null);
                  setInvalidField(null);
                  setEmail(e.target.value);
                }}
                className="w-full min-h-[44px] px-3 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="fa-url" className="block text-xs font-bold mb-1">
                {t.forms.websiteUrl}
              </label>
              <input
                ref={urlRef}
                id="fa-url"
                type="text"
                placeholder="brand.in"
                aria-invalid={invalidField === 'url'}
                aria-describedby={invalidField === 'url' ? 'fa-error-alert' : undefined}
                value={websiteUrl}
                onChange={(e) => {
                  setError(null);
                  setInvalidField(null);
                  setWebsiteUrl(e.target.value);
                }}
                className="w-full min-h-[44px] px-3 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
              />
            </div>
            <div>
              <label htmlFor="fa-phone" className="block text-xs font-bold mb-1">
                {t.forms.whatsapp}
              </label>
              <input
                ref={phoneRef}
                id="fa-phone"
                type="tel"
                placeholder="+91 98290 12345"
                aria-invalid={invalidField === 'phone'}
                aria-describedby={invalidField === 'phone' ? 'fa-error-alert' : undefined}
                value={phone}
                onChange={(e) => {
                  setError(null);
                  setInvalidField(null);
                  setPhone(e.target.value);
                }}
                className="w-full min-h-[44px] px-3 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fa-focus" className="block text-xs font-bold mb-1">
              {t.forms.focusArea}
            </label>
            <select
              id="fa-focus"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 brutal-border bg-[var(--bg-cream)] rounded-[8px] text-sm"
            >
              <option>Website Speed &amp; Conversion Audit</option>
              <option>Local SEO &amp; Google Business Profile</option>
              <option>E-Commerce Storefront CRO</option>
              <option>Ad Account &amp; Landing Page Leaks</option>
            </select>
          </div>

          <BrutalButton type="submit" variant="primary" size="md" disabled={submitting} className="w-full">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{submitting ? t.modals.auditSubmitting : t.modals.auditSubmit}</span>
          </BrutalButton>
        </form>
      )}
    </BrutalModal>
  );
}
