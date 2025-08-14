import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Zap, Shield, Clock } from 'lucide-react';

const Products: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: 'site-one-page',
      title: 'Site One Page',
      subtitle: 'Parfait pour débuter',
      price: '450€',
      originalPrice: '700€',
      discount: '-36%',
      deliveryTime: '72H',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Design professionnel responsive',
        'Page unique optimisée',
        'Optimisation mobile parfaite',
        'SEO de base inclus',
        'Formulaire de contact',
        '1 mois d\'hébergement gratuit',
        'Nom de domaine inclus',
        'Certificat SSL',
        'Support 30 jours'
      ],
      popular: false
    },
    {
      id: 'site-vitrine',
      title: 'Site Vitrine',
      subtitle: 'Le plus populaire',
      price: '900€',
      deliveryTime: '1 semaine',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Design professionnel responsive',
        'Jusqu\'à 10 pages',
        'Blog intégré avec CMS',
        'SEO avancé',
        'Intégration réseaux sociaux',
        '6 mois d\'hébergement gratuit',
        'Google Analytics',
        'Formulaires avancés',
        'Support 60 jours'
      ],
      popular: true
    },
    {
      id: 'site-ecommerce',
      title: 'Site E-Commerce',
      subtitle: 'Solution complète',
      price: '1450€',
      deliveryTime: '2 semaines',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Boutique en ligne complète',
        'Paiements sécurisés',
        'Gestion des stocks',
        'Espace client',
        'Système de commandes',
        'Analytics avancés',
        'CRM intégré',
        'API tierces',
        'Support 90 jours'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Produits Web
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Choisissez la solution parfaite pour votre entreprise. 
            Des sites web modernes, rapides et optimisés pour convertir.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Livraison rapide</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Sécurisé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Qualité premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choisissez Votre Solution
            </h2>
            <p className="text-xl text-gray-600">
              Tous nos sites sont livrés clé en main avec hébergement et support inclus
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  product.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {product.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ Plus populaire
                    </div>
                  </div>
                )}

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.discount}
                    </div>
                  </div>
                )}

                {/* Product Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{product.subtitle}</p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-blue-600">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">
                        Livré en {product.deliveryTime}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Inclus :</h4>
                    <div className="space-y-2">
                      {product.features.slice(0, 5).map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 5 && (
                        <div className="text-sm text-blue-600 font-medium">
                          +{product.features.length - 5} fonctionnalités supplémentaires
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {product.id === 'site-one-page' ? (
                      <a
                        href="https://buy.stripe.com/bJedRadWL5vydIL6XU87K02"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center inline-flex items-center justify-center space-x-2 ${
                          product.popular
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        <span>Commander maintenant</span>
                        <ArrowRight size={18} />
                      </a>
                    ) : (
                      <Link
                        to="/contact"
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center inline-flex items-center justify-center space-x-2 ${
                          product.popular
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        <span>Obtenir un devis</span>
                        <ArrowRight size={18} />
                      </Link>
                    )}
                    
                    <Link
                      to={`/services/${product.id}`}
                      className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
                    >
                      Voir les détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pas sûr de votre choix ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Discutons de votre projet ! Nous vous conseillerons la meilleure solution 
            pour vos besoins et votre budget.
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Consultation gratuite</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Products;