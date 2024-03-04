import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import { createHtmlPlugin } from 'vite-plugin-html';
import ViteCriticalCSS from 'vite-plugin-critical-css';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,

      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist',
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html']),
    ViteCriticalCSS({
      criticalKey: 'critical', // отримання критичного CSS
    }),
    createHtmlPlugin({
      minify: true, // Включіть мініфікацію HTML
    }),
  
  ],
  };
});
