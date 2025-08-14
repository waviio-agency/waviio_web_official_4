import React from 'react';

const PolitiqueConfidentialite: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
          <p className="text-lg text-gray-600 mb-8">Comment nous collectons, utilisons et protégeons vos données personnelles</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Collecte des données personnelles</h2>
              <p className="text-gray-600 mb-4">Nous collectons des données personnelles lorsque vous :</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Remplissez notre formulaire de contact</li>
                <li>• Créez un compte sur notre site</li>
                <li>• Nous contactez par email ou téléphone</li>
                <li>• Utilisez nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Types de données collectées</h2>
              <p className="text-gray-600 mb-4">Les données que nous collectons peuvent inclure :</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Nom et prénom</li>
                <li>• Adresse email</li>
                <li>• Numéro de téléphone</li>
                <li>• Informations sur votre entreprise</li>
                <li>• Messages et communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Utilisation des données</h2>
              <p className="text-gray-600 mb-4">Nous utilisons vos données personnelles pour :</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Répondre à vos demandes et questions</li>
                <li>• Fournir nos services</li>
                <li>• Améliorer notre site web et nos services</li>
                <li>• Vous envoyer des informations sur nos services (avec votre consentement)</li>
                <li>• Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Partage des données</h2>
              <p className="text-gray-600 mb-4">
                Nous ne vendons, n'échangeons ni ne louons vos données personnelles à des tiers. 
                Nous pouvons partager vos informations uniquement dans les cas suivants :
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Avec votre consentement explicite</li>
                <li>• Pour respecter une obligation légale</li>
                <li>• Avec nos prestataires de services (hébergement, paiement) sous contrat de confidentialité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Sécurité des données</h2>
              <p className="text-gray-600">
                Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées 
                pour protéger vos données personnelles contre la perte, l'utilisation abusive, l'accès non 
                autorisé, la divulgation, l'altération ou la destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Conservation des données</h2>
              <p className="text-gray-600">
                Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux 
                finalités pour lesquelles elles ont été collectées, ou selon les exigences légales applicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Vos droits</h2>
              <p className="text-gray-600 mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Droit d'accès à vos données</li>
                <li>• Droit de rectification</li>
                <li>• Droit à l'effacement</li>
                <li>• Droit à la limitation du traitement</li>
                <li>• Droit à la portabilité des données</li>
                <li>• Droit d'opposition</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Pour exercer ces droits, contactez-nous à : <strong>contact@waviio.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookies</h2>
              <p className="text-gray-600">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut 
                affecter le fonctionnement de certaines parties du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
              <p className="text-gray-600">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Les modifications seront publiées sur cette page avec la date de mise à jour.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact</h2>
              <p className="text-gray-600 mb-4">
                Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à :
              </p>
              <ul className="text-gray-600 space-y-1">
                <li>• <strong>Email :</strong> contact@waviio.com</li>
                <li>• <strong>Téléphone :</strong> +33 7 56 96 26 87</li>
                <li>• <strong>Adresse :</strong> Nice, France</li>
              </ul>
              <p className="text-sm text-gray-500 mt-6 pt-6 border-t border-gray-200">
                <strong>Dernière mise à jour :</strong> Le 10/08/2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;