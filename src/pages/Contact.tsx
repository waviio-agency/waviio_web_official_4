import React, { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactForm();
  };

  const submitContactForm = async () => {
    setIsLoading(true);
    
    try {
      // Créer le sujet du message
      const subject = `Demande de devis - ${formData.service || 'Service non spécifié'}`;
      
      // Créer le contenu du message
      const content = `
Nom: ${formData.name}
Email: ${formData.email}
Entreprise: ${formData.company || 'Non spécifiée'}
Service souhaité: ${formData.service || 'Non spécifié'}
Budget estimé: ${formData.budget || 'Non spécifié'}

Message:
${formData.message}
      `.trim();

      const { error } = await supabase
        .from('messages')
        .insert({
          user_id: null, // Message anonyme depuis le site
          subject: subject,
          content: content,
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
          company: '',
          service: '',
          budget: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const services = [
    'Site One Page (450€)',
    'Site Vitrine (900€)',
    'Site E-Commerce (1450€)',
    'Maintenance et Hébergement (29,99€/mois)',
    'Projet sur mesure'
  ];

  const budgetRanges = [
    'Moins de 500€',
    '500€ - 1000€',
    '1000€ - 2000€',
    '2000€ - 5000€',
    'Plus de 5000€'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-Nous
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Prêt à transformer votre présence numérique ? Discutons de votre projet 
            et découvrons comment nous pouvons vous aider.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Parlons de Votre Projet
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nous sommes là pour vous accompagner dans votre transformation digitale. 
                Que vous ayez besoin d'un site vitrine, d'une boutique en ligne ou d'une 
                application web sur mesure, notre équipe est prête à concrétiser vos idées.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600">+33 7 56 78 90 12</p>
                    <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">hello@waviio.fr</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">Paris, France</p>
                    <p className="text-sm text-gray-500">Interventions à distance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horaires</h3>
                    <p className="text-gray-600">Lundi - Vendredi</p>
                    <p className="text-sm text-gray-500">9h00 - 18h00</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">72H</div>
                  <div className="text-sm text-gray-600">Délai moyen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">90+</div>
                  <div className="text-sm text-gray-600">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">7+</div>
                  <div className="text-sm text-gray-600">Années d'expérience</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="relative mb-6">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
                    <div className="absolute -inset-4 bg-green-100 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Envoyé avec Succès !</h3>
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
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Demande de Devis Gratuit
                  </h3>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service souhaité *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Sélectionnez un service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                          Budget estimé
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Sélectionnez votre budget</option>
                          {budgetRanges.map((range, index) => (
                            <option key={index} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Décrivez votre projet *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Parlez-nous de votre projet, vos objectifs, vos contraintes..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      <Send size={20} />
                      <span>{isLoading ? 'Envoi en cours...' : 'Envoyer ma Demande'}</span>
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe 
                      concernant votre projet.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-gray-600">
              Vous avez des questions ? Nous avons les réponses.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Combien de temps faut-il pour créer mon site ?",
                answer: "En moyenne 72h pour un site vitrine standard. Les projets plus complexes peuvent prendre 1 à 2 semaines selon les fonctionnalités demandées."
              },
              {
                question: "Proposez-vous un service après-vente ?",
                answer: "Oui, nous proposons un service de maintenance complet incluant les mises à jour, la sécurité, les sauvegardes et le support technique."
              },
              {
                question: "Mes contenus sont-ils inclus dans le prix ?",
                answer: "Nous pouvons vous aider à créer vos contenus ou optimiser ceux que vous fournissez. La rédaction de contenu peut être incluse selon le forfait choisi."
              },
              {
                question: "Mon site sera-t-il optimisé pour mobile ?",
                answer: "Absolument ! Tous nos sites sont conçus avec une approche mobile-first et sont parfaitement optimisés pour tous les appareils."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg border border-gray-200">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:text-blue-600">
                  {faq.question}
                  <span className="ml-6 flex-shrink-0 text-blue-600">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;