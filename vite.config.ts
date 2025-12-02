import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiKey = process.env.VITE_API_KEY || process.env.API_KEY || '';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    define: {
      'process.env.VITE_API_KEY': JSON.stringify(apiKey),
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey),
    },
  },
  define: {
    'process.env.VITE_API_KEY': JSON.stringify(apiKey),
    'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey),
  },
});
