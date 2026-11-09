import type { Content } from './schema';

/** Run after schema validation; returns every broken link with its JSON path. */
export function validateContentRelations(content: Content): string[] {
  const issues: string[] = [];

  function uniqueIds(key: 'categories' | 'concepts' | 'collections'): Set<string> {
    const ids = new Set<string>();
    content[key].forEach(({ id }, index) => {
      if (ids.has(id)) issues.push(`${key}.${index}.id: duplicate ID "${id}"`);
      ids.add(id);
    });
    return ids;
  }

  const categories = uniqueIds('categories');
  const concepts = uniqueIds('concepts');
  uniqueIds('collections');

  function checkReference(id: string, ids: Set<string>, path: string): void {
    if (!ids.has(id)) issues.push(`${path}: unknown ID "${id}"`);
  }

  content.concepts.forEach((concept, index) => {
    checkReference(concept.category, categories, `concepts.${index}.category`);
    concept.related.forEach((id, relatedIndex) => {
      checkReference(id, concepts, `concepts.${index}.related.${relatedIndex}`);
    });
  });

  for (const key of ['collections', 'confusions'] as const) {
    content[key].forEach((entry, index) => {
      entry.concepts.forEach((id, conceptIndex) => {
        checkReference(id, concepts, `${key}.${index}.concepts.${conceptIndex}`);
      });
    });
  }

  return issues;
}
