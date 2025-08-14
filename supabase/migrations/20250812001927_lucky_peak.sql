/*
  # Allow NULL user_id in messages table

  1. Changes
    - Remove NOT NULL constraint from user_id column in messages table
    - This allows anonymous users to submit contact form messages
    - Existing foreign key constraint remains for non-null user_id values

  2. Security
    - RLS policies remain unchanged
    - Anonymous users can still only insert messages with user_id = NULL
    - Authenticated users can still only insert/read their own messages
*/

-- Remove NOT NULL constraint from user_id column
ALTER TABLE messages ALTER COLUMN user_id DROP NOT NULL;