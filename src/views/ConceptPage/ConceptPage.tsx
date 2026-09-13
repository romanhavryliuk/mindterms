import clsx from 'clsx';
import type { CSSProperties } from 'react';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Disclaimer } from '@/components/Disclaimer';
import { EvidenceBadge } from '@/components/EvidenceBadge';
import { Pager } from '@/components/Pager';
import { SourcesList } from '@/components/SourcesList';
import { localePath, type Locale, type Messages } from '@/i18n';
import {
  getAdjacentConcepts,
  getCategoryById,
  getMeta,
  getRelatedConcepts,
} from '@/services/contentService';
import type { Concept } from '@/types';
import { FILTER_PARAM_CATEGORY, SITE_NAME, SITE_URL } from '@/utils/constants';
import { formatMonth, originalTerm } from '@/utils/formatters';

import css from './ConceptPage.module.css';

type ConceptPageProps = {
  concept: Concept;
  locale: Locale;
  messages: Messages;
};

/** Schema.org DefinedTerm — поняття як словникова стаття у наборі термінів */
function buildJsonLd(concept: Concept, locale: Locale): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}${localePath(`/concept/${concept.id}`, locale)}`,
    name: concept.title,
    alternateName: concept.original,
    description: concept.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: SITE_NAME,
      url: SITE_URL,
    },
    termCode: concept.category,
    inLanguage: locale,
    subjectOf: concept.sources.map((source) => ({
      '@type': 'CreativeWork',
      name: source.title,
      url: source.url,
    })),
  });
}

export const ConceptPage = ({ concept, locale, messages }: ConceptPageProps) => {
  const category = getCategoryById(locale, concept.category);
  const original = originalTerm(concept.title, concept.original);
  const related = getRelatedConcepts(locale, concept);
  const evidence = messages.evidence.levels[concept.evidence];
  const { previous, next } = getAdjacentConcepts(locale, concept);
  const meta = getMeta(locale);

  // Акцент категорії підмішується як локальна змінна на всю статтю
  const accentStyle = {
    '--accent': `var(--c-${category?.color ?? 'trait'})`,
  } as CSSProperties;

  const categoryHref =
    category === undefined
      ? localePath('/catalog', locale)
      : `${localePath('/catalog', locale)}?${FILTER_PARAM_CATEGORY}=${category.id}`;

  return (
    <article className={css.page} style={accentStyle}>
      <Breadcrumbs
        messages={messages}
        items={[
          { label: messages.common.home, href: localePath('/', locale) },
          { label: messages.nav.catalog, href: localePath('/catalog', locale) },
          ...(category === undefined
            ? []
            : [{ label: category.name, href: categoryHref }]),
          { label: concept.title },
        ]}
      />

      <header className={css.header}>
        {category !== undefined && (
          <p className={css.category}>
            <span className={css.categoryDot} aria-hidden="true" />
            <Link className={css.categoryLink} href={categoryHref}>
              {category.name}
            </Link>
          </p>
        )}

        <h1 className={css.title}>{concept.title}</h1>
        {original !== null && (
          <p className={css.original} lang="en">
            {original}
          </p>
        )}

        <p className={css.definition}>{concept.definition}</p>
      </header>

      {/* Основний текст ліворуч, довідкові блоки — у колонці збоку */}
      <div className={css.body}>
        <div className={css.main}>
          <section className={css.section} aria-labelledby="manifestations-title">
            <h2 id="manifestations-title" className={css.sectionTitle}>
              {messages.concept.manifestations}
            </h2>
            <ul className={css.manifestations}>
              {concept.manifestations.map((item) => (
                <li key={item} className={css.manifestation}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={css.section} aria-labelledby="example-title">
            <h2 id="example-title" className={css.sectionTitle}>
              {messages.concept.example}
            </h2>
            <p className={clsx(css.callout, css.example)}>{concept.example}</p>
          </section>

          <section className={css.section} aria-labelledby="mistake-title">
            <h2 id="mistake-title" className={css.sectionTitle}>
              {messages.concept.mistake}
            </h2>
            <p className={clsx(css.callout, css.mistake)}>{concept.commonMistake}</p>
          </section>

          {/* Джерела всередині текстової колонки: якщо винести їх під сітку,
              вони чекають найвищу колонку, і під текстом лишається діра */}
          <section className={css.sources} aria-labelledby="sources-title">
            <h2 id="sources-title" className={css.sectionTitle}>
              {messages.concept.sources}
            </h2>
            <SourcesList sources={concept.sources} />

            <p className={css.meta}>
              {category !== undefined && (
                <span>
                  {messages.concept.theme}: {category.name}
                </span>
              )}
              <span>
                {messages.concept.updated}: {formatMonth(meta.updated, messages.months)}
              </span>
            </p>
          </section>
        </div>

        <aside className={css.aside}>
          <section className={css.box} aria-labelledby="evidence-title">
            <h2 id="evidence-title" className={css.boxTitle}>
              {messages.concept.evidence}
            </h2>
            <div className={css.evidenceHead}>
              <EvidenceBadge level={concept.evidence} messages={messages} />
              <span className={css.evidenceScale}>
                {concept.evidence} {messages.common.evidenceScale}
              </span>
            </div>
            <p className={css.boxText}>{evidence.description}</p>
            <p className={css.evidenceNote}>{concept.evidenceNote}</p>
          </section>

          {concept.figures.length > 0 && (
            <section className={css.box} aria-labelledby="figures-title">
              <h2 id="figures-title" className={css.boxTitle}>
                {messages.concept.figures}
              </h2>
              <dl className={css.figures}>
                {concept.figures.map((figure) => (
                  <div key={figure.label} className={css.figure}>
                    <dt className={css.figureValue}>{figure.value}</dt>
                    <dd className={css.figureLabel}>{figure.label}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {related.length > 0 && (
            <section className={css.box} aria-labelledby="related-title">
              <h2 id="related-title" className={css.boxTitle}>
                {messages.concept.related}
              </h2>
              <ul className={css.related}>
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      className={css.relatedLink}
                      href={localePath(`/concept/${item.id}`, locale)}
                    >
                      <span className={css.relatedTitle}>{item.title}</span>
                      <EvidenceBadge
                        level={item.evidence}
                        messages={messages}
                        size="sm"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      <footer className={css.footer}>
        <Pager
          messages={messages}
          scopeLabel={category?.name}
          previous={
            previous === null
              ? null
              : {
                  href: localePath(`/concept/${previous.id}`, locale),
                  title: previous.title,
                }
          }
          next={
            next === null
              ? null
              : {
                  href: localePath(`/concept/${next.id}`, locale),
                  title: next.title,
                }
          }
        />

        <Disclaimer messages={messages} variant="page" />
      </footer>

      <script
        type="application/ld+json"
        // Рядок зібраний із власного контенту через JSON.stringify
        dangerouslySetInnerHTML={{ __html: buildJsonLd(concept, locale) }}
      />
    </article>
  );
};
