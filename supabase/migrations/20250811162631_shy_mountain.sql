/*
  # Fix RLS infinite recursion in profiles table

  1. Problem
    - The current RLS policies create infinite recursion
    - Admin policy tries to check profiles table from within profiles table
    - This creates a circular dependency

  2. Solution
    - Use auth.uid() directly instead of checking profiles table
    - Simplify policies to avoid recursive lookups
    - Use built-in Supabase auth functions

  3. Security
    - Users can only access their own profile
    - No recursive policy checks
    - Clean and efficient RLS rules
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create simple, non-recursive policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Note: Admin functionality will be handled at application level
-- by checking the role field after fetching the user's own profile