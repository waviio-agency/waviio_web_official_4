import React from 'react';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);

  // Listen for banner state changes
  useEffect(() => {
    const handleBannerChange = () => {
      // This is a simple way to sync banner state
      // In a real app, you might use context or state management
    };
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${showBanner ? 'pt-24' : 'pt-16'}`}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;