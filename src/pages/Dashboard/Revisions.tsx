import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, Revision } from '../../lib/supabase';
import { RefreshCw, Plus, MessageSquare, Clock, CheckCircle, AlertCircle, Eye, X, Calendar, User } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const Revisions: React.FC = () => {
  const { profile } = useAuth();
  const [showNewRevisionForm, setShowNewRevisionForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState<Revision | null>(null);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newRevision, setNewRevision] = useState({
    title: '',
    description: '',
    priority: 'normal' as 'low' | 'normal' | 'high'
  });

  useEffect(() => {
    if (profile?.id) {
      fetchRevisions();
    }
  }, [profile?.id]);

  const fetchRevisions = async () => {
    if (!profile?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('revisions')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRevisions(data || []);
    } catch (error) {
      console.error('Error fetching revisions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'in-progress':
        return <RefreshCw className="text-blue-600" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />;
      default:
        return <AlertCircle className="text-gray-600" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitRevision = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile?.id) return;
    
    setSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('revisions')
        .insert({
          user_id: profile.id,
          title: newRevision.title,
          description: newRevision.description,
          priority: newRevision.priority,
          status: 'pending'
        });

      if (error) throw error;

      // Reset form and refresh list
      setNewRevision({ title: '', description: '', priority: 'normal' });
      setShowNewRevisionForm(false);
      await fetchRevisions();
    } catch (error) {
      console.error('Error creating revision:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewDetails = (revision: Revision) => {
    setSelectedRevision(revision);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <RefreshCw className="text-purple-600" size={24} />
                <h1 className="text-2xl font-bold text-gray-900">Révisions</h1>
              </div>
              <p className="text-gray-600">Demandez des modifications pour votre site web</p>
            </div>
            <button
              onClick={() => setShowNewRevisionForm(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors mt-4 sm:mt-0"
            >
              <Plus size={18} />
              <span>Nouvelle révision</span>
            </button>
          </div>
        </div>

        {/* New Revision Form */}
        {showNewRevisionForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouvelle demande de révision</h3>
            
            <form onSubmit={handleSubmitRevision} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la révision
                </label>
                <input
                  type="text"
                  id="title"
                  value={newRevision.title}
                  onChange={(e) => setNewRevision({ ...newRevision, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Ex: Modifier le texte de la page d'accueil"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description détaillée
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={newRevision.description}
                  onChange={(e) => setNewRevision({ ...newRevision, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Décrivez précisément les modifications souhaitées..."
                  required
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priorité
                </label>
                <select
                  id="priority"
                  value={newRevision.priority}
                  onChange={(e) => setNewRevision({ ...newRevision, priority: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="low">Faible</option>
                  <option value="normal">Normale</option>
                  <option value="high">Élevée</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewRevisionForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Envoi...' : 'Soumettre la révision'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Revisions List */}
        <div className="space-y-4">
          {revisions.map((revision) => (
            <div key={revision.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-3 mb-3">
                    {getStatusIcon(revision.status)}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {revision.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{revision.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(revision.status)}`}>
                          {getStatusText(revision.status)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(revision.priority)}`}>
                          Priorité {revision.priority === 'high' ? 'élevée' : revision.priority === 'normal' ? 'normale' : 'faible'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right mt-4 lg:mt-0 lg:ml-6">
                  <div className="text-sm text-gray-500 mb-1">
                    Créé le {new Date(revision.created_at).toLocaleDateString('fr-FR')}
                  </div>
                  {revision.status === 'completed' && (
                    <div className="text-sm text-green-600">
                      Terminé le {new Date(revision.updated_at).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                  <button 
                    onClick={() => handleViewDetails(revision)}
                    className="mt-2 flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                  >
                    <Eye size={14} />
                    <span>Voir les détails</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {revisions.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <RefreshCw className="text-gray-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune révision</h3>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore demandé de révisions.</p>
            <button
              onClick={() => setShowNewRevisionForm(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Créer ma première révision
            </button>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <RefreshCw className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-medium text-blue-800 mb-2">À propos des révisions</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Vous disposez de 3 révisions gratuites par mois</li>
                <li>• Les révisions urgentes sont traitées en priorité</li>
                <li>• Délai moyen de traitement : 24-48h</li>
                <li>• Vous recevrez une notification par email à chaque étape</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Revision Details Modal */}
        {showDetailsModal && selectedRevision && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Détails de la révision</h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Status and Priority */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(selectedRevision.status)}`}>
                      {getStatusIcon(selectedRevision.status)}
                      <span>{getStatusText(selectedRevision.status)}</span>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedRevision.priority)}`}>
                      Priorité {selectedRevision.priority === 'high' ? 'élevée' : selectedRevision.priority === 'normal' ? 'normale' : 'faible'}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{selectedRevision.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description détaillée</label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{selectedRevision.description}</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-3 flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Chronologie</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm font-medium text-blue-800">Révision créée</div>
                          <div className="text-sm text-blue-700">
                            {new Date(selectedRevision.created_at).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {selectedRevision.updated_at !== selectedRevision.created_at && (
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            selectedRevision.status === 'completed' ? 'bg-green-600' : 
                            selectedRevision.status === 'in-progress' ? 'bg-blue-600' : 'bg-yellow-600'
                          }`}></div>
                          <div>
                            <div className="text-sm font-medium text-blue-800">
                              {selectedRevision.status === 'completed' ? 'Révision terminée' : 
                               selectedRevision.status === 'in-progress' ? 'Révision en cours' : 'Statut mis à jour'}
                            </div>
                            <div className="text-sm text-blue-700">
                              {new Date(selectedRevision.updated_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Info */}
                  <div className={`rounded-lg p-4 ${
                    selectedRevision.status === 'completed' ? 'bg-green-50 border border-green-200' :
                    selectedRevision.status === 'in-progress' ? 'bg-blue-50 border border-blue-200' :
                    selectedRevision.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
                    'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(selectedRevision.status)}
                      <div>
                        <h4 className={`font-medium mb-1 ${
                          selectedRevision.status === 'completed' ? 'text-green-800' :
                          selectedRevision.status === 'in-progress' ? 'text-blue-800' :
                          selectedRevision.status === 'pending' ? 'text-yellow-800' :
                          'text-gray-800'
                        }`}>
                          {selectedRevision.status === 'completed' ? 'Révision terminée' :
                           selectedRevision.status === 'in-progress' ? 'Révision en cours de traitement' :
                           selectedRevision.status === 'pending' ? 'Révision en attente de traitement' :
                           'Statut de la révision'}
                        </h4>
                        <p className={`text-sm ${
                          selectedRevision.status === 'completed' ? 'text-green-700' :
                          selectedRevision.status === 'in-progress' ? 'text-blue-700' :
                          selectedRevision.status === 'pending' ? 'text-yellow-700' :
                          'text-gray-700'
                        }`}>
                          {selectedRevision.status === 'completed' ? 'Votre demande de révision a été traitée et les modifications ont été appliquées à votre site.' :
                           selectedRevision.status === 'in-progress' ? 'Notre équipe travaille actuellement sur votre demande de révision.' :
                           selectedRevision.status === 'pending' ? 'Votre demande de révision a été reçue et sera traitée dans les plus brefs délais.' :
                           'Statut de votre demande de révision.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Revisions;