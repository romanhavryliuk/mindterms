import type { CSSProperties } from 'react';
import Link from 'next/link';

import { EvidenceBadge } from '@/components/EvidenceBadge';
import { localePath, type Locale, type Messages } from '@/i18n';
import type { CategoryColor, Concept } from '@/types';
import { originalTerm, truncate } from '@/utils/formatters';

import css from './ConceptCard.module.css';

/** Картці вистачає п'яти полів — приймаємо і повне поняття, і полегшене */
type ConceptCardData = Pick<
  Concept,
  'id' | 'title' | 'original' | 'evidence' | 'definition'
>;

type ConceptCardProps = {
  concept: ConceptCardData;
  locale: Locale;
  messages: Messages;
  /** Акцент теми; якщо не передати, картка успадкує --accent від контейнера */
  color?: CategoryColor;
  /** Назва теми під заголовком — потрібна там, де картки різних тем поруч */
  categoryName?: string;
};

export const ConceptCard = ({
  concept,
  locale,
  messages,
  color,
  categoryName,
}: ConceptCardProps) => {
  const original = originalTerm(concept.title, concept.original);
  const accentStyle =
    color === undefined
      ? undefined
      : ({ '--accent': `var(--c-${color})` } as CSSProperties);

  return (
    <article className={css.card} style={accentStyle}>
      <Link className={css.link} href={localePath(`/concept/${concept.id}`, locale)}>
        <h3 className={css.title}>{concept.title}</h3>
      </Link>

      {original !== null && (
        <p className={css.original} lang="en">
          {original}
        </p>
      )}

      <p className={css.definition}>{truncate(concept.definition, 150)}</p>

      <footer className={css.footer}>
        <EvidenceBadge level={concept.evidence} messages={messages} size="sm" />
        {categoryName !== undefined && (
          <span className={css.category}>{categoryName}</span>
        )}
      </footer>
    </article>
  );
};
