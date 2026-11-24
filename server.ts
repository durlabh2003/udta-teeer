import fs from 'fs';
import http from 'http';
import path from 'path';
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { z } from 'zod';
import { securityHeadersMiddleware } from './src/lib/security';

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const AUDITS_FILE = path.join(DATA_DIR, 'audits.json');

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Discovery Scheduled'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost'
  | 'On Hold';

export interface StoredLead {
  leadId: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  businessName: string;
  industry: string;
  website: string;
  primaryObjectives: string[];
  businessStage: string;
  selectedServices: string[];
  budget: string;
  timeline: string;
  engagementType: string;
  requirementNotes: string;
  sourcePage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  consent: boolean;
  status: LeadStatus;
  internalNotes: string;
  createdAt: string;
}

interface StoredAudit {
  auditId: string;
  name: string;
  email: string;
  phone: string;
  websiteUrl: string;
  focusArea: string;
  createdAt: string;
}

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
  if (!fs.existsSync(AUDITS_FILE)) {
    fs.writeFileSync(AUDITS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readLeads(): StoredLead[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLeads(leads: StoredLead[]) {
  ensureStorage();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

function readAudits(): StoredAudit[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(AUDITS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAudits(audits: StoredAudit[]) {
  ensureStorage();
  fs.writeFileSync(AUDITS_FILE, JSON.stringify(audits, null, 2), 'utf-8');
}

const createLeadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(8).max(24),
  whatsapp: z.string().trim().max(24).optional().default(''),
  businessName: z.string().trim().max(140).optional().default(''),
  industry: z.string().trim().max(80).optional().default('Other'),
  website: z.string().trim().max(240).optional().default(''),
  primaryObjectives: z.array(z.string()).optional().default([]),
  businessStage: z.string().trim().max(80).optional().default(''),
  selectedServices: z.array(z.string()).min(1),
  budget: z.string().trim().max(80).optional().default('Not sure yet'),
  timeline: z.string().trim().max(80).optional().default('Exploring'),
  engagementType: z.string().trim().max(80).optional().default('Not sure'),
  requirementNotes: z.string().trim().max(2000).optional().default(''),
  sourcePage: z.string().trim().max(200).optional().default('/'),
  utmSource: z.string().trim().max(100).optional().default(''),
  utmMedium: z.string().trim().max(100).optional().default(''),
  utmCampaign: z.string().trim().max(100).optional().default(''),
  consent: z.literal(true),
  honeypot: z.string().optional().default(''),
});

const createAuditSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(8).max(24),
  websiteUrl: z.string().trim().min(3).max(240),
  focusArea: z.string().trim().max(120).optional().default('Full Website & SEO Audit'),
});

// Simple in-memory rate-limit & duplicate-submission protection
const recentSubmissions = new Map<string, number>();

const ALL_ROUTES = [
  '/',
  '/services',
  '/services/design',
  '/services/development',
  '/services/marketing',
  '/industries',
  '/industries/retail',
  '/industries/hospitality',
  '/industries/handicrafts',
  '/industries/education',
  '/industries/restaurants',
  '/industries/startups',
  '/industries/healthcare',
  '/industries/real-estate',
  '/industries/manufacturing',
  '/industries/other',
  '/work',
  '/work/tapinfi',
  '/work/cafeos',
  '/work/vyapaar-saathi',
  '/process',
  '/packages',
  '/insights',
  '/insights/how-jaipur-businesses-can-improve-digital-presence',
  '/insights/why-every-growing-business-needs-professional-website',
  '/insights/branding-vs-marketing-understanding-the-difference',
  '/insights/how-to-choose-the-right-website-solution',
  '/insights/seo-and-aeo-for-local-businesses',
  '/insights/what-an-ecommerce-website-should-include',
  '/about',
  '/plan-your-project',
  '/build',
  '/contact',
  '/faq',
  '/privacy-policy',
  '/terms',
  '/website-development-jaipur',
  '/ecommerce-development-jaipur',
  '/branding-agency-jaipur',
  '/ui-ux-design-jaipur',
  '/digital-marketing-jaipur',
  '/seo-services-jaipur',
  '/social-media-marketing-jaipur',
  '/performance-marketing-jaipur',
  '/mobile-app-development-jaipur',
  '/automation-ai-jaipur',
  '/saas-development',
];

function resolveCanonicalOrigin(req: Request): string {
  if (process.env.CANONICAL_ORIGIN) {
    return process.env.CANONICAL_ORIGIN.replace(/\/+$/, '');
  }
  const forwardedHost = (req.get('x-forwarded-host') || req.get('host') || '')
    .split(',')[0]
    .trim();
  const forwardedProto = (req.get('x-forwarded-proto') || req.protocol || 'https')
    .split(',')[0]
    .trim();
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
  }
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/+$/, '');
  }
  return 'https://udta-teeer.vercel.app';
}

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  const httpServer = http.createServer(app);
  app.use(express.json({ limit: '512kb' }));

  // Security & Caching Headers Middleware
  app.use(securityHeadersMiddleware);

  // Dynamic robots.txt & sitemap.xml so canonical domain matches active host
  app.get('/robots.txt', (req: Request, res: Response) => {
    const origin = resolveCanonicalOrigin(req);
    res
      .type('text/plain')
      .send(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
  });

  const SITEMAP_IMAGES: Record<string, Array<{ path: string; title: string }>> = {
    '/': [
      {
        path: '/og-image.jpg',
        title: 'Urdta Teeeeeer — Jaipur Branding & Web Development Studio',
      },
    ],
    '/services': [
      {
        path: '/og-image.jpg',
        title: 'Urdta Teeeeeer Branding, Web Development &amp; Growth Services',
      },
    ],
    '/packages': [
      {
        path: '/og-image.jpg',
        title: 'Urdta Teeeeeer Jaipur Pricing &amp; Investment Tiers',
      },
    ],
  };

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const origin = resolveCanonicalOrigin(req);
    const urls = ALL_ROUTES.map((route) => {
      const images = SITEMAP_IMAGES[route];
      if (!images || images.length === 0) {
        return `  <url><loc>${origin}${route}</loc></url>`;
      }
      const imageTags = images
        .map(
          (img) =>
            `    <image:image>\n      <image:loc>${origin}${img.path}</image:loc>\n      <image:title>${img.title}</image:title>\n    </image:image>`
        )
        .join('\n');
      return `  <url>\n    <loc>${origin}${route}</loc>\n${imageTags}\n  </url>`;
    }).join('\n');
    res
      .type('application/xml')
      .send(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`
      );
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, service: 'urdta-teeeeeer-api' });
  });

  // Create lead record
  app.post('/api/leads', (req: Request, res: Response) => {
    const parsed = createLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        error: 'Validation failed',
        issues: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parsed.data;
    // Silent honeypot spam rejection
    if (data.honeypot && data.honeypot.trim().length > 0) {
      res.status(200).json({ ok: true, leadId: 'UT-SPAM-FILTERED' });
      return;
    }

    // Duplicate submission guard (within 45s for same email+phone)
    const dedupKey = `${data.email.toLowerCase()}::${data.phone}`;
    const lastTime = recentSubmissions.get(dedupKey);
    const now = Date.now();
    if (lastTime && now - lastTime < 45000) {
      res.status(429).json({
        ok: false,
        error: 'Duplicate submission detected. Please wait a moment before submitting again.',
      });
      return;
    }
    recentSubmissions.set(dedupKey, now);

    const leads = readLeads();
    const seq = String(leads.length + 1).padStart(3, '0');
    const year = new Date().getFullYear();
    const leadId = `UT-${year}-${seq}`;

    const newLead: StoredLead = {
      leadId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp || data.phone,
      businessName: data.businessName,
      industry: data.industry,
      website: data.website,
      primaryObjectives: data.primaryObjectives,
      businessStage: data.businessStage,
      selectedServices: data.selectedServices,
      budget: data.budget,
      timeline: data.timeline,
      engagementType: data.engagementType,
      requirementNotes: data.requirementNotes,
      sourcePage: data.sourcePage,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      consent: data.consent,
      status: 'New',
      internalNotes: '',
      createdAt: new Date().toISOString(),
    };

    leads.unshift(newLead);
    writeLeads(leads);

    res.status(201).json({
      ok: true,
      leadId: newLead.leadId,
      lead: newLead,
    });
  });

  // List & filter leads for Lead Management Dashboard
  app.get('/api/leads', (req: Request, res: Response) => {
    const { q, status, industry, service, budget } = req.query;
    let leads = readLeads();

    if (typeof status === 'string' && status && status !== 'All') {
      leads = leads.filter((l) => l.status === status);
    }
    if (typeof industry === 'string' && industry && industry !== 'All') {
      leads = leads.filter((l) => l.industry === industry);
    }
    if (typeof budget === 'string' && budget && budget !== 'All') {
      leads = leads.filter((l) => l.budget === budget);
    }
    if (typeof service === 'string' && service && service !== 'All') {
      leads = leads.filter((l) =>
        l.selectedServices.some((s) => s.toLowerCase().includes(service.toLowerCase()))
      );
    }
    if (typeof q === 'string' && q.trim()) {
      const needle = q.trim().toLowerCase();
      leads = leads.filter(
        (l) =>
          l.leadId.toLowerCase().includes(needle) ||
          l.fullName.toLowerCase().includes(needle) ||
          l.email.toLowerCase().includes(needle) ||
          l.businessName.toLowerCase().includes(needle)
      );
    }

    res.json({ ok: true, leads });
  });

  // Update lead status or internal notes
  app.patch('/api/leads/:leadId', (req: Request, res: Response) => {
    const { leadId } = req.params;
    const { status, internalNotes } = req.body as {
      status?: LeadStatus;
      internalNotes?: string;
    };

    const leads = readLeads();
    const idx = leads.findIndex((l) => l.leadId === leadId);
    if (idx === -1) {
      res.status(404).json({ ok: false, error: 'Lead not found' });
      return;
    }

    if (status) leads[idx].status = status;
    if (typeof internalNotes === 'string') leads[idx].internalNotes = internalNotes;
    writeLeads(leads);

    res.json({ ok: true, lead: leads[idx] });
  });

  // CSV export
  app.get('/api/leads/export', (_req: Request, res: Response) => {
    const leads = readLeads();
    const headers = [
      'Lead ID',
      'Full Name',
      'Email',
      'Phone',
      'WhatsApp',
      'Business',
      'Industry',
      'Services',
      'Budget',
      'Timeline',
      'Engagement',
      'Status',
      'Source Page',
      'Created At',
    ];
    const escapeCsv = (val: string) => `"${String(val ?? '').replace(/"/g, '""')}"`;
    const rows = leads.map((l) =>
      [
        l.leadId,
        l.fullName,
        l.email,
        l.phone,
        l.whatsapp,
        l.businessName,
        l.industry,
        l.selectedServices.join('; '),
        l.budget,
        l.timeline,
        l.engagementType,
        l.status,
        l.sourcePage,
        l.createdAt,
      ]
        .map(escapeCsv)
        .join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="urdta-teeeeeer-leads.csv"');
    res.send(csv);
  });

  // Free audit submission
  app.post('/api/audit', (req: Request, res: Response) => {
    const parsed = createAuditSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ ok: false, issues: parsed.error.flatten().fieldErrors });
      return;
    }
    const audits = readAudits();
    const auditId = `AUD-${new Date().getFullYear()}-${String(audits.length + 1).padStart(3, '0')}`;
    const record: StoredAudit = {
      auditId,
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };
    audits.unshift(record);
    writeAudits(audits);
    res.status(201).json({ ok: true, auditId, audit: record });
  });

  if (process.env.NODE_ENV !== 'production') {
    const disableHmr = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        ...(disableHmr ? { hmr: false, ws: false } : { ws: { server: httpServer } }),
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Urdta Teeeeeer server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
