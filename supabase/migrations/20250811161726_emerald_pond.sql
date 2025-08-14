/*
  # Système de commandes complet

  1. Nouvelles Tables
    - `orders` - Commandes des clients
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key vers profiles)
      - `service_type` (enum: one-page, vitrine, e-commerce, maintenance)
      - `status` (enum: pending, in-progress, completed, cancelled)
      - `price` (decimal)
      - `title` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Mise à jour des profils
    - Ajout du rôle 'visiteur'
    - Amélioration des contraintes

  3. Sécurité
    - Enable RLS sur toutes les tables
    - Policies pour clients (leurs commandes uniquement)
    - Policies pour admins (toutes les commandes)
*/

-- Mise à jour de la table profiles pour ajouter le rôle visiteur
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role = ANY (ARRAY['client'::text, 'admin'::text, 'visiteur'::text]));

-- Création de la table orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  service_type text NOT NULL CHECK (service_type = ANY (ARRAY['one-page'::text, 'vitrine'::text, 'e-commerce'::text, 'maintenance'::text])),
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'in-progress'::text, 'completed'::text, 'cancelled'::text])),
  price decimal(10,2),
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS sur la table orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies pour la table orders
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Trigger pour updated_at sur orders
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();