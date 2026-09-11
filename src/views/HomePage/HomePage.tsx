import clsx from 'clsx';
import Link from 'next/link';

import { CategoryCard } from '@/components/CategoryCard';
import { CollectionCard } from '@/components/CollectionCard';
import { ConfusionCard } from '@/components/ConfusionCard';
import {
  getAllCollections,
  getAllConcepts,
  getAllConfusions,
  getCategoriesWithCounts,
} from '@/services/contentService';
import { EVIDENCE_LEVELS, EVIDENCE_META, localePath } from '@/utils/constants';
import { CATEGORY_FORMS, CONCEPT_FORMS, PAIR_FORMS, plural } from '@/utils/formatters';

import css from './HomePage.module.css';

/** Скільки пар показати на головній, решта — у розділі «Плутанина» */
const CONFUSION_PREVIEW = 4;

export const HomePage = () => {
  const concepts = getAllConcepts();
  const categories = getCategoriesWithCounts();
  const collections = getAllCollections();
  const confusions = getAllConfusions();

  const stats = [
    { value: String(concepts.length), label: plural(concepts.length, CONCEPT_FORMS) },
    {
      value: String(categories.length),
      label: plural(categories.length, CATEGORY_FORMS),
    },
    {
      value: String(confusions.length),
      label: `${plural(confusions.length, PAIR_FORMS)}, які плутають`,
    },
    { value: '3', label: 'рівні доказовості' },
  ];

  return (
    <div className={css.page}>
      <section className={css.hero}>
        <h1 className={css.title}>
          Що насправді стоїть за словами <em>інтроверт</em>, <em>вигорання</em> і{' '}
          <em>прив&#8217;язаність</em>
        </h1>

        <p className={css.lead}>
          Довідник з психології українською. {concepts.length} понять про характер,
          емоції, тривогу, пам&#8217;ять, мотивацію та поведінку в групах — кожне з
          визначенням, прикладом із життя, найчастішою помилкою у вживанні та чесною
          позначкою про те, наскільки міцна за ним наука.
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
          <Link className={css.primaryAction} href={localePath('/catalog')}>
            Відкрити каталог
          </Link>
          <Link className={css.secondaryAction} href={localePath('/index')}>
            Покажчик за абеткою
          </Link>
        </div>
      </section>

      <section className={css.section} aria-labelledby="collections-title">
        <header className={css.sectionHeader}>
          <h2 id="collections-title" className={css.sectionTitle}>
            З чого почати
          </h2>
          <p className={css.sectionSub}>
            Шість входів за життєвою ситуацією — якщо не знаєте, з чого почати, заходьте з
            того, що зараз турбує.
          </p>
        </header>

        <ul className={css.collectionsGrid}>
          {collections.map((collection) => (
            <li key={collection.id}>
              <CollectionCard collection={collection} />
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="categories-title">
        <header className={css.sectionHeader}>
          <h2 id="categories-title" className={css.sectionTitle}>
            Усі теми
          </h2>
          <p className={css.sectionSub}>
            {concepts.length} понять у {categories.length} темах, від рис характеру до
            соціальних явищ.
          </p>
        </header>

        <ul className={css.categoriesGrid}>
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="confusions-title">
        <header className={css.sectionHeader}>
          <h2 id="confusions-title" className={css.sectionTitle}>
            Легко переплутати
          </h2>
          <p className={css.sectionSub}>
            Більшість шкоди від популярної психології походить не з незнання термінів, а
            зі впевненого вживання їх не за призначенням.
          </p>
        </header>

        <ul className={css.confusionsGrid}>
          {confusions.slice(0, CONFUSION_PREVIEW).map((confusion) => (
            <li key={`${confusion.a}-${confusion.b}`}>
              <ConfusionCard confusion={confusion} />
            </li>
          ))}
        </ul>

        <Link className={css.moreLink} href={localePath('/confuse')}>
          Усі {confusions.length} {plural(confusions.length, PAIR_FORMS)}
        </Link>
      </section>

      <section className={css.section} aria-labelledby="evidence-title">
        <header className={css.sectionHeader}>
          <h2 id="evidence-title" className={css.sectionTitle}>
            Чому тут є оцінка
          </h2>
          <p className={css.sectionSub}>
            У популярній психології Велика п&#8217;ятірка й соціоніка лежать на одній
            полиці, хоч за однією стоять десятиліття вимірювань, а за другою — нічого.
            Кожне поняття тут має позначку доказовості.
          </p>
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
                <span className={css.evidenceScale}>{level} з 3</span>
              </p>
              <h3 className={css.evidenceName}>{EVIDENCE_META[level].label}</h3>
              <p className={css.evidenceText}>{EVIDENCE_META[level].description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
