import type { EvidenceLevel } from '@/types';

/**
 * Пошук по індексу понять. Індекс збирається на сервері під час збірки
 * і передається в клієнтський компонент пропсами — бази даних тут немає.
 */

export type SearchEntry = {
  id: string;
  title: string;
  original: string;
  definition: string;
  evidence: EvidenceLevel;
  categoryId: string;
  categoryName: string;
  /** Склеєний текст статті у нижньому регістрі — для пошуку по тілу */
  haystack: string;
};

export type SearchResult = SearchEntry & {
  /** 3 — збіг у назві, 2 — у визначенні, 1 — у тексті статті */
  score: 3 | 2 | 1;
};

export const MIN_QUERY_LENGTH = 2;

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase('uk');
}

/** Ранжування як у прототипі: назва важливіша за визначення, воно — за текст */
function scoreEntry(entry: SearchEntry, needle: string): SearchResult['score'] | null {
  if (normalize(`${entry.title} ${entry.original}`).includes(needle)) return 3;
  if (normalize(entry.definition).includes(needle)) return 2;
  if (entry.haystack.includes(needle) || normalize(entry.categoryName).includes(needle)) {
    return 1;
  }
  return null;
}

export function searchConcepts(index: SearchEntry[], query: string): SearchResult[] {
  const needle = normalize(query);
  if (needle.length < MIN_QUERY_LENGTH) return [];

  const results: SearchResult[] = [];

  for (const entry of index) {
    const score = scoreEntry(entry, needle);
    if (score !== null) results.push({ ...entry, score });
  }

  return results.sort((a, b) => b.score - a.score);
}
