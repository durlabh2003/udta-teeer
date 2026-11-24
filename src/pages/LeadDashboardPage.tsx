import React, { useCallback, useEffect, useState } from 'react';
import { Download, RefreshCw, Search } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { BrutalButton } from '../components/ui/BrutalButton';
import { BrutalCard } from '../components/ui/BrutalCard';

type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Discovery Scheduled'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost'
  | 'On Hold';

const PIPELINE_STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'Qualified',
  'Discovery Scheduled',
  'Proposal Sent',
  'Negotiation',
  'Won',
  'Lost',
  'On Hold',
];

interface LeadRecord {
  leadId: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  businessName: string;
  industry: string;
  selectedServices: string[];
  budget: string;
  timeline: string;
  engagementType: string;
  requirementNotes: string;
  sourcePage: string;
  status: LeadStatus;
  internalNotes: string;
  createdAt: string;
}

export function LeadDashboardPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('q', search.trim());
      if (statusFilter !== 'All') params.set('status', statusFilter);
      if (industryFilter !== 'All') params.set('industry', industryFilter);
      const res = await fetch(`/api/leads?${params.toString()}`);
      const data = await res.json();
      if (data.ok && Array.isArray(data.leads)) {
        setLeads(data.leads);
        const notesMap: Record<string, string> = {};
        for (const l of data.leads as LeadRecord[]) {
          notesMap[l.leadId] = l.internalNotes ?? '';
        }
        setNoteDrafts(notesMap);
      }
    } catch {
      // Demo mode: API optional
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, industryFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (leadId: string, nextStatus: LeadStatus) => {
    setSavingId(leadId);
    try {
      const res = await fetch(`/api/leads/${encodeURIComponent(leadId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.ok && data.lead) {
        setLeads((prev) => prev.map((l) => (l.leadId === leadId ? data.lead : l)));
      }
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    setSavingId(leadId);
    try {
      const res = await fetch(`/api/leads/${encodeURIComponent(leadId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: noteDrafts[leadId] ?? '' }),
      });
      const data = await res.json();
      if (data.ok && data.lead) {
        setLeads((prev) => prev.map((l) => (l.leadId === leadId ? data.lead : l)));
      }
    } finally {
      setSavingId(null);
    }
  };

  const uniqueIndustries = Array.from(new Set(leads.map((l) => l.industry))).filter(Boolean);

  return (
    <>
      <SEOHead
        title="Studio Lead Management Desk | Urdta Teeeeeer"
        description="Studio lead preview pipeline for Urdta Teeeeeer."
        path="/admin/leads"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="type-label text-[var(--text-terracotta)]">Studio CRM Desk</p>
            <h1 className="type-display">Lead Pipeline Overview</h1>
            <p className="type-small text-[var(--text-secondary)]">
              Filter captured demo enquiries, update stages, and review brief notes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <BrutalButton variant="secondary" size="sm" onClick={fetchLeads}>
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </BrutalButton>
            <BrutalButton href="/api/leads/export" variant="secondary" size="sm">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </BrutalButton>
          </div>
        </div>

        {/* Filters Bar */}
        <BrutalCard className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Lead ID, name, email, or business..."
              className="w-full min-h-[44px] pl-9 pr-3 py-2 brutal-border bg-[var(--bg-cream)] text-[var(--text-primary)] rounded-[6px] text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by pipeline status"
            className="min-h-[44px] px-3 py-2 brutal-border bg-[var(--bg-cream)] text-[var(--text-primary)] rounded-[6px] text-sm font-bold"
          >
            <option value="All">All Statuses</option>
            {PIPELINE_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            aria-label="Filter by industry"
            className="min-h-[44px] px-3 py-2 brutal-border bg-[var(--bg-cream)] text-[var(--text-primary)] rounded-[6px] text-sm font-bold"
          >
            <option value="All">All Industries</option>
            {uniqueIndustries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </BrutalCard>

        {/* Leads List */}
        {loading ? (
          <BrutalCard className="p-8 text-center font-bold">Loading captured leads...</BrutalCard>
        ) : leads.length === 0 ? (
          <BrutalCard className="p-8 text-center space-y-3">
            <p className="font-bold">No stored leads matching the current filter.</p>
            <BrutalButton to="/plan-your-project" variant="primary" size="sm">
              Try Project Planner Demo
            </BrutalButton>
          </BrutalCard>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <BrutalCard key={lead.leadId} className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b-2 border-[var(--border-ink)]/15">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 type-label">
                      <span className="px-2 py-0.5 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[4px]">
                        {lead.leadId}
                      </span>
                      <span>{new Date(lead.createdAt).toLocaleString()}</span>
                      <span>· Source: {lead.sourcePage || '/'}</span>
                    </div>
                    <h2 className="type-h3 mt-1">
                      {lead.fullName}
                      {lead.businessName ? ` — ${lead.businessName}` : ''}
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {lead.email} · {lead.phone} · Industry: {lead.industry}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <label htmlFor={`st-${lead.leadId}`} className="text-xs font-bold">
                      Stage:
                    </label>
                    <select
                      id={`st-${lead.leadId}`}
                      value={lead.status}
                      disabled={savingId === lead.leadId}
                      onChange={(e) => handleStatusChange(lead.leadId, e.target.value as LeadStatus)}
                      className="min-h-[44px] px-3 py-1.5 brutal-border bg-[var(--color-cobalt)] text-[var(--text-on-cobalt)] rounded-[6px] text-xs font-extrabold cursor-pointer"
                    >
                      {PIPELINE_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs md:text-sm">
                  <div className="md:col-span-7 space-y-1">
                    <p>
                      <strong>Services:</strong> {lead.selectedServices.join(', ')}
                    </p>
                    <p>
                      <strong>Budget:</strong> {lead.budget} · <strong>Timeline:</strong>{' '}
                      {lead.timeline} · <strong>Engagement:</strong> {lead.engagementType}
                    </p>
                    {lead.requirementNotes && (
                      <p className="text-xs opacity-85 pt-1">
                        <strong>Notes:</strong> {lead.requirementNotes}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-5 flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
                    <div className="flex-1">
                      <label htmlFor={`note-${lead.leadId}`} className="block text-xs font-bold mb-1">
                        Internal Studio Notes
                      </label>
                      <input
                        id={`note-${lead.leadId}`}
                        type="text"
                        value={noteDrafts[lead.leadId] ?? ''}
                        onChange={(e) =>
                          setNoteDrafts((prev) => ({ ...prev, [lead.leadId]: e.target.value }))
                        }
                        placeholder="Add follow-up context..."
                        className="w-full min-h-[44px] px-3 py-1.5 brutal-border bg-[var(--bg-cream)] text-[var(--text-primary)] rounded-[6px] text-xs"
                      />
                    </div>
                    <BrutalButton
                      variant="secondary"
                      size="sm"
                      disabled={savingId === lead.leadId}
                      onClick={() => handleSaveNotes(lead.leadId)}
                    >
                      Save Note
                    </BrutalButton>
                  </div>
                </div>
              </BrutalCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
