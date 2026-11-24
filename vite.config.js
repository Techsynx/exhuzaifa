import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: false,
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    modulePreload: {
      resolveDependencies: (filename, deps) => {
        // Exclude heavy three-vendor and Scene chunks from being modulepreloaded in the initial HTML head
        return deps.filter((dep) => !dep.includes('three-vendor') && !dep.includes('Scene'));
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms.html'),
        security: resolve(__dirname, 'security.html'),
        disclaimer: resolve(__dirname, 'disclaimer.html'),
        notFound: resolve(__dirname, '404.html'),
      },
      output: {
        manualChunks: {
          'animation-vendor': ['gsap', 'lenis'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
