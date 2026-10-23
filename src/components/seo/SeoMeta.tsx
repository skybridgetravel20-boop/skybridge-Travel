import React, { useEffect } from 'react';
import { COMPANY_INFO } from '../../data/companyInfo';

export interface SeoMetaProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

/**
 * Dynamic SEO, AIO, GEO, AEO, and SXO Head Manager
 * Updates document title, OpenGraph tags, Twitter cards, canonical links,
 * and dynamically injects Schema.org JSON-LD structured data for rich snippets.
 */
export const SeoMeta: React.FC<SeoMetaProps> = ({
  title,
  description,
  canonicalPath = '',
  keywords,
  ogType = 'website',
  ogImage = 'https://skybridgetravelandtourism.com/skybridge-logo.jpg',
  schema
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title.includes('SkyBridge')
      ? title
      : `${title} | SkyBridge Travel & Tourism`;
    document.title = formattedTitle;

    // 2. Helper to set or create meta tags
    const setMetaTag = (selector: string, attr: string, attrValue: string, content: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 3. Update Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 4. Update OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', formattedTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', COMPANY_INFO.name);

    // 5. Canonical & OpenGraph URL
    const baseUrl = COMPANY_INFO.websiteUrl;
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const fullCanonicalUrl = canonicalPath ? `${baseUrl}${cleanPath}` : baseUrl;

    setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonicalUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 6. Update Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', formattedTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 7. Inject Page-Specific Schema.org JSON-LD
    let schemaScript = document.getElementById('page-schema-jsonld') as HTMLScriptElement | null;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-schema-jsonld';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    // Cleanup on unmount or page change
    return () => {
      const el = document.getElementById('page-schema-jsonld');
      if (el) el.remove();
    };
  }, [title, description, canonicalPath, keywords, ogType, ogImage, schema]);

  return null;
};
