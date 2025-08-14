import React from 'react';
import { Wrench, Shield, Clock, BarChart3, HeadphonesIcon, Globe } from 'lucide-react';

const MaintenancePage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Sécurité Renforcée',
      description: 'Mises à jour de sécurité régulières et protection contre les menaces'
    },
    {
      icon: Clock,
      title: 'Surveillance 24/7',
      description: 'Monitoring continu de votre site pour détecter les problèmes rapidement'
    },
    {
      icon: BarChart3,
      title: 'Optimisation Continue',
      description: 'Amélioration des performances et de la vitesse de chargement'
    },
    {
      icon: HeadphonesIcon,
      title: 'Support Prioritaire',
      description: 'Assistance technique rapide par email et téléphone'
    },
    {
      icon: Globe,
      title: 'Hébergement Premium',
      description: 'Serveurs haute performance avec garantie de disponibilité 99.9%'
    },
    {
      icon: Wrench,
      title: 'Mises à Jour',
      description: 'Mises à jour régulières du contenu et des fonctionnalités'
    }
  ];

  const plans = [
    {
      name: 'Essentiel',
      price: '19,99€',
      period: '/mois',
      features: [
        'Hébergement sécurisé',
        'Sauvegardes quotidiennes',
        'Mises à jour de sécurité',
        'Support par email',
        'Monitoring de base',
        '1 mise à jour contenu/mois'
      ],
      popular: false
    },
    {
      name: 'Professionnel',
      price: '29,99€',
      period: '/mois',
      features: [
        'Tout du plan Essentiel',
        'Support prioritaire',
        'Optimisation performances',
        '2 mises à jour contenu/mois',
        'Analytics avancés',
        'Certificat SSL premium'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '49,99€',
      period: '/mois',
      features: [
        'Tout du plan Professionnel',
        'Support téléphonique',
        'Mises à jour illimitées',
        'CDN global',
        'Monitoring avancé',
        'Consultant dédié'
      ],
      popular: false
    }
  ];

  const services = [
    'Mises à jour de sécurité automatiques',
    'Sauvegardes quotidiennes avec restauration rapide',
    'Optimisation des performances et vitesse',
    'Monitoring 24/7 avec alertes instantanées',
    'Support technique par email et téléphone',
    'Mises à jour de contenu (selon forfait)',
    'Corrections de bugs et dépannage',
    'Hébergement sur serveurs haute performance',
    'Certificat SSL et sécurisation HTTPS',
    'Protection contre les attaques et malwares'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Wrench className="w-16 h-16 text-indigo-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Service Maintenance
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
            Maintenance complète et hébergement premium pour garder votre site sécurisé, rapide et à jour
          </p>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Services Inclus
            </h2>
            <p className="text-xl text-gray-600">
              Une maintenance complète pour la tranquillité d'esprit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Notre Maintenance ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche proactive pour maintenir votre site au top de ses performances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Forfaits Maintenance
            </h2>
            <p className="text-xl text-gray-600">
              Des solutions adaptées à tous les besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg p-8 ${plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 text-center">
                    Plus populaire
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-indigo-600 mb-1">{plan.price}</div>
                <div className="text-gray-500 mb-6">{plan.period}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors text-center block ${
                    plan.popular 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Choisir ce forfait
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sécurisez Votre Site Dès Maintenant
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Contactez-nous pour discuter de vos besoins en maintenance et obtenir un devis personnalisé
          </p>
          <a
            href="/contact"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Démarrer La Maintenance</span>
            <Wrench size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default MaintenancePage;