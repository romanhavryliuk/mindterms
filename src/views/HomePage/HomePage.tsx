import clsx from 'clsx';
import { Fragment } from 'react';
import Link from 'next/link';

import { CategoryCard } from '@/components/CategoryCard';
import { CollectionCard } from '@/components/CollectionCard';
import { ConfusionCard } from '@/components/ConfusionCard';
import { format, localePath, plural, type Locale, type Messages } from '@/i18n';
import {
  getAllCollections,
  getAllConcepts,
  getAllConfusions,
  getCategoriesWithCounts,
} from '@/services/contentService';
import { EVIDENCE_LEVELS } from '@/utils/constants';

import css from './HomePage.module.css';

/** Скільки пар показати на головній, решта — у розділі «Плутанина» */
const CONFUSION_PREVIEW = 4;

type HomePageProps = {
  locale: Locale;
  messages: Messages;
};

export const HomePage = ({ locale, messages }: HomePageProps) => {
  const concepts = getAllConcepts(locale);
  const categories = getCategoriesWithCounts(locale);
  const collections = getAllCollections(locale);
  const confusions = getAllConfusions(locale);

  const stats = [
    {
      value: String(concepts.length),
      label: plural(concepts.length, messages.plural.concept, locale),
    },
    {
      value: String(categories.length),
      label: plural(categories.length, messages.plural.category, locale),
    },
    {
      value: String(confusions.length),
      label: `${plural(confusions.length, messages.plural.pair, locale)}, ${messages.home.statsPairs}`,
    },
    { value: '3', label: messages.home.statsEvidence },
  ];

  return (
    <div className={css.page}>
      <section className={css.hero}>
        <h1 className={css.title}>
          {messages.home.titleLead}{' '}
          {messages.home.titleTerms.map((term, index) => (
            <Fragment key={term}>
              {index > 0 && ', '}
              <em>{term}</em>
            </Fragment>
          ))}
        </h1>

        <p className={css.lead}>
          {format(messages.home.lead, { concepts: concepts.length })}
        </p>

        <dl className={css.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={css.stat}>
              <dt className={css.statValue}>{stat.value}</dt>
              <dd className={css.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className={css.actions}>
          <Link className={css.primaryAction} href={localePath('/catalog', locale)}>
            {messages.home.openCatalog}
          </Link>
          <Link className={css.secondaryAction} href={localePath('/index', locale)}>
            {messages.home.openIndex}
          </Link>
        </div>
      </section>

      <section className={css.section} aria-labelledby="collections-title">
        <header className={css.sectionHeader}>
          <h2 id="collections-title" className={css.sectionTitle}>
            {messages.home.collectionsTitle}
          </h2>
          <p className={css.sectionSub}>{messages.home.collectionsSub}</p>
        </header>

        <ul className={css.collectionsGrid}>
          {collections.map((collection) => (
            <li key={collection.id}>
              <CollectionCard
                collection={collection}
                locale={locale}
                messages={messages}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="categories-title">
        <header className={css.sectionHeader}>
          <h2 id="categories-title" className={css.sectionTitle}>
            {messages.home.categoriesTitle}
          </h2>
          <p className={css.sectionSub}>
            {format(messages.home.categoriesSub, {
              concepts: concepts.length,
              categories: categories.length,
            })}
          </p>
        </header>

        <ul className={css.categoriesGrid}>
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} locale={locale} messages={messages} />
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="confusions-title">
        <header className={css.sectionHeader}>
          <h2 id="confusions-title" className={css.sectionTitle}>
            {messages.home.confusionsTitle}
          </h2>
          <p className={css.sectionSub}>{messages.home.confusionsSub}</p>
        </header>

        <ul className={css.confusionsGrid}>
          {confusions.slice(0, CONFUSION_PREVIEW).map((confusion) => (
            <li key={`${confusion.a}-${confusion.b}`}>
              <ConfusionCard confusion={confusion} locale={locale} messages={messages} />
            </li>
          ))}
        </ul>

        <Link className={css.moreLink} href={localePath('/confuse', locale)}>
          {format(messages.home.confusionsMore, {
            count: confusions.length,
            pairs: plural(confusions.length, messages.plural.pair, locale),
          })}
        </Link>
      </section>

      <section className={css.section} aria-labelledby="evidence-title">
        <header className={css.sectionHeader}>
          <h2 id="evidence-title" className={css.sectionTitle}>
            {messages.home.evidenceTitle}
          </h2>
          <p className={css.sectionSub}>{messages.home.evidenceSub}</p>
        </header>

        <ul className={css.evidenceGrid}>
          {EVIDENCE_LEVELS.map((level) => (
            <li key={level} className={clsx(css.evidenceCard, css[`level${level}`])}>
              <p className={css.evidenceLevel}>
                <span className={css.evidenceDots} aria-hidden="true">
                  <span className={css.evidenceDot} />
                  <span className={css.evidenceDot} />
                  <span className={css.evidenceDot} />
                </span>
                <span className={css.evidenceScale}>
                  {level} {messages.common.evidenceScale}
                </span>
              </p>
              <h3 className={css.evidenceName}>
                {messages.evidence.levels[level].label}
              </h3>
              <p className={css.evidenceText}>
                {messages.evidence.levels[level].description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
