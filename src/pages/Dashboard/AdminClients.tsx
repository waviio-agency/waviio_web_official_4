import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, Profile, Order } from '../../lib/supabase';
import { Users, User, Mail, Calendar, Plus, Edit, Eye, Package, X, Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const AdminClients: React.FC = () => {
  const { profile } = useAuth();
  const [clients, setClients] = useState<Profile[]>([]);
  const [filteredClients, setFilteredClients] = useState<Profile[]>([]);
  const [selectedClient, setSelectedClient] = useState<Profile | null>(null);
  const [clientOrders, setClientOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Profile | null>(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'created_at' | 'role'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [newOrder, setNewOrder] = useState({
    title: '',
    service_type: 'one-page' as 'one-page' | 'vitrine' | 'e-commerce' | 'maintenance',
    price: '',
    description: '',
    duration_months: 1,
    auto_renewal: false
  });

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchClients();
    }
  }, [profile]);

  useEffect(() => {
    filterAndSortClients();
  }, [clients, searchQuery, roleFilter, sortBy, sortOrder]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_all_profiles_admin');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortClients = () => {
    let filtered = [...clients];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(client => 
        client.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(client => client.role === roleFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      switch (sortBy) {
        case 'name':
          aValue = a.full_name || a.email;
          bValue = b.full_name || b.email;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        case 'role':
          aValue = a.role;
          bValue = b.role;
          break;
        default:
          aValue = a.created_at;
          bValue = b.created_at;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredClients(filtered);
  };

  const fetchClientOrders = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', clientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClientOrders(data || []);
    } catch (error) {
      console.error('Error fetching client orders:', error);
    }
  };

  const handleClientClick = async (client: Profile) => {
    setSelectedClient(client);
    setShowClientModal(true);
    await fetchClientOrders(client.id);
  };

  const handleRoleChange = async (clientId: string, newRole: 'client' | 'admin' | 'visiteur') => {
    try {
      const { error } = await supabase
        .rpc('update_profile_role_admin', {
          target_user_id: clientId,
          new_role: newRole
        });

      if (error) throw error;
      
      // Refresh clients list
      fetchClients();
      
      // Update selected client if it's the one being edited
      if (selectedClient?.id === clientId) {
        setSelectedClient({ ...selectedClient, role: newRole });
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedClient) return;

    // Calculate end date for maintenance services
    let endDate = null;
    if (newOrder.service_type === 'maintenance' && newOrder.duration_months) {
      const startDate = new Date();
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + newOrder.duration_months);
    }
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          user_id: selectedClient.id,
          title: newOrder.title,
          service_type: newOrder.service_type,
          price: newOrder.price ? parseFloat(newOrder.price) : null,
          description: newOrder.description || null,
          status: 'pending',
          duration_months: newOrder.service_type === 'maintenance' ? newOrder.duration_months : null,
          start_date: newOrder.service_type === 'maintenance' ? new Date().toISOString().split('T')[0] : null,
          end_date: endDate ? endDate.toISOString().split('T')[0] : null,
          auto_renewal: newOrder.service_type === 'maintenance' ? newOrder.auto_renewal : false
        });

      if (error) throw error;

      // Reset form
      setNewOrder({
        title: '',
        service_type: 'one-page',
        price: '',
        description: '',
        duration_months: 1,
        auto_renewal: false
      });

      // Refresh orders
      await fetchClientOrders(selectedClient.id);
      setShowOrderModal(false);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const extendMaintenanceOrder = async (orderId: string, additionalMonths: number) => {
    try {
      // Get current order
      const { data: currentOrder, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (fetchError) throw fetchError;

      // Calculate new end date
      const currentEndDate = new Date(currentOrder.end_date);
      const newEndDate = new Date(currentEndDate);
      newEndDate.setMonth(newEndDate.getMonth() + additionalMonths);

      // Update order
      const { error } = await supabase
        .from('orders')
        .update({
          duration_months: (currentOrder.duration_months || 0) + additionalMonths,
          end_date: newEndDate.toISOString().split('T')[0],
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      // Refresh orders
      if (selectedClient) {
        await fetchClientOrders(selectedClient.id);
      }
    } catch (error) {
      console.error('Error extending maintenance order:', error);
      alert('Erreur lors de la prolongation de la commande');
    }
  };

  const handleSort = (field: 'name' | 'email' | 'created_at' | 'role') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  const formatMaintenanceStatus = (order: Order) => {
    if (order.service_type !== 'maintenance' || !order.end_date) return null;
    
    const endDate = new Date(order.end_date);
    const today = new Date();
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
      return { status: 'expired', text: 'Expiré', color: 'bg-red-100 text-red-800' };
    } else if (daysLeft <= 7) {
      return { status: 'expiring', text: `${daysLeft}j restants`, color: 'bg-yellow-100 text-yellow-800' };
    } else if (daysLeft <= 30) {
      return { status: 'warning', text: `${daysLeft}j restants`, color: 'bg-blue-100 text-blue-800' };
    } else {
      return { status: 'active', text: `${daysLeft}j restants`, color: 'bg-green-100 text-green-800' };
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'client':
        return 'bg-blue-100 text-blue-800';
      case 'visiteur':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
            <Users className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
          </div>
          <p className="text-gray-600">Gérez vos clients et leurs commandes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
                <div className="text-sm text-gray-600">Total clients</div>
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
                  {clients.filter(c => c.role === 'client').length}
                </div>
                <div className="text-sm text-gray-600">Clients actifs</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <User className="text-red-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {clients.filter(c => c.role === 'admin').length}
                </div>
                <div className="text-sm text-gray-600">Administrateurs</div>
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
                  {clients.filter(c => c.role === 'visiteur').length}
                </div>
                <div className="text-sm text-gray-600">Visiteurs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="lg:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="all">Tous les rôles</option>
                <option value="client">Clients</option>
                <option value="admin">Administrateurs</option>
                <option value="visiteur">Visiteurs</option>
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-center text-sm text-gray-600 lg:w-32">
              <Filter className="mr-2" size={16} />
              {filteredClients.length} résultat{filteredClients.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span>Client</span>
                      <SortIcon field="name" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('email')}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span>Email</span>
                      <SortIcon field="email" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('role')}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span>Rôle</span>
                      <SortIcon field="role" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('created_at')}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span>Inscription</span>
                      <SortIcon field="created_at" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {client.full_name?.charAt(0) || client.email.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {client.full_name || 'Nom non défini'}
                          </div>
                          <div className="text-sm text-gray-500">ID: {client.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="text-gray-400" size={16} />
                        <span className="text-gray-900">{client.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(client.role)}`}>
                        {client.role === 'admin' ? 'Administrateur' : client.role === 'client' ? 'Client' : 'Visiteur'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{formatDate(client.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleClientClick(client)}
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        <Eye size={16} />
                        <span>Voir</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="text-gray-400 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun client trouvé</h3>
              <p className="text-gray-600">
                {searchQuery || roleFilter !== 'all' 
                  ? 'Aucun client ne correspond aux critères de recherche.'
                  : 'Aucun client n\'est encore inscrit.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Client Modal */}
        {showClientModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Fiche Client</h2>
                  <button
                    onClick={() => setShowClientModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Client Info */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {selectedClient.full_name?.charAt(0) || selectedClient.email.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedClient.full_name || 'Nom non défini'}
                      </h3>
                      <p className="text-gray-600">{selectedClient.email}</p>
                      <p className="text-sm text-gray-500">
                        Membre depuis {formatDate(selectedClient.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Role Management */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rôle
                    </label>
                    <select
                      value={selectedClient.role}
                      onChange={(e) => handleRoleChange(selectedClient.id, e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="visiteur">Visiteur</option>
                      <option value="client">Client</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                </div>

                {/* Orders Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Commandes</h4>
                    <button
                      onClick={() => setShowOrderModal(true)}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Ajouter une commande</span>
                    </button>
                  </div>

                  {clientOrders.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Aucune commande</p>
                  ) : (
                    <div className="space-y-3">
                      {clientOrders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">{order.title}</h5>
                              <div className="flex items-center space-x-2">
                                <p className="text-sm text-gray-600">{order.service_type}</p>
                                {order.service_type === 'maintenance' && order.duration_months && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {order.duration_months} mois
                                  </span>
                                )}
                              </div>
                              {order.service_type === 'maintenance' && formatMaintenanceStatus(order) && (
                                <div className="mt-2">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${formatMaintenanceStatus(order)?.color}`}>
                                    {formatMaintenanceStatus(order)?.text}
                                  </span>
                                  {formatMaintenanceStatus(order)?.status === 'expired' && (
                                    <button
                                      onClick={() => extendMaintenanceOrder(order.id, 1)}
                                      className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                                    >
                                      Prolonger 1 mois
                                    </button>
                                  )}
                                  {(formatMaintenanceStatus(order)?.status === 'expiring' || formatMaintenanceStatus(order)?.status === 'warning') && (
                                    <button
                                      onClick={() => extendMaintenanceOrder(order.id, 3)}
                                      className="ml-2 text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition-colors"
                                    >
                                      Prolonger 3 mois
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">
                                {order.price ? `${order.price}€` : 'Prix non défini'}
                              </div>
                              <div className="text-sm text-gray-600">{order.status}</div>
                              {order.service_type === 'maintenance' && order.end_date && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Expire le {new Date(order.end_date).toLocaleDateString('fr-FR')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Modal */}
        {showOrderModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Nouvelle Commande</h2>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre de la commande
                    </label>
                    <input
                      type="text"
                      value={newOrder.title}
                      onChange={(e) => setNewOrder({ ...newOrder, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Site vitrine pour restaurant"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de service
                    </label>
                    <select
                      value={newOrder.service_type}
                      onChange={(e) => setNewOrder({ ...newOrder, service_type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="one-page">Site One Page</option>
                      <option value="vitrine">Site Vitrine</option>
                      <option value="e-commerce">Site E-Commerce</option>
                      <option value="maintenance">Maintenance et Hébergement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (€)
                    </label>
                    <input
                      type="number"
                      value={newOrder.price}
                      onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="450"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newOrder.description}
                      onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Détails de la commande..."
                    />
                  </div>

                  {/* Champs spécifiques pour Maintenance */}
                  {newOrder.service_type === 'maintenance' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Durée (mois)
                        </label>
                        <select
                          value={newOrder.duration_months}
                          onChange={(e) => setNewOrder({ ...newOrder, duration_months: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={1}>1 mois</option>
                          <option value={3}>3 mois</option>
                          <option value={6}>6 mois</option>
                          <option value={12}>12 mois</option>
                          <option value={24}>24 mois</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="auto_renewal"
                          checked={newOrder.auto_renewal}
                          onChange={(e) => setNewOrder({ ...newOrder, auto_renewal: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="auto_renewal" className="ml-2 block text-sm text-gray-700">
                          Renouvellement automatique
                        </label>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Prix calculé :</strong> {newOrder.duration_months * 29.99}€ 
                          ({newOrder.duration_months} mois × 29,99€)
                        </p>
                        {newOrder.duration_months >= 12 && (
                          <p className="text-blue-700 text-xs mt-1">
                            🎉 Réduction de 10% appliquée pour 12+ mois
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateOrder}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Créer la commande
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

export default AdminClients;