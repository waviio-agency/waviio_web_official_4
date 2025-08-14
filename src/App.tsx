import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import SiteLoading from './components/Loading/SiteLoading';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ServiceDetail from './pages/ServiceDetail';
import MentionsLegales from './pages/MentionsLegales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import ConditionsGenerales from './pages/ConditionsGenerales';
import Profile from './pages/Dashboard/Profile';
import Password from './pages/Dashboard/Password';
import Security from './pages/Dashboard/Security';
import Website from './pages/Dashboard/Website';
import Revisions from './pages/Dashboard/Revisions';
import Support from './pages/Dashboard/Support';
import Stats from './pages/Dashboard/Stats';
import Orders from './pages/Dashboard/Orders';
import AdminClients from './pages/Dashboard/AdminClients';
import AdminMessages from './pages/Dashboard/AdminMessages';
import AdminForms from './pages/Dashboard/AdminForms';
import AdminTickets from './pages/Dashboard/AdminTickets';
import PaymentSuccess from './pages/PaymentSuccess';
import Products from './pages/Products';
import ForgotPassword from './pages/ForgotPassword';
import ServicesLayout from './components/ServicesLayout';
import WebDesignPage from './pages/services/webdesign/page';
import SEOPage from './pages/services/seo/page';
import PerformancePage from './pages/services/performance/page';
import ECommercePage from './pages/services/ecommerce/page';
import MaintenancePage from './pages/services/maintenance/page';

function App() {
  const [showSiteLoading, setShowSiteLoading] = useState(true);

  // Show site loading on initial app load, then show app
  if (showSiteLoading) {
    return <SiteLoading onComplete={() => setShowSiteLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        {/* Auth routes - no layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Dashboard routes - no layout */}
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/password" element={
          <ProtectedRoute>
            <Password />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/security" element={
          <ProtectedRoute>
            <Security />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/website" element={
          <ProtectedRoute>
            <Website />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/revisions" element={
          <ProtectedRoute>
            <Revisions />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/support" element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/dashboard/admin/stats" element={
          <ProtectedRoute requireAdmin>
            <Stats />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/clients" element={
          <ProtectedRoute requireAdmin>
            <AdminClients />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/messages" element={
          <ProtectedRoute requireAdmin>
            <AdminMessages />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/tickets" element={
          <ProtectedRoute requireAdmin>
            <AdminTickets />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/forms" element={
          <ProtectedRoute requireAdmin>
            <AdminForms />
          </ProtectedRoute>
        } />
        
        {/* Public routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="mentions-legales" element={<MentionsLegales />} />
          <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="produits" element={<Products />} />
          <Route path="produits2" element={<Products />} />
        </Route>
        
        {/* Services routes with ServicesLayout */}
        <Route path="/services" element={<ServicesLayout />}>
          <Route path="webdesign" element={<WebDesignPage />} />
          <Route path="seo" element={<SEOPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="ecommerce" element={<ECommercePage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
        </Route>
        
        {/* Special routes without layout */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-success/:service" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;