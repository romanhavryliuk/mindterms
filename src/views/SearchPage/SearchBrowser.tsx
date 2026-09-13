'use client';

import { Suspense, useCallback, useState } from 'react';
import Link from 'next/link';

import { SearchBox } from '@/components/SearchBox';
import { SearchResults } from '@/components/SearchResults';
import { useSearch } from '@/hooks/useSearch';
import { format, formatCount, localePath, type Locale, type Messages } from '@/i18n';
import type { SearchEntry } from '@/services/searchService';
import { SEARCH_PARAM_QUERY } from '@/utils/constants';

import { SearchParamsSync } from './SearchParamsSync';
import css from './SearchPage.module.css';

type SearchBrowserProps = {
  index: SearchEntry[];
  locale: Locale;
  messages: Messages;
};

/** Запит живе в адресі, тому результатом пошуку можна поділитись посиланням */
export const SearchBrowser = ({ index, locale, messages }: SearchBrowserProps) => {
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

      <SearchBox value={query} messages={messages} onSubmit={handleSubmit} autoFocus />

      {isTooShort && (
        <p className={css.state}>
          {messages.search.tooShortBefore}
          <Link className={css.stateLink} href={localePath('/index', locale)}>
            {messages.search.tooShortLink}
          </Link>
          {messages.search.tooShortAfter}
        </p>
      )}

      {isEmpty && (
        <div className={css.state}>
          <p>{format(messages.search.emptyText, { query })}</p>
          <Link className={css.stateLink} href={localePath('/index', locale)}>
            {messages.search.emptyLink}
          </Link>
        </div>
      )}

      {results.length > 0 && (
        <>
          <p className={css.count} aria-live="polite">
            {format(messages.search.count, {
              count: formatCount(results.length, messages.plural.concept, locale),
            })}
          </p>
          <SearchResults
            results={results}
            query={query}
            locale={locale}
            messages={messages}
          />
        </>
      )}
    </div>
  );
};
