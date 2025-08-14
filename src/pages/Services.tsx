import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: 'Site One Page',
      price: '450€',
      period: '/projet',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Une web moderne sur une seule page, parfait pour présenter votre activité de manière claire et efficace.',
      features: [
        'Design de site web responsive professionnel',
        'Page unique optimisée',
        'Optimisation mobile',
        'Configuration SEO de base',
        'Formulaire de contact',
        '1 mois d\'hébergement gratuit',
        '1 nom de domaine'
      ]
    },
    {
      title: 'Site Vitrine',
      price: '900€',
      period: '/projet',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Site web complet jusqu\'à 10 pages avec blog intégré, optimisation SEO avancée et fonctionnalités étendues.',
      features: [
        'Design de site web responsive professionnel',
        'Jusqu\'à 10 pages',
        'Optimisation mobile avancée',
        'Configuration SEO avancée',
        'Intégration blog/CMS',
        'Intégration réseaux sociaux',
        '6 mois d\'hébergement gratuit',
        'Configuration Analytics',
        '6 mois de statistiques',
        'Intégration blog/CMS',
        'Configuration Analytics'
      ]
    },
    {
      title: 'Site E-Commerce',
      price: '1450€',
      period: '/projet',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Boutique en ligne complète avec paiements sécurisés, gestion des stocks, et toutes les fonctionnalités e-commerce.',
      features: [
        'Design de site web responsive professionnel',
        'Pages illimitées',
        'Optimisation mobile et tablette avancée',
        'Intégration fonctionnelle et CRM avancée',
        'Développement CMS personnalisé',
        'Intégration paiement en ligne',
        'Intégrations API tierces',
        'Analytics et reporting avancés',
        'Intégrations API tierces',
        'Analytics et reporting avancés',
        'Support complet',
        'Révisions illimitées'
      ]
    },
    {
      title: 'Maintenance et Hébergement',
      price: '29,99€',
      period: '/mois',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Service complet de maintenance et d\'hébergement pour garder votre site rapide et à jour en permanence.',
      features: [
        'Mises à jour de sécurité régulières',
        'Optimisation des performances',
        'Mises à jour de contenu jusqu\'à 2 par mois',
        'Sauvegardes automatiques',
        'Corrections de bugs et dépannage',
        'Support par email prioritaire',
        'Surveillance de performance 24h/24',
        'Hébergement sécurisé'
      ]
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Découverte',
      description: 'Nous analysons vos besoins et définissons ensemble les objectifs de votre projet web.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Création des maquettes et validation du design qui correspond à votre image de marque.'
    },
    {
      number: '03',
      title: 'Développement',
      description: 'Développement de votre site avec les dernières technologies et bonnes pratiques.'
    },
    {
      number: '04',
      title: 'Lancement',
      description: 'Déploiement sur nos serveurs et formation pour la gestion de votre nouveau site.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Solutions de design web complètes adaptées aux besoins de votre entreprise, des packages 
            adaptés aux startups aux transformations de marques entreprises.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                        <div className="flex items-baseline space-x-1">
                          {service.title === 'Site Vitrine' || service.title === 'Site E-Commerce' ? (
                            <span className="text-xs text-gray-500 font-normal">à partir de</span>
                          ) : null}
                          <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                          {service.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">{service.originalPrice}</div>
                          )}
                          {service.title === 'Maintenance et Hébergement' && (
                            <span className="text-sm text-gray-500 font-normal">/mois</span>
                          )}
                        </div>
                      </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-900 mb-3">Ce Qui Est Inclus :</p>
                    <div className="space-y-2">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start text-xs text-gray-600">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 4 && (
                        <div className="text-xs text-green-600 font-medium pl-5">
                          +{service.features.length - 4} fonctionnalités supplémentaires
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace('é', 'e')}`}
                      className="flex-1 text-gray-600 border border-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 text-center"
                    >
                      Voir Détails
                    </Link>
                    {service.title === 'Site One Page' ? (
                      <a
                        href="https://buy.stripe.com/bJedRadWL5vydIL6XU87K02"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Commander
                      </a>
                    ) : (
                      <Link
                        to="/contact"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        {service.title === 'Maintenance et Hébergement' ? 'Commander' : 'Obtenir un Devis'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Processus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche méthodique pour livrer des résultats exceptionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pas Sûr du Package Qui Vous Convient ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Planifiez une consultation gratuite et nous discuterons de la solution parfaite 
            pour votre entreprise.
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Consultation Gratuite</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;