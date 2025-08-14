import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Home,
  User,
  Lock,
  Shield,
  ShoppingBag,
  Globe,
  RefreshCw,
  HelpCircle,
  BarChart3,
  Users,
  MessageSquare,
  FileText,
  MessageCircle,
  Ticket,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigation = [
    {
      name: 'Retour à l\'accueil',
      href: '/',
      icon: Home,
      iconColor: 'text-blue-600',
      section: 'main'
    },
    {
      name: 'MON COMPTE',
      section: 'account-header'
    },
    {
      name: 'Profil',
      href: '/dashboard/profile',
      icon: User,
      iconColor: 'text-blue-600',
      section: 'account'
    },
    {
      name: 'Mot de passe',
      href: '/dashboard/password',
      icon: Lock,
      iconColor: 'text-orange-600',
      section: 'account'
    },
    {
      name: 'Sécurité',
      href: '/dashboard/security',
      icon: Shield,
      iconColor: 'text-green-600',
      section: 'account'
    },
    {
      name: 'ESPACE WEB',
      section: 'web-header'
    },
    {
      name: 'Mes commandes',
      href: '/dashboard/orders',
      icon: ShoppingBag,
      iconColor: 'text-purple-600',
      section: 'web'
    },
    {
      name: 'Mon Site',
      href: '/dashboard/website',
      icon: Globe,
      iconColor: 'text-blue-600',
      section: 'web'
    },
    {
      name: 'Révisions',
      href: '/dashboard/revisions',
      icon: RefreshCw,
      iconColor: 'text-purple-600',
      section: 'web'
    },
    {
      name: 'Support',
      href: '/dashboard/support',
      icon: HelpCircle,
      iconColor: 'text-green-600',
      section: 'web'
    }
  ];

  // Add admin navigation if user is admin
  if (profile?.role === 'admin') {
    navigation.push(
      {
        name: 'ADMINISTRATION',
        section: 'admin-header'
      },
      {
        name: 'Statistiques',
        href: '/dashboard/admin/stats',
        icon: BarChart3,
        iconColor: 'text-indigo-600',
        section: 'admin'
      },
      {
        name: 'Clients',
        href: '/dashboard/admin/clients',
        icon: Users,
        iconColor: 'text-blue-600',
        section: 'admin'
      },
      {
        name: 'Messagerie',
        href: '/dashboard/admin/messages',
        icon: MessageSquare,
        iconColor: 'text-green-600',
        section: 'admin'
      },
      {
        name: 'Formulaires',
        href: '/dashboard/admin/forms',
        icon: FileText,
        iconColor: 'text-purple-600',
        section: 'admin'
      },
      {
        name: 'Tickets Clients',
        href: '/dashboard/admin/tickets',
        icon: Ticket,
        iconColor: 'text-red-600',
        section: 'admin'
      }
    );
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">W</span>
            </div>
            <div>
              <div className="font-bold text-lg">Waviio</div>
              <div className="text-blue-200 text-sm">Tableau de bord</div>
            </div>
          </div>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {profile?.full_name || 'Utilisateur'}
              </div>
              <div className="text-sm text-gray-500 truncate">{profile?.email}</div>
              {profile?.role === 'admin' && (
                <div className="text-xs text-red-600 font-medium">Administrateur</div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item, index) => {
            if (item.section.includes('header')) {
              return (
                <div key={index} className="pt-4 pb-2">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {item.name}
                  </div>
                  {item.section === 'admin-header' && (
                    <div className="text-xs text-red-500 font-medium">Admin</div>
                  )}
                </div>
              );
            }

            const Icon = item.icon!;
            return (
              <Link
                key={index}
                to={item.href!}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive(item.href!) 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  ${item.section === 'admin' ? 'border-l-2 border-red-200 ml-2' : ''}
                `}
              >
                <Icon size={18} className={isActive(item.href!) ? 'text-white' : item.iconColor} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut size={18} className="text-red-600" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-gray-900">Waviio</span>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
      </div>
    </div>
  );
};

export default DashboardLayout;