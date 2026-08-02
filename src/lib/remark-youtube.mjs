import { parseYouTubeUrl, youtubeEmbedUrl } from './youtube-core.mjs';

export default function remarkYouTube() {
  return tree => transform(tree);
}

function transform(node) {
  if (!node?.children) return;
  node.children = node.children.map(child => {
    if (child.type === 'paragraph' && child.children?.length === 1) {
      const only = child.children[0];
      const raw = only.type === 'link' ? only.url : only.type === 'text' ? only.value : null;
      const item = parseYouTubeUrl(raw);
      if (item) {
        const src = youtubeEmbedUrl(item).replace(/&/g, '&amp;');
        return {
          type: 'html',
          value: `<div class="youtube-embed"><iframe src="${src}" title="YouTube video player" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`,
        };
      }
    }
    transform(child);
    return child;
  });
}
