import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'solid-i18n',
      fileName: (format) => `solid-i18n.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['solid-js', 'solid-js/store'],
      output: {
        globals: {
          'solid-js': 'Solid',
          'solid-js/store': 'SolidStore'
        }
      }
    },
    target: 'esnext',
  },
});
