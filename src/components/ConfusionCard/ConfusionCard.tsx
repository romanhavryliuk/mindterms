import Link from 'next/link';

import { EvidenceBadge } from '@/components/EvidenceBadge';
import { localePath, type Locale, type Messages } from '@/i18n';
import { getConceptsByIds } from '@/services/contentService';
import type { Confusion } from '@/types';
import { renderInlineMarkup } from '@/utils/richText';

import css from './ConfusionCard.module.css';

type ConfusionCardProps = {
  confusion: Confusion;
  locale: Locale;
  messages: Messages;
};

export const ConfusionCard = ({ confusion, locale, messages }: ConfusionCardProps) => {
  const concepts = getConceptsByIds(locale, confusion.concepts);

  return (
    <article className={css.card}>
      <h2 className={css.pair}>
        <span className={css.term}>{confusion.a}</span>
        <span className={css.versus} aria-hidden="true">
          {messages.confuse.versus}
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
          <p className={css.footerTitle}>{messages.confuse.readMore}</p>
          <ul className={css.links}>
            {concepts.map((concept) => (
              <li key={concept.id}>
                <Link
                  className={css.link}
                  href={localePath(`/concept/${concept.id}`, locale)}
                >
                  <span>{concept.title}</span>
                  <EvidenceBadge level={concept.evidence} messages={messages} size="sm" />
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
};
