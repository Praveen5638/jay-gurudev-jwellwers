import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Clock, Hammer, Gem, Sparkles, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';
import { TESTIMONIALS } from '../data/products';

export const Home: React.FC = () => {
  const { products } = useApp();
  const trendingProducts = products.filter(p => p.featured).slice(0, 6);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Slider State & Data
  const slides = [
    {
      badge: "शाही विवाह संकलन",
      title1: "हर दुल्हन का राजसी सपना",
      titleGold: "शान और अटूट विश्वास",
      desc: "शुद्धता और बेजोड़ नक्काशी का दिव्य संगम। हमारे यहाँ कुंदन, अनकट पोलकी और देवघाटी नक्काशीदार ब्राइडल सेट्स 100% BIS हॉलमार्क शुद्धता के साथ विशेष रूप से तैयार किए जाते हैं।",
      image: "/images/slider/slide_bridal.png",
      link: "/collection?category=विवाह%20आभूषण",
      whatsappText: "नमस्ते जय गुरुदेव ज्वेलर्स, मैं शाही विवाह संकलन (ब्राइडल सेट्स) के बारे में जानकारी प्राप्त करना चाहता हूँ।"
    },
    {
      badge: "कस्टम राजसी कारीगरी",
      title1: "22 कैरेट शुद्धता की विरासत",
      titleGold: "परंपरा का सच्चा प्रतीक",
      desc: "30 वर्षों से प्रयागराज का सबसे विश्वसनीय स्वर्ण घराना। बारीक नक्काशीदार सोने के कंगन, पारंपरिक झुमके और कड़े आपकी विशिष्ट पसंद के अनुसार हस्तनिर्मित किए जाते हैं।",
      image: "/images/slider/slide_gold.png",
      link: "/collection?category=स्वर्ण%20आभूषण",
      whatsappText: "नमस्ते जय गुरुदेव ज्वेलर्स, मैं आपके 22K एंटीक और पारंपरिक स्वर्ण आभूषण संग्रह के बारे में जानकारी प्राप्त करना चाहता हूँ।"
    },
    {
      badge: "सुरुचिपूर्ण हीरा संकलन",
      title1: "हर दिन चमकें आपका रूप",
      titleGold: "आधुनिक और शाश्वत",
      desc: "अत्याधुनिक और सुरुचिपूर्ण हीरे के सॉलिटेयर पेंडेंट, आकर्षक अंगूठियां और आधुनिक डिजाइन वाले दैनिक आभूषण जो हर अवसर पर आपकी सुंदरता को चार चांद लगा दें।",
      image: "/images/slider/slide_diamond.png",
      link: "/collection?category=नित्य%20धारण",
      whatsappText: "नमस्ते जय गुरुदेव ज्वेलर्स, मैं आपके हीरे के पेंडेंट और नित्य धारण (Daily Wear) संकलन के बारे में जानकारी प्राप्त करना चाहता हूँ।"
    },
    {
      badge: "92.5 स्टर्लिंग चांदी",
      title1: "पारंपरिक चांदी के कड़े और पायल",
      titleGold: "भव्य विरासत और शैली",
      desc: "आधुनिकता और लोक-संस्कृति का अनूठा संगम। देवघाट की पारंपरिक चांदी की पायलें, भारी कड़े और उत्कृष्ट रजत उपहार आभूषण जो पीढ़ियों की गरिमा को संजोए रखें।",
      image: "/images/slider/slide_silver.png",
      link: "/collection?category=रजत%20आभूषण",
      whatsappText: "नमस्ते जय गुरुदेव ज्वेलर्स, मैं आपके 92.5 स्टर्लिंग चांदी के पारंपरिक कड़े और पायलों के बारे में जानकारी प्राप्त करना चाहता हूँ।"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isAutoplay) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoplay, slides.length]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const categories = [
    {
      name: "विवाह आभूषण",
      tagline: "राजसी विवाह एवं पोल्की सेट",
      image: "/images/bridal_necklace.jpg",
      path: "/collection?category=विवाह%20आभूषण"
    },
    {
      name: "स्वर्ण आभूषण",
      tagline: "22K एंटीक मंदिर आभूषण",
      image: "/images/gold_bangles.jpg",
      path: "/collection?category=स्वर्ण%20आभूषण"
    },
    {
      name: "रजत आभूषण",
      tagline: "92.5 पारंपरिक चांदी",
      image: "/images/silver_kada.jpg",
      path: "/collection?category=रजत%20आभूषण"
    },
    {
      name: "नित्य धारण",
      tagline: "सुरुचिपूर्ण हीरे के सॉलिटेयर",
      image: "/images/diamond_pendant.jpg",
      path: "/collection?category=नित्य%20धारण"
    },
    {
      name: "पुरुष कलेक्शन",
      tagline: "राजसी अंगूठियां और भारी कड़े",
      image: "/images/men_ring.jpg",
      path: "/collection?category=पुरुष%20कलेक्शन"
    }
  ];

  return (
    <div className="w-full relative pt-0">
      {/* 1. HERO SLIDER SECTION */}
      <section 
        className="relative h-[calc(100vh-140px)] min-h-[500px] lg:h-[calc(100vh-150px)] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
      >
        {/* Slides Images Wrapper */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
                idx === currentSlide 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-105 z-0'
              }`}
            >
              {/* Luxury Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-burgundy via-brand-burgundy/80 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darkBg via-transparent to-transparent z-10" />
              
              <img
                src={slide.image}
                alt={slide.title1}
                className="w-full h-full object-cover opacity-75"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'><defs><radialGradient id='g' cx='50%' cy='50%' r='70%'><stop offset='0%' stop-color='%234a0a12'/><stop offset='100%' stop-color='%231a1510'/></radialGradient></defs><rect width='1920' height='1080' fill='url(%23g)'/><text x='50%' y='50%' font-family='Marcellus' font-size='48' fill='%23D4AF37' text-anchor='middle'>JAY GURUDEV JEWELLERS</text><text x='50%' y='56%' font-family='Outfit' font-size='24' fill='%23FAF5EC' text-anchor='middle' opacity='0.7'>Civil Lines, Prayagraj</text></svg>";
                }}
              />
            </div>
          ))}
        </div>

        {/* Slides Content Box */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-left py-10 sm:py-16">
          {slides.map((slide, idx) => idx === currentSlide && (
            <div key={idx} className="max-w-3xl space-y-4 sm:space-y-6 fade-in-up">
              {/* Badge with Sparkles */}
              <div className="inline-flex items-center space-x-2 border border-brand-gold/45 px-4 py-2 sm:px-5 sm:py-3 bg-brand-burgundy/90 backdrop-blur-sm text-brand-gold text-xs sm:text-sm tracking-widest uppercase font-heading select-none font-bold">
                <Sparkles size={14} className="animate-spin-slow text-brand-gold shrink-0" />
                <span>{slide.badge}</span>
              </div>
              
              {/* Main Royal Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold text-brand-white leading-tight font-heading">
                {slide.title1} <br className="hidden sm:inline" />
                <span className="text-gold-gradient font-black">{slide.titleGold}</span>
              </h1>
              
              {/* Premium Description */}
              <p className="text-brand-cream text-sm sm:text-base md:text-lg lg:text-[19px] font-light leading-relaxed max-w-2xl font-body">
                {slide.desc}
              </p>

              {/* Slider CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 pt-2 sm:pt-4">
                <Link to={slide.link} className="gold-btn text-center flex items-center justify-center space-x-3 py-3.5 sm:py-4 px-6 sm:px-8 text-sm sm:text-base lg:text-lg font-bold">
                  <span>संग्रह देखें</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappPhone}?text=${encodeURIComponent(slide.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-[#1FAF38] hover:bg-[#1C9631] text-brand-white font-heading text-xs sm:text-sm lg:text-base font-bold py-3.5 sm:py-4 px-6 sm:px-8 tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] shadow-md cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>व्हाट्सएप पूछताछ</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Navigation Arrows (Glassmorphism & Gold hover) */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3.5 border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-burgundy/60 text-brand-cream hover:text-brand-gold transition-all bg-brand-burgundy/30 backdrop-blur-md rounded-full shadow-lg cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3.5 border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-burgundy/60 text-brand-cream hover:text-brand-gold transition-all bg-brand-burgundy/30 backdrop-blur-md rounded-full shadow-lg cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2 sm:space-x-3 bg-brand-burgundy/40 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-brand-gold/15 select-none">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide 
                  ? 'bg-brand-gold w-6 sm:w-8 shadow-gold-glow' 
                  : 'bg-brand-cream/45 hover:bg-brand-cream/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Soft Golden Aura */}
        <div className="absolute right-0 top-1/4 w-96 h-96 radial-gold-glow pointer-events-none z-10" />
      </section>

      {/* 2. WEDDING SET SPECIAL DISCOUNT SECTION */}
      <section className="py-24 px-4 bg-brand-cream/70 border-b border-brand-border/40 select-none text-left">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="border border-brand-gold/40 bg-brand-white p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-gold-glow-lg relative overflow-hidden">
            
            {/* Elegant Royal Border Decoration */}
            <div className="absolute top-0 left-0 w-2.5 h-full bg-brand-burgundy" />
            <div className="absolute top-0 right-0 w-2.5 h-full bg-brand-burgundy" />

            <div className="space-y-6 max-w-3xl">
              <div className="inline-flex items-center space-x-2 border border-brand-burgundy/25 px-4.5 py-2.5 bg-brand-burgundy/5 text-brand-burgundy text-xs sm:text-sm tracking-widest uppercase font-heading font-bold">
                <Sparkles size={16} className="text-brand-gold animate-bounce shrink-0" />
                <span>शादी सीजन विशेष धमाका</span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-bold font-heading text-brand-burgundy leading-tight">
                पूरा ब्राइडल सेट खरीदने पर <br />
                <span className="text-brand-darkGold">विशेष शाही छूट और उपहार!</span>
              </h2>
              
              <p className="text-brand-black/85 text-base sm:text-lg leading-relaxed font-light font-body">
                विवाह के पावन अवसर पर अपने परिवार के लिए खरीदें संपूर्ण विवाह आभूषण सेट (गले का चोकर हार + झुमकी झुमका + मंगलसूत्र + बाजूबंद + बारीक नक्काशीदार कंगन/पायल) और प्राप्त करें मेकिंग चार्जेस पर <strong>विशेष छूट</strong> एवं सुनिश्चित आकर्षक उपहार।
              </p>

              <div className="flex flex-wrap gap-4 text-sm sm:text-base font-heading font-bold select-none text-brand-burgundy pt-2">
                <div className="bg-brand-cream border border-brand-gold/35 px-4.5 py-2.5">
                  ✓ 100% BIS हॉलमार्क शुद्धता
                </div>
                <div className="bg-brand-cream border border-brand-gold/35 px-4.5 py-2.5">
                  ✓ कस्टम डिजाइन सुविधा
                </div>
                <div className="bg-brand-cream border border-brand-gold/35 px-4.5 py-2.5">
                  ✓ पारदर्शी बिलिंग
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-fit flex flex-col gap-6 text-center items-stretch justify-center">
              <div className="border border-brand-gold/45 p-8 bg-brand-cream/40 flex flex-col justify-center items-center gap-2">
                <span className="text-sm text-brand-black/60 uppercase tracking-widest font-heading font-bold">अनुमानित ऑफर लाभ</span>
                <span className="text-6xl sm:text-7xl font-bold font-heading text-brand-burgundy">10% - 15%</span>
                <span className="text-xs sm:text-sm text-brand-darkGold font-bold uppercase tracking-wider">मेकिंग चार्ज में विशेष छूट</span>
              </div>
              
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappPhone}?text=नमस्ते%20जय%20गुरुदेव%20ज्वेलर्स%2C%20मैं%20शादी%20के%20विशेष%20फुल%20ब्राइडल%20सेट%20ऑफर%20और%20डिस्काउंट%20के%20बारे%20में%20जानकारी%20चाहता%20हूँ।`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#1FAF38] hover:bg-[#1C9631] text-brand-white font-heading text-sm sm:text-base font-bold py-5 px-10 uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                <MessageCircle size={20} />
                <span>अभी डिस्काउंट पूछें</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION */}
      <section className="py-24 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 border-b border-brand-border/40">
        <div className="text-center space-y-4 mb-20 select-none">
          <span className="text-sm text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">शाही चयन</span>
          <h2 className="text-5xl sm:text-6xl font-bold font-heading text-brand-burgundy">श्रेणी अनुसार आभूषण</h2>
          <div className="w-20 h-[2px] bg-brand-gold mx-auto" />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className={`relative overflow-hidden group aspect-[4/3] border border-brand-border/50 glass-card glass-card-hover ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy via-brand-burgundy/40 to-transparent z-10 transition-colors duration-300 group-hover:bg-brand-burgundy/70" />
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%234a0a12'/><text x='50%' y='55%' font-family='Marcellus' font-size='16' fill='%23D4AF37' text-anchor='middle'>${cat.name}</text></svg>`;
                  }}
                />
              </div>

              {/* Category Details */}
              <div className="absolute bottom-0 left-0 w-full p-8 sm:p-10 z-20 space-y-2 text-left">
                <span className="text-sm sm:text-base tracking-widest text-brand-gold uppercase font-heading font-bold">
                  {cat.tagline}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold font-heading text-brand-white group-hover:text-brand-cream transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm sm:text-base text-brand-gold tracking-widest uppercase font-bold pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 font-heading">
                  <span>संग्रह देखें</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. TRENDING COLLECTION SHOWCASE */}
      <section className="py-24 bg-brand-cream/35 border-b border-brand-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-20 gap-6 select-none">
            <div className="space-y-3 text-left">
              <span className="text-sm text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">लोकप्रिय आभूषण</span>
              <h2 className="text-5xl sm:text-6xl font-bold font-heading text-brand-burgundy">आज की विशेष पसंद</h2>
              <div className="w-20 h-[2px] bg-brand-gold" />
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-4">
              <button
                onClick={slideLeft}
                className="p-4 border border-brand-border text-brand-black hover:border-brand-gold hover:text-brand-gold transition-colors bg-brand-cardBg shadow-sm rounded-none cursor-pointer"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={slideRight}
                className="p-4 border border-brand-border text-brand-black hover:border-brand-gold hover:text-brand-gold transition-colors bg-brand-cardBg shadow-sm rounded-none cursor-pointer"
                aria-label="Scroll Right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider content */}
          <div
            ref={sliderRef}
            className="flex space-x-8 overflow-x-auto scrollbar-none pb-8 select-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingProducts.map((product) => (
              <div key={product.id} className="min-w-[300px] sm:min-w-[340px] snap-start">
                <div className="border border-brand-border bg-brand-cardBg shadow-sm hover:shadow-md hover:border-brand-gold/40 transition-all duration-300 group flex flex-col h-full">
                  
                  {/* Image */}
                  <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square border-b border-brand-border/40 block">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23faf6ee'/><text x='50%' y='55%' font-family='Marcellus' font-size='14' fill='%23D4AF37' text-anchor='middle'>${product.name}</text></svg>`;
                      }}
                    />
                    {product.featured && (
                      <span className="absolute top-3 left-3 bg-brand-gold text-brand-burgundy text-xs uppercase tracking-widest font-heading px-3.5 py-1.5 font-bold animate-pulse">
                        लोकप्रिय
                      </span>
                    )}
                  </Link>

                  {/* Card details */}
                  <div className="p-6 flex flex-col justify-between flex-grow text-left">
                    <div className="space-y-2">
                      <span className="text-sm tracking-wider text-brand-darkGold uppercase font-heading font-bold">
                        {product.purity} • {product.weight} ग्राम
                      </span>
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-burgundy group-hover:text-brand-gold transition-colors duration-300 truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-brand-darkGold font-bold text-lg sm:text-xl font-body">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-brand-border/20 mt-4 flex items-center justify-between">
                      <Link
                        to={`/product/${product.id}`}
                        className="text-sm sm:text-base tracking-widest font-heading text-brand-black hover:text-brand-gold uppercase transition-colors font-bold"
                      >
                        डिजाइन देखें
                      </Link>
                      
                      <a
                        href={`https://wa.me/${BRAND_CONFIG.whatsappPhone}?text=नमस्ते%20जय%20गुरुदेव%20ज्वेलर्स%2C%20मुझे%20${encodeURIComponent(product.name)}%20(वजन%3A%20${product.weight}g)%20के%20बारे%20में%20पूछताछ%20करनी%20है।`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 border border-[#1FAF38] text-[#1FAF38] hover:bg-[#1FAF38]/10 px-4 py-2.5 text-sm font-heading font-bold uppercase tracking-widest transition-colors duration-300"
                      >
                        <MessageCircle size={16} />
                        <span>पूछताछ</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRIDAL SHOWCASE SECTION */}
      <section className="py-28 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 border-b border-brand-border/40 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Showcase visual */}
          <div className="relative aspect-[4/5] border border-brand-gold/20 overflow-hidden group shadow-gold-glow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy via-brand-burgundy/30 to-transparent z-10" />
            <img
              src="/images/bridal_necklace_model.jpg"
              alt="Bridal Model"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='600' viewBox='0 0 500 600'><rect width='500' height='600' fill='%234a0a12'/><text x='50%' y='50%' font-family='Marcellus' font-size='20' fill='%23D4AF37' text-anchor='middle'>BRIDAL SHOWCASE</text></svg>";
              }}
            />
            <div className="absolute bottom-8 left-8 z-20 space-y-1.5 select-none">
              <span className="text-sm text-brand-gold uppercase tracking-[0.25em] font-heading font-bold">विशिष्ट संकलन</span>
              <h3 className="text-3xl sm:text-4xl font-bold font-heading text-brand-white">शाही विवाह परंपरा</h3>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8 lg:pl-4">
            <div className="space-y-4 select-none">
              <span className="text-sm text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">अद्वितीय कलाकृति</span>
              <h2 className="text-5xl sm:text-6xl font-bold font-heading leading-tight text-brand-burgundy">
                पारंपरिक मांगलिक चोकर सेट
              </h2>
              <div className="w-20 h-[2px] bg-brand-gold" />
            </div>

            <p className="text-brand-black/85 text-lg leading-relaxed font-light font-body">
              प्रत्येक दुल्हन की राजसी कल्पना को साकार करता हमारा पारंपरिक विवाह संग्रह। 22K शुद्ध सोने के आधार पर कुंदन और अनकट पोलकी हीरों के कुशल सजावट से तैयार।
            </p>
            
            <p className="text-brand-black/85 text-lg leading-relaxed font-light font-body">
              प्रयागराज के वरिष्ठ स्वर्णकारों द्वारा पूर्ण समर्पण से हस्तनिर्मित। प्रत्येक विवाह चोकर सेट को तैयार करने में 40 से 120 घंटे तक की सूक्ष्म कारीगरी समाहित होती है।
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 select-none">
              <div className="border-l-2 border-brand-gold pl-4 space-y-1.5">
                <h4 className="text-3xl font-bold font-heading text-brand-burgundy">100%</h4>
                <p className="text-xs sm:text-sm text-brand-black/60 uppercase tracking-wider font-heading font-bold">BIS प्रमाणित शुद्धता</p>
              </div>
              <div className="border-l-2 border-brand-gold pl-4 space-y-1.5">
                <h4 className="text-3xl font-bold font-heading text-brand-burgundy">कस्टम</h4>
                <p className="text-xs sm:text-sm text-brand-black/60 uppercase tracking-wider font-heading font-bold">व्यक्तिगत डिजाइन सेवा</p>
              </div>
            </div>

            <div className="pt-6">
              <Link to="/collection?category=विवाह%20आभूषण" className="gold-btn inline-flex items-center space-x-2 py-5 px-10 text-base sm:text-lg font-bold">
                <span>विवाह संकलन देखें</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-brand-border/40">
        <div className="text-center space-y-4 mb-20 select-none">
          <span className="text-sm text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">हमारे मूल्य</span>
          <h2 className="text-5xl sm:text-6xl font-bold font-heading text-brand-burgundy">शान और विश्वास का प्रतीक</h2>
          <div className="w-20 h-[2px] bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <ShieldCheck size={36} className="text-brand-burgundy" />,
              title: "BIS प्रमाणित शुद्धता",
              desc: "हमारे सभी स्वर्ण आभूषण सरकार द्वारा अनुमोदित हॉलमार्किंग और पारदर्शी HUID कोड के साथ आते हैं।"
            },
            {
              icon: <Clock size={36} className="text-brand-burgundy" />,
              title: "30 वर्षों का विश्वास",
              desc: "प्रयागराज में वर्ष 1995 से स्वर्ण आभूषणों में परिवारों का भरोसेमंद और सच्चा स्वर्ण साथी।"
            },
            {
              icon: <Hammer size={36} className="text-brand-burgundy" />,
              title: "कस्टम कारीगरी",
              desc: "आपकी निजी पसंद और मांग के अनुसार आभूषणों का bespoke (निजीकृत) निर्माण।"
            },
            {
              icon: <Gem size={36} className="text-brand-burgundy" />,
              title: "पारदर्शी मूल्य",
              desc: "बिना किसी छिपे शुल्क के सोने के वजन, दर और मेकिंग चार्ज का स्पष्ट बिल विवरण।"
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-brand-border/60 p-8 bg-brand-cardBg shadow-sm hover:shadow-md transition-all text-left space-y-4">
              <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-cream">
                {item.icon}
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-burgundy">{item.title}</h3>
              <p className="text-brand-black/75 text-base sm:text-lg leading-relaxed font-light font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="py-24 bg-brand-cream/15 border-b border-brand-border/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20 select-none">
            <span className="text-sm text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">अनुभव</span>
            <h2 className="text-5xl sm:text-6xl font-bold font-heading text-brand-burgundy">ग्राहकों का विश्वास</h2>
            <div className="w-20 h-[2px] bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="border border-brand-border/60 p-8 bg-brand-cardBg shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left space-y-6">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex space-x-1.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-brand-black/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light italic font-body">
                    "{item.text}"
                  </p>
                </div>
                
                <div className="border-t border-brand-border/20 pt-4 flex justify-between items-center text-sm">
                  <span className="font-heading text-brand-burgundy font-bold text-[17px]">{item.name}</span>
                  <span className="text-brand-darkGold uppercase tracking-widest text-[11px] sm:text-xs font-heading font-bold">{item.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER */}
      <section className="relative py-24 border-b border-brand-gold/20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-burgundy/95 z-10" />
          <div className="absolute inset-0 bg-gold-gradient opacity-5 animate-pulse-slow" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-heading text-brand-gold font-bold leading-normal">
            अपना पसंदीदा डिज़ाइन अभी WhatsApp पर पूछें
          </h2>
          <p className="text-brand-cream/80 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-body leading-relaxed">
            किसी भी आभूषण का स्क्रीनशॉट हमारे साथ व्हाट्सएप पर साझा करें और हमारे आभूषण सलाहकारों से सीधे मूल्य और वजन का अनुमान प्राप्त करें।
          </p>
          <div className="pt-4">
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappPhone}?text=नमस्ते%20जय%20गुरुदेव%20ज्वेलर्स%2C%20मैं%20अपनी%20पसंद%20के%20आभूषण%20का%20चित्र%20साझा%20करके%20मूल्य%20पूछना%20चाहता%20हूँ।`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 bg-[#1FAF38] hover:bg-[#1C9631] text-brand-white font-heading text-base sm:text-lg lg:text-xl font-bold py-5 px-12 tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] mx-auto w-fit shadow-md"
            >
              <MessageCircle size={22} />
              <span>व्हाट्सएप पर संपर्क करें</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
