import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // Helper to find key across multiple naming conventions
  const findVar = (names: string[]) => {
    for (const name of names) {
      const val = env[name] || process.env[name];
      if (val) return val;
    }
    return '';
  };

  const apiKey = findVar(['API_KEY', 'VITE_API_KEY', 'VITE_GEMINI_API_KEY']);
  const sbUrl = findVar(['VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL']);
  const sbKey = findVar(['VITE_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']);

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
          chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
          assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`,
        },
      },
    },
    define: {
      // INJECT GLOBALLY ACCESSIBLE OBJECT
      'window.__ENV__': {
        API_KEY: apiKey,
        VITE_SUPABASE_URL: sbUrl,
        VITE_SUPABASE_ANON_KEY: sbKey,
      },
    },
  };
});
