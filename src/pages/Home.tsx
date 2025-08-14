import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Users, Award, Clock } from 'lucide-react';

const Home: React.FC = () => {
  // Hook pour l'animation des compteurs
  const useCountUp = (end: number, duration: number = 3000) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Fonction d'easing pour un effet plus naturel
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);
        
        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [isVisible, end, duration]);

    return { count, ref };
  };

  // Composant StatCard avec animation
  const StatCard: React.FC<{
    icon: React.ComponentType<any>;
    endValue: number;
    suffix: string;
    label: string;
  }> = ({ icon: Icon, endValue, suffix, label }) => {
    const { count, ref } = useCountUp(endValue, 4000); // 4 secondes d'animation

    return (
      <div ref={ref} className="flex flex-col items-center">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
          <Icon className="text-white" size={32} />
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {count}{suffix}
        </div>
        <div className="text-gray-600">{label}</div>
      </div>
    );
  };

  const services = [
    {
      title: 'Site One Page',
      price: '450€',
      originalPrice: '700€',
      period: '/projet',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
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
      features: [
        'Design de site web responsive professionnel',
        'Jusqu\'à 10 pages',
        'Optimisation mobile avancée',
        'Configuration SEO avancée',
        'Intégration blog/CMS',
        'Intégration réseaux sociaux',
        '6 mois d\'hébergement gratuit',
        'Configuration Analytics'
      ]
    },
    {
      title: 'Site E-Commerce',
      price: '1450€',
      period: '/projet',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Design de site web responsive professionnel',
        'Pages illimitées',
        'Optimisation mobile et tablette avancée',
        'Intégration fonctionnelle et CRM avancée',
        'Développement CMS personnalisé',
        'Intégration paiement en ligne',
        'Intégrations API tierces',
        'Analytics et reporting avancés'
      ]
    },
    {
      title: 'Maintenance et Hébergement',
      price: '29,99€',
      period: '/mois',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
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

  const testimonials = [
    {
      name: 'Moutet Coach',
      image: '/moutet.png',
      text: 'Un service professionnel pour coach sportif avec présentation des services et prise de rendez-vous en ligne.',
      link: 'https://www.moutet-coach.com/'
    },
    {
      name: 'DataSphere',
      image: '/data.png',
      text: 'Plateforme avancée de data science avec interface intuitive et fonctionnalités complètes.',
      link: 'https://w-datasphere.vercel.app/'
    },
    {
      name: 'Sweel and Flow',
      image: '/swell.png',
      text: 'Application web élégante avec design moderne et expérience utilisateur optimisée.',
      link: 'https://w-sweel.vercel.app/'
    },
    {
      name: 'Ô Thé Sublime',
      image: '/tea.png',
      text: 'Site e-commerce élégant pour boutique de luxe avec interface moderne et intuitive.',
      link: 'https://w-tea.vercel.app/'
    }
  ];

  const faqs = [
    {
      question: 'Combien de temps faut-il pour créer mon site web ?',
      answer: 'En moyenne, nous livrons votre site web en 72h pour un site vitrine standard. Les projets plus complexes peuvent prendre 1 à 2 semaines.'
    },
    {
      question: 'Que comprennent vos tarifs ?',
      answer: 'Nos tarifs incluent la conception, le développement, l\'optimisation SEO de base, l\'hébergement initial et le support technique.'
    },
    {
      question: 'Proposez-vous un service de maintenance ?',
      answer: 'Oui, nous proposons un service de maintenance complet à partir de 29,99€/mois incluant les mises à jour, la sécurité et le support.'
    },
    {
      question: 'Puis-je demander des modifications pendant le développement ?',
      answer: 'Bien sûr ! Nous incluons jusqu\'à 3 révisions dans nos forfaits pour nous assurer que le résultat correspond parfaitement à vos attentes.'
    },
    {
      question: 'L\'hébergement est-il inclus ?',
      answer: 'Oui, nous incluons l\'hébergement gratuit pendant la première période selon le forfait choisi, puis à partir de 9,99€/mois.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Votre site internet<br />
            <span className="text-white">clé en main</span><br />
            <span className="text-yellow-400 font-extrabold animate-gradient bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">en 72H !</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            <span className="inline-block animate-wave" style={{ animationDelay: '0s' }}>Des</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.1s' }}>sites</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.2s' }}>web</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.3s' }}>modernes,</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.4s' }}>rapides</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.5s' }}>et</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.6s' }}>pensés</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.7s' }}>pour</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.8s' }}>convertir</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '0.9s' }}>vos</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '1.0s' }}>visiteurs</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '1.1s' }}>en</span>
            {' '}
            <span className="inline-block animate-wave" style={{ animationDelay: '1.2s' }}>clients.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/services"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Découvrir Nos Services</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Nous Contacter
            </Link>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Check size={16} className="text-green-400" />
              <span>Équipe créative et experte</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check size={16} className="text-green-400" />
              <span>Garantie SEO</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check size={16} className="text-green-400" />
              <span>Suivi et hébergement sécurisé</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check size={16} className="text-green-400" />
              <span>Approche mobile-first</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard 
              icon={Users}
              endValue={90}
              suffix="+"
              label="Clients Satisfaits"
            />
            <StatCard 
              icon={Award}
              endValue={118}
              suffix="+"
              label="Projets Réalisés"
            />
            <StatCard 
              icon={Clock}
              endValue={7}
              suffix="+"
              label="Années d'Expérience"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez parmi nos packages de services soigneusement conçus pour répondre aux 
              entreprises de toutes tailles et exigences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                  <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600"></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-baseline space-x-2">
                        {service.title === 'Site Vitrine' || service.title === 'Site E-Commerce' ? (
                          <span className="text-sm text-gray-500 font-normal">à partir de</span>
                        ) : null}
                        <div className="text-3xl font-bold text-blue-600">{service.price}</div>
                        {service.originalPrice && (
                          <div className="text-lg text-gray-500 line-through">{service.originalPrice}</div>
                        )}
                        {service.title === 'Maintenance et Hébergement' && (
                          <span className="text-lg text-gray-500 font-normal">/mois</span>
                        )}
                      </div>
                  
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                    {service.title === 'Site One Page' && 'Site web moderne sur une seule page, parfait pour présenter votre activité de manière claire et efficace. Livré en 72h !'}
                    {service.title === 'Site Vitrine' && 'Site web complet jusqu\'à 10 pages avec blog intégré, optimisation SEO avancée et toutes les fonctionnalités pour développer votre business.'}
                    {service.title === 'Site E-Commerce' && 'Boutique en ligne complète avec paiements sécurisés, gestion des stocks, et toutes les fonctionnalités e-commerce avancées.'}
                    {service.title === 'Maintenance et Hébergement' && 'Service complet de maintenance et d\'hébergement pour garder votre site sécurisé, rapide et à jour en permanence.'}
                  </p>
                  
                  <div className="mb-4">
                    <div className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-600">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      <div className="text-sm text-green-600 font-medium pl-7">
                        +{service.features.length - 3} fonctionnalités supplémentaires
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-5">
                    <div className="flex flex-col space-y-3">
                      <Link
                        to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace('é', 'e')}`}
                        className="text-gray-600 border border-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 text-center"
                      >
                        Voir les Détails
                      </Link>
                      {service.title === 'Site One Page' ? (
                        <a
                          href="https://buy.stripe.com/bJedRadWL5vydIL6XU87K02"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          Commander
                        </a>
                      ) : (
                        <Link
                          to="/contact"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          {service.title === 'Maintenance et Hébergement' ? 'Commander' : 'Obtenir un Devis'}
                        </Link>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous ont fait confiance !
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez quelques-unes de nos réalisations récentes et l'impact que nous avons eu 
              sur nos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <a 
                key={index} 
                href={testimonial.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block group"
              >
                <div className="h-40 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{testimonial.text}</p>
                <div className="text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-colors flex items-center">
                  Projet réalisé ✓
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez les réponses aux questions les plus courantes sur nos services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:text-blue-600">
                    {faq.question}
                    <span className="ml-6 flex-shrink-0 text-blue-600 group-open:rotate-45 transition-transform text-xl">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Transformer Votre Présence Numérique ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Planifiez une consultation gratuite et nous discuterons de la meilleure solution 
            pour votre entreprise.
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Découvrir Votre Projet</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;