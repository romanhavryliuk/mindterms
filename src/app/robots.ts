import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/utils/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Генератор картинок індексувати нема сенсу
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
