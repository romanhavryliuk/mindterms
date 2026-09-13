import Link from 'next/link';

import { formatCount, localePath, type Locale, type Messages } from '@/i18n';
import type { Collection } from '@/types';

import css from './CollectionCard.module.css';

type CollectionCardProps = {
  collection: Collection;
  locale: Locale;
  messages: Messages;
};

export const CollectionCard = ({ collection, locale, messages }: CollectionCardProps) => (
  <article className={css.card}>
    <h3 className={css.title}>
      <Link
        className={css.link}
        href={localePath(`/collection/${collection.id}`, locale)}
      >
        {collection.title}
      </Link>
    </h3>

    <p className={css.description}>{collection.description}</p>

    <p className={css.count}>
      {formatCount(collection.concepts.length, messages.plural.concept, locale)}
    </p>
  </article>
);
