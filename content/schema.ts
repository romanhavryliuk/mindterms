import { z } from 'zod';

/**
 * Zod-схеми для content.json. Це єдине джерело правди про форму даних:
 * усі типи проєкту виводяться звідси через z.infer і ніде не дублюються.
 */

const nonEmpty = z.string().trim().min(1);

/** Рівень доказовості: 3 міцна основа, 2 частково підтверджено, 1 слабка основа */
export const evidenceLevelSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);

/**
 * Ключ акцентного кольору категорії. Відповідає CSS-змінній --c-{color}
 * у styles/variables.css, тому список закритий.
 */
export const categoryColorSchema = z.enum([
  'trait',
  'attach',
  'dark',
  'bias',
  'def',
  'talk',
  'rel',
  'emo',
  'anx',
  'cog',
  'mot',
  'soc',
]);

export const sourceSchema = z.object({
  title: nonEmpty,
  url: z.string().url(),
});

export const figureSchema = z.object({
  value: nonEmpty,
  label: nonEmpty,
});

export const categorySchema = z.object({
  id: nonEmpty,
  name: nonEmpty,
  sub: nonEmpty,
  intro: nonEmpty,
  color: categoryColorSchema,
});

export const conceptSchema = z.object({
  id: nonEmpty,
  category: nonEmpty,
  title: nonEmpty,
  original: nonEmpty,
  evidence: evidenceLevelSchema,
  definition: nonEmpty,
  manifestations: z.array(nonEmpty).min(1),
  example: nonEmpty,
  commonMistake: nonEmpty,
  figures: z.array(figureSchema),
  evidenceNote: nonEmpty,
  related: z.array(nonEmpty),
  sources: z.array(sourceSchema).min(1),
});

export const collectionSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  description: nonEmpty,
  concepts: z.array(nonEmpty).min(1),
});

export const confusionSchema = z.object({
  a: nonEmpty,
  b: nonEmpty,
  paragraphs: z.array(nonEmpty).min(1),
  concepts: z.array(nonEmpty).min(1),
});

export const helpCardSchema = z.object({
  title: nonEmpty,
  points: z.array(nonEmpty).min(1),
});

export const contentMetaSchema = z.object({
  version: nonEmpty,
  updated: nonEmpty,
  locale: nonEmpty,
  note: nonEmpty,
});

export const contentSchema = z.object({
  meta: contentMetaSchema,
  categories: z.array(categorySchema).min(1),
  concepts: z.array(conceptSchema).min(1),
  collections: z.array(collectionSchema),
  confusions: z.array(confusionSchema),
  helpCards: z.array(helpCardSchema),
  bibliography: z.array(nonEmpty),
});

export type EvidenceLevel = z.infer<typeof evidenceLevelSchema>;
export type CategoryColor = z.infer<typeof categoryColorSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Figure = z.infer<typeof figureSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Concept = z.infer<typeof conceptSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type Confusion = z.infer<typeof confusionSchema>;
export type HelpCard = z.infer<typeof helpCardSchema>;
export type ContentMeta = z.infer<typeof contentMetaSchema>;
export type Content = z.infer<typeof contentSchema>;
