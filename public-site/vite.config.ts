/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig(() => {
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      proxy: {
        "/api/blog": {
          target: "https://fundedyouth.org",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/blog/, "/blog"),
        },
        "/api/calendar": {
          target: "https://cdn.fundedyouth.org",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/calendar/, "/feeds/calendar"),
        },
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: '.vitest/setup',
      include: ['**/test.{ts,tsx}']
    }
  };
})
