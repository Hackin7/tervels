import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/tervels',
  trailingSlash: 'ignore',
  vite: {
    server: {
      allowedHosts: ['.pinggy.io', '.pinggy.link', '.pinggy-free.link'],
    },
  },
});
