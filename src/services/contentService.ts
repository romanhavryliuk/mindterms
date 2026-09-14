import type { ZodError } from 'zod';

import rawEn from '../../content/content.en.json';
import rawPl from '../../content/content.pl.json';
import rawUk from '../../content/content.json';
import { contentSchema } from '../../content/schema';
import { DEFAULT_LOCALE, type Locale } from '@/i18n';
import type { SearchEntry } from '@/services/searchService';
import type {
  Category,
  Collection,
  Concept,
  Confusion,
  Content,
  ContentMeta,
  HelpCard,
} from '@/types';
import { getFirstLetter, truncate } from '@/utils/formatters';

/**
 * Читання і валідація content.json кожної мови. Виклик відбувається під час
 * збірки, тож будь-яка невідповідність схемі валить build, а не потрапляє в прод.
 */

const RAW: Record<Locale, unknown> = { uk: rawUk, en: rawEn, pl: rawPl };

/** Людиночитний опис помилок Zod: шлях у JSON + що саме не так */
function formatValidationError(locale: Locale, error: ZodError): string {
  const lines = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : '(корінь)';
    return `  • ${path}: ${issue.message}`;
  });

  return [
    `content/content${locale === DEFAULT_LOCALE ? '' : `.${locale}`}.json ` +
      'не відповідає схемі content/schema.ts.',
    `Знайдено проблем: ${error.issues.length}`,
    ...lines,
  ].join('\n');
}

const cache = new Map<Locale, Content>();

function getContent(locale: Locale): Content {
  const cached = cache.get(locale);
  if (cached !== undefined) return cached;

  const result = contentSchema.safeParse(RAW[locale]);
  if (!result.success) {
    throw new Error(formatValidationError(locale, result.error));
  }

  cache.set(locale, result.data);
  return result.data;
}

export function getMeta(locale: Locale): ContentMeta {
  return getContent(locale).meta;
}

export function getAllConcepts(locale: Locale): Concept[] {
  return getContent(locale).concepts;
}

export function getAllCategories(locale: Locale): Category[] {
  return getContent(locale).categories;
}

export function getAllCollections(locale: Locale): Collection[] {
  return getContent(locale).collections;
}

export function getAllConfusions(locale: Locale): Confusion[] {
  return getContent(locale).confusions;
}

export function getAllHelpCards(locale: Locale): HelpCard[] {
  return getContent(locale).helpCards;
}

export function getBibliography(locale: Locale): string[] {
  return getContent(locale).bibliography;
}

/** Слаг поняття — це його id, однаковий у всіх мовах */
export function getConceptBySlug(locale: Locale, slug: string): Concept | undefined {
  return getAllConcepts(locale).find((concept) => concept.id === slug);
}

export function getCategoryById(locale: Locale, id: string): Category | undefined {
  return getAllCategories(locale).find((category) => category.id === id);
}

export function getCollectionById(locale: Locale, id: string): Collection | undefined {
  return getAllCollections(locale).find((collection) => collection.id === id);
}

/** Поняття однієї теми в порядку, заданому content.json */
export function getConceptsByCategory(locale: Locale, categoryId: string): Concept[] {
  return getAllConcepts(locale).filter((concept) => concept.category === categoryId);
}

export function getConceptsByIds(locale: Locale, ids: string[]): Concept[] {
  const byId = new Map(getAllConcepts(locale).map((concept) => [concept.id, concept]));

  return ids
    .map((id) => byId.get(id))
    .filter((concept): concept is Concept => concept !== undefined);
}

/** Пов'язані поняття в порядку, заданому полем related */
export function getRelatedConcepts(locale: Locale, concept: Concept): Concept[] {
  return getConceptsByIds(locale, concept.related);
}

/**
 * Полегшене поняття для карток і пошуку. Каталог фільтрується на клієнті,
 * тож у бандл має їхати мінімум: повні тексти лишаються на сторінках понять.
 */
export type ConceptSummary = Pick<
  Concept,
  'id' | 'title' | 'original' | 'evidence' | 'category' | 'definition'
>;

export function getConceptSummaries(locale: Locale): ConceptSummary[] {
  return getAllConcepts(locale).map((concept) => ({
    id: concept.id,
    title: concept.title,
    original: concept.original,
    evidence: concept.evidence,
    category: concept.category,
    definition: truncate(concept.definition, 150),
  }));
}

/** Індекс для сторінки пошуку: тіло статті склеєне й переведене в нижній регістр */
export function getSearchIndex(locale: Locale): SearchEntry[] {
  const categoryNames = new Map(
    getAllCategories(locale).map((category) => [category.id, category.name])
  );

  return getAllConcepts(locale).map((concept) => ({
    id: concept.id,
    title: concept.title,
    original: concept.original,
    definition: concept.definition,
    evidence: concept.evidence,
    categoryId: concept.category,
    categoryName: categoryNames.get(concept.category) ?? '',
    haystack: [
      concept.definition,
      ...concept.manifestations,
      concept.example,
      concept.commonMistake,
      concept.evidenceNote,
    ]
      .join(' ')
      .toLocaleLowerCase(locale),
  }));
}

export type CategoryWithCount = Category & { conceptCount: number };

export function getCategoriesWithCounts(locale: Locale): CategoryWithCount[] {
  // Один прохід по поняттях замість фільтрації всього списку для кожної теми
  const counts = new Map<string, number>();

  for (const concept of getAllConcepts(locale)) {
    counts.set(concept.category, (counts.get(concept.category) ?? 0) + 1);
  }

  return getAllCategories(locale).map((category) => ({
    ...category,
    conceptCount: counts.get(category.id) ?? 0,
  }));
}

/**
 * Теми за id — щоб картка поняття могла показати назву й колір своєї теми.
 * Мапу будували три в'юшки однаково, тож вона живе тут.
 */
export function getCategoryMap(locale: Locale): Map<string, Category> {
  return new Map(getAllCategories(locale).map((category) => [category.id, category]));
}

/** Сусіди поняття в межах його теми — для навігації попереднє/наступне */
export type AdjacentConcepts = {
  previous: Concept | null;
  next: Concept | null;
};

export function getAdjacentConcepts(locale: Locale, concept: Concept): AdjacentConcepts {
  const siblings = getConceptsByCategory(locale, concept.category);
  const index = siblings.findIndex((item) => item.id === concept.id);

  if (index === -1) return { previous: null, next: null };

  return {
    previous: siblings[index - 1] ?? null,
    next: siblings[index + 1] ?? null,
  };
}

/** Групи покажчика за першою літерою, відсортовані абеткою локалі */
export type LetterGroup = {
  letter: string;
  concepts: Concept[];
};

export function getAlphabetGroups(locale: Locale): LetterGroup[] {
  const collator = new Intl.Collator(locale);
  const groups = new Map<string, Concept[]>();

  for (const concept of getAllConcepts(locale)) {
    const letter = getFirstLetter(concept.title, locale);
    const bucket = groups.get(letter);

    if (bucket === undefined) {
      groups.set(letter, [concept]);
    } else {
      bucket.push(concept);
    }
  }

  return [...groups.entries()]
    .map(([letter, concepts]) => ({
      letter,
      concepts: [...concepts].sort((a, b) => collator.compare(a.title, b.title)),
    }))
    .sort((a, b) => collator.compare(a.letter, b.letter));
}
