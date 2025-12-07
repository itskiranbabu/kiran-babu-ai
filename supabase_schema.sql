-- =====================================================
-- KeySpark AI - Supabase Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- =====================================================
-- This table stores user profile information
-- It's automatically populated when a user signs up via trigger

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- TRIGGER: Auto-create profile on signup
-- =====================================================
-- This function automatically creates a profile entry when a user signs up

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- IMPORTANT: EMAIL CONFIRMATION SETTINGS
-- =====================================================
-- To fix the "email not confirmed" login issue, you need to:
--
-- OPTION 1: Disable Email Confirmation (Recommended for Development)
-- ---------------------------------------------------------------
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to: Authentication > Settings
-- 3. Scroll to "Email Auth" section
-- 4. DISABLE "Enable email confirmations"
-- 5. Click "Save"
--
-- OPTION 2: Enable Auto-Confirm for Development
-- ---------------------------------------------------------------
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to: Authentication > Settings
-- 3. Under "Email Auth", find "Confirm email"
-- 4. Set to "Disabled" or use the toggle
--
-- OPTION 3: Use Email Templates (Production)
-- ---------------------------------------------------------------
-- 1. Configure SMTP settings in Supabase
-- 2. Customize email templates
-- 3. Users will receive confirmation emails
-- 4. They must click the link before logging in
--
-- For this application, OPTION 1 is recommended for immediate access.
-- =====================================================

-- =====================================================
-- ADDITIONAL TABLES (Optional - for future features)
-- =====================================================

-- Example: User preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  theme TEXT DEFAULT 'dark',
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON public.user_preferences(user_id);

-- =====================================================
-- SETUP COMPLETE
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Then configure email settings as described above
