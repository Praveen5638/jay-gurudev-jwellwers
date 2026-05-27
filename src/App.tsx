import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './admin/AdminDashboard';

// Helper component to scroll window to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-brand-darkBg text-brand-black selection:bg-brand-gold selection:text-brand-burgundy">
          {/* Header Navigation */}
          <Navbar />
          
          {/* Main Showcase Routes */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Fallback Catch-All */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          
          {/* Floating Actions */}
          <WhatsAppButton />
          
          {/* Footer Contacts & Maps */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
