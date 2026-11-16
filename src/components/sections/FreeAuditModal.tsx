import React, { useState } from 'react';
import { CheckCircle2, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackConversionEvent } from '../../lib/analytics';
import { submitFreeAudit } from '../../lib/crmAdapter';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalModal } from '../ui/BrutalModal';

export function FreeAuditModal() {
  const { auditModalOpen, closeAuditModal } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [focusArea, setFocusArea] = useState('Website Speed & Conversion Audit');
  const [error, setError] = useState<string | null>(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || !email.includes('@') || websiteUrl.trim().length < 4) {
      setError('Please enter your name, email, and website/store URL.');
      return;
    }
    setError(null);
    setSubmitting(true);
    const res = await submitFreeAudit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || 'Not provided',
      websiteUrl: websiteUrl.trim(),
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
        closeAuditModal();
      }}
      title="Request a Free 5-Point Website & SEO Audit"
      accent="peacock"
    >
      {auditId ? (
        <div className="space-y-4 py-4 text-center">
          <CheckCircle2 className="w-10 h-10 mx-auto text-[#1FB5B0]" />
          <h3 className="text-2xl font-extrabold">Audit Request Received!</h3>
          <p className="text-sm">
            Reference <span className="font-mono-num font-bold">{auditId}</span> — we&apos;ll send
            a concise Loom / scorecard review within 48 working hours.
          </p>
          <BrutalButton
            variant="marigold"
            size="md"
            onClick={() => {
              setAuditId(null);
              closeAuditModal();
            }}
          >
            Done
          </BrutalButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-[#4B433C] dark:text-[#E7D8C5]">
            Share your website or store URL. We check mobile speed, clarity in 5 seconds, SEO/AEO
            structure, and conversion leaks — zero obligation.
          </p>

          {error && (
            <div className="p-2.5 brutal-border bg-[#FFC21A] text-[#111111] text-xs font-bold rounded-[4px]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="fa-name" className="block text-xs font-bold mb-1">
                Your Name *
              </label>
              <input
                id="fa-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
              />
            </div>
            <div>
              <label htmlFor="fa-email" className="block text-xs font-bold mb-1">
                Email *
              </label>
              <input
                id="fa-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="fa-url" className="block text-xs font-bold mb-1">
                Website / Store URL *
              </label>
              <input
                id="fa-url"
                type="text"
                placeholder="https://..."
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full px-3 py-2 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
              />
            </div>
            <div>
              <label htmlFor="fa-phone" className="block text-xs font-bold mb-1">
                WhatsApp / Phone
              </label>
              <input
                id="fa-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fa-focus" className="block text-xs font-bold mb-1">
              Primary Audit Focus
            </label>
            <select
              id="fa-focus"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="w-full px-3 py-2 brutal-border bg-[#FFF9F0] dark:bg-[#182235] rounded-[4px] text-sm"
            >
              <option>Website Speed & Conversion Audit</option>
              <option>Local SEO & Google Business Profile</option>
              <option>E-Commerce Storefront CRO</option>
              <option>Ad Account & Landing Page Leaks</option>
            </select>
          </div>

          <BrutalButton type="submit" variant="hotPink" size="md" disabled={submitting} className="w-full">
            <Search className="w-4 h-4" />
            <span>{submitting ? 'Submitting…' : 'Request Free Audit'}</span>
          </BrutalButton>
        </form>
      )}
    </BrutalModal>
  );
}
