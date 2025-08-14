import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User, Mail, Save, CheckCircle } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const Profile: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await updateProfile({
      full_name: formData.full_name,
      email: formData.email
    });

    if (!error) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }

    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <User className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
          </div>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-2xl">
                    {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={16} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {profile?.full_name || 'Nom non défini'}
              </h3>
              <p className="text-gray-600 mb-3">{profile?.email}</p>
              
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {profile?.role === 'admin' ? 'Administrateur' : 'Client'}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">Membre depuis</div>
                <div className="font-medium text-gray-900">
                  {profile?.created_at ? formatDate(profile.created_at) : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Mail className="text-blue-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
              </div>

              {isSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-green-800 font-medium">
                      Profil mis à jour avec succès !
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save size={18} />
                    <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder les modifications'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;