import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, Revision } from '../../lib/supabase';
import { Ticket, RefreshCw, User, Calendar, AlertCircle, CheckCircle, Clock, X, Eye } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

interface RevisionTicket extends Revision {
  profiles: {
    full_name: string | null;
    email: string;
  };
}

const AdminTickets: React.FC = () => {
  const { profile } = useAuth();
  const [tickets, setTickets] = useState<RevisionTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<RevisionTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchTickets();
    }
  }, [profile]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('revisions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = (ticket: RevisionTicket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const updateTicketStatus = async (ticketId: string, newStatus: 'pending' | 'in-progress' | 'completed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('revisions')
        .update({ status: newStatus })
        .eq('id', ticketId);

      if (error) throw error;

      // Mise à jour locale
      setTickets(tickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status: newStatus, updated_at: new Date().toISOString() } : ticket
      ));
      
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, status: newStatus, updated_at: new Date().toISOString() });
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-600" size={16} />;
      case 'in-progress':
        return <RefreshCw className="text-blue-600" size={16} />;
      case 'completed':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'cancelled':
        return <X className="text-red-600" size={16} />;
      default:
        return <AlertCircle className="text-gray-600" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'in-progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
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

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Élevée';
      case 'normal':
        return 'Normale';
      case 'low':
        return 'Faible';
      default:
        return priority;
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

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

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
            <Ticket className="text-red-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Tickets Clients - Révisions</h1>
          </div>
          <p className="text-gray-600">Gérez les demandes de révisions des clients</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {tickets.filter(t => t.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">En attente</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {tickets.filter(t => t.status === 'in-progress').length}
                </div>
                <div className="text-sm text-gray-600">En cours</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {tickets.filter(t => t.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Terminés</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {tickets.filter(t => t.priority === 'high').length}
                </div>
                <div className="text-sm text-gray-600">Priorité élevée</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par statut</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="in-progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par priorité</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Toutes les priorités</option>
                <option value="high">Élevée</option>
                <option value="normal">Normale</option>
                <option value="low">Faible</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md cursor-pointer transition-all"
              onClick={() => handleTicketClick(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <User className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Révision #{ticket.id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-gray-600">ID utilisateur: {ticket.user_id.slice(0, 8)}...</p>
                    </div>
                  </div>
                  
                  <div className="ml-13">
                    <h4 className="font-medium text-gray-900 mb-2">{ticket.title}</h4>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">{ticket.description}</p>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        <span>{getStatusText(ticket.status)}</span>
                      </div>
                      
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        Priorité {getPriorityText(ticket.priority)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-xs text-gray-500 mb-1">
                    Créé le {formatDate(ticket.created_at)}
                  </div>
                  {ticket.updated_at !== ticket.created_at && (
                    <div className="text-xs text-gray-500">
                      Mis à jour le {formatDate(ticket.updated_at)}
                    </div>
                  )}
                  <button className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Ticket className="text-gray-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun ticket trouvé</h3>
            <p className="text-gray-600">Aucune demande de révision ne correspond aux filtres sélectionnés.</p>
          </div>
        )}

        {/* Ticket Detail Modal */}
        {showTicketModal && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Détails de la révision</h2>
                  <button
                    onClick={() => setShowTicketModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Client Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Informations client</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Nom</label>
                        <p className="text-gray-900">
                          Révision #{selectedTicket.id.slice(0, 8)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">ID Utilisateur</label>
                        <p className="text-gray-900">{selectedTicket.user_id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Demande de révision</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Titre</label>
                        <p className="text-gray-900 font-medium">{selectedTicket.title}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <div className="bg-gray-50 rounded-lg p-4 mt-1">
                          <p className="text-gray-900 whitespace-pre-wrap">{selectedTicket.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Priorité</label>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)} mt-1`}>
                            {getPriorityText(selectedTicket.priority)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Management */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Gestion du statut</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Statut actuel</label>
                        <select
                          value={selectedTicket.status}
                          onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value as any)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="pending">En attente</option>
                          <option value="in-progress">En cours</option>
                          <option value="completed">Terminé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        <div>Créé le {formatDate(selectedTicket.created_at)}</div>
                        {selectedTicket.updated_at !== selectedTicket.created_at && (
                          <div>Mis à jour le {formatDate(selectedTicket.updated_at)}</div>
                        )}
                      </div>
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

export default AdminTickets;