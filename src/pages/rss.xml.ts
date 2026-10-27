import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { load } from 'cheerio';

function absoluteContent(html: string, page: URL) {
  const $ = load(html, {}, false);
  for (const element of $('a[href], img[src]').toArray()) {
    const key = element.tagName === 'a' ? 'href' : 'src';
    const value = $(element).attr(key);
    if (value) $(element).attr(key, new URL(value, page).href);
  }
  return $.html();
}
export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: '나의 얼렁뚱땅',
    description: 'a blog on software engineering',
    site: context.site!,
    items: posts.map(post => ({ title: post.data.title, pubDate: post.data.date, description: post.data.description, content: absoluteContent(post.rendered?.html ?? '', new URL(`/${post.id}/`, context.site)), link: `/${post.id}/`, customData: `<guid isPermaLink="false">https://jihoon-ernesto.github.io/${post.id}/</guid>` })),
    customData: '<language>ko</language>',
    // Keep the original GUIDs so readers do not treat existing posts as new entries.
  });
}
