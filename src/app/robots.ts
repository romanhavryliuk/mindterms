import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/utils/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Генератор OG-картинок має лишатись відкритим: краулери Facebook і
      // Twitter поважають robots.txt, і під забороною /api/ прев'ю посилань
      // не підтягується взагалі
      allow: ['/', '/api/og'],
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
