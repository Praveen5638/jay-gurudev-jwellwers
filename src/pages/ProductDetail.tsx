import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Heart, Award, ArrowLeft, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useApp();
  
  const product = products.find(p => p.id === id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const containerRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center select-none min-h-[70vh] flex flex-col justify-center items-center">
        <h2 className="font-heading text-3xl text-brand-burgundy font-bold">आभूषण नहीं मिला</h2>
        <p className="text-brand-black/60 text-sm sm:text-base mt-3 font-body">यह आभूषण बिक चुका है या संग्रह से हटा दिया गया है।</p>
        <Link to="/collection" className="gold-btn-outline inline-block mt-8 text-sm sm:text-base px-8 py-4">
          संग्रह पर वापस जाएं
        </Link>
      </div>
    );
  }

  // Invoice calculations
  const goldBasePrice = product.price;
  const makingChargesPrice = goldBasePrice * (product.makingCharges / 100);
  const subtotal = goldBasePrice + makingChargesPrice;
  const gst = subtotal * 0.03; 
  const finalPrice = subtotal + gst;

  // WhatsApp click composer
  const whatsappMsg = `नमस्ते जय गुरुदेव ज्वेलर्स, मुझे आपके आभूषण "${product.name}" (${product.purity}, वजन: ${product.weight} ग्राम) में रुचि है, जिसका मूल्य ₹${product.price.toLocaleString('en-IN')} है। कृपया इसकी उपलब्धता की पुष्टि करें।`;
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  // Circular Lens Zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setZoomStyle({
      display: 'block',
      left: `${x - 75}px`, 
      top: `${y - 75}px`,
      backgroundImage: `url(${product.images[activeImageIdx]})`,
      backgroundPosition: `${bgX}% ${bgY}%`,
      backgroundSize: `${width * 2.5}px ${height * 2.5}px` // 2.5x Zoom
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  return (
    <div className="pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative font-body">
      {/* Back link */}
      <Link to="/collection" className="inline-flex items-center space-x-2.5 text-sm sm:text-base tracking-wider text-brand-black/60 hover:text-brand-gold transition-colors mb-10 select-none font-bold">
        <ArrowLeft size={18} />
        <span className="font-heading uppercase text-sm">संग्रह पर वापस जाएं</span>
      </Link>

      {/* Main Column Splitter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* LEFT COLUMN: IMAGES & ZOOM */}
        <div className="lg:col-span-7 space-y-5 select-none">
          {/* Main Display Image */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative border border-brand-border bg-brand-cardBg aspect-square overflow-hidden cursor-crosshair group flex items-center justify-center shadow-gold-glow"
          >
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><rect width='600' height='600' fill='%23FAF6F0'/><text x='50%' y='55%' font-family='Marcellus' font-size='18' fill='%23D4AF37' text-anchor='middle'>${product.name}</text></svg>`;
              }}
            />

            {/* Circular lens overlay */}
            <div
              className="magnifier-lens"
              style={zoomStyle}
            />

            {/* Hover tip */}
            <span className="absolute bottom-4 left-4 bg-brand-burgundy/85 backdrop-blur-sm text-sm uppercase tracking-widest text-brand-gold px-4.5 py-2 border border-brand-gold/30 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity font-heading font-bold">
              ज़ूम करने के लिए माउस लाएं (2.5x)
            </span>
          </div>

          {/* Thumbnails Row */}
          <div className="flex space-x-4 overflow-x-auto scrollbar-none">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-24 aspect-square border overflow-hidden bg-brand-cardBg shrink-0 transition-all ${
                  activeImageIdx === idx ? 'border-brand-gold shadow-gold-glow' : 'border-brand-border/60 hover:border-brand-gold/40'
                }`}
              >
                <img
                  src={img}
                  alt={`thumbnail-${idx}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23FAF6F0'/><text x='50%' y='55%' font-family='Marcellus' font-size='10' fill='%23D4AF37' text-anchor='middle'>IMG</text></svg>`;
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SPECS & ACTIONS */}
        <div className="lg:col-span-5 space-y-8">
          {/* Category & Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-between select-none">
              <span className="text-sm text-brand-gold tracking-[0.25em] uppercase font-heading font-bold border border-brand-gold/30 px-4.5 py-2.5 bg-brand-burgundy shadow-sm">
                {product.category}
              </span>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2.5 border border-brand-border hover:border-brand-gold transition-colors ${
                  isFavorite ? 'text-red-500 border-red-500 bg-red-50' : 'text-brand-black/80'
                }`}
                aria-label="Add to Favorites"
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold font-heading text-brand-burgundy leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price Tag */}
          <div className="border-y border-brand-border/40 py-6 space-y-2">
            <div className="flex items-baseline space-x-3.5 flex-wrap gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-brand-darkGold font-body">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-sm sm:text-base text-brand-black/60 uppercase tracking-widest font-heading select-none font-bold">(मेकिंग और टैक्स रहित)</span>
            </div>
            <p className="text-sm sm:text-base text-brand-black/75 select-none font-body leading-relaxed">
              अनुमानित कुल मूल्य: <span className="font-bold text-brand-black text-base sm:text-lg">₹{Math.round(finalPrice).toLocaleString('en-IN')}</span> ({product.makingCharges}% मेकिंग और 3% GST सहित)
            </p>
          </div>

          {/* Metallurgy Specs */}
          <div className="grid grid-cols-2 gap-5 border-b border-brand-border/40 pb-8 text-sm select-none">
            <div className="bg-brand-cardBg border border-brand-border/60 shadow-sm p-4.5 space-y-1.5">
              <span className="text-brand-black/50 text-xs sm:text-sm uppercase tracking-wider font-bold">शुद्ध वजन</span>
              <p className="font-bold text-brand-black text-lg sm:text-xl font-heading">{product.weight} ग्राम</p>
            </div>
            <div className="bg-brand-cardBg border border-brand-border/60 shadow-sm p-4.5 space-y-1.5">
              <span className="text-brand-black/50 text-xs sm:text-sm uppercase tracking-wider font-bold">स्वर्ण शुद्धता</span>
              <p className="font-bold text-brand-black text-lg sm:text-xl font-heading">{product.purity}</p>
            </div>
            <div className="bg-brand-cardBg border border-brand-border/60 shadow-sm p-4.5 space-y-1.5">
              <span className="text-brand-black/50 text-xs sm:text-sm uppercase tracking-wider font-bold">मेकिंग चार्जेस</span>
              <p className="font-bold text-brand-black text-lg sm:text-xl font-heading">{product.makingCharges}% मेकिंग चार्ज</p>
            </div>
            <div className="bg-brand-cardBg border border-brand-border/60 shadow-sm p-4.5 space-y-1.5">
              <span className="text-brand-black/50 text-xs sm:text-sm uppercase tracking-wider font-bold">स्टॉक में उपलब्धता</span>
              <p className={`font-bold font-heading text-lg sm:text-xl ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `उपलब्ध (${product.stock} नग)` : 'स्टॉक में नहीं'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm sm:text-base tracking-widest text-brand-gold uppercase font-bold select-none border-b border-brand-border/30 pb-2">
              आभूषण की कहानी और कारीगरी
            </h3>
            <p className="text-brand-black/75 text-base sm:text-lg leading-relaxed font-light font-body">
              {product.description}
            </p>
          </div>

          {/* Actions Area */}
          <div className="pt-4 space-y-4 font-heading">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Primary WhatsApp Inquiry */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2.5 bg-[#1FAF38] hover:bg-[#1C9631] text-brand-white font-bold py-5 uppercase tracking-widest text-base transition-colors duration-300 w-full cursor-pointer shadow-md"
              >
                <MessageCircle size={20} />
                <span>WhatsApp पूछताछ</span>
              </a>

              {/* Call Room */}
              <a
                href={`tel:${BRAND_CONFIG.phone}`}
                className="gold-btn flex items-center justify-center space-x-2.5 text-base sm:text-lg py-5 w-full cursor-pointer shadow-md"
              >
                <PhoneCall size={18} className="animate-pulse" />
                <span>शोरूम में कॉल करें</span>
              </a>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="border border-brand-border/60 bg-brand-cardBg shadow-sm p-6 space-y-4 text-sm select-none">
            <div className="flex items-center space-x-4">
              <ShieldCheck size={22} className="text-brand-gold shrink-0" />
              <p className="text-sm sm:text-base font-light text-brand-black/80 leading-normal font-body">
                <span className="font-bold text-brand-darkGold">100% BIS हॉलमार्क शुद्धता:</span> हमारे शोरूम में सोने की शुद्धता डिजिटल कैरटमीटर द्वारा 100% पारदर्शी तरीके से जांची जाती है।
              </p>
            </div>
            <div className="flex items-center space-x-4 border-t border-brand-border/20 pt-4">
              <Award size={22} className="text-brand-gold shrink-0" />
              <p className="text-sm sm:text-base font-light text-brand-black/80 leading-normal font-body">
                <span className="font-semibold text-brand-darkGold">सुरक्षित वैवाहिक ऑर्डर:</span> आप अपनी पसंद के किसी भी आभूषण को सुरक्षित बुक कर सकते हैं तथा हमारे स्टोर में आकर व्यक्तिगत बदलाव करवा सकते हैं।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
