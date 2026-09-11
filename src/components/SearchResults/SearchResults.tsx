import Link from 'next/link';

import { EvidenceBadge } from '@/components/EvidenceBadge';
import type { SearchResult } from '@/services/searchService';
import { localePath } from '@/utils/constants';
import { truncate } from '@/utils/formatters';
import { splitByMatch } from '@/utils/highlight';

import css from './SearchResults.module.css';

type SearchResultsProps = {
  results: SearchResult[];
  query: string;
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

export const SearchResults = ({ results, query }: SearchResultsProps) => (
  <ul className={css.list}>
    {results.map((result) => (
      <li key={result.id}>
        <Link className={css.item} href={localePath(`/concept/${result.id}`)}>
          <h2 className={css.title}>
            <Highlighted text={result.title} query={query} />
          </h2>

          <p className={css.original} lang="en">
            <Highlighted text={result.original} query={query} />
          </p>

          <p className={css.definition}>
            <Highlighted text={truncate(result.definition, 190)} query={query} />
          </p>

          <span className={css.footer}>
            <EvidenceBadge level={result.evidence} size="sm" />
            <span className={css.category}>{result.categoryName}</span>
          </span>
        </Link>
      </li>
    ))}
  </ul>
);
