/*
  # Create admin functions for secure access

  1. Functions
    - `get_all_profiles_admin()` - Returns all profiles for admin users
    - `update_profile_role_admin()` - Allows admins to update user roles
  
  2. Security
    - Functions check if current user is admin before executing
    - Uses SECURITY DEFINER to bypass RLS
    - Proper error handling for unauthorized access
*/

-- Function to get all profiles (admin only)
CREATE OR REPLACE FUNCTION get_all_profiles_admin()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  role text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_role text;
BEGIN
  -- Check if current user is admin
  SELECT p.role INTO current_user_role
  FROM profiles p
  WHERE p.id = auth.uid();
  
  IF current_user_role != 'admin' THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;
  
  -- Return all profiles
  RETURN QUERY
  SELECT p.id, p.email, p.full_name, p.role, p.created_at, p.updated_at
  FROM profiles p
  ORDER BY p.created_at DESC;
END;
$$;

-- Function to update profile role (admin only)
CREATE OR REPLACE FUNCTION update_profile_role_admin(
  target_user_id uuid,
  new_role text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_role text;
BEGIN
  -- Check if current user is admin
  SELECT p.role INTO current_user_role
  FROM profiles p
  WHERE p.id = auth.uid();
  
  IF current_user_role != 'admin' THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;
  
  -- Validate new role
  IF new_role NOT IN ('client', 'admin', 'visiteur') THEN
    RAISE EXCEPTION 'Invalid role. Must be client, admin, or visiteur.';
  END IF;
  
  -- Update the profile role
  UPDATE profiles
  SET role = new_role, updated_at = now()
  WHERE id = target_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found.';
  END IF;
END;
$$;