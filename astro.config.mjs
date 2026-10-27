import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import localImages from './scripts/remark-local-images.mjs';

export default defineConfig({
  site: 'https://jihoon-ernesto.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [localImages], smartypants: true }),
    shikiConfig: { theme: 'github-light' },
  },
});
