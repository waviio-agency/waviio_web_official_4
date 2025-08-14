import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, User, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, profile, signOut } = useAuth();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    await signOut();
    navigate('/');
  };

  const closeBanner = () => {
    setShowBanner(false);
  };
  return (
    <>
      {/* Bannière promotionnelle */}
      {showBanner && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between">
            <div className="w-6"></div>
            <div className="flex items-center justify-center flex-1 min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <span className="hidden sm:inline">✨</span>
                <span className="truncate">Préparez la rentrée en beauté : -40% sur votre site One Page</span>
                <Link to="/services" className="underline font-semibold hover:text-yellow-300 transition-colors whitespace-nowrap">
                  Découvrir
                </Link>
                <span className="hidden sm:inline">– Offre limitée !</span>
              </div>
            </div>
            <button 
              onClick={closeBanner}
              className="text-white/80 hover:text-white p-1 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      
      {/* Header principal */}
      <header className={`bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 fixed left-0 right-0 z-40 transition-all duration-300 ${
        showBanner ? 'top-8' : 'top-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Waviio</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">
                        {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-sm">{profile?.full_name || 'Mon compte'}</span>
                    <ChevronDown size={14} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Mon profil
                      </Link>
                      <Link
                        to="/dashboard/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Mes commandes
                      </Link>
                      {profile?.role === 'admin' && (
                        <Link
                          to="/dashboard/admin/stats"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Administration
                        </Link>
                      )}
                      <hr className="my-2" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                  >
                    Créer un compte
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Mon profil
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Se déconnecter
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Se connecter
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-3 mt-2 text-center"
                      >
                        Créer un compte
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;