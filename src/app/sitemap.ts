import type { MetadataRoute } from 'next';

import { getAllCollections, getAllConcepts } from '@/services/contentService';
import { LOCALES, localePath, NAV_LINKS, SITE_URL } from '@/utils/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}${localePath('/', locale)}`,
      changeFrequency: 'monthly',
      priority: 1,
    });

    for (const link of NAV_LINKS) {
      entries.push({
        url: `${SITE_URL}${localePath(link.href, locale)}`,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    for (const collection of getAllCollections()) {
      entries.push({
        url: `${SITE_URL}${localePath(`/collection/${collection.id}`, locale)}`,
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }

    for (const concept of getAllConcepts()) {
      entries.push({
        url: `${SITE_URL}${localePath(`/concept/${concept.id}`, locale)}`,
        changeFrequency: 'yearly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
