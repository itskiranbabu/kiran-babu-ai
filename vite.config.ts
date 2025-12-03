import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1600,
    },
    define: {
      // Standard way to expose env variables in Vite
      // capturing both VITE_ prefixed and standard keys
      'process.env': env
    },
  };
});