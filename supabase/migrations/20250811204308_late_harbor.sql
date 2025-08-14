/*
  # Fix admin access to profiles table

  1. Security Changes
    - Add policy for admins to read all profiles
    - Ensure admins can manage all user profiles
    - Keep existing user policies intact

  2. Changes
    - Add "Admins can read all profiles" policy
    - Add "Admins can update all profiles" policy for role management
*/

-- Add policy for admins to read all profiles
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin_profile 
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.role = 'admin'
    )
  );

-- Add policy for admins to update all profiles (for role management)
CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin_profile 
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles admin_profile 
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.role = 'admin'
    )
  );