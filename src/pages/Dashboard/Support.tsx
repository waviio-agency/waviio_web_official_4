import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { HelpCircle, MessageSquare, Phone, Mail, Book, Video, Search } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const Support: React.FC = () => {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const supportOptions = [
    {
      title: 'Support téléphonique',
      description: 'Appelez-nous directement',
      icon: Phone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      available: true,
      action: '+33 7 56 78 90 12'
    },
    {
      title: 'Email support',
      description: 'Envoyez-nous un email',
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      available: true,
      action: 'support@waviio.com'
    }
  ];

  const faqCategories = [
    { id: 'all', name: 'Toutes' },
    { id: 'account', name: 'Compte' },
    { id: 'website', name: 'Site web' },
    { id: 'billing', name: 'Facturation' },
    { id: 'technical', name: 'Technique' }
  ];

  const faqs = [
    {
      category: 'account',
      question: 'Comment modifier mon mot de passe ?',
      answer: 'Rendez-vous dans la section "Mot de passe" de votre tableau de bord pour modifier votre mot de passe en toute sécurité.'
    },
    {
      category: 'website',
      question: 'Comment demander une modification de mon site ?',
      answer: 'Utilisez la section "Révisions" pour soumettre vos demandes de modifications. Vous disposez de 3 révisions gratuites par mois.'
    },
    {
      category: 'billing',
      question: 'Comment consulter mes factures ?',
      answer: 'Vos factures sont disponibles dans la section "Mes commandes" de votre tableau de bord.'
    },
    {
      category: 'technical',
      question: 'Mon site est-il sauvegardé automatiquement ?',
      answer: 'Oui, nous effectuons des sauvegardes automatiques quotidiennes de votre site web.'
    },
    {
      category: 'website',
      question: 'Comment optimiser le SEO de mon site ?',
      answer: 'Rendez-vous dans la section "Mon Site" puis "Paramètres SEO" pour optimiser le référencement de votre site.'
    },
    {
      category: 'account',
      question: 'Comment activer l\'authentification à deux facteurs ?',
      answer: 'Dans la section "Sécurité", vous pouvez activer l\'authentification à deux facteurs pour sécuriser votre compte.'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          user_id: profile?.id || null,
          subject: formData.subject,
          content: `
Nom: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
          `.trim(),
          status: 'unread'
        });

      if (error) throw error;

      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting support form:', error);
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <HelpCircle className="text-green-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          </div>
          <p className="text-gray-600">Obtenez de l'aide et trouvez des réponses à vos questions</p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {supportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={option.color} size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {option.action}
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Book className="text-blue-600" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Questions fréquentes</h2>
              </div>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Catégories :</p>
                <div className="flex flex-wrap gap-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                </div>
              </div>

              {/* FAQ List */}
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <details key={index} className="group border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                    <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-900 hover:bg-green-50 rounded-lg transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <HelpCircle className="text-green-600" size={14} />
                        </div>
                        <span className="text-sm leading-relaxed">{faq.question}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center group-open:bg-green-100 transition-colors">
                          <span className="text-gray-600 group-open:text-green-600 group-open:rotate-45 transition-all duration-200 text-sm font-bold">+</span>
                        </div>
                      </div>
                    </summary>
                    <div className="px-4 pb-4 ml-9">
                      <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
                        <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" size={24} />
                  </div>
                  <p className="text-gray-500 font-medium">Aucune question trouvée</p>
                  <p className="text-gray-400 text-sm mt-1">Essayez avec d'autres mots-clés</p>
                </div>
              )}
              
              {/* FAQ Footer */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 text-sm">Vous ne trouvez pas votre réponse ?</h4>
                      <p className="text-blue-700 text-xs mt-1">Utilisez le formulaire de contact ci-contre pour nous poser votre question directement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            {isSubmitted ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="absolute -inset-4 bg-green-100 rounded-full animate-ping opacity-20"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Envoyé !</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">
                    ✅ Votre demande a été transmise à notre équipe
                  </p>
                </div>
                <p className="text-gray-600 mb-4">
                  Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">
                    📧 Un email de confirmation a été envoyé à votre adresse
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contactez notre équipe</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Sujet de votre demande"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Décrivez votre demande ou problème..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    <HelpCircle size={20} />
                    <span>{isLoading ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Notre équipe vous répondra dans les plus brefs délais
                  </p>
                </form>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-medium text-green-800 mb-3">Informations de contact</h3>
              <p className="text-green-700 text-sm mb-4">
                Notre équipe support est disponible du lundi au vendredi de 9h à 18h.
              </p>
              <div className="space-y-2 text-sm text-green-700">
                <div>📞 +33 7 56 78 90 12</div>
                <div>📧 support@waviio.com</div>
                <div>⏰ Lun-Ven 9h-18h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;