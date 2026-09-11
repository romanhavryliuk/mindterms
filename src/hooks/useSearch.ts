'use client';

import { useMemo } from 'react';

import {
  MIN_QUERY_LENGTH,
  searchConcepts,
  type SearchEntry,
  type SearchResult,
} from '@/services/searchService';

type UseSearchResult = {
  results: SearchResult[];
  /** Запит закороткий — показуємо підказку, а не «нічого не знайдено» */
  isTooShort: boolean;
  isEmpty: boolean;
};

export function useSearch(index: SearchEntry[], query: string): UseSearchResult {
  const results = useMemo(() => searchConcepts(index, query), [index, query]);
  const isTooShort = query.trim().length < MIN_QUERY_LENGTH;

  return {
    results,
    isTooShort,
    isEmpty: !isTooShort && results.length === 0,
  };
}
