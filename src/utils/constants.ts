import type { CategoryColor, EvidenceLevel } from '@/types';

export const SITE_NAME = 'mindterms';
export const SITE_URL = 'https://mindterms.vercel.app';

/** Підписи беруться з каталогу повідомлень за ключем */
export type NavItem = {
  href: string;
  key: 'catalog' | 'index' | 'confuse' | 'help' | 'about';
};

export const NAV_ITEMS: NavItem[] = [
  { href: '/catalog', key: 'catalog' },
  { href: '/index', key: 'index' },
  { href: '/confuse', key: 'confuse' },
  { href: '/help', key: 'help' },
  { href: '/about', key: 'about' },
];

/** Пошук у шапці кнопкою, а не пунктом меню */
export const SEARCH_PATH = '/search';

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
