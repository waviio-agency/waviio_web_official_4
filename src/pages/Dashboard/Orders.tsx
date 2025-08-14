import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, Order } from '../../lib/supabase';
import { ShoppingBag, Calendar, Euro, Package, Clock, CheckCircle, XCircle, AlertCircle, Eye, X, User, Mail, Phone } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const Orders: React.FC = () => {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);

  useEffect(() => {
    if (profile?.id) {
      fetchOrders();
    }
  }, [profile?.id]);

  const fetchOrders = async () => {
    if (!profile?.id) {
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />;
      case 'in-progress':
        return <AlertCircle className="text-blue-600" size={20} />;
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <Package className="text-gray-600" size={20} />;
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

  const getServiceName = (serviceType: string) => {
    switch (serviceType) {
      case 'one-page':
        return 'Site One Page';
      case 'vitrine':
        return 'Site Vitrine';
      case 'e-commerce':
        return 'Site E-Commerce';
      case 'maintenance':
        return 'Maintenance et Hébergement';
      default:
        return serviceType;
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const formatMaintenanceInfo = (order: Order) => {
    if (order.service_type !== 'maintenance') return null;
    
    const info = [];
    
    if (order.duration_months) {
      info.push(`Durée: ${order.duration_months} mois`);
    }
    
    if (order.end_date) {
      const endDate = new Date(order.end_date);
      const today = new Date();
      const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysLeft < 0) {
        info.push(`⚠️ Expiré depuis ${Math.abs(daysLeft)} jours`);
      } else if (daysLeft <= 7) {
        info.push(`⚠️ Expire dans ${daysLeft} jours`);
      } else {
        info.push(`✅ ${daysLeft} jours restants`);
      }
    }
    
    if (order.auto_renewal) {
      info.push('🔄 Renouvellement auto');
    }
    
    return info;
  };

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
            <ShoppingBag className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Mes Commandes</h1>
          </div>
          <p className="text-gray-600">Suivez l'état de vos commandes et projets</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <ShoppingBag className="text-gray-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore de commandes.</p>
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Faire une demande
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {order.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {getServiceName(order.service_type)}
                      </p>
                      {order.service_type === 'maintenance' && formatMaintenanceInfo(order) && (
                        <div className="space-y-1">
                          {formatMaintenanceInfo(order)?.map((info, idx) => (
                            <p key={idx} className="text-xs text-gray-500">{info}</p>
                          ))}
                        </div>
                      )}
                      {order.description && (
                        <p className="text-sm text-gray-600">{order.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                    {order.price && (
                      <div className="text-lg font-bold text-gray-900 mt-2">
                        {order.price}€
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Commandé le {formatDate(order.created_at)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {order.status === 'completed' && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Voir le projet
                      </button>
                    )}
                    <button 
                      onClick={() => handleOrderClick(order)}
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      <Eye size={16} />
                      <span>Voir les détails</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showOrderDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedOrder.title}</h2>
                    <p className="text-gray-600">{getServiceName(selectedOrder.service_type)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOrderDetailsModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Status and Price */}
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span>{getStatusText(selectedOrder.status)}</span>
                  </div>
                  {selectedOrder.price && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{selectedOrder.price}€</div>
                      <div className="text-sm text-gray-500">
                        {selectedOrder.service_type === 'maintenance' ? 'par mois' : 'total'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Informations générales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">ID de commande</label>
                      <p className="text-gray-900 font-mono text-sm">{selectedOrder.id.slice(0, 8)}...</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Type de service</label>
                      <p className="text-gray-900">{getServiceName(selectedOrder.service_type)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Date de commande</label>
                      <p className="text-gray-900">{formatDate(selectedOrder.created_at)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Dernière mise à jour</label>
                      <p className="text-gray-900">{formatDate(selectedOrder.updated_at)}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {selectedOrder.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedOrder.description}</p>
                    </div>
                  </div>
                )}

                {/* Maintenance specific info */}
                {selectedOrder.service_type === 'maintenance' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-3">Informations de maintenance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedOrder.duration_months && (
                        <div>
                          <label className="text-sm font-medium text-yellow-700">Durée</label>
                          <p className="text-yellow-900">{selectedOrder.duration_months} mois</p>
                        </div>
                      )}
                      {selectedOrder.start_date && (
                        <div>
                          <label className="text-sm font-medium text-yellow-700">Date de début</label>
                          <p className="text-yellow-900">{formatDate(selectedOrder.start_date)}</p>
                        </div>
                      )}
                      {selectedOrder.end_date && (
                        <div>
                          <label className="text-sm font-medium text-yellow-700">Date de fin</label>
                          <p className="text-yellow-900">{formatDate(selectedOrder.end_date)}</p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-yellow-700">Renouvellement automatique</label>
                        <p className="text-yellow-900">{selectedOrder.auto_renewal ? 'Activé' : 'Désactivé'}</p>
                      </div>
                    </div>
                    
                    {selectedOrder.end_date && (
                      <div className="mt-4 pt-4 border-t border-yellow-200">
                        {(() => {
                          const endDate = new Date(selectedOrder.end_date);
                          const today = new Date();
                          const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                          
                          if (daysLeft < 0) {
                            return (
                              <div className="flex items-center space-x-2 text-red-700">
                                <AlertCircle size={16} />
                                <span className="font-medium">Service expiré depuis {Math.abs(daysLeft)} jours</span>
                              </div>
                            );
                          } else if (daysLeft <= 7) {
                            return (
                              <div className="flex items-center space-x-2 text-orange-700">
                                <Clock size={16} />
                                <span className="font-medium">Expire dans {daysLeft} jours</span>
                              </div>
                            );
                          } else if (daysLeft <= 30) {
                            return (
                              <div className="flex items-center space-x-2 text-blue-700">
                                <Clock size={16} />
                                <span className="font-medium">{daysLeft} jours restants</span>
                              </div>
                            );
                          } else {
                            return (
                              <div className="flex items-center space-x-2 text-green-700">
                                <CheckCircle size={16} />
                                <span className="font-medium">{daysLeft} jours restants</span>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    )}
                  </div>
                )}

                {/* Timeline */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3">Chronologie</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <div className="text-sm font-medium text-blue-800">Commande créée</div>
                        <div className="text-sm text-blue-700">{formatDate(selectedOrder.created_at)}</div>
                      </div>
                    </div>
                    
                    {selectedOrder.updated_at !== selectedOrder.created_at && (
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          selectedOrder.status === 'completed' ? 'bg-green-600' : 
                          selectedOrder.status === 'in-progress' ? 'bg-blue-600' : 'bg-yellow-600'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium text-blue-800">
                            {selectedOrder.status === 'completed' ? 'Commande terminée' : 
                             selectedOrder.status === 'in-progress' ? 'Commande en cours' : 'Statut mis à jour'}
                          </div>
                          <div className="text-sm text-blue-700">{formatDate(selectedOrder.updated_at)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Besoin d'aide ?</h3>
                  <p className="text-green-700 text-sm mb-3">
                    Notre équipe est disponible pour répondre à vos questions sur cette commande.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="mailto:support@waviio.com"
                      className="flex items-center space-x-2 text-green-700 hover:text-green-800 text-sm font-medium transition-colors"
                    >
                      <Mail size={16} />
                      <span>support@waviio.com</span>
                    </a>
                    <a
                      href="tel:+33756789012"
                      className="flex items-center space-x-2 text-green-700 hover:text-green-800 text-sm font-medium transition-colors"
                    >
                      <Phone size={16} />
                      <span>+33 7 56 78 90 12</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Orders;