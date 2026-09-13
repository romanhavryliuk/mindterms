import type { CSSProperties } from 'react';
import Link from 'next/link';

import { AlphabetNav } from '@/components/AlphabetNav';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EvidenceBadge } from '@/components/EvidenceBadge';
import { format, formatCount, localePath, type Locale, type Messages } from '@/i18n';
import { getAllCategories, getAlphabetGroups } from '@/services/contentService';
import { originalTerm } from '@/utils/formatters';

import css from './IndexPage.module.css';

type IndexPageProps = {
  locale: Locale;
  messages: Messages;
};

export const IndexPage = ({ locale, messages }: IndexPageProps) => {
  const groups = getAlphabetGroups(locale);
  const categoryById = new Map(
    getAllCategories(locale).map((category) => [category.id, category])
  );
  const total = groups.reduce((sum, group) => sum + group.concepts.length, 0);

  return (
    <div className={css.page}>
      <Breadcrumbs
        messages={messages}
        items={[
          { label: messages.common.home, href: localePath('/', locale) },
          { label: messages.nav.index },
        ]}
      />

      <header className={css.header}>
        <h1 className={css.title}>{messages.index.title}</h1>
        <p className={css.lead}>
          {format(messages.index.lead, {
            count: formatCount(total, messages.plural.concept, locale),
          })}
        </p>
      </header>

      <AlphabetNav letters={groups.map((group) => group.letter)} messages={messages} />

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
                      href={localePath(`/concept/${concept.id}`, locale)}
                    >
                      <span className={css.name}>{concept.title}</span>
                      {originalTerm(concept.title, concept.original) !== null && (
                        <span className={css.original} lang="en">
                          {concept.original}
                        </span>
                      )}
                    </Link>

                    <span className={css.aside}>
                      {category !== undefined && (
                        <span
                          className={css.category}
                          style={
                            {
                              '--accent': `var(--c-${category.color})`,
                            } as CSSProperties
                          }
                        >
                          {category.name}
                        </span>
                      )}
                      <EvidenceBadge
                        level={concept.evidence}
                        messages={messages}
                        size="sm"
                      />
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
