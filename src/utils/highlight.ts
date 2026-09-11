/**
 * Розбиття тексту на частини для підсвітки збігу з пошуковим запитом.
 * Повертає сегменти замість готового HTML, щоб не вставляти рядки в DOM.
 */
export type HighlightPart = {
  text: string;
  isMatch: boolean;
};

export function splitByMatch(text: string, query: string): HighlightPart[] {
  const needle = query.trim().toLocaleLowerCase('uk');
  if (needle === '') return [{ text, isMatch: false }];

  const index = text.toLocaleLowerCase('uk').indexOf(needle);
  if (index === -1) return [{ text, isMatch: false }];

  const parts: HighlightPart[] = [];
  if (index > 0) parts.push({ text: text.slice(0, index), isMatch: false });
  parts.push({ text: text.slice(index, index + needle.length), isMatch: true });

  const tail = text.slice(index + needle.length);
  if (tail !== '') parts.push({ text: tail, isMatch: false });

  return parts;
}
