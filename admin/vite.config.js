import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for production builds
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
});
