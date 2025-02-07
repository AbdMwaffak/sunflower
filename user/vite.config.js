import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: true, // This ensures the custom middleware works for static files
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        // Allow requests to static files like googleXXXX.html without React Router interfering
        if (req.url.startsWith('/google02f588524eb8d2e8.html')) {
          return next(); // Pass the request to be handled as a static file
        }
        next(); // Otherwise, continue processing the request through React Router
      });
    },
  },
});
