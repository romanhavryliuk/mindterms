import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ConceptCard } from '@/components/ConceptCard';
import { formatCount, localePath, type Locale, type Messages } from '@/i18n';
import { getAllCategories, getConceptsByIds } from '@/services/contentService';
import type { Collection } from '@/types';

import css from './CollectionPage.module.css';

type CollectionPageProps = {
  collection: Collection;
  locale: Locale;
  messages: Messages;
};

export const CollectionPage = ({ collection, locale, messages }: CollectionPageProps) => {
  const concepts = getConceptsByIds(locale, collection.concepts);
  const categoryById = new Map(
    getAllCategories(locale).map((category) => [category.id, category])
  );

  return (
    <div className={css.page}>
      <Breadcrumbs
        messages={messages}
        items={[
          { label: messages.common.home, href: localePath('/', locale) },
          { label: messages.collection.kicker, href: localePath('/', locale) },
          { label: collection.title },
        ]}
      />

      <header className={css.header}>
        <p className={css.kicker}>{messages.collection.kicker}</p>
        <h1 className={css.title}>{collection.title}</h1>
        <p className={css.lead}>{collection.description}</p>
        <p className={css.count}>
          {formatCount(concepts.length, messages.plural.concept, locale)}
        </p>
      </header>

      {/* Картки понять мають h3, тож без цього рівня вийшов би стрибок h1 → h3 */}
      <h2 className="visuallyHidden">{messages.collection.conceptsHeading}</h2>

      <ul className={css.grid}>
        {concepts.map((concept) => {
          const category = categoryById.get(concept.category);

          return (
            <li key={concept.id}>
              <ConceptCard
                concept={concept}
                locale={locale}
                messages={messages}
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
