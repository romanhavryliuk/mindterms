import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ConceptCard } from '@/components/ConceptCard';
import { getAllCategories, getConceptsByIds } from '@/services/contentService';
import type { Collection } from '@/types';
import { localePath } from '@/utils/constants';
import { CONCEPT_FORMS, formatCount } from '@/utils/formatters';

import css from './CollectionPage.module.css';

type CollectionPageProps = {
  collection: Collection;
};

export const CollectionPage = ({ collection }: CollectionPageProps) => {
  const concepts = getConceptsByIds(collection.concepts);
  const categoryById = new Map(
    getAllCategories().map((category) => [category.id, category])
  );

  return (
    <div className={css.page}>
      <Breadcrumbs
        items={[
          { label: 'Головна', href: localePath('/') },
          { label: 'З чого почати', href: localePath('/') },
          { label: collection.title },
        ]}
      />

      <header className={css.header}>
        <p className={css.kicker}>З чого почати</p>
        <h1 className={css.title}>{collection.title}</h1>
        <p className={css.lead}>{collection.description}</p>
        <p className={css.count}>{formatCount(concepts.length, CONCEPT_FORMS)}</p>
      </header>

      {/* Картки понять мають h3, тож без цього рівня вийшов би стрибок h1 → h3 */}
      <h2 className="visuallyHidden">Поняття добірки</h2>

      <ul className={css.grid}>
        {concepts.map((concept) => {
          const category = categoryById.get(concept.category);

          return (
            <li key={concept.id}>
              <ConceptCard
                concept={concept}
                color={category?.color}
                categoryName={category?.name}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
