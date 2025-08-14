import React from 'react';

const MentionsLegales: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Informations sur l'éditeur</h2>
              <div className="text-gray-600 space-y-2">
                <p><strong>Raison sociale :</strong> Waviio</p>
                <p><strong>Siret :</strong> 953 831 138 00011</p>
                <p><strong>RCS :</strong> Nice</p>
                <p><strong>Adresse :</strong> Nice, France</p>
                <p><strong>Email :</strong> contact@waviio.com</p>
                <p><strong>Téléphone :</strong> +33 7 56 96 26 87</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Hébergement</h2>
              <p className="text-gray-600 mb-4">Le site est hébergé par :</p>
              <div className="text-gray-600 space-y-1">
                <p><strong>OVH, France</strong></p>
                <p>2 rue Kellermann - 59100 Roubaix - France</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
              <p className="text-gray-600">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
                documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Responsabilité</h2>
              <p className="text-gray-600">
                Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à 
                différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Liens hypertextes</h2>
              <p className="text-gray-600">
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres 
                ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de l'agence 
                web design "Waviio".
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Collecte et traitement de données personnelles</h2>
              <p className="text-gray-600 mb-4">
                Conformément aux dispositions de la loi n° 78-17 du 6 janvier 1978 modifiée, vous disposez 
                d'un droit d'accès, de modification et de suppression des données qui vous concernent.
              </p>
              <p className="text-gray-600 mb-2">
                Pour exercer ce droit, adressez-vous à : <strong>contact@waviio.com</strong>
              </p>
              <p className="text-gray-600">
                Nous vous répondrons sous 24 à 48 heures ouvrés.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Droit applicable</h2>
              <p className="text-gray-600">
                Tout litige en relation avec l'utilisation du site www.waviio.com est soumis au droit français. 
                Il est fait attribution exclusive de juridiction aux tribunaux compétents de Nice.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;