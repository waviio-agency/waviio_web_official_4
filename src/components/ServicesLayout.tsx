import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Globe, Search, Zap, ShoppingCart, Wrench } from 'lucide-react';

const ServicesLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const serviceLinks = [
    {
      name: 'Web Design',
      href: '/services/webdesign',
      icon: Globe,
      description: 'Création de sites web modernes'
    },
    {
      name: 'SEO',
      href: '/services/seo',
      icon: Search,
      description: 'Optimisation pour moteurs de recherche'
    },
    {
      name: 'Performance',
      href: '/services/performance',
      icon: Zap,
      description: 'Optimisation des performances'
    },
    {
      name: 'E-Commerce',
      href: '/services/ecommerce',
      icon: ShoppingCart,
      description: 'Solutions de vente en ligne'
    },
    {
      name: 'Maintenance',
      href: '/services/maintenance',
      icon: Wrench,
      description: 'Maintenance et support technique'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Waviio Services</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {serviceLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                {serviceLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 text-sm font-medium transition-colors rounded-lg ${
                        isActive(link.href)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} />
                      <div>
                        <div>{link.name}</div>
                        <div className="text-xs text-gray-500">{link.description}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Waviio</span>
            </div>
            <p className="text-gray-600 mb-4">
              Votre agence web spécialisée dans la création de sites internet modernes
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors">
                À propos
              </Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                © 2025 Waviio. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesLayout;