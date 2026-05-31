import { readFile, writeFile } from 'node:fs/promises';

const files = [
  'README.md',
  ...Array.from({ length: 12 }, (_, i) => `chapter-${i}.md`),
];

const parts = await Promise.all(files.map(f => readFile(f, 'utf-8')));
await writeFile('full.md', parts.join('\n\n'));
console.log('full.md created');
