import { useEffect } from 'react';
import { SITE } from '@/config/site';

/** Sets document title, meta description and canonical URL for the current page. */
export function usePageMeta(title: string, description?: string, path?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.brand}` : `${SITE.brand} — Traditional Sweetness. Modern & Trusted Quality!`;
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = SITE.url + (path ?? window.location.pathname);
  }, [title, description, path]);
}
