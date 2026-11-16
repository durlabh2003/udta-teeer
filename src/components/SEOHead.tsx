import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SEOHead({ title, description, path = '/', jsonLd }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${selector}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, selector);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description, 'name');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', title, 'name');
    setMeta('twitter:description', description, 'name');

    const canonicalHref = `${window.location.origin}${path}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    // Inject page-specific JSON-LD cleanly
    const existingDynamic = document.getElementById('dynamic-page-jsonld');
    if (existingDynamic) {
      existingDynamic.remove();
    }
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'dynamic-page-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, jsonLd]);

  return null;
}
