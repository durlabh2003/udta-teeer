import { useEffect } from 'react';
import { resolvePageKeyFromPath, updateMetaTags } from '../lib/seoMeta';
import { generateLocalBusinessSchema } from '../lib/seoSchema';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  pageKey?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SEOHead({
  title,
  description,
  path = '/',
  pageKey,
  ogImage,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    const key = pageKey || resolvePageKeyFromPath(path);
    const resolvedMeta = updateMetaTags(key, {
      title,
      description,
      path,
      ogImage,
    });
    if (title || description) {
      generateLocalBusinessSchema(key, {
        path,
        title: resolvedMeta.title,
        description: resolvedMeta.description,
      });
    }

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
  }, [title, description, path, pageKey, ogImage, jsonLd]);

  return null;
}
