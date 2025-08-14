import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, Form } from '../../lib/supabase';
import { FileText, Calendar, User, Mail, Eye, X, Search, Filter, SortAsc, SortDesc, Edit, Save, AlertCircle, CheckCircle } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

interface FormWithProfile extends Form {
  profiles: {
    full_name: string | null;
    email: string;
  } | null;
}

const AdminForms: React.FC = () => {
  const { profile } = useAuth();
  const [forms, setForms] = useState<FormWithProfile[]>([]);
  const [filteredForms, setFilteredForms] = useState<FormWithProfile[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingForm, setEditingForm] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<FormWithProfile>>({});
  const [updating, setUpdating] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [reviewsFilter, setReviewsFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'business_name' | 'owner_name' | 'created_at' | 'theme_preference'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchForms();
    }
  }, [profile]);

  useEffect(() => {
    filterAndSortForms();
  }, [forms, searchQuery, themeFilter, reviewsFilter, statusFilter, sortBy, sortOrder]);

  const fetchForms = async () => {
    try {
      const { data, error } = await supabase
        .from('forms')
        .select(`
          *,
          profiles!forms_user_id_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setForms(data || []);
    } catch (error) {
      console.error('Error fetching forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortForms = () => {
    let filtered = [...forms];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(form => 
        form.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (form.profiles?.email && form.profiles.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply theme filter
    if (themeFilter !== 'all') {
      filtered = filtered.filter(form => form.theme_preference === themeFilter);
    }

    // Apply reviews filter
    if (reviewsFilter !== 'all') {
      filtered = filtered.filter(form => form.google_reviews === reviewsFilter);
    }

    // Apply status filter (we'll add a status field)
    if (statusFilter !== 'all') {
      filtered = filtered.filter(form => (form as any).status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      switch (sortBy) {
        case 'business_name':
          aValue = a.business_name;
          bValue = b.business_name;
          break;
        case 'owner_name':
          aValue = a.owner_name;
          bValue = b.owner_name;
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        case 'theme_preference':
          aValue = a.theme_preference;
          bValue = b.theme_preference;
          break;
        default:
          aValue = a.created_at;
          bValue = b.created_at;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredForms(filtered);
  };

  const handleFormClick = (form: FormWithProfile) => {
    setSelectedForm(form);
    setShowFormModal(true);
  };

  const handleEditForm = (form: FormWithProfile) => {
    setEditingForm(form.id);
    setEditFormData({
      business_name: form.business_name,
      owner_name: form.owner_name,
      professional_email: form.professional_email,
      professional_phone: form.professional_phone,
      theme_preference: form.theme_preference,
      google_reviews: form.google_reviews
    });
  };

  const handleSaveForm = async (formId: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('forms')
        .update(editFormData)
        .eq('id', formId);

      if (error) throw error;

      // Update local state
      setForms(forms.map(form => 
        form.id === formId ? { ...form, ...editFormData } : form
      ));

      setEditingForm(null);
      setEditFormData({});
    } catch (error) {
      console.error('Error updating form:', error);
      alert('Erreur lors de la mise à jour du formulaire');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingForm(null);
    setEditFormData({});
  };

  const handleSort = (field: 'business_name' | 'owner_name' | 'created_at' | 'theme_preference') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <SortAsc className="text-gray-400" size={16} />;
    return sortOrder === 'asc' ? 
      <SortAsc className="text-blue-600" size={16} /> : 
      <SortDesc className="text-blue-600" size={16} />;
  };

  if (profile?.role !== 'admin') {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions pour accéder à cette page.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
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
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="text-purple-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Formulaires d'Onboarding</h1>
          </div>
          <p className="text-gray-600">Gérez les formulaires d'onboarding des clients</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="text-purple-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{forms.length}</div>
                <div className="text-sm text-gray-600">Total formulaires</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {forms.filter(f => f.theme_preference === 'clair').length}
                </div>
                <div className="text-sm text-gray-600">Thème clair</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <User className="text-gray-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {forms.filter(f => f.theme_preference === 'sombre').length}
                </div>
                <div className="text-sm text-gray-600">Thème sombre</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="text-green-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {forms.filter(f => f.google_reviews === 'oui').length}
                </div>
                <div className="text-sm text-gray-600">Avec fiche Google</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher par entreprise, nom ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Theme Filter */}
            <div>
              <select
                value={themeFilter}
                onChange={(e) => setThemeFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              >
                <option value="all">Tous les thèmes</option>
                <option value="clair">Thème clair</option>
                <option value="sombre">Thème sombre</option>
              </select>
            </div>

            {/* Reviews Filter */}
            <div>
              <select
                value={reviewsFilter}
                onChange={(e) => setReviewsFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              >
                <option value="all">Tous les avis</option>
                <option value="oui">Avec fiche Google</option>
                <option value="non">Sans fiche Google</option>
                <option value="aide">Demande d'aide</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="processing">En traitement</option>
                <option value="completed">Terminé</option>
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Filter className="mr-2" size={16} />
              {filteredForms.length} résultat{filteredForms.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Forms Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Liste des formulaires</h2>
            <p className="text-sm text-gray-600 mt-1">Gérez et modifiez les formulaires d'onboarding des clients</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('business_name')}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <span>Entreprise</span>
                      <SortIcon field="business_name" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('owner_name')}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <span>Propriétaire</span>
                      <SortIcon field="owner_name" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('theme_preference')}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <span>Thème</span>
                      <SortIcon field="theme_preference" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">Avis Google</th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('created_at')}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <span>Date</span>
                      <SortIcon field="created_at" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Statut</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredForms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {editingForm === form.id ? (
                        <input
                          type="text"
                          value={editFormData.business_name || ''}
                          onChange={(e) => setEditFormData({...editFormData, business_name: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {form.business_name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{form.business_name}</div>
                            <div className="text-sm text-gray-500">
                              {form.profiles?.email || 'Email non disponible'}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingForm === form.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editFormData.owner_name || ''}
                            onChange={(e) => setEditFormData({...editFormData, owner_name: e.target.value})}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="email"
                            value={editFormData.professional_email || ''}
                            onChange={(e) => setEditFormData({...editFormData, professional_email: e.target.value})}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Email professionnel"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-900">{form.owner_name}</div>
                          {form.professional_email && (
                            <div className="text-sm text-gray-500">{form.professional_email}</div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingForm === form.id ? (
                        <select
                          value={editFormData.theme_preference || ''}
                          onChange={(e) => setEditFormData({...editFormData, theme_preference: e.target.value as any})}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="clair">Clair</option>
                          <option value="sombre">Sombre</option>
                          <option value="les_deux">Les deux</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          form.theme_preference === 'clair' ? 'bg-yellow-100 text-yellow-800' : 
                          form.theme_preference === 'sombre' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {form.theme_preference === 'clair' ? '☀️ Clair' : 
                           form.theme_preference === 'sombre' ? '🌙 Sombre' : '🌓 Les deux'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingForm === form.id ? (
                        <select
                          value={editFormData.google_reviews || ''}
                          onChange={(e) => setEditFormData({...editFormData, google_reviews: e.target.value as any})}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                          <option value="aide">Aide</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          form.google_reviews === 'oui' ? 'bg-green-100 text-green-800' :
                          form.google_reviews === 'aide' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {form.google_reviews === 'oui' ? '✅ Oui' :
                           form.google_reviews === 'aide' ? '🆘 Aide' : '❌ Non'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{formatDate(form.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <CheckCircle size={12} className="mr-1" />
                        Reçu
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingForm === form.id ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleSaveForm(form.id)}
                            disabled={updating}
                            className="inline-flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            <Save size={16} />
                            <span>{updating ? 'Sauvegarde...' : 'Sauvegarder'}</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors"
                          >
                            <X size={16} />
                            <span>Annuler</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => handleEditForm(form)}
                            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                          >
                            <Edit size={16} />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => handleFormClick(form)}
                            className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                          >
                            <Eye size={16} />
                            <span>Voir</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredForms.length === 0 && (
            <div className="text-center py-12">
              <FileText className="text-gray-400 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun formulaire trouvé</h3>
              <p className="text-gray-600">
                {searchQuery || themeFilter !== 'all' || reviewsFilter !== 'all'
                  ? 'Aucun formulaire ne correspond aux critères de recherche.'
                  : 'Aucun formulaire d\'onboarding n\'a encore été soumis.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Form Detail Modal */}
        {showFormModal && selectedForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowFormModal(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Formulaire d'Onboarding</h2>
                  <button
                    onClick={() => setShowFormModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Informations de base */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de base</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Entreprise</label>
                          <p className="text-gray-900 font-medium">{selectedForm.business_name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Propriétaire</label>
                          <p className="text-gray-900">{selectedForm.owner_name}</p>
                        </div>
                        {selectedForm.professional_email && (
                          <div>
                            <label className="text-sm font-medium text-gray-700">Email professionnel</label>
                            <p className="text-gray-900">{selectedForm.professional_email}</p>
                          </div>
                        )}
                        {selectedForm.professional_phone && (
                          <div>
                            <label className="text-sm font-medium text-gray-700">Téléphone professionnel</label>
                            <p className="text-gray-900">{selectedForm.professional_phone}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Thème</label>
                          <p className="text-gray-900">
                            {selectedForm.theme_preference === 'clair' ? '☀️ Clair' : '🌙 Sombre'}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Fiche Google</label>
                          <p className="text-gray-900">
                            {selectedForm.google_reviews === 'oui' ? '✅ Oui' :
                             selectedForm.google_reviews === 'aide' ? '🆘 Demande d\'aide' : '❌ Non'}
                          </p>
                        </div>
                        {selectedForm.service_areas && (
                          <div>
                            <label className="text-sm font-medium text-gray-700">Zones géographiques</label>
                            <p className="text-gray-900">{selectedForm.service_areas}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contenu détaillé */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Description de l'activité</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.business_description}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalités souhaitées</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.desired_features}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages clés</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.key_messages}</p>
                      </div>
                    </div>

                    {selectedForm.why_choose_you && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pourquoi vous choisir</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.why_choose_you}</p>
                        </div>
                      </div>
                    )}

                    {selectedForm.what_makes_unique && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ce qui rend unique</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.what_makes_unique}</p>
                        </div>
                      </div>
                    )}

                    {selectedForm.complementary_offers && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Offres complémentaires</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.complementary_offers}</p>
                        </div>
                      </div>
                    )}

                    {selectedForm.special_offers && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Offres spéciales</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.special_offers}</p>
                        </div>
                      </div>
                    )}

                    {selectedForm.trust_badges && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges de confiance</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.trust_badges}</p>
                        </div>
                      </div>
                    )}

                    {selectedForm.faq_content && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQ</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{selectedForm.faq_content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Formulaire soumis le {formatDate(selectedForm.created_at)}</span>
                    <div className="flex items-center space-x-4">
                      <span>ID: {selectedForm.id.slice(0, 8)}...</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
                        Formulaire complet
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminForms;