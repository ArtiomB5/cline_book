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
  .join('\n\n');

await writeFile('full.md', output + '\n');
console.log('full.md created');
