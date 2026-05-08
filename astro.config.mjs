import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://threnne.com',
  integrations: [tailwind({ applyBaseStyles: false })],
  build: {
    format: 'directory',
  },
});
