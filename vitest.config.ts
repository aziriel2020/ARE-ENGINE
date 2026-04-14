import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    env: {
      ARE_E_TEST_MODE: 'true',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_dGVzdGluZy5jbGVyay5hY2NvdW50cy5kZXYk',
      CLERK_SECRET_KEY: 'sk_test_placeholder',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
