import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, Analytics } from '../../lib/supabase';
import { BarChart3, Users, Eye, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const Stats: React.FC = () => {
  const { profile, loading: authLoading } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isFetchingAnalytics, setIsFetchingAnalytics] = useState(false);

  useEffect(() => {
    if (!authLoading && profile?.id) {
      fetchAnalytics();
    }
  }, [authLoading, profile?.id]);

  const fetchAnalytics = async () => {
    if (!profile?.id) return;
    
    setIsFetchingAnalytics(true);
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('user_id', profile?.id)
        .eq('date', new Date().toISOString().split('T')[0])
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsFetchingAnalytics(false);
    }
  };

  const statsCards = [
    {
      title: 'Visiteurs uniques',
      value: analytics?.unique_visitors || 0,
      change: '+0%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Pages vues',
      value: analytics?.page_views || 0,
      change: '+0%',
      icon: Eye,
      color: 'green'
    },
    {
      title: 'Sessions',
      value: analytics?.sessions || 0,
      change: '+0%',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Durée moyenne',
      value: analytics?.avg_duration || '0m 0s',
      change: '+0%',
      icon: Clock,
      color: 'yellow'
    }
  ];

  const internalStats = [
    {
      title: 'Messages reçus',
      value: 0,
      change: '+0%',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Utilisateurs inscrits',
      value: 0,
      change: '+0%',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Clients actifs',
      value: 0,
      change: '+0%',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  if (authLoading || isFetchingAnalytics) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Statistiques</h1>
          <p className="text-gray-600">Vue d'ensemble de l'activité de votre site</p>
        </div>

        {/* Google Analytics Notice */}
        <div className="mb-8 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
              <div>
                <h3 className="font-medium text-yellow-800">Configuration Google Analytics requise</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Les statistiques Google Analytics seront disponibles après configuration de l'API. Contactez l'équipe technique pour activer cette fonctionnalité.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <BarChart3 className="text-blue-600 mt-0.5" size={20} />
              <div>
                <h3 className="font-medium text-blue-800">Google Analytics (Non configuré)</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Configuration requise pour afficher les données
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                    <Icon className={`text-${stat.color}-600`} size={24} />
                  </div>
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            );
          })}
        </div>

        {/* Analytics Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Graphiques Analytics</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="text-gray-400 mx-auto mb-3" size={48} />
              <p className="text-gray-500">Les graphiques détaillés seront disponibles après configuration de Google Analytics</p>
            </div>
          </div>
        </div>

        {/* Internal Data */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Données internes</h3>
          <p className="text-sm text-gray-600 mb-6">Activité de votre plateforme</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internalStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                      <Icon className={`text-${stat.color}-600`} size={20} />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.change}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stats;