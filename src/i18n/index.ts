import { en } from './messages/en';
import { pl } from './messages/pl';
import { uk, type Messages } from './messages/uk';

/** Порядок задає і перемикач мов, і generateStaticParams */
export const LOCALES = ['uk', 'en', 'pl'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'uk';

const CATALOG: Record<Locale, Messages> = { uk, en, pl };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Невідома мова не має ламати сторінку — віддаємо українську */
export function getMessages(locale: string): Messages {
  return isLocale(locale) ? CATALOG[locale] : CATALOG[DEFAULT_LOCALE];
}

export type { Messages };

/**
 * Звужує сегмент адреси до відомої локалі. Сегмент приходить із params як
 * довільний рядок, тож правило запасного варіанту має жити в одному місці,
 * а не повторюватись у кожному маршруті.
 */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Абсолютний шлях у межах локалі: localePath('/catalog', 'en') → '/en/catalog' */
export function localePath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Блок alternates для метаданих сторінки: канонічна адреса й мовні версії.
 *
 * Шлях кожна сторінка вказує свій: без цього Next успадкує alternates з
 * layout і hreflang з усіх розділів вестиме на головну.
 *
 * canonical важливий передусім для каталогу: фільтри живуть у searchParams,
 * тож /catalog?category=traits і /catalog віддають однаковий HTML. Без
 * канонічної адреси це десятки сторінок-дублікатів для пошукових систем.
 */
export function localeAlternates(
  path: string,
  locale: Locale = DEFAULT_LOCALE
): { canonical: string; languages: Record<Locale, string> } {
  return {
    canonical: localePath(path, locale),
    languages: Object.fromEntries(
      LOCALES.map((item) => [item, localePath(path, item)])
    ) as Record<Locale, string>,
  };
}

/** Замінює {ключ} у рядку на значення: format('Усі {count}', { count: 9 }) */
export function format(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}

export type PluralForms = {
  one: string;
  few: string;
  many: string;
  other: string;
};

/**
 * Правила множини бере Intl: українська й польська мають три форми,
 * англійська — дві. Вручну їх дублювати не треба.
 */
export function plural(count: number, forms: PluralForms, locale: Locale): string {
  const category = new Intl.PluralRules(locale).select(count);
  return forms[category as keyof PluralForms] ?? forms.other;
}

export function formatCount(count: number, forms: PluralForms, locale: Locale): string {
  return `${count} ${plural(count, forms, locale)}`;
}
