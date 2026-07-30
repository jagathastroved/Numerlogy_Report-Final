import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'iOS >= 13', 'Safari >= 13'],
      }),
    ],
    base: "/numerology-report/",
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      cssTarget: 'safari14'
    },
    server: {
      host: "0.0.0.0",
      port: 3173,
      allowedHosts: ["astropedia-ai.astroved.com"],
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},

      // ===============
      // LocalHost Proxy 
      // ===============

      // proxy: {
      //   '/numerology-report/api': {
      //     target: 'https://ai-numerology.astroved.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/numerology-report\/api/, ''),
      //   },
      // }

      // ===============
      // Production Code
      // ===============

      proxy: {
        '/api/proxy': {
          target: 'https://ai-numerology.astroved.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
        },
      }

    },
  };
});
