import { readFile } from 'node:fs/promises';

import { contentSchema } from '../content/schema.ts';
import { validateContentRelations } from '../content/validateRelations.ts';

let failed = false;

for (const file of ['content.json', 'content.en.json', 'content.pl.json']) {
  const url = new URL(`../content/${file}`, import.meta.url);
  const result = contentSchema.safeParse(JSON.parse(await readFile(url, 'utf8')));
  const issues = result.success
    ? validateContentRelations(result.data)
    : result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);

  if (issues.length > 0) {
    failed = true;
    console.error(
      `content/${file}:\n${issues.map((issue) => `  • ${issue}`).join('\n')}`
    );
  } else {
    console.log(`content/${file}: OK`);
  }
}

if (failed) process.exitCode = 1;
