/*
  # Add maintenance duration functionality

  1. New Columns
    - `orders` table:
      - `duration_months` (integer) - Duration in months for maintenance services
      - `start_date` (date) - Start date of the service
      - `end_date` (date) - End date of the service
      - `auto_renewal` (boolean) - Whether the service auto-renews

  2. Updates
    - Add default values for new columns
    - Update existing maintenance orders with default values

  3. Security
    - No changes to RLS policies needed
*/

-- Add new columns to orders table
DO $$
BEGIN
  -- Add duration_months column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'duration_months'
  ) THEN
    ALTER TABLE orders ADD COLUMN duration_months integer DEFAULT 1;
  END IF;

  -- Add start_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'start_date'
  ) THEN
    ALTER TABLE orders ADD COLUMN start_date date DEFAULT CURRENT_DATE;
  END IF;

  -- Add end_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE orders ADD COLUMN end_date date;
  END IF;

  -- Add auto_renewal column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'auto_renewal'
  ) THEN
    ALTER TABLE orders ADD COLUMN auto_renewal boolean DEFAULT false;
  END IF;
END $$;

-- Update existing maintenance orders with calculated end dates
UPDATE orders 
SET 
  end_date = start_date + INTERVAL '1 month' * duration_months
WHERE 
  service_type = 'maintenance' 
  AND end_date IS NULL;