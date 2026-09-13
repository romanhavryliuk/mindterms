import Link from 'next/link';

import { EvidenceBadge } from '@/components/EvidenceBadge';
import { localePath, type Locale, type Messages } from '@/i18n';
import type { SearchResult } from '@/services/searchService';
import { originalTerm, truncate } from '@/utils/formatters';
import { splitByMatch } from '@/utils/highlight';

import css from './SearchResults.module.css';

type SearchResultsProps = {
  results: SearchResult[];
  query: string;
  locale: Locale;
  messages: Messages;
};

/** Підсвічує перший збіг, решту лишає звичайним текстом */
const Highlighted = ({ text, query }: { text: string; query: string }) => (
  <>
    {splitByMatch(text, query).map((part, index) =>
      part.isMatch ? (
        <mark key={index} className={css.mark}>
          {part.text}
        </mark>
      ) : (
        <span key={index}>{part.text}</span>
      )
    )}
  </>
);

export const SearchResults = ({
  results,
  query,
  locale,
  messages,
}: SearchResultsProps) => (
  <ul className={css.list}>
    {results.map((result) => (
      <li key={result.id}>
        <Link className={css.item} href={localePath(`/concept/${result.id}`, locale)}>
          <h2 className={css.title}>
            <Highlighted text={result.title} query={query} />
          </h2>

          {originalTerm(result.title, result.original) !== null && (
            <p className={css.original} lang="en">
              <Highlighted text={result.original} query={query} />
            </p>
          )}

          <p className={css.definition}>
            <Highlighted text={truncate(result.definition, 190)} query={query} />
          </p>

          <span className={css.footer}>
            <EvidenceBadge level={result.evidence} messages={messages} size="sm" />
            <span className={css.category}>{result.categoryName}</span>
          </span>
        </Link>
      </li>
    ))}
  </ul>
);
