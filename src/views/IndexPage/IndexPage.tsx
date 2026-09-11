import Link from 'next/link';

import { AlphabetNav } from '@/components/AlphabetNav';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EvidenceBadge } from '@/components/EvidenceBadge';
import { getAlphabetGroups, getAllCategories } from '@/services/contentService';
import { localePath } from '@/utils/constants';
import { CONCEPT_FORMS, formatCount } from '@/utils/formatters';

import css from './IndexPage.module.css';

export const IndexPage = () => {
  const groups = getAlphabetGroups();
  const categories = getAllCategories();
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const total = groups.reduce((sum, group) => sum + group.concepts.length, 0);

  return (
    <div className={css.page}>
      <Breadcrumbs
        items={[{ label: 'Головна', href: localePath('/') }, { label: 'Покажчик' }]}
      />

      <header className={css.header}>
        <h1 className={css.title}>Покажчик за абеткою</h1>
        <p className={css.lead}>
          Усі {formatCount(total, CONCEPT_FORMS)} за назвою. Якщо знаєте, що шукаєте, — це
          найкоротший шлях.
        </p>
      </header>

      <AlphabetNav letters={groups.map((group) => group.letter)} />

      <div className={css.groups}>
        {groups.map((group) => (
          <section
            key={group.letter}
            className={css.group}
            aria-labelledby={`letter-${group.letter}`}
          >
            <h2
              className={css.letter}
              id={`letter-${group.letter}`}
              // Якір компенсує липку шапку й ряд літер
              style={{ scrollMarginTop: '7rem' }}
            >
              {group.letter}
            </h2>

            <ul className={css.list}>
              {group.concepts.map((concept) => {
                const category = categoryById.get(concept.category);

                return (
                  <li key={concept.id} className={css.item}>
                    <Link
                      className={css.link}
                      href={localePath(`/concept/${concept.id}`)}
                    >
                      <span className={css.name}>{concept.title}</span>
                      <span className={css.original} lang="en">
                        {concept.original}
                      </span>
                    </Link>

                    <span className={css.aside}>
                      {category !== undefined && (
                        <span
                          className={css.category}
                          style={
                            {
                              '--accent': `var(--c-${category.color})`,
                            } as React.CSSProperties
                          }
                        >
                          {category.name}
                        </span>
                      )}
                      <EvidenceBadge level={concept.evidence} size="sm" />
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};
