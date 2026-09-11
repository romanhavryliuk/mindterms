import type { ZodError } from 'zod';

import rawContent from '../../content/content.json';
import { contentSchema } from '../../content/schema';
import type {
  Category,
  Collection,
  Concept,
  Confusion,
  Content,
  ContentMeta,
  HelpCard,
} from '@/types';
import type { SearchEntry } from '@/services/searchService';
import { getFirstLetter, truncate } from '@/utils/formatters';

/**
 * Читання і валідація content.json. Виклик відбувається під час збірки,
 * тож будь-яка невідповідність схемі валить build, а не потрапляє в прод.
 */

/** Людиночитний опис помилок Zod: шлях у JSON + що саме не так */
function formatValidationError(error: ZodError): string {
  const lines = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : '(корінь)';
    return `  • ${path}: ${issue.message}`;
  });

  return [
    'content/content.json не відповідає схемі content/schema.ts.',
    `Знайдено проблем: ${error.issues.length}`,
    ...lines,
  ].join('\n');
}

let cache: Content | null = null;

function getContent(): Content {
  if (cache !== null) return cache;

  const result = contentSchema.safeParse(rawContent);
  if (!result.success) {
    throw new Error(formatValidationError(result.error));
  }

  cache = result.data;
  return cache;
}

export function getMeta(): ContentMeta {
  return getContent().meta;
}

export function getAllConcepts(): Concept[] {
  return getContent().concepts;
}

export function getAllCategories(): Category[] {
  return getContent().categories;
}

export function getAllCollections(): Collection[] {
  return getContent().collections;
}

export function getAllConfusions(): Confusion[] {
  return getContent().confusions;
}

export function getAllHelpCards(): HelpCard[] {
  return getContent().helpCards;
}

export function getBibliography(): string[] {
  return getContent().bibliography;
}

/** Слаг поняття — це його id */
export function getConceptBySlug(slug: string): Concept | undefined {
  return getAllConcepts().find((concept) => concept.id === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return getAllCategories().find((category) => category.id === id);
}

/** Поняття однієї теми в порядку, заданому content.json */
export function getConceptsByCategory(categoryId: string): Concept[] {
  return getAllConcepts().filter((concept) => concept.category === categoryId);
}

export function getConceptsByIds(ids: string[]): Concept[] {
  const byId = new Map(getAllConcepts().map((concept) => [concept.id, concept]));

  return ids
    .map((id) => byId.get(id))
    .filter((concept): concept is Concept => concept !== undefined);
}

/** Пов'язані поняття в порядку, заданому полем related */
export function getRelatedConcepts(concept: Concept): Concept[] {
  return getConceptsByIds(concept.related);
}

/**
 * Полегшене поняття для карток і пошуку. Каталог фільтрується на клієнті,
 * тож у бандл має їхати мінімум: повні тексти лишаються на сторінках понять.
 */
export type ConceptSummary = Pick<
  Concept,
  'id' | 'title' | 'original' | 'evidence' | 'category' | 'definition'
>;

export function getConceptSummaries(): ConceptSummary[] {
  return getAllConcepts().map((concept) => ({
    id: concept.id,
    title: concept.title,
    original: concept.original,
    evidence: concept.evidence,
    category: concept.category,
    definition: truncate(concept.definition, 150),
  }));
}

export function getCollectionById(id: string): Collection | undefined {
  return getAllCollections().find((collection) => collection.id === id);
}

/** Індекс для сторінки пошуку: тіло статті склеєне й переведене в нижній регістр */
export function getSearchIndex(): SearchEntry[] {
  const categoryNames = new Map(
    getAllCategories().map((category) => [category.id, category.name])
  );

  return getAllConcepts().map((concept) => ({
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
      .toLocaleLowerCase('uk'),
  }));
}

export type CategoryWithCount = Category & { conceptCount: number };

export function getCategoriesWithCounts(): CategoryWithCount[] {
  return getAllCategories().map((category) => ({
    ...category,
    conceptCount: getConceptsByCategory(category.id).length,
  }));
}

/** Сусіди поняття в межах його теми — для навігації попереднє/наступне */
export type AdjacentConcepts = {
  previous: Concept | null;
  next: Concept | null;
};

export function getAdjacentConcepts(concept: Concept): AdjacentConcepts {
  const siblings = getConceptsByCategory(concept.category);
  const index = siblings.findIndex((item) => item.id === concept.id);

  if (index === -1) return { previous: null, next: null };

  return {
    previous: siblings[index - 1] ?? null,
    next: siblings[index + 1] ?? null,
  };
}

/** Групи покажчика за першою літерою, відсортовані українською абеткою */
export type LetterGroup = {
  letter: string;
  concepts: Concept[];
};

export function getAlphabetGroups(): LetterGroup[] {
  const collator = new Intl.Collator('uk');
  const groups = new Map<string, Concept[]>();

  for (const concept of getAllConcepts()) {
    const letter = getFirstLetter(concept.title);
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
