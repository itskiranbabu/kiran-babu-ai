import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from '../utils/env';

// --- Supabase Client Configuration ---
const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY');

let supabaseInstance: SupabaseClient | null = null;

// Initialize Supabase client only if credentials are available
if (supabaseUrl && supabaseKey) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
    });
    console.log('✅ Supabase client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error);
    supabaseInstance = null;
  }
} else {
  console.warn('⚠️ Supabase credentials missing. Running in offline/demo mode.');
  console.warn('📝 To enable Supabase:');
  console.warn('   1. Create a .env file in the project root');
  console.warn('   2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  console.warn('   3. Restart the development server');
}

export const supabase = supabaseInstance;

// Helper to check if Supabase is available
export const isSupabaseAvailable = (): boolean => {
  return supabaseInstance !== null;
};
