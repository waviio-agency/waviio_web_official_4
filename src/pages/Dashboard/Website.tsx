import React from 'react';
import { Globe, Clock } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const Website: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Globe className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Mon Site</h1>
          </div>
          <p className="text-gray-600">Gérez et surveillez votre site web</p>
        </div>

        {/* Coming Soon Message */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="text-orange-600" size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-orange-800 mb-3">
            Fonctionnalités à venir
          </h2>
          
          <p className="text-orange-700 text-lg mb-6 max-w-2xl mx-auto">
            Nous travaillons actuellement sur les outils de gestion de votre site web. 
            Ces fonctionnalités seront bientôt disponibles dans votre tableau de bord.
          </p>
          
          <div className="bg-orange-100 rounded-lg p-4 max-w-md mx-auto">
            <h3 className="font-semibold text-orange-800 mb-2">Prochainement :</h3>
            <ul className="text-orange-700 text-sm space-y-1">
              <li>• Statistiques de votre site</li>
              <li>• Modification de contenu</li>
              <li>• Optimisation SEO</li>
              <li>• Gestion des performances</li>
              <li>• Suivi des mises à jour</li>
            </ul>
          </div>
          
          <div className="mt-6 text-sm text-orange-600">
            En attendant, vous pouvez nous contacter pour toute modification de votre site.
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="text-center">
            <h3 className="font-semibold text-blue-800 mb-3">
              Besoin de modifier votre site ?
            </h3>
            <p className="text-blue-700 mb-4">
              Notre équipe est disponible pour vous aider avec toutes vos demandes de modifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard/revisions"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Demander une révision
              </a>
              <a
                href="/dashboard/support"
                className="border border-blue-300 text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors"
              >
                Contacter le support
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Website;