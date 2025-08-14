/*
  # Create revisions table for client revision requests

  1. New Tables
    - `revisions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `title` (text)
      - `description` (text)
      - `priority` (text, check constraint)
      - `status` (text, check constraint)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `revisions` table
    - Add policies for users to manage their own revisions
    - Add policies for admins to manage all revisions
*/

CREATE TABLE IF NOT EXISTS revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  priority text NOT NULL DEFAULT 'normal',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT revisions_priority_check CHECK (priority IN ('low', 'normal', 'high')),
  CONSTRAINT revisions_status_check CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled'))
);

ALTER TABLE revisions ENABLE ROW LEVEL SECURITY;

-- Users can create their own revisions
CREATE POLICY "Users can create own revisions"
  ON revisions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can read their own revisions
CREATE POLICY "Users can read own revisions"
  ON revisions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can update their own revisions
CREATE POLICY "Users can update own revisions"
  ON revisions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admins can read all revisions
CREATE POLICY "Admins can read all revisions"
  ON revisions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admins can update all revisions
CREATE POLICY "Admins can update all revisions"
  ON revisions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_revisions_updated_at
  BEFORE UPDATE ON revisions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();