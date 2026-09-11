'use client';

import { Suspense, useCallback, useState } from 'react';
import Link from 'next/link';

import { SearchBox } from '@/components/SearchBox';
import { SearchResults } from '@/components/SearchResults';
import { useSearch } from '@/hooks/useSearch';
import type { SearchEntry } from '@/services/searchService';
import { localePath, SEARCH_PARAM_QUERY } from '@/utils/constants';
import { CONCEPT_FORMS, formatCount } from '@/utils/formatters';

import { SearchParamsSync } from './SearchParamsSync';
import css from './SearchPage.module.css';

type SearchBrowserProps = {
  index: SearchEntry[];
};

/** Запит живе в адресі, тому результатом пошуку можна поділитись посиланням */
export const SearchBrowser = ({ index }: SearchBrowserProps) => {
  const [query, setQuery] = useState('');
  const { results, isTooShort, isEmpty } = useSearch(index, query);

  const handleSync = useCallback((next: string) => {
    setQuery((current) => (current === next ? current : next));
  }, []);

  const handleSubmit = useCallback((next: string) => {
    const trimmed = next.trim();
    setQuery(trimmed);

    const url =
      trimmed === ''
        ? window.location.pathname
        : `${window.location.pathname}?${SEARCH_PARAM_QUERY}=${encodeURIComponent(trimmed)}`;

    window.history.replaceState(null, '', url);
  }, []);

  return (
    <div className={css.browser}>
      <Suspense fallback={null}>
        <SearchParamsSync onChange={handleSync} />
      </Suspense>

      <SearchBox value={query} onSubmit={handleSubmit} autoFocus />

      {isTooShort && (
        <p className={css.state}>
          Введіть щонайменше два символи. Якщо не знаєте, що шукати, —{' '}
          <Link className={css.stateLink} href={localePath('/index')}>
            покажчик за абеткою
          </Link>{' '}
          показує всі поняття одразу.
        </p>
      )}

      {isEmpty && (
        <div className={css.state}>
          <p>
            За запитом «{query}» нічого не знайшлося. Спробуйте іншу форму слова — пошук
            шукає точний збіг, не основу.
          </p>
          <Link className={css.stateLink} href={localePath('/index')}>
            Відкрити покажчик
          </Link>
        </div>
      )}

      {results.length > 0 && (
        <>
          <p className={css.count} aria-live="polite">
            {formatCount(results.length, CONCEPT_FORMS)}. Спершу збіги в назві, далі — у
            визначенні й тексті статей.
          </p>
          <SearchResults results={results} query={query} />
        </>
      )}
    </div>
  );
};
