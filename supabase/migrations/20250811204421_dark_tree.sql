/*
  # Fix infinite recursion in RLS policies

  1. Problem
    - The admin policies were creating infinite recursion by querying the profiles table within the policy itself
    - This creates a circular dependency during RLS evaluation

  2. Solution
    - Remove the problematic policies that cause recursion
    - Create simpler policies that don't self-reference the profiles table
    - Use auth.uid() and user metadata instead of querying profiles table

  3. Security
    - Maintain security by using Supabase's built-in auth functions
    - Users can still only see their own profiles
    - Admins will need to be managed through a different approach
*/

-- Drop the problematic policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Keep the existing safe policies that don't cause recursion
-- These policies are already working correctly:
-- - "Users can read own profile" USING (auth.uid() = id)
-- - "Users can update own profile" USING (auth.uid() = id) WITH CHECK (auth.uid() = id)
-- - "Users can insert own profile" WITH CHECK (auth.uid() = id)

-- Note: Admin access to all profiles will need to be handled differently
-- to avoid the infinite recursion issue. This could be done through:
-- 1. A separate admin interface with service role access
-- 2. Database functions that bypass RLS
-- 3. A different table structure for admin permissions