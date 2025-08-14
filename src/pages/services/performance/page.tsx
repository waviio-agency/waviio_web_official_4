import React from 'react';
import { Zap, Clock, Gauge, Smartphone, Globe, TrendingUp } from 'lucide-react';

const PerformancePage: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Optimisation Vitesse',
      description: 'Amélioration des temps de chargement pour une meilleure expérience utilisateur'
    },
    {
      icon: Gauge,
      title: 'Core Web Vitals',
      description: 'Optimisation des métriques Google pour un meilleur référencement'
    },
    {
      icon: Smartphone,
      title: 'Performance Mobile',
      description: 'Optimisation spécifique pour les appareils mobiles'
    },
    {
      icon: Globe,
      title: 'CDN Global',
      description: 'Distribution de contenu mondiale pour des temps de réponse optimaux'
    },
    {
      icon: Clock,
      title: 'Lazy Loading',
      description: 'Chargement intelligent des ressources pour économiser la bande passante'
    },
    {
      icon: TrendingUp,
      title: 'Monitoring Continu',
      description: 'Surveillance 24/7 des performances de votre site'
    }
  ];

  const metrics = [
    { metric: 'Temps de chargement', before: '4.2s', after: '1.1s', improvement: '-74%' },
    { metric: 'Score PageSpeed', before: '45/100', after: '95/100', improvement: '+111%' },
    { metric: 'Taux de rebond', before: '68%', after: '32%', improvement: '-53%' },
    { metric: 'Conversions', before: '2.1%', after: '4.8%', improvement: '+129%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-16 h-16 text-yellow-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Service Performance
          </h1>
          <p className="text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto">
            Optimisation des performances pour des sites web ultra-rapides qui convertissent mieux
          </p>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Résultats Mesurables
            </h2>
            <p className="text-xl text-gray-600">
              Nos optimisations génèrent des améliorations concrètes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-4">{metric.metric}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avant :</span>
                    <span className="font-bold text-red-600">{metric.before}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Après :</span>
                    <span className="font-bold text-green-600">{metric.after}</span>
                  </div>
                  <div className="pt-2 border-t border-orange-200">
                    <div className="text-center">
                      <span className="text-lg font-bold text-orange-600">{metric.improvement}</span>
                      <div className="text-xs text-gray-500">d'amélioration</div>
                    </div>
                  </div>
                </div>
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
              Nos Optimisations Performance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Techniques avancées pour maximiser la vitesse et l'efficacité de votre site
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pourquoi la Performance Compte ?
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <TrendingUp size={14} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Meilleur Référencement</h3>
                    <p>Google favorise les sites rapides dans ses résultats de recherche</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <Users size={14} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expérience Utilisateur</h3>
                    <p>Des pages rapides réduisent le taux de rebond et augmentent l'engagement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                    <Target size={14} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Plus de Conversions</h3>
                    <p>Chaque seconde gagnée augmente significativement vos ventes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Performance web"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Accélérez Votre Site Dès Maintenant
          </h2>
          <p className="text-xl mb-8 text-yellow-100">
            Obtenez un audit de performance gratuit et découvrez comment optimiser votre site
          </p>
          <a
            href="/contact"
            className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Audit Performance Gratuit</span>
            <Zap size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default PerformancePage;