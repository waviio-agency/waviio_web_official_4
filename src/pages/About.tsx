import React from 'react';
import { useEffect } from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Nous restons à l\'avant-garde des technologies web pour offrir des solutions modernes et performantes.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Nous travaillons étroitement avec nos clients pour comprendre leurs besoins et dépasser leurs attentes.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Nous nous engageons à livrer des projets de la plus haute qualité avec une attention aux détails.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion',
      description: 'Notre passion pour le web design transparaît dans chaque projet que nous réalisons.'
    }
  ];

  const team = [
    {
      name: 'Matthieu',
      role: 'Co-fondateur & CEO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Spécialiste passionné des innovations digitales. Il supervise la stratégie et les relations clients pour garantir des résultats exceptionnels.'
    },
    {
      name: 'Clément',
      role: 'Co-fondateur & CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Expert en développement web et stratégie technique. Il dirige l\'équipe de développement et assure la qualité de nos solutions.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À Propos de Waviio
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Waviio est une agence web spécialisée dans le design web moderne, les 
              applications web performantes et les solutions e-commerce sur mesure. Nous aidons les 
              entreprises de toutes tailles à développer leur présence numérique.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fondée en 2017, Waviio a commencé avec une vision simple : rendre le web design 
                  de qualité accessible à toutes les entreprises. Nos fondateurs, passionnés de 
                  technologie et de design, ont uni leurs expertises pour créer une agence qui 
                  allie créativité et performance technique.
                </p>
                <p>
                  Depuis nos débuts, nous avons accompagné plus de 90 clients dans leur 
                  transformation digitale, en livrant des sites web qui non seulement impressionnent 
                  visuellement, mais génèrent aussi des résultats concrets pour leurs activités.
                </p>
                <p>
                  Aujourd'hui, Waviio continue d'évoluer en intégrant les dernières technologies 
                  et tendances du web design, tout en maintenant notre engagement envers 
                  l'excellence et la satisfaction client.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Équipe Waviio au travail"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600">
              Les principes qui guident tout ce que nous faisons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rencontrez Notre Équipe
            </h2>
            <p className="text-xl text-gray-600">
              Les talents derrière chaque projet réussi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">90+</div>
              <div className="text-xl text-blue-100">Clients Satisfaits</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">118+</div>
              <div className="text-xl text-blue-100">Projets Réalisés</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">7+</div>
              <div className="text-xl text-blue-100">Années d'Expérience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;