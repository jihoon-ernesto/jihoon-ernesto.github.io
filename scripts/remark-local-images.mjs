import path from 'node:path';

// Keep Markdown sources unchanged and serve their images alongside each post,
// just like the raw <img> elements already present in those sources.
export default function localImages() {
  return (tree, file) => {
    const slug = path.basename(path.dirname(file.path));
    function walk(node) {
      if (node.type === 'image' && !/^(?:[a-z]+:|\/|#)/i.test(node.url)) {
        node.url = `/${slug}/${node.url.replace(/^\.\//, '')}`;
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
