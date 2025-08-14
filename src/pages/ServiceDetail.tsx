import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, Clock, Users, Shield, Zap, ArrowRight, Star, Award, Target, Rocket } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = {
    'site-one-page': {
      title: 'Site One Page',
      price: '450€',
      originalPrice: '700€',
      period: '/projet',
      deliveryTime: '72H',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Site web moderne sur une seule page, parfait pour présenter votre activité de manière claire et efficace. Idéal pour les entrepreneurs, freelances et petites entreprises qui souhaitent une présence web professionnelle rapidement.',
      features: [
        'Design de site web responsive professionnel',
        'Page unique optimisée',
        'Optimisation mobile',
        'Configuration SEO de base',
        'Formulaire de contact',
        '1 mois d\'hébergement gratuit',
        '1 nom de domaine',
        'Certificat SSL inclus',
        'Intégration Google Analytics',
        'Support technique 30 jours'
      ],
      process: [
        'Briefing et analyse de vos besoins',
        'Création de la maquette personnalisée',
        'Développement et intégration',
        'Tests et optimisation',
        'Mise en ligne et formation'
      ],
      included: [
        'Design sur mesure',
        'Développement responsive',
        'Optimisation SEO',
        'Hébergement 1 mois',
        'Nom de domaine',
        'Formation'
      ]
    },
    'site-vitrine': {
      title: 'Site Vitrine',
      price: '900€',
      period: '/projet',
      deliveryTime: '1 semaine',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Site web complet jusqu\'à 10 pages avec blog intégré, optimisation SEO avancée et toutes les fonctionnalités pour développer votre business en ligne.',
      features: [
        'Design de site web responsive professionnel',
        'Jusqu\'à 10 pages',
        'Optimisation mobile avancée',
        'Configuration SEO avancée',
        'Intégration blog/CMS',
        'Intégration réseaux sociaux',
        '6 mois d\'hébergement gratuit',
        'Configuration Analytics',
        'Formulaires avancés',
        'Galerie photos',
        'Plan du site XML',
        'Support technique 60 jours'
      ],
      process: [
        'Audit et stratégie digitale',
        'Architecture et arborescence',
        'Design des pages principales',
        'Développement et CMS',
        'Optimisation SEO complète',
        'Formation et mise en ligne'
      ],
      included: [
        'Jusqu\'à 10 pages',
        'Blog intégré',
        'SEO avancé',
        'Hébergement 6 mois',
        'Réseaux sociaux',
        'Formation complète'
      ]
    },
    'site-e-commerce': {
      title: 'Site E-Commerce',
      price: '1450€',
      period: '/projet',
      deliveryTime: '2 semaines',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Boutique en ligne complète avec paiements sécurisés, gestion des stocks, et toutes les fonctionnalités e-commerce avancées pour développer vos ventes.',
      features: [
        'Design de site web responsive professionnel',
        'Pages illimitées',
        'Optimisation mobile et tablette avancée',
        'Intégration fonctionnelle et CRM avancée',
        'Développement CMS personnalisé',
        'Intégration paiement en ligne',
        'Intégrations API tierces',
        'Analytics et reporting avancés',
        'Gestion des stocks',
        'Système de commandes',
        'Espace client',
        'Support technique 90 jours'
      ],
      process: [
        'Analyse des besoins e-commerce',
        'Architecture et catalogue',
        'Design et expérience utilisateur',
        'Développement de la boutique',
        'Intégration paiements',
        'Tests et formation'
      ],
      included: [
        'Boutique complète',
        'Paiements sécurisés',
        'Gestion stocks',
        'Espace client',
        'Analytics',
        'Formation vendeur'
      ]
    },
    'maintenance-et-hebergement': {
      title: 'Maintenance et Hébergement',
      price: '29,99€',
      period: '/mois',
      deliveryTime: 'Immédiat',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Service complet de maintenance et d\'hébergement pour garder votre site sécurisé, rapide et à jour en permanence.',
      features: [
        'Mises à jour de sécurité régulières',
        'Optimisation des performances',
        'Mises à jour de contenu jusqu\'à 2 par mois',
        'Sauvegardes automatiques',
        'Corrections de bugs et dépannage',
        'Support par email prioritaire',
        'Surveillance de performance 24h/24',
        'Hébergement sécurisé',
        'Certificat SSL renouvelé',
        'Monitoring uptime',
        'Rapports mensuels',
        'Support technique illimité'
      ],
      process: [
        'Audit technique initial',
        'Migration sécurisée',
        'Configuration monitoring',
        'Mise en place sauvegardes',
        'Formation maintenance',
        'Suivi continu'
      ],
      included: [
        'Hébergement premium',
        'Sauvegardes quotidiennes',
        'Mises à jour',
        'Support prioritaire',
        'Monitoring 24/7',
        'Rapports mensuels'
      ]
    }
  };

  // Hook pour les animations au scroll
  const useScrollAnimation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return { isVisible, ref };
  };

  // Composant pour les features avec animation
  const AnimatedFeature: React.FC<{ feature: string; index: number; isVisible: boolean }> = ({ 
    feature, 
    index, 
    isVisible 
  }) => (
    <div 
      className={`flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-white to-blue-50 border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Check size={16} className="text-white" />
      </div>
      <div className="flex-1">
        <span className="text-gray-800 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
          {feature}
        </span>
      </div>
    </div>
  );

  // Composant FeaturesGrid avec animations
  const FeaturesGrid: React.FC<{ features: string[] }> = ({ features }) => {
    const { isVisible, ref } = useScrollAnimation();
    
    return (
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <AnimatedFeature 
            key={index} 
            feature={feature} 
            index={index} 
            isVisible={isVisible} 
          />
        ))}
      </div>
    );
  };

  // Composant ProcessTimeline avec animations avancées
  const ProcessTimeline: React.FC<{ steps: string[] }> = ({ steps }) => {
    const { isVisible, ref } = useScrollAnimation();
    
    return (
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step, index) => (
          <ProcessStep 
            key={index} 
            step={step} 
            index={index} 
            total={steps.length}
            isVisible={isVisible} 
          />
        ))}
      </div>
    );
  };
  // Composant pour les étapes du processus
  const ProcessStep: React.FC<{ 
    step: string; 
    index: number; 
    total: number; 
    isVisible: boolean 
  }> = ({ step, index, total, isVisible }) => (
    <div 
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Ligne de connexion */}
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 via-yellow-300 to-transparent z-0">
          <div 
            className={`h-full bg-gradient-to-r from-blue-500 to-yellow-400 transition-all duration-1000 ${
              isVisible ? 'w-full' : 'w-0'
            }`}
            style={{ transitionDelay: `${(index + 1) * 200}ms` }}
          ></div>
        </div>
      )}
      
      {/* Carte de l'étape */}
      <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 group-hover:-translate-y-2">
        {/* Numéro de l'étape */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            {index + 1}
          </div>
          {/* Effet de brillance */}
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-white/30 to-transparent rounded-2xl mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Contenu */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {step.split(' - ')[0] || step.split('.')[0] || `Étape ${index + 1}`}
          </h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {step}
          </p>
        </div>
      </div>
    </div>
  );
  const service = services[slug as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service non trouvé</h1>
          <Link to="/services" className="text-blue-600 hover:text-blue-700">
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/services" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour aux services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                Service Premium
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {service.title}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Prix</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {service.price}
                      {service.originalPrice && (
                        <span className="text-lg text-gray-400 line-through ml-2">
                          {service.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {service.title === 'Maintenance et Hébergement' ? '/mois' : service.period}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Délai</div>
                    <div className="text-xl font-bold text-blue-600 flex items-center">
                      <Clock className="mr-2" size={20} />
                      {service.deliveryTime}
                    </div>
                  </div>
                </div>
              </div>
              
              {slug === 'site-one-page' ? (
                <a
                  href="https://buy.stripe.com/bJedRadWL5vydIL6XU87K02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Commander maintenant</span>
                  <ArrowRight size={18} />
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>
                    {service.title === 'Maintenance et Hébergement' ? 'Commander maintenant' : 'Obtenir un devis'}
                  </span>
                  <ArrowRight size={18} />
                </Link>
              )}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3 opacity-20"></div>
              <img 
                src={service.image} 
                alt={service.title}
                className="relative rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
              Fonctionnalités Premium
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ce qui est inclus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque fonctionnalité a été soigneusement sélectionnée pour maximiser 
              votre succès en ligne et offrir une expérience utilisateur exceptionnelle
            </p>
          </div>

          <FeaturesGrid features={service.features} />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-white/10 text-blue-200 text-sm font-medium rounded-full mb-4 backdrop-blur-sm">
              Méthodologie Éprouvée
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Notre processus
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Une approche structurée et transparente pour garantir le succès de votre projet, 
              de la conception à la mise en ligne
            </p>
          </div>

          <ProcessTimeline steps={service.process} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer votre projet ?
          </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {service.title === 'Site One Page' ? (
              <a
                href="https://buy.stripe.com/bJedRadWL5vydIL6XU87K02"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 inline-flex items-center space-x-3"
              >
                <Rocket size={20} />
                <span>Commander maintenant</span>
                <ArrowRight size={20} />
              </a>
            ) : (
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 inline-flex items-center space-x-3"
              >
                <Target size={20} />
                <span>
                  {service.title === 'Maintenance et Hébergement' ? 'Commander maintenant' : 'Obtenir un devis'}
                </span>
                <ArrowRight size={20} />
              </Link>
            )}
            
            <Link
              to="/services"
              className="border-2 border-white/50 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 hover:border-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 backdrop-blur-sm inline-flex items-center space-x-3"
            >
              <Award size={20} />
              <span>Voir tous les services</span>
            </Link>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;