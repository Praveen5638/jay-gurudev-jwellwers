import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Award } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const Footer: React.FC = () => {
  const showcaseImages = [
    { url: "/images/bridal_necklace.jpg", alt: "Bridal Set" },
    { url: "/images/gold_bangles.jpg", alt: "Temple Bangles" },
    { url: "/images/silver_kada.jpg", alt: "Silver Kada" },
    { url: "/images/diamond_pendant.jpg", alt: "Diamond Solitaire" },
    { url: "/images/gold_jhumkas.jpg", alt: "Gold Jhumkas" },
    { url: "/images/men_ring.jpg", alt: "Men Gold Band" }
  ];

  return (
    <footer className="bg-brand-burgundy border-t border-brand-gold/30 pt-16 pb-8 select-none text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info Column */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center space-x-3.5 select-none group/logo">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-brand-gold shadow-gold-glow shrink-0 transition-transform duration-500 group-hover/logo:scale-105">
                <img
                  src="/images/gurudev_logo.png"
                  alt="Jay Gurudev Logo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-widest text-brand-gold leading-none">
                  JAY GURUDEV
                </span>
                <span className="text-[10px] tracking-[0.25em] text-brand-cream uppercase font-medium mt-0.5">
                  JEWELLERS
                </span>
              </div>
            </Link>
            <p className="text-brand-cream/70 text-sm sm:text-base leading-relaxed font-light font-body">
              वर्ष {BRAND_CONFIG.establishedYear} से प्रयागराज का सबसे प्रतिष्ठित और विश्वसनीय स्वर्ण आभूषण प्रतिष्ठान। शुद्धता, राजसी डिजाइन और अटूट विश्वास की परंपरा।
            </p>
            <div className="flex items-center space-x-2 text-brand-gold text-sm font-heading tracking-widest uppercase border border-brand-gold/20 p-3 bg-brand-burgundy/40 w-fit">
              <Award size={18} className="text-brand-gold" />
              <span>100% हॉलमार्क आभूषण</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-brand-gold font-semibold tracking-wider uppercase mb-6 border-b border-brand-gold/10 pb-2">
              त्वरित लिंक
            </h3>
            <ul className="space-y-3.5 text-sm sm:text-base font-body text-brand-cream/80">
              <li>
                <Link to="/" className="hover-gold-text">मुख्य पृष्ठ</Link>
              </li>
              <li>
                <Link to="/collection" className="hover-gold-text">आभूषण संग्रह</Link>
              </li>
              <li>
                <Link to="/about" className="hover-gold-text">हमारे बारे में</Link>
              </li>
              <li>
                <Link to="/contact" className="hover-gold-text">सम्पर्क करें</Link>
              </li>
              <li>
                <Link to="/admin" className="text-brand-cream/60 hover-gold-text flex items-center space-x-1">
                  <span>संचालक डैशबोर्ड</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Map Column */}
          <div className="space-y-6">
            <h3 className="font-heading text-base sm:text-lg text-brand-gold font-semibold tracking-wider uppercase border-b border-brand-gold/10 pb-2">
              शोरूम पधारें
            </h3>
            <ul className="space-y-3.5 text-sm sm:text-base font-body text-brand-cream/80">
              <li className="flex items-start space-x-2.5">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">{BRAND_CONFIG.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={16} className="text-brand-gold shrink-0" />
                <a href={`tel:${BRAND_CONFIG.phone}`} className="hover-gold-text">
                  {BRAND_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-brand-gold shrink-0" />
                <a href={`mailto:${BRAND_CONFIG.email}`} className="hover-gold-text">
                  {BRAND_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock size={16} className="text-brand-gold shrink-0" />
                <span>{BRAND_CONFIG.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Instagram Feed / Socials Column */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-brand-gold font-semibold tracking-wider uppercase mb-6 border-b border-brand-gold/10 pb-2">
              इंस्टाग्राम शोकेस
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {showcaseImages.map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden border border-brand-border/20 bg-brand-burgundy/40 aspect-square">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%234a0a12'/><text x='50%' y='55%' font-family='Marcellus' font-size='12' fill='%23D4AF37' text-anchor='middle'>GOLD</text></svg>";
                    }}
                  />
                  <div className="absolute inset-0 bg-brand-burgundy/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <svg className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream hover:text-brand-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href={BRAND_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream hover:text-brand-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Google Map Iframe Section */}
        <div className="w-full h-48 border border-brand-gold/25 mb-12 overflow-hidden bg-brand-burgundy/40">
          <iframe
            src={BRAND_CONFIG.googleMapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            title="Jay GURUDEV Jewellers Store Location"
          ></iframe>
        </div>

        {/* Bottom Banner Section */}
        <div className="border-t border-brand-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-brand-cream/60">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. सर्वाधिकार सुरक्षित। प्रयागराज में निर्मित।</p>
          <div className="flex items-center space-x-2.5 mt-4 sm:mt-0 select-none opacity-80">
            <span className="text-xs font-heading tracking-widest text-brand-gold font-semibold">संपर्क साधन</span>
            <div className="flex space-x-2.5 text-[11px] border border-brand-gold/15 px-3 py-1.5 bg-brand-burgundy/30 font-bold">
              <span>WHATSAPP</span>
              <span className="text-brand-gold">|</span>
              <span>DIRECT CALL</span>
              <span className="text-brand-gold">|</span>
              <span>SHOWROOM VISITING</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
