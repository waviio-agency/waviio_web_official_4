/*
  # Create forms table for onboarding data

  1. New Tables
    - `forms`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `business_name` (text, required)
      - `owner_name` (text, required)
      - `professional_email` (text, optional)
      - `professional_phone` (text, optional)
      - `business_description` (text, required, min 120 chars)
      - `why_choose_you` (text, optional)
      - `what_makes_unique` (text, optional)
      - `complementary_offers` (text, optional)
      - `special_offers` (text, optional)
      - `trust_badges` (text, optional)
      - `desired_features` (text, required, min 120 chars)
      - `theme_preference` (text, required, 'clair' or 'sombre')
      - `service_areas` (text, optional)
      - `key_messages` (text, required, min 120 chars)
      - `logo_url` (text, optional)
      - `photos_urls` (text[], optional)
      - `faq_content` (text, optional)
      - `google_reviews` (text, required, 'oui', 'non', or 'aide')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `forms` table
    - Add policies for users to manage their own forms
    - Add policy for admins to read all forms
*/

CREATE TABLE IF NOT EXISTS forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  owner_name text NOT NULL,
  professional_email text,
  professional_phone text,
  business_description text NOT NULL,
  why_choose_you text,
  what_makes_unique text,
  complementary_offers text,
  special_offers text,
  trust_badges text,
  desired_features text NOT NULL,
  theme_preference text NOT NULL CHECK (theme_preference IN ('clair', 'sombre')),
  service_areas text,
  key_messages text NOT NULL,
  logo_url text,
  photos_urls text[],
  faq_content text,
  google_reviews text NOT NULL CHECK (google_reviews IN ('oui', 'non', 'aide')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own forms"
  ON forms
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own forms"
  ON forms
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own forms"
  ON forms
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all forms"
  ON forms
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE TRIGGER update_forms_updated_at
  BEFORE UPDATE ON forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();