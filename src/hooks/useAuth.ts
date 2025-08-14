import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Fonction pour récupérer le profil
    const getProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (data && !error) {
          if (mounted) setProfile(data);
        } else {
          // Si on ne peut pas récupérer le profil, la session est probablement invalide
          console.warn('Profile fetch failed, signing out user');
          await signOut();
          return;
        }
      } catch (error) {
        console.error('Profile error:', error);
        // En cas d'erreur critique, déconnecter l'utilisateur
        await signOut();
      }
    };

    // Initialisation
    const initialize = async () => {
      if (mounted) setLoading(true);
      try {
        // Récupérer la session actuelle
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          if (mounted) {
            setSession(session);
            setUser(session.user);
          }
          await getProfile(session.user.id);
        } else {
          // Pas de session active, s'assurer que tous les états sont null
          if (mounted) {
            setSession(null);
            setUser(null);
            setProfile(null);
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        // En cas d'erreur d'initialisation, nettoyer les états
        if (mounted) {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        if (mounted) setLoading(true);
        
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          await getProfile(session.user.id);
        } else {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
        
        if (mounted) setLoading(false);
      }
    );

    initialize();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    return { data, error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (!error && !data.session) {
      setLoading(false);
    }
    return { data, error };
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      // Reset states immediately regardless of error
      setSession(null);
      setUser(null);
      setProfile(null);
      
      setLoading(false);
      return { error };
    } catch (error) {
      // Force logout even if there's an error
      setSession(null);
      setUser(null);
      setProfile(null);
      setLoading(false);
      return { error: null };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile(data);
    }

    setLoading(false);
    return { data, error };
  };

  return {
    user,
    profile,
    session,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
}