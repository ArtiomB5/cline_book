import { readFile, writeFile } from 'node:fs/promises';

const readme = (await readFile('README.md', 'utf-8'))
  .replace(/```cover[\s\S]*?```\n*/g, '');

const disclaimerMatch = readme.match(/## Отказ от ответственности[\s\S]*$/);
const disclaimer = disclaimerMatch ? disclaimerMatch[0] : '';
const readmeBody = disclaimer ? readme.replace(disclaimer, '') : readme;

const chapters = await Promise.all(
  Array.from({ length: 12 }, (_, i) => readFile(`chapter-${i}.md`, 'utf-8'))
);

const output = [readmeBody.trimEnd(), ...chapters, disclaimer.trimStart()]
  .filter(Boolean)
  .join('\n\n')
  .replace(/\[chapter-\d+\.md\]\(chapter-\d+\.md\)/g, '')
  .replace(/\]\(chapter-\d+\.md#/g, '](#');

await writeFile(`agentic-engineering-full-${Date.now()}.md`, output + '\n');
console.log(`agentic-engineering-full-${Date.now()}.md created`);
