import fs from 'node:fs';
import path from 'node:path';

const outputDirectory = path.join(process.cwd(), 'out');
const errors: string[] = [];

function collectHtmlFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectHtmlFiles(entryPath) : entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function outputPathForHref(href: string) {
  const cleanHref = decodeURIComponent(href.split(/[?#]/, 1)[0]);
  if (cleanHref === '/') return path.join(outputDirectory, 'index.html');
  if (path.extname(cleanHref)) return path.join(outputDirectory, cleanHref.slice(1));
  return path.join(outputDirectory, cleanHref.replace(/^\//, ''), 'index.html');
}

if (!fs.existsSync(path.join(outputDirectory, 'index.html'))) {
  errors.push('Missing out/index.html. Run pnpm build first.');
} else {
  for (const htmlFile of collectHtmlFiles(outputDirectory)) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

    for (const href of hrefs) {
      if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/#')) continue;
      const target = outputPathForHref(href);
      if (!fs.existsSync(target)) errors.push(`${path.relative(outputDirectory, htmlFile)} → missing ${href}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `✖ ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`✓ Validated static output links in ${collectHtmlFiles(outputDirectory).length} HTML files.`);
}
