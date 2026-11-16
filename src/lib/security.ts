import type { NextFunction, Request, Response } from 'express';

export interface CspOptions {
  /** Enable WebSocket connections (ws:/wss:) for Vite dev/HMR clients. */
  allowWebSockets?: boolean;
  /** Allow AI Studio iframe ancestor hosts during preview/development. */
  allowAiStudioFrame?: boolean;
  /** Append upgrade-insecure-requests directive in strict HTTPS production. */
  upgradeInsecureRequests?: boolean;
}

const AI_STUDIO_FRAME_ANCESTORS =
  "'self' https://aistudio.google.com https://*.googleusercontent.com https://*.google.com";

/**
 * Builds a hardened Content-Security-Policy string covering scripts, styles,
 * images, fonts, workers, and anti-injection/anti-framing directives.
 */
export function buildContentSecurityPolicy(options: CspOptions = {}): string {
  const {
    allowWebSockets = false,
    allowAiStudioFrame = false,
    upgradeInsecureRequests = false,
  } = options;

  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "worker-src 'self' blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "media-src 'self'",
    "manifest-src 'self'",
    allowWebSockets ? "connect-src 'self' https: ws: wss:" : "connect-src 'self' https:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${allowAiStudioFrame ? AI_STUDIO_FRAME_ANCESTORS : "'self'"}`,
  ];

  if (upgradeInsecureRequests) {
    directives.push('upgrade-insecure-requests');
  }

  return `${directives.join('; ')};`;
}

/**
 * Strict standalone production Content-Security-Policy string.
 */
export const PRODUCTION_CONTENT_SECURITY_POLICY = buildContentSecurityPolicy({
  allowWebSockets: false,
  allowAiStudioFrame: false,
  upgradeInsecureRequests: false,
});

/**
 * Preview/development Content-Security-Policy permitting AI Studio iframe preview & WS clients.
 */
export const PREVIEW_CONTENT_SECURITY_POLICY = buildContentSecurityPolicy({
  allowWebSockets: true,
  allowAiStudioFrame: true,
  upgradeInsecureRequests: false,
});

/**
 * Default exported Content-Security-Policy string for XSS & data-injection protection.
 */
export const CONTENT_SECURITY_POLICY = PRODUCTION_CONTENT_SECURITY_POLICY;

export function getSecurityHeaders(
  options: CspOptions & { includeXFrameOptions?: boolean } = {}
): Record<string, string> {
  const { includeXFrameOptions = false, ...cspOptions } = options;

  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-DNS-Prefetch-Control': 'off',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    'Cross-Origin-Resource-Policy': 'same-site',
    'Content-Security-Policy': buildContentSecurityPolicy(cspOptions),
  };

  if (includeXFrameOptions) {
    headers['X-Frame-Options'] = 'SAMEORIGIN';
  }

  return headers;
}

/**
 * Express middleware that injects hardened security and asset caching headers.
 */
export function securityHeadersMiddleware(req: Request, res: Response, next: NextFunction): void {
  const host = (req.get('x-forwarded-host') || req.get('host') || '').toLowerCase();
  const isAiStudioPreview =
    host.includes('.run.app') ||
    host.includes('.googleusercontent.com') ||
    host.includes('aistudio.google.com');
  const isStandaloneProd = process.env.NODE_ENV === 'production' && !isAiStudioPreview;

  const headers = getSecurityHeaders({
    allowWebSockets: !isStandaloneProd,
    allowAiStudioFrame: !isStandaloneProd,
    includeXFrameOptions: isStandaloneProd,
  });

  for (const [headerName, headerValue] of Object.entries(headers)) {
    res.setHeader(headerName, headerValue);
  }

  if (req.path.startsWith('/src/assets/') || req.path.startsWith('/assets/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }

  next();
}
