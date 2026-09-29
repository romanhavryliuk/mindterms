import type { Locale } from '@/i18n';

import { SITE_NAME } from './constants';

/**
 * Адреси OG-зображень в одному місці. Картинки малює /api/og, і саме він
 * знає, який набір параметрів чому відповідає — тут лише збирання адреси,
 * щоб сторінки не повторювали рядок запиту.
 */

const WIDTH = 1200;
const HEIGHT = 630;

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

function image(query: string, alt: string): OgImage {
  return { url: `/api/og?${query}`, width: WIDTH, height: HEIGHT, alt };
}

/** Типова картка: назва проєкту, гасло й лічильники */
export function siteImage(locale: Locale): OgImage {
  return image(`locale=${locale}`, SITE_NAME);
}

export function conceptImage(locale: Locale, slug: string, title: string): OgImage {
  return image(`slug=${encodeURIComponent(slug)}&locale=${locale}`, title);
}

export function collectionImage(locale: Locale, slug: string, title: string): OgImage {
  return image(`collection=${encodeURIComponent(slug)}&locale=${locale}`, title);
}
