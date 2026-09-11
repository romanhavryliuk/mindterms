import type { CSSProperties } from 'react';
import Link from 'next/link';

import { EvidenceBadge } from '@/components/EvidenceBadge';
import type { CategoryColor, Concept } from '@/types';
import { localePath } from '@/utils/constants';
import { truncate } from '@/utils/formatters';

import css from './ConceptCard.module.css';

/** Картці вистачає п'яти полів — приймаємо і повне поняття, і полегшене */
type ConceptCardData = Pick<
  Concept,
  'id' | 'title' | 'original' | 'evidence' | 'definition'
>;

type ConceptCardProps = {
  concept: ConceptCardData;
  /** Акцент теми; якщо не передати, картка успадкує --accent від контейнера */
  color?: CategoryColor;
  /** Назва теми під заголовком — потрібна там, де картки різних тем поруч */
  categoryName?: string;
};

export const ConceptCard = ({ concept, color, categoryName }: ConceptCardProps) => {
  const accentStyle =
    color === undefined
      ? undefined
      : ({ '--accent': `var(--c-${color})` } as CSSProperties);

  return (
    <article className={css.card} style={accentStyle}>
      <Link className={css.link} href={localePath(`/concept/${concept.id}`)}>
        <h3 className={css.title}>{concept.title}</h3>
      </Link>

      <p className={css.original} lang="en">
        {concept.original}
      </p>

      <p className={css.definition}>{truncate(concept.definition, 150)}</p>

      <footer className={css.footer}>
        <EvidenceBadge level={concept.evidence} size="sm" />
        {categoryName !== undefined && (
          <span className={css.category}>{categoryName}</span>
        )}
      </footer>
    </article>
  );
};
