import React, { useState } from 'react';
import { Shield, Smartphone, Globe, Clock, CheckCircle, AlertTriangle, Key } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const Security: React.FC = () => {
  const { profile } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const securitySettings = [
    {
      title: 'Authentification à deux facteurs',
      description: 'Ajoutez une couche de sécurité supplémentaire à votre compte',
      icon: Smartphone,
      enabled: twoFactorEnabled,
      action: () => setTwoFactorEnabled(!twoFactorEnabled),
      color: 'text-green-600'
    },
    {
      title: 'Sessions actives',
      description: 'Gérez les appareils connectés à votre compte',
      icon: Globe,
      enabled: true,
      color: 'text-blue-600'
    },
    {
      title: 'Historique de connexion',
      description: 'Consultez l\'historique de vos connexions récentes',
      icon: Clock,
      enabled: true,
      color: 'text-purple-600'
    }
  ];

  const recentActivity = [
    {
      action: 'Connexion réussie',
      device: 'Chrome sur Windows',
      location: 'Paris, France',
      time: 'Il y a 2 heures',
      status: 'success'
    },
    {
      action: 'Modification du profil',
      device: 'Chrome sur Windows',
      location: 'Paris, France',
      time: 'Il y a 1 jour',
      status: 'info'
    },
    {
      action: 'Tentative de connexion échouée',
      device: 'Safari sur iPhone',
      location: 'Lyon, France',
      time: 'Il y a 3 jours',
      status: 'warning'
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="text-green-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Sécurité</h1>
          </div>
          <p className="text-gray-600">Gérez la sécurité de votre compte et surveillez l'activité</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de sécurité</h2>
              
              <div className="space-y-4">
                {securitySettings.map((setting, index) => {
                  const Icon = setting.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100`}>
                          <Icon className={setting.color} size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{setting.title}</h3>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                      </div>
                      
                      {setting.action ? (
                        <button
                          onClick={setting.action}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            setting.enabled
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {setting.enabled ? 'Activé' : 'Désactivé'}
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Gérer
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Password Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Key className="text-orange-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Sécurité du mot de passe</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Force du mot de passe</span>
                  <span className="text-sm font-medium text-green-600">Fort</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-gray-500">
                  Dernière modification : Il y a 30 jours
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="text-green-600" size={16} />
                    ) : activity.status === 'warning' ? (
                      <AlertTriangle className="text-yellow-600" size={16} />
                    ) : (
                      <Clock className="text-blue-600" size={16} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.device}</p>
                    <p className="text-xs text-gray-500">{activity.location} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Voir tout l'historique
            </button>
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Shield className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Conseils de sécurité</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Utilisez un mot de passe unique et complexe</li>
                <li>• Activez l'authentification à deux facteurs</li>
                <li>• Vérifiez régulièrement votre activité de compte</li>
                <li>• Ne partagez jamais vos informations de connexion</li>
                <li>• Déconnectez-vous des appareils publics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Security;