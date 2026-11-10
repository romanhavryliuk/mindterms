import Link from 'next/link';

import { EvidenceBadge } from '@/components/EvidenceBadge';
import { format, formatCount, localePath, type Locale, type Messages } from '@/i18n';
import {
  getAllCollections,
  getAllConcepts,
  getAllConfusions,
  getCategoriesWithCounts,
  getConceptsByIds,
} from '@/services/contentService';
import {
  EVIDENCE_LEVELS,
  FILTER_PARAM_CATEGORY,
  FILTER_PARAM_EVIDENCE,
} from '@/utils/constants';
import { renderInlineMarkup } from '@/utils/richText';

import css from './HomePage.module.css';

type HomePageProps = { locale: Locale; messages: Messages };

export const HomePage = ({ locale, messages }: HomePageProps) => {
  const concepts = getAllConcepts(locale);
  const categories = getCategoriesWithCounts(locale);
  const collections = getAllCollections(locale);
  const featured = getAllConfusions(locale).find((pair) =>
    pair.concepts.includes('stonewall')
  );
  const suggestions = getConceptsByIds(locale, ['introext', 'burnout', 'procrast']);

  return (
    <div className={css.page}>
      <section className={css.hero} aria-labelledby="home-title">
        <div className={css.introduction}>
          <p className={css.eyebrow}>{messages.home.eyebrow}</p>
          <h1 id="home-title" className={css.title}>
            {messages.home.titleLead}
            <span>{messages.home.titleAccent}</span>
          </h1>
          <p className={css.lead}>
            {format(messages.home.lead, { concepts: concepts.length })}
          </p>
          <div className={css.suggestions}>
            <span>{messages.home.tryReading}</span>
            {suggestions.map((concept) => (
              <Link key={concept.id} href={localePath(`/concept/${concept.id}`, locale)}>
                {concept.title}
              </Link>
            ))}
          </div>
          <div className={css.browseLinks}>
            <Link href={localePath('/catalog', locale)}>
              {messages.home.openCatalog} <span aria-hidden="true">→</span>
            </Link>
            <Link href={localePath('/index', locale)}>{messages.home.openIndex}</Link>
          </div>
        </div>
        {featured !== undefined && (
          <aside className={css.feature} aria-labelledby="featured-title">
            <p className={css.eyebrow}>{messages.home.confusionsTitle}</p>
            <h2 id="featured-title" className={css.featureTitle}>
              {featured.a}
              <span className={css.pairDivider} aria-hidden="true">
                {' '}
                /{' '}
              </span>
              {featured.b}
            </h2>
            <div className={css.comparison}>
              {featured.paragraphs.map((paragraph) => (
                <p key={paragraph}>{renderInlineMarkup(paragraph)}</p>
              ))}
            </div>
            <div className={css.featureLinks}>
              {getConceptsByIds(locale, featured.concepts).map((concept) => (
                <Link
                  key={concept.id}
                  href={localePath(`/concept/${concept.id}`, locale)}
                >
                  {concept.title} <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
            <Link className={css.textLink} href={localePath('/confuse', locale)}>
              {messages.home.moreComparisons} <span aria-hidden="true">→</span>
            </Link>
          </aside>
        )}
      </section>
      <div className={css.directory}>
        <section className={css.section} aria-labelledby="collections-title">
          <header className={css.sectionHeader}>
            <p className={css.sectionNumber} aria-hidden="true">
              01
            </p>
            <h2 id="collections-title" className={css.sectionTitle}>
              {messages.home.collectionsTitle}
            </h2>
            <p className={css.sectionSub}>{messages.home.collectionsSub}</p>
          </header>
          <ol className={css.collectionList}>
            {collections.map((collection) => (
              <li key={collection.id}>
                <Link
                  className={css.collectionLink}
                  href={localePath(`/collection/${collection.id}`, locale)}
                >
                  <span className={css.collectionCopy}>
                    <span className={css.collectionTitle}>{collection.title}</span>
                    <span className={css.collectionDescription}>
                      {collection.description}
                    </span>
                  </span>
                  <span className={css.rowArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <section className={css.topics} aria-labelledby="categories-title">
          <header className={css.sectionHeader}>
            <p className={css.sectionNumber} aria-hidden="true">
              02
            </p>
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
          <ul className={css.topicList}>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  className={css.topicLink}
                  href={`${localePath('/catalog', locale)}?${FILTER_PARAM_CATEGORY}=${encodeURIComponent(category.id)}`}
                >
                  <span>{category.name}</span>
                  <span className={css.topicCount}>
                    <span aria-hidden="true">
                      {String(category.conceptCount).padStart(2, '0')}
                    </span>
                    <span className="visuallyHidden">
                      {formatCount(
                        category.conceptCount,
                        messages.plural.concept,
                        locale
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className={css.evidence} aria-labelledby="evidence-title">
        <header className={css.sectionHeader}>
          <p className={css.sectionNumber} aria-hidden="true">
            03
          </p>
          <h2 id="evidence-title" className={css.sectionTitle}>
            {messages.home.evidenceTitle}
          </h2>
          <p className={css.sectionSub}>{messages.home.evidenceSub}</p>
          <Link className={css.textLink} href={localePath('/about', locale)}>
            {messages.home.aboutRatings} <span aria-hidden="true">→</span>
          </Link>
        </header>
        <ul className={css.evidenceList}>
          {EVIDENCE_LEVELS.map((level) => (
            <li key={level}>
              <Link
                href={`${localePath('/catalog', locale)}?${FILTER_PARAM_EVIDENCE}=${level}`}
                className={css.evidenceLink}
              >
                <EvidenceBadge level={level} messages={messages} size="lg" />
                <p>{messages.evidence.levels[level].description}</p>
                <span className={css.rowArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
