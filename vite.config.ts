import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      // Increase chunk size limit to suppress warning (optional optimization)
      chunkSizeWarningLimit: 1600,
    },
    define: {
      // We explicitly bake these variables into the client bundle
      // This allows utils/env.ts to access process.env.API_KEY, etc.
      'process.env': {
        API_KEY: JSON.stringify(env.API_KEY || process.env.API_KEY || env.VITE_API_KEY || process.env.VITE_API_KEY),
        VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
        VITE_SUPABASE_ANON_KEY: JSON.stringify(env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      },
    },
  };
});
