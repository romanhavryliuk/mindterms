import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { contentSchema } from '../content/schema.ts';
import { validateContentRelations } from '../content/validateRelations.ts';

function load(file = 'content.json') {
  return contentSchema.parse(
    JSON.parse(readFileSync(new URL(`../content/${file}`, import.meta.url), 'utf8'))
  );
}

for (const file of ['content.json', 'content.en.json', 'content.pl.json']) {
  test(`${file}: all links exist and IDs are unique`, () => {
    assert.deepEqual(validateContentRelations(load(file)), []);
  });
}

for (const key of ['categories', 'concepts', 'collections']) {
  test(`rejects duplicate ${key} IDs`, () => {
    const content = load();
    content[key].push(structuredClone(content[key][0]));
    assert.deepEqual(validateContentRelations(content), [
      `${key}.${content[key].length - 1}.id: duplicate ID "${content[key][0].id}"`,
    ]);
  });
}

test('reports all missing references together with their exact paths', () => {
  const content = load();
  content.concepts[0].category = 'missing-category';
  content.concepts[0].related = ['missing-related'];
  content.collections[0].concepts = ['missing-collection-concept'];
  content.confusions[0].concepts = ['missing-confusion-concept'];

  assert.deepEqual(validateContentRelations(content), [
    'concepts.0.category: unknown ID "missing-category"',
    'concepts.0.related.0: unknown ID "missing-related"',
    'collections.0.concepts.0: unknown ID "missing-collection-concept"',
    'confusions.0.concepts.0: unknown ID "missing-confusion-concept"',
  ]);
});

test('allows forward references and IDs shared by different entity types', () => {
  const content = load();
  content.collections[0].id = content.concepts[0].id;
  content.concepts[0].related = [content.concepts.at(-1).id];
  assert.deepEqual(validateContentRelations(content), []);
});

test('validation command works independently of the working directory', () => {
  const result = spawnSync(
    process.execPath,
    [fileURLToPath(new URL('../scripts/validate-content.mjs', import.meta.url))],
    { cwd: new URL('../content/', import.meta.url), encoding: 'utf8' }
  );
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.match(/: OK/g)?.length, 3);
});
