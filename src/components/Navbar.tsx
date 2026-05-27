import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, ShieldAlert, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';

export const Navbar: React.FC = () => {
  const { promoBanner } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "मुख्य पृष्ठ", path: "/" },
    { name: "आभूषण संग्रह", path: "/collection" },
    { name: "हमारे बारे में", path: "/about" },
    { name: "सम्पर्क करें", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 w-full z-50 shadow-md">
      {/* Dynamic Top Promotion Bar */}
      {promoBanner && (
        <div className="bg-brand-gold text-brand-burgundy text-center text-sm py-3 px-4 overflow-hidden select-none font-bold">
          <div className="inline-block animate-pulse-slow font-heading tracking-widest uppercase text-sm sm:text-base lg:text-[18px]">
            {promoBanner}
          </div>
        </div>
      )}

      {/* Main Luxury Navbar */}
      <nav
        className={`w-full relative transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-brand-burgundy/95 backdrop-blur-md py-4 border-brand-gold/20 shadow-md'
            : 'bg-brand-burgundy/80 backdrop-blur-sm py-5 border-brand-gold/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3.5 select-none group/logo">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-brand-gold shadow-gold-glow shrink-0 transition-transform duration-500 group-hover/logo:scale-105">
                <img
                  src="/images/gurudev_logo.png"
                  alt="Jay Gurudev Logo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-heading text-xl sm:text-2xl lg:text-[28px] font-bold tracking-widest text-brand-gold leading-none">
                  JAY GURUDEV
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.25em] text-brand-cream uppercase font-bold mt-1">
                  JEWELLERS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-heading text-[16px] lg:text-[18px] tracking-wider uppercase transition-colors duration-300 py-1.5 font-bold ${
                    isActive(link.path)
                      ? 'text-brand-gold'
                      : 'text-brand-cream/80 hover:text-brand-gold'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-brand-gold animate-pulse" />
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Actions (Hallmark Badge, Admin panel, Mobile Toggle) */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Trust Badge (Desktop Only) */}
              <div className="hidden lg:flex items-center space-x-2.5 text-brand-gold text-sm sm:text-base tracking-wide border border-brand-gold/30 px-4 py-2.5 bg-brand-burgundy/40 font-bold">
                <Award size={18} className="text-brand-gold animate-pulse shrink-0" />
                <span>100% हॉलमार्क सोना</span>
              </div>

              {/* Admin Panel Direct Link */}
              <Link
                to="/admin"
                className={`hidden sm:inline-flex items-center space-x-1.5 border px-4.5 py-3 text-sm font-heading tracking-widest uppercase transition-all duration-300 font-bold ${
                  isActive('/admin')
                    ? 'border-brand-gold bg-brand-gold text-brand-burgundy'
                    : 'border-brand-gold/30 bg-transparent text-brand-cream/80 hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                <ShieldAlert size={16} />
                <span>संचालक</span>
              </Link>

              {/* Phone Quick Inquiry Button (Desktop Only) */}
              <a
                href={`tel:${BRAND_CONFIG.phone}`}
                className="hidden lg:inline-flex items-center space-x-2 text-base text-brand-burgundy bg-brand-gold hover:bg-brand-white border border-transparent px-5 py-3 transition-all duration-300 tracking-wider font-heading font-bold"
              >
                <PhoneCall size={16} className="text-brand-burgundy animate-bounce shrink-0" />
                <span>कॉल करें</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-1 text-brand-cream hover:text-brand-gold transition-colors duration-300 cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-brand-burgundy/98 backdrop-blur-lg border-b border-brand-gold/20 transition-all duration-300 ease-in-out z-40 ${
            isOpen ? 'opacity-100 max-h-screen py-8 shadow-md' : 'opacity-0 max-h-0 py-0 overflow-hidden'
          }`}
        >
          <div className="px-6 space-y-6 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-heading text-lg sm:text-xl tracking-wider uppercase py-3 border-b border-brand-gold/10 transition-colors font-bold ${
                  isActive(link.path)
                    ? 'text-brand-gold'
                    : 'text-brand-cream/80 hover:text-brand-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className={`flex items-center justify-center space-x-2 border py-4.5 font-heading text-base tracking-widest uppercase transition-all duration-300 font-bold ${
                isActive('/admin')
                  ? 'border-brand-gold bg-brand-gold text-brand-burgundy'
                  : 'border-brand-gold/30 bg-transparent text-brand-cream hover:border-brand-gold'
              }`}
            >
              <ShieldAlert size={18} />
              <span>संचालक डैशबोर्ड</span>
            </Link>
            <div className="flex items-center justify-between text-base text-brand-cream/60 pt-6 px-1">
              <span>{BRAND_CONFIG.workingHours}</span>
              <a href={`tel:${BRAND_CONFIG.phone}`} className="text-brand-gold font-bold text-lg">
                {BRAND_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
