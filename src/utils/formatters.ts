/** Три форми множини українською: 1 поняття, 2 поняття, 5 понять */
export type PluralForms = readonly [one: string, few: string, many: string];

export function plural(count: number, forms: PluralForms): string {
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

/** «48 понять», «12 тем», «9 пар» */
export function formatCount(count: number, forms: PluralForms): string {
  return `${count} ${plural(count, forms)}`;
}

export const CONCEPT_FORMS: PluralForms = ['поняття', 'поняття', 'понять'];
export const CATEGORY_FORMS: PluralForms = ['тема', 'теми', 'тем'];
export const PAIR_FORMS: PluralForms = ['пара', 'пари', 'пар'];

const MONTHS = [
  'січень',
  'лютий',
  'березень',
  'квітень',
  'травень',
  'червень',
  'липень',
  'серпень',
  'вересень',
  'жовтень',
  'листопад',
  'грудень',
];

/** «2026-09» → «вересень 2026»; невідомий формат повертаємо як є */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-');
  const name = MONTHS[Number(month) - 1];

  if (year === undefined || name === undefined) return value;
  return `${name} ${year}`;
}

/** Перша літера назви для покажчика за абеткою */
export function getFirstLetter(title: string): string {
  return (title.trim()[0] ?? '#').toLocaleUpperCase('uk');
}

/** Обрізає визначення до картки, не ріжучи слово навпіл */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}
