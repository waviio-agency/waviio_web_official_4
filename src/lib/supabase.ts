import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  service_type: 'site-one-page' | 'site-vitrine' | 'site-e-commerce' | 'maintenance-et-hebergement';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  price: number | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  user_id: string | null;
  subject: string;
  content: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface Analytics {
  id: string;
  user_id: string;
  unique_visitors: number;
  page_views: number;
  sessions: number;
  avg_duration: string;
  date: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  service_type: 'one-page' | 'vitrine' | 'e-commerce' | 'maintenance';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  price: number | null;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  duration_months: number | null;
  start_date: string | null;
  end_date: string | null;
  auto_renewal: boolean;
}

export interface Revision {
  id: string;
  user_id: string;
  title: string;
  description: string;
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}
export interface Form {
  id: string;
  user_id: string;
  business_name: string;
  owner_name: string;
  professional_email: string | null;
  professional_phone: string | null;
  business_description: string;
  why_choose_you: string | null;
  what_makes_unique: string | null;
  complementary_offers: string | null;
  special_offers: string | null;
  trust_badges: string | null;
  desired_features: string;
  theme_preference: 'clair' | 'sombre';
  service_areas: string | null;
  key_messages: string;
  logo_url: string | null;
  photos_urls: string[] | null;
  faq_content: string | null;
  google_reviews: 'oui' | 'non' | 'aide';
  created_at: string;
  updated_at: string;
  design_style: string | null;
  color_preferences: string | null;
  typography_style: string | null;
  brand_guidelines: string | null;
  inspiration_sites: string | null;
  layout_preferences: string | null;
  visual_elements: string | null;
}