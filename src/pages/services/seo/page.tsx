import React from 'react';
import { Search, TrendingUp, Target, BarChart3, Globe, Users } from 'lucide-react';

const SEOPage: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Audit SEO Complet',
      description: 'Analyse approfondie de votre site pour identifier les opportunités d\'amélioration'
    },
    {
      icon: Target,
      title: 'Recherche de Mots-Clés',
      description: 'Identification des mots-clés stratégiques pour votre secteur d\'activité'
    },
    {
      icon: TrendingUp,
      title: 'Optimisation On-Page',
      description: 'Optimisation du contenu, des balises et de la structure de vos pages'
    },
    {
      icon: BarChart3,
      title: 'Suivi des Performances',
      description: 'Monitoring continu de vos positions et du trafic organique'
    },
    {
      icon: Globe,
      title: 'SEO Technique',
      description: 'Optimisation de la vitesse, du crawl et de l\'indexation'
    },
    {
      icon: Users,
      title: 'SEO Local',
      description: 'Optimisation pour les recherches locales et Google My Business'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Audit Initial',
      description: 'Analyse complète de votre site et de la concurrence'
    },
    {
      step: '02',
      title: 'Stratégie',
      description: 'Définition de la stratégie SEO adaptée à vos objectifs'
    },
    {
      step: '03',
      title: 'Optimisation',
      description: 'Mise en œuvre des optimisations techniques et de contenu'
    },
    {
      step: '04',
      title: 'Suivi',
      description: 'Monitoring des résultats et ajustements continus'
    }
  ];

  const stats = [
    { value: '+150%', label: 'Augmentation trafic moyen' },
    { value: '+85%', label: 'Amélioration positions' },
    { value: '90%', label: 'Clients satisfaits' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Search className="w-16 h-16 text-green-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Service SEO
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Optimisation pour moteurs de recherche pour améliorer votre visibilité et attirer plus de clients qualifiés
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
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
              Notre Approche SEO
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une stratégie SEO complète pour dominer les résultats de recherche
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
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

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Processus SEO
            </h2>
            <p className="text-xl text-gray-600">
              Une méthodologie éprouvée pour des résultats durables
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Boostez Votre Visibilité en Ligne
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Contactez-nous pour un audit SEO gratuit et découvrez comment améliorer votre référencement
          </p>
          <a
            href="/contact"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Audit SEO Gratuit</span>
            <Search size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default SEOPage;