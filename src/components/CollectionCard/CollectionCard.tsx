import Link from 'next/link';

import type { Collection } from '@/types';
import { localePath } from '@/utils/constants';
import { CONCEPT_FORMS, formatCount } from '@/utils/formatters';

import css from './CollectionCard.module.css';

type CollectionCardProps = {
  collection: Collection;
};

export const CollectionCard = ({ collection }: CollectionCardProps) => (
  <article className={css.card}>
    <h3 className={css.title}>
      <Link className={css.link} href={localePath(`/collection/${collection.id}`)}>
        {collection.title}
      </Link>
    </h3>

    <p className={css.description}>{collection.description}</p>

    <p className={css.count}>{formatCount(collection.concepts.length, CONCEPT_FORMS)}</p>
  </article>
);
