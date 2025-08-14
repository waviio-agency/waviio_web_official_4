import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et slogan */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold">Waviio</span>
            </div>
            <p className="text-blue-400 italic mb-3">On code sous le soleil de Nice</p>
            <p className="text-gray-400 mb-4">
              Votre agence web niçoise spécialisée dans la création de sites internet modernes et performants.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-blue-400 transition-colors">Sites vitrine</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-blue-400 transition-colors">E-commerce</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-blue-400 transition-colors">Applications web</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-blue-400 transition-colors">Maintenance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Nice, France</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:contact@waviio.fr" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  contact@waviio.fr
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+33123456789" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  +33 7 56 96 26 87
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Waviio. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/mentions-legales" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Mentions légales
              </a>
              <a href="/politique-confidentialite" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;