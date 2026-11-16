# Urdta Teeeeeer — Digital Pink City Creative Technology Studio

> **"You bring the ambition. We bring the aim."**  
> Based in the Pink City. Building for the world. जयपुर से, दुनिया के लिए।

---

## 1. Architecture & Tech Stack
- **Frontend**: React 19 + TypeScript + Vite 8 + React Router v7
- **Backend Server (`server.ts`)**: Express + Vite middleware serving on port `3000` with persistent JSON storage (`data/leads.json` & `data/audits.json`):
  - `POST /api/leads` — Zod-validated lead capture with honeypot spam guard, 45s duplicate protection, and tracked `UT-YYYY-XXX` Lead IDs
  - `GET /api/leads` — Filterable by query, pipeline status, industry, service, and budget
  - `PATCH /api/leads/:leadId` — Updates 9-stage pipeline status and internal studio notes
  - `GET /api/leads/export` — Downloads captured leads as CSV
  - `POST /api/audit` — Captures Free Website & SEO Audit requests (`AUD-YYYY-XXX`)
- **Styling**: Tailwind CSS v4 + Consolidated Digital Pink City Tokens (`src/styles/design-tokens.ts` & `src/index.css`) with **Day Jaipur** & **Raat Ka Jaipur** dark mode
- **3D Signature Scene**: Three.js (`src/components/hero/HeroScene3D.tsx`) composite multi-tier Hawa Mahal + interactive string-cutting *patang* kites with `prefers-reduced-motion` illustration fallback

---

## 2. Key Pages & Routes
- `/` — 8-section Digital Pink City narrative (Hero 3D + 3 Jaipur Service Establishments + Filterable Project Bazaar + 10 Industry Districts + 6-Stage Amer Fort Process + Why Urdta Teeeeeer + Layer A/B/C Packages + Target Board with Inline Project Planner)
- `/services`, `/services/design`, `/services/development`, `/services/marketing` — Creative Haveli, Digital Karkhana & Growth Bazaar
- `/industries` & `/industries/:slug` — 10 tailored industry verticals (`retail`, `hospitality`, `handicrafts`, `education`, `restaurants`, `startups`, `healthcare`, `real-estate`, `manufacturing`, `other`)
- `/work` & `/work/:slug` — Filterable Project Bazaar (`tapinfi`, `cafeos`, `vyapaar-saathi`, plus honest launch case-study templates)
- `/insights` & `/insights/:slug` — Playbooks with category filtering, search, and Table of Contents
- `/plan-your-project` & `/build` — 4-step Interactive Project Planner (also usable via global modal and homepage inline mode)
- `/packages` — Layer A (Starter from ₹2,999 with explicit micro-deliverable scope note), Layer B (Growth), Layer C (Custom)
- `/thank-you` — Tracked Lead ID confirmation screen with WhatsApp & consultation follow-up
- `/admin/leads` — Internal Lead Management Dashboard with 9-stage pipeline dropdowns, internal notes, and CSV export
- `/privacy-policy`, `/terms`, `/process`, `/about`, `/contact`, `/faq`, plus 11 Jaipur/India SEO service slugs (`/website-development-jaipur`, etc.)

---

## 3. Content Integrity & Launch Checklist
- **Portfolio Verification**: `Tapinfi`, `CafeOS`, and `Vyapaar Saathi` carry transparent `"Portfolio Candidate · Scope Verification Pending"` labels until final partner sign-off and verified metrics are added.
- **Pricing Transparency**: Public `₹2,999` starter pricing applies solely to focused starter micro-deliverables; full custom websites start from `₹40,000+`.
- **Pre-Launch**: Update `whatsappNumber`, `email`, and `legalEntityNote` in `src/data/site-config.json`.

---

## 4. Development & Build
```bash
npm install
npm run lint
npm run build
npm run dev   # starts Express server.ts + Vite middleware on port 3000
```
