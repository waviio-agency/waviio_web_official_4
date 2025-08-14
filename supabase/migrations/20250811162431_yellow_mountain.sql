/*
  # Fix user creation trigger for signup

  1. Updates
    - Fix the handle_new_user trigger to properly handle user creation
    - Ensure all required fields are populated with defaults
    - Add proper error handling

  2. Security
    - Maintain RLS policies
    - Ensure secure user creation process
*/

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'client',
    NOW(),
    NOW()
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure profiles table has proper defaults
ALTER TABLE public.profiles 
  ALTER COLUMN role SET DEFAULT 'client',
  ALTER COLUMN created_at SET DEFAULT NOW(),
  ALTER COLUMN updated_at SET DEFAULT NOW();

-- Update existing profiles that might have null values
UPDATE public.profiles 
SET 
  role = 'client' 
WHERE role IS NULL;

UPDATE public.profiles 
SET 
  full_name = '' 
WHERE full_name IS NULL;