import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, Message } from '../../lib/supabase';
import { MessageSquare, Calendar, User, Mail, Eye, X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const AdminMessages: React.FC = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchMessages();
    }
  }, [profile]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles!messages_user_id_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    
    // Marquer comme lu si pas encore lu
    if (message.status === 'unread') {
      await updateMessageStatus(message.id, 'read');
    }
  };

  const updateMessageStatus = async (messageId: string, newStatus: 'unread' | 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: newStatus })
        .eq('id', messageId);

      if (error) throw error;

      // Mise à jour locale
      setMessages(messages.map(message => 
        message.id === messageId ? { ...message, status: newStatus } : message
      ));
      
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <AlertCircle className="text-red-600" size={16} />;
      case 'read':
        return <Eye className="text-blue-600" size={16} />;
      case 'replied':
        return <CheckCircle className="text-green-600" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread':
        return 'Non lu';
      case 'read':
        return 'Lu';
      case 'replied':
        return 'Répondu';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            <MessageSquare className="text-green-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Messagerie</h1>
          </div>
          <p className="text-gray-600">Gérez tous les messages reçus via le site web et le support</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => m.status === 'unread').length}
                </div>
                <div className="text-sm text-gray-600">Non lus</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => m.status === 'read').length}
                </div>
                <div className="text-sm text-gray-600">Lus</div>
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
                  {messages.filter(m => m.status === 'replied').length}
                </div>
                <div className="text-sm text-gray-600">Répondus</div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages List */}
        {messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <MessageSquare className="text-gray-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun message</h3>
            <p className="text-gray-600">Aucun message n'a été reçu pour le moment.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Messages reçus</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="text-green-600" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                          <p className="text-sm text-gray-600">De: {(message as any).profiles?.email || 'Email non disponible'}</p>
                        </div>
                      </div>
                      
                      <div className="ml-13">
                        <p className="text-sm text-gray-700 line-clamp-2">{message.content}</p>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)} mb-2`}>
                        {getStatusIcon(message.status)}
                        <span>{getStatusText(message.status)}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(message.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Detail Modal */}
        {showMessageModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Détails du message</h2>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Message Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Informations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Expéditeur</label>
                        <p className="text-gray-900">{(selectedMessage as any).profiles?.email || 'Email non disponible'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Sujet</label>
                        <p className="text-gray-900">{selectedMessage.subject}</p>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.content}</p>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Statut</label>
                      <select
                        value={selectedMessage.status}
                        onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="unread">Non lu</option>
                        <option value="read">Lu</option>
                        <option value="replied">Répondu</option>
                      </select>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Reçu le {formatDate(selectedMessage.created_at)}
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

export default AdminMessages;