import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for production build
    minify: 'esbuild', // Minify the build (default is esbuild, which is fast)
    sourcemap: false, // Set to 'true' if you want source maps for debugging
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor and large dependencies into separate chunks --
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/category': 'http://localhost:5000',
      '/products': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
      '/articles': 'http://localhost:5000',
      '/perfume': 'http://localhost:5000',
      '/perfumeOrder': 'http://localhost:5000',
      '/chocolate': 'http://localhost:5000',
      '/naturalFlowers': 'http://localhost:5000',
      '/naturalFlowersOrders': 'http://localhost:5000',
      '/bands': 'http://localhost:5000',
      '/papers': 'http://localhost:5000',
      '/shoppingCart': 'http://localhost:5000',
      '/offers': 'http://localhost:5000',
      '/cities': 'http://localhost:5000',
      '/messages': 'http://localhost:5000',
      '/aboutus': 'http://localhost:5000',
      '/settings': 'http://localhost:5000',
    },
  },
});
