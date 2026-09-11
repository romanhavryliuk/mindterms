import Link from 'next/link';

import { EvidenceBadge } from '@/components/EvidenceBadge';
import { getConceptsByIds } from '@/services/contentService';
import type { Confusion } from '@/types';
import { localePath } from '@/utils/constants';
import { renderInlineMarkup } from '@/utils/richText';

import css from './ConfusionCard.module.css';

type ConfusionCardProps = {
  confusion: Confusion;
};

export const ConfusionCard = ({ confusion }: ConfusionCardProps) => {
  const concepts = getConceptsByIds(confusion.concepts);

  return (
    <article className={css.card}>
      <h2 className={css.pair}>
        <span className={css.term}>{confusion.a}</span>
        <span className={css.versus} aria-hidden="true">
          проти
        </span>
        <span className={css.term}>{confusion.b}</span>
      </h2>

      <div className={css.body}>
        {confusion.paragraphs.map((paragraph) => (
          <p key={paragraph} className={css.paragraph}>
            {renderInlineMarkup(paragraph)}
          </p>
        ))}
      </div>

      {concepts.length > 0 && (
        <footer className={css.footer}>
          <p className={css.footerTitle}>Читати докладно</p>
          <ul className={css.links}>
            {concepts.map((concept) => (
              <li key={concept.id}>
                <Link className={css.link} href={localePath(`/concept/${concept.id}`)}>
                  <span>{concept.title}</span>
                  <EvidenceBadge level={concept.evidence} size="sm" />
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
};
