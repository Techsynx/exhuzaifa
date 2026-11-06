import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
      output: {
        manualChunks: {
          'animation-vendor': ['gsap', 'lenis'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
