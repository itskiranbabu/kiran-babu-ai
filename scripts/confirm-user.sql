-- =====================================================
-- Manual User Email Confirmation Script
-- =====================================================
-- Use this script to manually confirm users who are stuck
-- with "email not confirmed" error
--
-- Run this in Supabase SQL Editor:
-- Dashboard → SQL Editor → New Query → Paste & Run
-- =====================================================

-- 1. Check current user status
SELECT 
  id,
  email,
  email_confirmed_at,
  confirmed_at,
  created_at,
  CASE 
    WHEN email_confirmed_at IS NULL THEN '❌ NOT CONFIRMED'
    ELSE '✅ CONFIRMED'
  END as status
FROM auth.users
ORDER BY created_at DESC;

-- =====================================================
-- 2. Confirm specific user by email
-- =====================================================
-- Replace 'babukiran.b@gmail.com' with the actual email

UPDATE auth.users 
SET 
  email_confirmed_at = NOW(), 
  confirmed_at = NOW()
WHERE email = 'babukiran.b@gmail.com';

-- =====================================================
-- 3. Confirm ALL unconfirmed users (use with caution!)
-- =====================================================
-- Uncomment the line below to confirm all users at once

-- UPDATE auth.users 
-- SET 
--   email_confirmed_at = NOW(), 
--   confirmed_at = NOW()
-- WHERE email_confirmed_at IS NULL;

-- =====================================================
-- 4. Verify confirmation was successful
-- =====================================================

SELECT 
  email,
  email_confirmed_at,
  confirmed_at,
  CASE 
    WHEN email_confirmed_at IS NULL THEN '❌ STILL NOT CONFIRMED'
    ELSE '✅ NOW CONFIRMED'
  END as status
FROM auth.users
WHERE email = 'babukiran.b@gmail.com';

-- =====================================================
-- Expected Result:
-- =====================================================
-- email                    | email_confirmed_at      | confirmed_at           | status
-- -------------------------|-------------------------|------------------------|------------------
-- babukiran.b@gmail.com    | 2024-12-07 14:30:00+00  | 2024-12-07 14:30:00+00 | ✅ NOW CONFIRMED
--
-- After running this, the user should be able to login!
-- =====================================================
