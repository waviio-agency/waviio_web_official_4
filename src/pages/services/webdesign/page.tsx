import React from 'react';
import { Globe, Palette, Code, Smartphone, Search, Users } from 'lucide-react';

const WebDesignPage: React.FC = () => {
  const features = [
    {
      icon: Palette,
      title: 'Design Sur Mesure',
      description: 'Création de designs uniques qui reflètent votre identité de marque'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Sites parfaitement adaptés à tous les appareils et tailles d\'écran'
    },
    {
      icon: Code,
      title: 'Code Optimisé',
      description: 'Développement avec les dernières technologies pour des performances maximales'
    },
    {
      icon: Search,
      title: 'SEO Intégré',
      description: 'Optimisation pour les moteurs de recherche dès la conception'
    },
    {
      icon: Users,
      title: 'UX/UI Expert',
      description: 'Expérience utilisateur pensée pour maximiser les conversions'
    },
    {
      icon: Globe,
      title: 'Multi-navigateurs',
      description: 'Compatibilité garantie sur tous les navigateurs modernes'
    }
  ];

  const portfolio = [
    {
      title: 'Moutet Coach',
      image: '/moutet.png',
      description: 'Site professionnel pour coach sportif avec système de réservation',
      url: 'https://www.moutet-coach.com/'
    },
    {
      title: 'DataSphere',
      image: '/data.png',
      description: 'Plateforme de data science avec interface moderne',
      url: 'https://w-datasphere.vercel.app/'
    },
    {
      title: 'Sweel and Flow',
      image: '/swell.png',
      description: 'Application web élégante avec design contemporain',
      url: 'https://w-sweel.vercel.app/'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-16 h-16 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Service Web Design
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Création de sites web modernes, performants et optimisés pour convertir vos visiteurs en clients
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Expertise Web Design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous combinons créativité et expertise technique pour créer des sites web qui marquent les esprits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
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

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Réalisations
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez quelques-uns de nos projets web design récents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                  <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                    Voir le projet →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Créer Votre Site Web ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Discutons de votre projet et créons ensemble un site web qui vous ressemble
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Démarrer Mon Projet</span>
            <Globe size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WebDesignPage;