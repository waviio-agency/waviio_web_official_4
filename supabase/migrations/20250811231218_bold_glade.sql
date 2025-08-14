/*
  # Fix messages table RLS policies for anonymous submissions

  1. Security Changes
    - Add policy to allow anonymous users to insert messages with null user_id
    - Maintain existing policies for authenticated users
    - Ensure anonymous submissions are properly handled

  2. Policy Details
    - Anonymous users can only insert messages with user_id = NULL
    - Authenticated users can still insert their own messages
    - All other operations remain restricted as before
*/

-- Allow anonymous users to insert messages with null user_id
CREATE POLICY "Anonymous users can submit contact messages"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Ensure the existing policy for authenticated users is still active
-- (This should already exist, but we're being explicit)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' 
    AND policyname = 'Users can create own messages'
  ) THEN
    CREATE POLICY "Users can create own messages"
      ON messages
      FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;