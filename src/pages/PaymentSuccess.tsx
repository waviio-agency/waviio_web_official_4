import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { CheckCircle, ArrowRight, Home, ShoppingBag } from 'lucide-react';

interface Confetti {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const PaymentSuccess: React.FC = () => {
  const { service } = useParams<{ service?: string }>();
  const { profile } = useAuth();
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    business_name: '',
    owner_name: '',
    professional_email: '',
    professional_phone: '',
    business_description: '',
    why_choose_you: '',
    what_makes_unique: '',
    complementary_offers: '',
    special_offers: '',
    trust_badges: '',
    desired_features: '',
    theme_preference: '' as 'clair' | 'sombre' | '',
    service_areas: '',
    key_messages: '',
    logo_url: '',
    photos_urls: [] as string[],
    faq_content: '',
    google_reviews: '' as 'oui' | 'non' | 'aide' | '',
    design_style: '',
    color_preferences: '',
    typography_style: '',
    brand_guidelines: '',
    inspiration_sites: '',
    layout_preferences: '',
    visual_elements: ''
  });

  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#EC4899', // Pink
    '#84CC16', // Lime
    '#6366F1'  // Indigo
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation des champs requis avec longueur minimale
      if (formData.business_description.length < 120) {
        alert('La description de votre activité doit contenir au moins 120 caractères.');
        setIsSubmitting(false);
        return;
      }

      if (formData.desired_features.length < 120) {
        alert('Les fonctionnalités souhaitées doivent contenir au moins 120 caractères.');
        setIsSubmitting(false);
        return;
      }

      if (formData.key_messages.length < 120) {
        alert('Les messages clés doivent contenir au moins 120 caractères.');
        setIsSubmitting(false);
        return;
      }

      // Envoyer les données à Supabase
      const { error } = await supabase
        .from('forms')
        .insert([{
          user_id: profile?.id,
          ...formData,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setFormSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const createConfetti = (): Confetti => {
      const screenWidth = window.innerWidth;
      
      return {
        id: Math.random(),
        x: Math.random() * screenWidth,
        y: -50,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 16 + Math.random() * 12,
        opacity: 0.8 + Math.random() * 0.2,
        life: 300 + Math.random() * 200,
        maxLife: 300 + Math.random() * 200
      };
    };

    // Créer des vagues de confettis W
    const waves = [
      { time: 0, count: 30 },
      { time: 200, count: 25 },
      { time: 400, count: 20 },
      { time: 600, count: 15 },
      { time: 800, count: 10 },
      { time: 1200, count: 8 },
      { time: 1600, count: 5 }
    ];

    waves.forEach(wave => {
      setTimeout(() => {
        const newConfetti = Array.from({ length: wave.count }, createConfetti);
        setConfetti(prev => [...prev, ...newConfetti]);
      }, wave.time);
    });

    // Afficher le contenu après l'opening
    setTimeout(() => {
      setShowContent(true);
      // Afficher le formulaire après 2 secondes supplémentaires si c'est site-one-page
      if (service === 'site-one-page') {
        setTimeout(() => {
          setShowForm(true);
        }, 2000);
      }
    }, 800);

    // Animation loop à 60 FPS
    const animate = () => {
      setConfetti(prevConfetti => {
        return prevConfetti.map(piece => {
          piece.x += piece.vx;
          piece.y += piece.vy;
          piece.vy += 0.15; // Gravité
          piece.vx *= 0.998; // Résistance de l'air
          piece.rotation += piece.rotationSpeed;
          piece.life--;
          piece.opacity = Math.max(0, piece.life / piece.maxLife);
          
          return piece;
        }).filter(piece => 
          piece.life > 0 && 
          piece.y < window.innerHeight + 100 && 
          piece.x > -100 && 
          piece.x < window.innerWidth + 100
        );
      });
    };

    const animationFrame = setInterval(animate, 16.67); // 60 FPS

    // Cleanup après 8 secondes
    const cleanup = setTimeout(() => {
      clearInterval(animationFrame);
      setConfetti([]);
    }, 8000);

    return () => {
      clearTimeout(cleanup);
      clearInterval(animationFrame);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Confettis W */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {confetti.map(piece => (
          <div
            key={piece.id}
            className="absolute font-bold select-none"
            style={{
              left: piece.x,
              top: piece.y,
              transform: `rotate(${piece.rotation}deg)`,
              color: piece.color,
              fontSize: `${piece.size}px`,
              opacity: piece.opacity,
              textShadow: `0 0 ${piece.size/2}px ${piece.color}, 0 0 ${piece.size}px ${piece.color}`,
              filter: `drop-shadow(0 0 ${piece.size/3}px ${piece.color})`
            }}
          >
            W
          </div>
        ))}
      </div>

      {service === 'site-one-page' ? (
        <div className={`w-full relative z-20 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {!formSubmitted ? (
            <div className="py-8 px-4">
              {/* Header de succès intégré */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-8 px-6 mb-8">
                <div className="max-w-7xl mx-auto text-center">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Paiement confirmé !</h1>
                  <p className="text-green-100 text-lg">
                    Votre commande Site One Page a été traitée avec succès. Complétez maintenant le formulaire d'onboarding.
                  </p>
                </div>
              </div>

              {/* Étapes du processus */}
              <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Étapes de votre projet</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-green-800">Paiement</div>
                        <div className="text-sm text-green-600">Confirmé ✓</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <div className="font-medium text-blue-800">Formulaire</div>
                        <div className="text-sm text-blue-600">En cours...</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Développement</div>
                        <div className="text-sm text-gray-500">En attente</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Livraison</div>
                        <div className="text-sm text-gray-500">72h après formulaire</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire d'onboarding */}
              <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Formulaire d'Onboarding</h2>
              
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-blue-800 text-sm">
                  Merci de prévoir 10 à 15 minutes devant vous afin de remplir correctement ce formulaire pour la création de votre site internet.
                </p>
              </div>

                <form onSubmit={handleSubmitForm} className="space-y-8">
                {/* Informations de base */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Informations de base</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom commercial de votre entreprise/activité *
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      required
                      value={formData.business_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom et Prénom principal du détenteur de l'entreprise *
                    </label>
                    <input
                      type="text"
                      name="owner_name"
                      required
                      value={formData.owner_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                  </div>

                  {/* Section détails entreprise */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Détails de votre entreprise</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email professionnel pour vos clients
                    </label>
                    <input
                      type="email"
                      name="professional_email"
                      value={formData.professional_email}
                      onChange={handleInputChange}
                      placeholder="contact@waviio.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de téléphone professionnel pour vos clients
                    </label>
                    <input
                      type="tel"
                      name="professional_phone"
                      value={formData.professional_phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parlez-nous de votre activité et de votre parcours * (min. 120 caractères)
                  </label>
                  <textarea
                    name="business_description"
                    required
                    rows={4}
                    value={formData.business_description}
                    onChange={handleInputChange}
                    placeholder="pour la section 'A propos de moi/A propos de nous'"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.business_description.length}/120 caractères minimum
                  </div>
                </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pourquoi un client devrait-il vous choisir ?
                  </label>
                  <textarea
                    name="why_choose_you"
                    rows={3}
                    value={formData.why_choose_you}
                    onChange={handleInputChange}
                    placeholder="Mentionnez vos points forts: prix, qualité, soin, proximité, avis clients, certifications, etc…"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qu'est-ce qui rend votre activité spéciale ou unique ?
                  </label>
                  <textarea
                    name="what_makes_unique"
                    rows={3}
                    value={formData.what_makes_unique}
                    onChange={handleInputChange}
                    placeholder="Parlez de vos techniques, de vos valeurs ou de votre approche qui vous distingue etc…"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposez-vous des offres complémentaires à afficher sur votre site, si oui détailler-les
                  </label>
                  <textarea
                    name="complementary_offers"
                    rows={3}
                    value={formData.complementary_offers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposez-vous des offres spéciales ou des options de fidélisation pour votre activité ?
                  </label>
                  <textarea
                    name="special_offers"
                    rows={3}
                    value={formData.special_offers}
                    onChange={handleInputChange}
                    placeholder="remises, carte de fidélité, crédits, options d'abonnement etc…"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                    </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disposez-vous de badges de confiance ou de certifications à mettre en avant ?
                  </label>
                  <textarea
                    name="trust_badges"
                    rows={3}
                    value={formData.trust_badges}
                    onChange={handleInputChange}
                    placeholder="Il peut s'agir d'avis Facebook, d'avis Google, d'avis TrustPilot ou autres…"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                  </div>

                  {/* Section fonctionnalités */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Fonctionnalités et préférences</h3>
                    </div>
                    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quelles fonctionnalités souhaitez-vous inclure sur votre site internet ? * (min. 120 caractères)
                  </label>
                  <textarea
                    name="desired_features"
                    required
                    rows={4}
                    value={formData.desired_features}
                    onChange={handleInputChange}
                    placeholder="Prise de rendez-vous en ligne, sections avec vos témoignages clients photos ou vidéos, section formulaire de contact rapide, section de redirection sur un numéro whatsapp etc…"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.desired_features.length}/120 caractères minimum
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Déplacement à domicile ou chez un particulier ? Quelles zones géographiques couvrez-vous ?
                  </label>
                  <textarea
                    name="service_areas"
                    rows={3}
                    value={formData.service_areas}
                    onChange={handleInputChange}
                    placeholder="Indiquez vos lieux d'interventions si nécessaires (villes, quartiers etc…)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Messages clés pour vos clients, votre vision ou vos messages importants à communiquer * (min. 120 caractères)
                  </label>
                  <textarea
                    name="key_messages"
                    required
                    rows={4}
                    value={formData.key_messages}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.key_messages.length}/120 caractères minimum
                  </div>
                </div>
                  </div>

                  {/* Section design */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Design et identité visuelle</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Style de design souhaité
                        </label>
                        <input
                          type="text"
                          name="design_style"
                          value={formData.design_style}
                          onChange={handleInputChange}
                          placeholder="Ex: moderne, minimaliste, élégant, coloré..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Couleurs souhaitées
                        </label>
                        <input
                          type="text"
                          name="color_preferences"
                          value={formData.color_preferences}
                          onChange={handleInputChange}
                          placeholder="Ex: bleu et blanc, couleurs chaudes, éviter le rouge..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Style de typographie
                        </label>
                        <input
                          type="text"
                          name="typography_style"
                          value={formData.typography_style}
                          onChange={handleInputChange}
                          placeholder="Ex: moderne, élégante, classique, manuscrite..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thème souhaité *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <label className="flex items-center justify-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="theme_preference"
                              value="clair"
                              required
                              checked={formData.theme_preference === 'clair'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`text-center ${formData.theme_preference === 'clair' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                              <div className="text-lg mb-1">☀️</div>
                              <div className="text-sm">Clair</div>
                            </div>
                          </label>
                          <label className="flex items-center justify-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="theme_preference"
                              value="sombre"
                              required
                              checked={formData.theme_preference === 'sombre'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`text-center ${formData.theme_preference === 'sombre' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                              <div className="text-lg mb-1">🌙</div>
                              <div className="text-sm">Sombre</div>
                            </div>
                          </label>
                          <label className="flex items-center justify-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="theme_preference"
                              value="les_deux"
                              required
                              checked={formData.theme_preference === 'les_deux'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`text-center ${formData.theme_preference === 'les_deux' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                              <div className="text-lg mb-1">🌓</div>
                              <div className="text-sm">Les deux</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Charte graphique existante
                      </label>
                      <textarea
                        name="brand_guidelines"
                        rows={3}
                        value={formData.brand_guidelines}
                        onChange={handleInputChange}
                        placeholder="Avez-vous déjà un logo, des couleurs de marque définies, une identité visuelle..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sites d'inspiration
                        </label>
                        <textarea
                          name="inspiration_sites"
                          rows={3}
                          value={formData.inspiration_sites}
                          onChange={handleInputChange}
                          placeholder="URLs de sites que vous aimez, style recherché..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Préférences de mise en page
                        </label>
                        <textarea
                          name="layout_preferences"
                          rows={3}
                          value={formData.layout_preferences}
                          onChange={handleInputChange}
                          placeholder="Header fixe, menu latéral, animations, effets de survol..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Éléments visuels souhaités
                      </label>
                      <textarea
                        name="visual_elements"
                        rows={3}
                        value={formData.visual_elements}
                        onChange={handleInputChange}
                        placeholder="Icônes, illustrations, formes géométriques, dégradés, photos..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Section contenu et médias */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">5</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Contenu et médias</h3>
                    </div>
                    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléchargez-ici votre logo si vous en avez-un
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-500">Fonctionnalité de téléchargement à venir</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléchargez des photos à mettre sur votre futur site internet
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-500 text-sm">Photos de vous en action, vidéo promotionnelle, bannière ou image principale à intégrer, importez en un maximum</p>
                    <p className="text-gray-500 mt-2">Fonctionnalité de téléchargement à venir</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avez-vous des Questions/Réponses Fréquentes à indiquer sur votre site ?
                  </label>
                  <textarea
                    name="faq_content"
                    rows={4}
                    value={formData.faq_content}
                    onChange={handleInputChange}
                    placeholder="Combien de temps dure vos prestations ? Nos prestations durent en moyenne…"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                  </div>

                  {/* Section finalisation */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">6</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Finalisation</h3>
                    </div>
                    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avez-vous une fiche Google pour vos avis *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="google_reviews"
                        value="oui"
                        required
                        checked={formData.google_reviews === 'oui'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Oui
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="google_reviews"
                        value="non"
                        required
                        checked={formData.google_reviews === 'non'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Non
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="google_reviews"
                        value="aide"
                        required
                        checked={formData.google_reviews === 'aide'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Non, mais je souhaite que vous m'aidiez à créer ma fiche Google
                    </label>
                  </div>
                </div>
                  </div>

                  <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-900 to-blue-500 text-white px-12 py-4 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon formulaire'}
                  </button>
                </div>
              </form>
              </div>
            </div>
          ) : (
            <div className="py-8 px-4">
              <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Formulaire envoyé avec succès !
              </h2>
              <p className="text-gray-600 mb-8">
                Merci d'avoir pris le temps de remplir ce formulaire. Notre équipe va maintenant pouvoir créer votre site internet personnalisé.
              </p>
              <div className="space-y-3">
                <Link
                  to="/dashboard/orders"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <ShoppingBag size={18} />
                  <span>Voir mes commandes</span>
                  <ArrowRight size={18} />
                </Link>
                
                <Link
                  to="/"
                  className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <Home size={18} />
                  <span>Retour à l'accueil</span>
                </Link>
              </div>
            </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md relative z-20 transition-all duration-1000 opacity-100 translate-y-0">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div>
          {/* Icône de succès */}
          <div className="relative mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Message de succès */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Paiement confirmé !
            </h1>
            <p className="text-gray-600">
              Votre commande a été traitée avec succès. Vous recevrez un email de confirmation sous peu.
            </p>
          </div>

          {/* Informations */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Statut :</span>
                <span className="text-green-600 font-medium">Confirmé</span>
              </div>
              <div className="flex justify-between">
                <span>Email :</span>
                <span className="font-medium">Envoyé</span>
              </div>
              <div className="flex justify-between">
                <span>Équipe :</span>
                <span className="font-medium">Notifiée</span>
              </div>
            </div>
          </div>

          {/* Prochaines étapes */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Prochaines étapes :</h3>
            <div className="space-y-2 text-sm text-gray-600 text-left">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">1</div>
                <span>Confirmation par email</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">2</div>
                <span>Contact de notre équipe sous 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">3</div>
                <span>Début du développement</span>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Link
              to="/dashboard/orders"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={18} />
              <span>Voir mes commandes</span>
              <ArrowRight size={18} />
            </Link>
            
            <Link
              to="/"
              className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Home size={18} />
              <span>Retour à l'accueil</span>
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Une question ? Contactez-nous :
            </p>
            <div className="text-sm text-gray-600">
              <div>📧 contact@waviio.com</div>
              <div>📞 +33 7 56 78 90 12</div>
            </div>
          </div>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;