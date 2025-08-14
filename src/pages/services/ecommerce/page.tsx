import React from 'react';
import { ShoppingCart, CreditCard, Package, Users, BarChart3, Shield } from 'lucide-react';

const ECommercePage: React.FC = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Boutique Complète',
      description: 'Catalogue produits, panier, commandes et gestion des stocks intégrée'
    },
    {
      icon: CreditCard,
      title: 'Paiements Sécurisés',
      description: 'Intégration Stripe, PayPal et autres solutions de paiement populaires'
    },
    {
      icon: Package,
      title: 'Gestion des Stocks',
      description: 'Suivi automatique des stocks avec alertes et réapprovisionnement'
    },
    {
      icon: Users,
      title: 'Espace Client',
      description: 'Comptes clients avec historique des commandes et suivi des livraisons'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avancés',
      description: 'Tableaux de bord détaillés pour suivre vos ventes et performances'
    },
    {
      icon: Shield,
      title: 'Sécurité Renforcée',
      description: 'Protection contre la fraude et conformité aux standards de sécurité'
    }
  ];

  const packages = [
    {
      name: 'Starter',
      price: '1450€',
      features: [
        'Jusqu\'à 50 produits',
        'Paiements Stripe/PayPal',
        'Gestion des stocks',
        'Espace client',
        'Design responsive',
        'SEO optimisé'
      ]
    },
    {
      name: 'Business',
      price: '2450€',
      features: [
        'Produits illimités',
        'Multi-devises',
        'Codes promo avancés',
        'Analytics détaillés',
        'Intégrations API',
        'Support prioritaire'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Sur devis',
      features: [
        'Solution sur mesure',
        'Intégrations ERP/CRM',
        'Multi-boutiques',
        'API personnalisée',
        'Formation équipe',
        'Support dédié'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <ShoppingCart className="w-16 h-16 text-purple-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Service E-Commerce
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
            Solutions e-commerce complètes pour développer vos ventes en ligne avec des boutiques performantes et sécurisées
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités E-Commerce
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tout ce dont vous avez besoin pour créer une boutique en ligne professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
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

      {/* Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Forfaits E-Commerce
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez la solution adaptée à la taille de votre business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg p-8 ${index === 1 ? 'ring-2 ring-purple-500 scale-105' : ''}`}>
                {index === 1 && (
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 text-center">
                    Plus populaire
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
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
                    index === 1 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'border border-purple-600 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {pkg.price === 'Sur devis' ? 'Nous contacter' : 'Choisir ce forfait'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Lancez Votre Boutique en Ligne
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Discutons de votre projet e-commerce et créons ensemble une boutique qui génère des ventes
          </p>
          <a
            href="/contact"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Démarrer Ma Boutique</span>
            <ShoppingCart size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ECommercePage;