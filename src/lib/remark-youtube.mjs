import { parseYouTubeUrl } from './youtube-core.mjs';

export default function remarkYouTube() {
  return tree => transform(tree);
}

function transform(node) {
  if (!node?.children) return;
  node.children = node.children.flatMap(child => {
    if (child.type === 'paragraph' && child.children?.length === 1) {
      const only = child.children[0];
      const raw = only.type === 'link' ? only.url : only.type === 'text' ? only.value : null;
      const item = parseYouTubeUrl(raw);
      if (item) return [];
    }
    transform(child);
    return [child];
  });
}
