import { defineConfig } from 'astro/config';
import remarkYouTube from './src/lib/remark-youtube.mjs';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/tervels',
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [remarkYouTube],
  },
  vite: {
    server: {
      allowedHosts: ['.pinggy.io', '.pinggy.link', '.pinggy-free.link', '.ngrok-free.app'],
    },
  },
});
