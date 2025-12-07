import { createClient } from '@supabase/supabase-js';
import { getEnv } from '../utils/env';

// --- Supabase Client Configuration ---
const supabaseUrl = getEnv('VITE_SUPABASE_URL') || getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

// Debug logging to help diagnose connection issues in production
// @ts-ignore
if (import.meta.env && import.meta.env.DEV) {
    console.log("Supabase Config Check:", {
        URL_Found: !!supabaseUrl,
        Key_Found: !!supabaseKey
    });
}

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

if (!supabase) {
  console.warn("⚠️ Supabase credentials missing. App running in offline/demo mode.");
}