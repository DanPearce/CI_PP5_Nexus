import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Same output folder as the old Create React App build, so the Docker image needs no change
  build: { outDir: 'build' },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    css: false,
  },
});
