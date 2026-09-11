import type { CategoryColor, EvidenceLevel } from '@/types';

export const SITE_NAME = 'mindterms';
export const SITE_URL = 'https://mindterms.vercel.app';
export const SITE_DESCRIPTION =
  'Довідник з психології українською: 48 понять із визначенням, прикладом, ' +
  'поширеною помилкою та позначкою доказовості.';

/** Поки що одна мова. next-intl додамо, коли зʼявиться en і pl. */
export const LOCALES = ['uk'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'uk';

/** Абсолютний шлях у межах локалі: localePath('/catalog') → '/uk/catalog' */
export function localePath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/index', label: 'Покажчик' },
  { href: '/confuse', label: 'Плутанина' },
  { href: '/help', label: 'Допомога' },
  { href: '/about', label: 'Про проєкт' },
];

/** Пошук у мапі сайту окремо: у шапці він кнопкою, а не пунктом меню */
export const SEARCH_PATH = '/search';

/** Українські лінії підтримки для розділу «Допомога» */
export type Hotline = {
  name: string;
  phone: string;
  tel: string;
  note: string;
};

export const HOTLINES: Hotline[] = [
  {
    name: 'Лінія запобігання самогубствам «Lifeline Ukraine»',
    phone: '7333',
    tel: 'tel:7333',
    note: 'Цілодобово, безкоштовно з мобільних операторів України',
  },
  {
    name: 'Національна гаряча лінія з попередження домашнього насильства',
    phone: '0 800 100 102',
    tel: 'tel:0800100102',
    note: 'Цілодобово, безкоштовно зі стаціонарних і мобільних',
  },
];

type EvidenceMeta = {
  /** Коротка назва рівня для бейджа */
  label: string;
  /** Розгорнуте пояснення, що цей рівень означає */
  description: string;
};

/** Рівні доказовості — головна відмінність проєкту, тому опис один на весь сайт */
export const EVIDENCE_META: Record<EvidenceLevel, EvidenceMeta> = {
  3: {
    label: 'Міцна основа',
    description:
      'Ефект багато разів відтворений у незалежних дослідженнях і має ' +
      'узгоджені метааналізи. Сперечаються про деталі, не про існування.',
  },
  2: {
    label: 'Частково підтверджено',
    description:
      'Дані є, але вони неоднорідні: частина досліджень підтверджує ефект, ' +
      'частина — ні. Межі явища ще уточнюють.',
  },
  1: {
    label: 'Слабка основа',
    description:
      'Поняття популярне, але суворих підтверджень мало або вони не ' +
      'відтворюються. Користуватись ним варто обережно.',
  },
};

export const EVIDENCE_LEVELS: EvidenceLevel[] = [3, 2, 1];

/**
 * Ті самі кольори, що й у variables.css, але значеннями.
 * OG-зображення малює satori, який не вміє читати CSS-змінні.
 */
export const CATEGORY_HEX: Record<CategoryColor, string> = {
  trait: '#3d6e8c',
  attach: '#2f7a63',
  dark: '#9a3b4a',
  bias: '#8a5a2b',
  def: '#5b4a8c',
  talk: '#1f7a7a',
  rel: '#a34a2e',
  emo: '#a3407a',
  anx: '#6e6b24',
  cog: '#4a5b9e',
  mot: '#b07a22',
  soc: '#5d7a2e',
};

export const EVIDENCE_HEX: Record<EvidenceLevel, string> = {
  3: '#3f7a57',
  2: '#96762a',
  1: '#a34a2e',
};

/** Нейтральні кольори світлої теми для OG-зображень */
export const OG_HEX = {
  bg: '#f1f3ee',
  ink: '#11161a',
  echo: '#6a7b80',
  accent: '#5b4a8c',
} as const;

/** Ключі searchParams каталогу — щоб фільтром можна було поділитись посиланням */
export const FILTER_PARAM_EVIDENCE = 'evidence';
export const FILTER_PARAM_CATEGORY = 'category';
export const SEARCH_PARAM_QUERY = 'q';
