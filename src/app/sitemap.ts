import type { MetadataRoute } from 'next';

import { localeAlternates, localePath, LOCALES } from '@/i18n';
import { getAllCollections, getAllConcepts } from '@/services/contentService';
import { NAV_ITEMS, SITE_URL } from '@/utils/constants';

/** Ті самі мовні версії, що й у метаданих сторінок, але абсолютними адресами */
function languages(path: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(localeAlternates(path).languages).map(([locale, href]) => [
      locale,
      `${SITE_URL}${href}`,
    ])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const paths: {
    path: string;
    priority: number;
    changeFrequency: 'monthly' | 'yearly';
  }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    ...NAV_ITEMS.map((item) => ({
      path: item.href,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    ...getAllCollections('uk').map((collection) => ({
      path: `/collection/${collection.id}`,
      priority: 0.6,
      changeFrequency: 'yearly' as const,
    })),
    ...getAllConcepts('uk').map((concept) => ({
      path: `/concept/${concept.id}`,
      priority: 0.7,
      changeFrequency: 'yearly' as const,
    })),
  ];

  for (const locale of LOCALES) {
    for (const { path, priority, changeFrequency } of paths) {
      entries.push({
        url: `${SITE_URL}${localePath(path, locale)}`,
        changeFrequency,
        priority,
        alternates: { languages: languages(path) },
      });
    }
  }

  return entries;
}
