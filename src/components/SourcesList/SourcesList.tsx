import type { Source } from '@/types';

import css from './SourcesList.module.css';

type SourcesListProps = {
  sources: Source[];
};

/** Витягує домен для підпису біля посилання */
function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export const SourcesList = ({ sources }: SourcesListProps) => (
  <ol className={css.list}>
    {sources.map((source) => (
      <li key={source.url} className={css.item}>
        <a
          className={css.link}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {source.title}
        </a>
        <span className={css.host}>
          {getHostname(source.url)}
          <span className={css.external} aria-hidden="true">
            ↗
          </span>
        </span>
      </li>
    ))}
  </ol>
);
