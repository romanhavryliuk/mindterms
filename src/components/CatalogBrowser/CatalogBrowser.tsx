'use client';

import { Suspense, useCallback, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

import { ConceptCard } from '@/components/ConceptCard';
import { EvidenceFilter } from '@/components/EvidenceFilter';
import { formatCount, type Locale, type Messages } from '@/i18n';
import type { CategoryWithCount, ConceptSummary } from '@/services/contentService';
import type { EvidenceLevel } from '@/types';
import { FILTER_PARAM_CATEGORY, FILTER_PARAM_EVIDENCE } from '@/utils/constants';

import { CatalogParamsSync, type CatalogFilters } from './CatalogParamsSync';
import css from './CatalogBrowser.module.css';

type CatalogBrowserProps = {
  categories: CategoryWithCount[];
  concepts: ConceptSummary[];
  locale: Locale;
  messages: Messages;
};

const NO_FILTERS: CatalogFilters = { category: null, evidence: null };

export const CatalogBrowser = ({
  categories,
  concepts,
  locale,
  messages,
}: CatalogBrowserProps) => {
  // Початковий стан порожній, тому в статичному HTML лежать усі поняття.
  // Фільтри з адреси підхоплює CatalogParamsSync одразу після монтування.
  const [filters, setFilters] = useState<CatalogFilters>(NO_FILTERS);

  const handleSync = useCallback((next: CatalogFilters) => {
    setFilters((current) =>
      current.category === next.category && current.evidence === next.evidence
        ? current
        : next
    );
  }, []);

  // Єдине джерело правди — адреса: стан переписуємо через History API,
  // а назад він повертається тим самим шляхом, що й зовнішні переходи
  const apply = useCallback((next: CatalogFilters) => {
    const params = new URLSearchParams(window.location.search);

    if (next.category === null) params.delete(FILTER_PARAM_CATEGORY);
    else params.set(FILTER_PARAM_CATEGORY, next.category);

    if (next.evidence === null) params.delete(FILTER_PARAM_EVIDENCE);
    else params.set(FILTER_PARAM_EVIDENCE, String(next.evidence));

    const query = params.toString();
    window.history.replaceState(
      null,
      '',
      query === '' ? window.location.pathname : `${window.location.pathname}?${query}`
    );

    setFilters(next);
  }, []);

  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories]
  );

  // Лічильники рівнів рахуємо в межах вибраної теми, а не всього каталогу
  const inCategory = useMemo(
    () =>
      filters.category === null
        ? concepts
        : concepts.filter((concept) => concept.category === filters.category),
    [concepts, filters.category]
  );

  const evidenceCounts = useMemo(() => {
    const counts: Record<EvidenceLevel, number> = { 1: 0, 2: 0, 3: 0 };
    for (const concept of inCategory) counts[concept.evidence] += 1;
    return counts;
  }, [inCategory]);

  const visible = useMemo(
    () =>
      filters.evidence === null
        ? inCategory
        : inCategory.filter((concept) => concept.evidence === filters.evidence),
    [inCategory, filters.evidence]
  );

  const hasFilters = filters.category !== null || filters.evidence !== null;
  const activeCategory =
    filters.category === null ? undefined : categoryById.get(filters.category);

  return (
    <div className={css.layout}>
      <Suspense fallback={null}>
        <CatalogParamsSync onChange={handleSync} />
      </Suspense>

      <aside className={css.sidebar} aria-label={messages.catalog.themes}>
        <h2 className={css.sidebarTitle}>{messages.catalog.themes}</h2>

        <ul className={css.categories}>
          <li>
            <button
              type="button"
              className={css.category}
              aria-pressed={filters.category === null}
              onClick={() => apply({ ...filters, category: null })}
            >
              <span className={css.categoryName}>{messages.catalog.allThemes}</span>
              <span className={css.categoryCount}>{concepts.length}</span>
            </button>
          </li>

          {categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                className={css.category}
                style={{ '--accent': `var(--c-${category.color})` } as CSSProperties}
                aria-pressed={filters.category === category.id}
                onClick={() =>
                  apply({
                    ...filters,
                    category: filters.category === category.id ? null : category.id,
                  })
                }
              >
                <span className={css.categoryDot} aria-hidden="true" />
                <span className={css.categoryName}>{category.name}</span>
                <span className={css.categoryCount}>{category.conceptCount}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className={css.main}>
        {/* Вступ теми зʼявляється замість загального опису, коли тему вибрано */}
        {activeCategory !== undefined && (
          <div
            className={css.intro}
            style={{ '--accent': `var(--c-${activeCategory.color})` } as CSSProperties}
          >
            <h2 className={css.introTitle}>{activeCategory.name}</h2>
            <p className={css.introText}>{activeCategory.intro}</p>
          </div>
        )}

        <div className={css.controls}>
          <EvidenceFilter
            value={filters.evidence}
            counts={evidenceCounts}
            totalCount={inCategory.length}
            messages={messages}
            onChange={(level) => apply({ ...filters, evidence: level })}
          />

          <div className={css.summary}>
            <p className={css.summaryCount} aria-live="polite">
              {formatCount(visible.length, messages.plural.concept, locale)}
            </p>
            {hasFilters && (
              <button
                type="button"
                className={css.reset}
                onClick={() => apply(NO_FILTERS)}
              >
                {messages.catalog.reset}
              </button>
            )}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className={css.empty}>{messages.catalog.empty}</p>
        ) : (
          <ul className={css.grid}>
            {visible.map((concept) => {
              const category = categoryById.get(concept.category);

              return (
                <li key={concept.id}>
                  <ConceptCard
                    concept={concept}
                    locale={locale}
                    messages={messages}
                    color={category?.color}
                    categoryName={filters.category === null ? category?.name : undefined}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
