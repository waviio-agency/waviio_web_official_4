import React from 'react';

const ConditionsGenerales: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions Générales d'Utilisation</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Objet</h2>
              <p className="text-gray-600">
                Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités 
                et conditions d'utilisation des services proposés sur le site www.waviio.com (ci-après : le "Service"), 
                ainsi que de définir les droits et obligations des parties dans ce cadre.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Acceptation des conditions</h2>
              <p className="text-gray-600">
                L'utilisation du Service implique l'acceptation pleine et entière des présentes CGU. 
                Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Services proposés</h2>
              <p className="text-gray-600 mb-4">Waviio propose les services suivants :</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Création de sites web (One Page, Vitrine, E-Commerce)</li>
                <li>• Maintenance et hébergement de sites web</li>
                <li>• Optimisation SEO et performances</li>
                <li>• Support technique et assistance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Tarifs et paiement</h2>
              <p className="text-gray-600 mb-4">
                Les tarifs de nos services sont indiqués en euros TTC et peuvent être modifiés à tout moment. 
                Le paiement s'effectue selon les modalités convenues lors de la commande.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Site One Page : 450€ TTC</li>
                <li>• Site Vitrine : à partir de 900€ TTC</li>
                <li>• Site E-Commerce : à partir de 1450€ TTC</li>
                <li>• Maintenance : 29,99€ TTC/mois</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Délais de livraison</h2>
              <p className="text-gray-600">
                Les délais de livraison sont donnés à titre indicatif et peuvent varier selon la complexité 
                du projet. Nous nous engageons à respecter au mieux les délais annoncés.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Propriété intellectuelle</h2>
              <p className="text-gray-600">
                Le client devient propriétaire du site web livré. Waviio conserve les droits sur les 
                méthodes, savoir-faire et outils utilisés pour la réalisation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Garanties et responsabilité</h2>
              <p className="text-gray-600">
                Waviio s'engage à fournir des services conformes aux standards de qualité. 
                Notre responsabilité est limitée au montant des services facturés.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Résiliation</h2>
              <p className="text-gray-600">
                Les services peuvent être résiliés par l'une ou l'autre des parties avec un préavis 
                de 30 jours pour les services de maintenance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Droit applicable</h2>
              <p className="text-gray-600">
                Les présentes CGU sont soumises au droit français. Tout litige sera de la compétence 
                exclusive des tribunaux de Nice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact</h2>
              <p className="text-gray-600 mb-4">
                Pour toute question relative aux présentes CGU :
              </p>
              <ul className="text-gray-600 space-y-1">
                <li>• <strong>Email :</strong> contact@waviio.com</li>
                <li>• <strong>Téléphone :</strong> +33 7 56 96 26 87</li>
                <li>• <strong>Adresse :</strong> Nice, France</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsGenerales;