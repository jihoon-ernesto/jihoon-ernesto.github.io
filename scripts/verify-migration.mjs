import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const site = 'https://jihoon-ernesto.github.io';
const read = file => readFile(path.join(root, file), 'utf8');
const digest = data => createHash('sha256').update(data).digest('hex');
const original = ['my-first-open-source-part1', 'my-first-open-source-part2', 'my-first-open-source-part3', 'my-neighbor-cats-part1', 'my-neighbor-cats-part2', 'my-neighbor-cats-part3'];
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const posts = (await readdir(path.join(root, 'content/blog'), { withFileTypes: true })).filter(e => e.isDirectory()).map(e => e.name);
for (const slug of original) assert(posts.includes(slug), `Missing original post: ${slug}`);
let images = 0;
for (const slug of posts) {
  const $ = load(await read(`dist/${slug}/index.html`));
  assert.equal($('link[rel="canonical"]').attr('href'), `${site}/${slug}/`);
  assert.equal($('html').attr('lang'), 'ko');
  assert($('article .prose').text().trim().length > 100, `Empty post: ${slug}`);
  assert.equal($('#giscus-comments').length, 1);
  const scripts = $('script').map((_, e) => $(e).attr('src')).get();
  const inline = $('script:not([src])').map((_, e) => $(e).text()).get().join('\n');
  const compiled = inline + (await Promise.all(scripts.filter(s => s.startsWith('/')).map(s => read(`dist${s}`)))).join('\n');
  for (const value of ['https://giscus.app/client.js', 'R_kgDOHJWllw', 'DIC_kwDOHJWll84CPG4E', 'pathname']) assert(compiled.includes(value), `Changed Giscus config: ${value}`);
  for (const asset of await readdir(path.join(root, 'content/blog', slug))) {
    if (/\.(md|mdx)$/i.test(asset)) continue;
    const source = await readFile(path.join(root, 'content/blog', slug, asset));
    const published = await readFile(path.join(dist, slug, asset));
    assert.equal(digest(source), digest(published), `Altered original image: ${slug}/${asset}`);
    images++;
  }
}
// Check every local link, image and script in all generated HTML, including
// relative links inside unchanged Markdown and raw <figure> image elements.
let links = 0;
for (const file of (await files(dist)).filter(f => f.endsWith('.html'))) {
  const $ = load(await readFile(file, 'utf8'));
  const route = path.relative(dist, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  for (const element of $('[href], [src]').toArray()) {
    const ref = $(element).attr('href') ?? $(element).attr('src');
    if (!ref || /^(?:[a-z]+:|\/\/|#)/i.test(ref)) continue;
    const url = new URL(ref, `${site}/${route}`);
    const local = path.join(dist, decodeURIComponent(url.pathname));
    try {
      const info = await stat(local);
      if (info.isDirectory()) await stat(path.join(local, 'index.html'));
    } catch { assert.fail(`Broken local reference in ${route}: ${ref}`); }
    links++;
  }
}
const rss = load(await read('dist/rss.xml'), { xml: true });
assert.equal(rss('item').length, posts.length);
for (const slug of original) {
  const item = rss('item').filter((_, e) => rss(e).find('link').text() === `${site}/${slug}/`);
  assert.equal(item.length, 1, `Missing RSS item: ${slug}`);
  assert.equal(item.find('guid').text(), `${site}/${slug}/`, `Changed legacy RSS GUID: ${slug}`);
  const content = item.find('content\\:encoded').text();
  assert(content.length > 100, `Missing full RSS content: ${slug}`);
  const body = load(content);
  for (const image of body('img').toArray()) {
    const source = body(image).attr('src');
    assert(source?.startsWith(`${site}/`), `Relative RSS image: ${source}`);
    await stat(path.join(dist, new URL(source).pathname));
  }
}
const oldAssets = (await files(path.join(root, 'public/static')));
for (const file of oldAssets) {
  const rel = path.relative(path.join(root, 'public'), file);
  assert.equal(digest(await readFile(file)), digest(await readFile(path.join(dist, rel))), `Changed legacy asset: ${rel}`);
}
assert((await read('dist/sitemap-0.xml')).includes(`${site}/my-first-open-source-part1/`));
assert((await read('dist/404.html')).includes('noindex'));
console.log(`Verified ${posts.length} posts, ${images} original images, ${oldAssets.length} legacy assets, ${links} local references, Giscus mapping, RSS GUIDs, sitemap and 404.`);
