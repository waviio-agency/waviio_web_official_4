/*
  # Add design and visual identity fields to forms table

  1. New Fields
    - `design_style` (text) - Style de design préféré
    - `color_preferences` (text) - Couleurs souhaitées
    - `typography_style` (text) - Style typographique
    - `brand_guidelines` (text) - Charte graphique existante
    - `inspiration_sites` (text) - Sites d'inspiration
    - `layout_preferences` (text) - Préférences de mise en page
    - `visual_elements` (text) - Éléments visuels souhaités
    
  2. Updates
    - Update theme_preference to include 'les_deux' option
*/

-- Add new design fields
ALTER TABLE forms ADD COLUMN IF NOT EXISTS design_style text;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS color_preferences text;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS typography_style text;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS brand_guidelines text;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS inspiration_sites text;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS layout_preferences text;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS visual_elements text;

-- Update theme preference constraint to include 'les_deux'
ALTER TABLE forms DROP CONSTRAINT IF EXISTS forms_theme_preference_check;
ALTER TABLE forms ADD CONSTRAINT forms_theme_preference_check 
  CHECK (theme_preference = ANY (ARRAY['clair'::text, 'sombre'::text, 'les_deux'::text]));