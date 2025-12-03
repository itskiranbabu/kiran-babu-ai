import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // Helper to find the key across standard Vercel/Vite naming patterns
  const findKey = (names: string[]) => {
    for (const name of names) {
      const val = env[name] || process.env[name];
      if (val) return val;
    }
    return '';
  };

  const apiKey = findKey(['API_KEY', 'VITE_API_KEY', 'VITE_GEMINI_API_KEY']);
  const sbUrl = findKey(['VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL']);
  const sbKey = findKey(['VITE_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']);

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1600,
    },
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.VITE_SUPABASE_URL': JSON.stringify(sbUrl),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(sbKey),
    },
  };
});
