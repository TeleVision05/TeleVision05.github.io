import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// User site on GitHub Pages: served from the domain root.
export default defineConfig({
  site: 'https://television05.github.io',
  integrations: [sitemap(), icon()],
  vite: { plugins: [tailwindcss()] },
});
