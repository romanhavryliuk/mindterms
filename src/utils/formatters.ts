import type { Locale } from '@/i18n';

/** «2026-09» + назви місяців локалі → «вересень 2026» */
export function formatMonth(value: string, months: string[]): string {
  const [year, month] = value.split('-');
  const name = months[Number(month) - 1];

  if (year === undefined || name === undefined) return value;
  return `${name} ${year}`;
}

/** Перша літера назви для покажчика за абеткою */
export function getFirstLetter(title: string, locale: Locale): string {
  return (title.trim()[0] ?? '#').toLocaleUpperCase(locale);
}

/**
 * Оригінальний англійський термін під назвою — підказка для пошуку джерел.
 * В англійській версії назва статті часто дослівно збігається з ним
 * («Burnout» / «Burnout»), і підпис перетворюється на повтор заголовка,
 * тому в такому разі його не показуємо.
 */
export function originalTerm(title: string, original: string): string | null {
  return title.trim().toLowerCase() === original.trim().toLowerCase() ? null : original;
}

/** Обрізає визначення до картки, не ріжучи слово навпіл */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}
