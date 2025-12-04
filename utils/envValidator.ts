import { getEnv } from './env';

export interface EnvConfig {
  geminiApiKey: string | undefined;
  supabaseUrl: string | undefined;
  supabaseAnonKey: string | undefined;
  appUrl: string | undefined;
}

export interface EnvValidationResult {
  isValid: boolean;
  config: EnvConfig;
  warnings: string[];
  errors: string[];
  isDemoMode: boolean;
}

/**
 * Validates environment variables and returns configuration status
 */
export function validateEnvironment(): EnvValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Get all environment variables
  const geminiApiKey = getEnv('VITE_GEMINI_API_KEY') || getEnv('API_KEY');
  const supabaseUrl = getEnv('VITE_SUPABASE_URL');
  const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');
  const appUrl = getEnv('VITE_APP_URL', 'http://localhost:5173');

  const config: EnvConfig = {
    geminiApiKey,
    supabaseUrl,
    supabaseAnonKey,
    appUrl,
  };

  // Check Gemini API Key
  if (!geminiApiKey) {
    warnings.push('Gemini API key not configured. AI features will run in demo mode.');
  } else if (geminiApiKey.length < 20) {
    errors.push('Gemini API key appears invalid (too short).');
  }

  // Check Supabase Configuration
  if (!supabaseUrl || !supabaseAnonKey) {
    warnings.push('Supabase not configured. Authentication will use demo mode.');
  } else {
    if (!supabaseUrl.startsWith('https://')) {
      errors.push('Supabase URL must start with https://');
    }
    if (supabaseAnonKey.length < 20) {
      errors.push('Supabase anon key appears invalid (too short).');
    }
  }

  // Determine if running in demo mode
  const isDemoMode = !geminiApiKey || !supabaseUrl || !supabaseAnonKey;

  // Overall validation status
  const isValid = errors.length === 0;

  return {
    isValid,
    config,
    warnings,
    errors,
    isDemoMode,
  };
}

/**
 * Logs environment validation results to console
 */
export function logEnvironmentStatus(): void {
  const result = validateEnvironment();

  console.log('🔧 Environment Configuration Status:');
  console.log('=====================================');
  
  if (result.isDemoMode) {
    console.warn('⚠️  Running in DEMO MODE');
    console.warn('   Some features will use mock data');
  } else {
    console.log('✅ Running in PRODUCTION MODE');
  }

  if (result.warnings.length > 0) {
    console.warn('\n⚠️  Warnings:');
    result.warnings.forEach(warning => console.warn(`   - ${warning}`));
  }

  if (result.errors.length > 0) {
    console.error('\n❌ Errors:');
    result.errors.forEach(error => console.error(`   - ${error}`));
  }

  console.log('\n📝 Configuration:');
  console.log(`   Gemini API: ${result.config.geminiApiKey ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   Supabase: ${result.config.supabaseUrl ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   App URL: ${result.config.appUrl}`);
  console.log('=====================================\n');
}
