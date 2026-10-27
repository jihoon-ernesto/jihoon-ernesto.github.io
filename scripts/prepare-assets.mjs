import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'content/blog');
for (const post of await readdir(source, { withFileTypes: true })) {
  if (!post.isDirectory()) continue;
  const target = path.join(root, 'public', post.name);
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
  for (const asset of await readdir(path.join(source, post.name), { withFileTypes: true })) {
    if (asset.isFile() && !/\.(md|mdx)$/i.test(asset.name)) {
      await cp(path.join(source, post.name, asset.name), path.join(target, asset.name));
    }
  }
}
