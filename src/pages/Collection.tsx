import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, MessageCircle, ArrowUpDown, BadgeInfo } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';

export const Collection: React.FC = () => {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  const materials = ['All', 'Gold', 'Silver', 'Diamond'];
  const categories = [
    'All',
    'विवाह आभूषण',
    'स्वर्ण आभूषण',
    'रजत आभूषण',
    'नित्य धारण',
    'पुरुष कलेक्शन'
  ];

  // Map values for translation
  const translateMaterial = (mat: string) => {
    switch(mat) {
      case 'All': return 'सभी धातु';
      case 'Gold': return 'स्वर्ण (सोना)';
      case 'Silver': return 'रजत (चांदी)';
      case 'Diamond': return 'हीरा (डायमंड)';
      default: return mat;
    }
  };

  const translateCategory = (cat: string) => {
    if (cat === 'All') return 'सभी श्रेणियां';
    return cat;
  };

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMaterial = selectedMaterial === 'All' || 
                            (product.material || '').trim().toLowerCase() === selectedMaterial.trim().toLowerCase();
    
    const matchesCategory = selectedCategory === 'All' || 
                            (product.category || '').trim().toLowerCase() === selectedCategory.trim().toLowerCase();

    return matchesSearch && matchesMaterial && matchesCategory;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'weight-asc':
        return a.weight - b.weight;
      case 'weight-desc':
        return b.weight - a.weight;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.price - a.price;
    }
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMaterial('All');
    setSelectedCategory('All');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="w-full relative pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left min-h-[80vh]">
      {/* Page Header */}
      <div className="border-b border-brand-border/40 pb-6 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 select-none">
        <div className="space-y-1.5">
          <span className="text-sm sm:text-base text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">उत्कृष्ट संकलन</span>
          <h1 className="text-5xl sm:text-6xl font-bold font-heading text-brand-burgundy">राजसी आभूषण संग्रह</h1>
        </div>
        <p className="text-brand-black/70 text-base sm:text-lg font-light max-w-lg leading-relaxed font-body">
          शुद्धता और भरोसे की सुंदर मिसाल। विवाह सेट, सोने के कंगन और पुरुषों के शाही कड़ों के हमारे संक्षिप्त संकलन को ब्राउज़ करें।
        </p>
      </div>

      {/* Main Control Panel (Search, Mobile Toggle, Sort) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-10 select-none">
        {/* Search */}
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder="आभूषण खोजें (जैसे: कुंदन, कंगन, झुमकी)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-cardBg text-brand-black placeholder-brand-black/45 border border-brand-border px-6 py-4.5 pl-14 text-base sm:text-lg tracking-wider rounded-none focus:outline-none focus:border-brand-gold transition-colors shadow-sm font-body"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" />
        </div>

        {/* Sorting Dropdown */}
        <div className="relative flex items-center space-x-2.5 w-full">
          <ArrowUpDown size={18} className="text-brand-gold shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-brand-cardBg text-brand-black/85 border border-brand-border px-5 py-4.5 text-base sm:text-lg tracking-wider rounded-none focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer shadow-sm font-body font-bold"
          >
            <option value="featured">क्रम: लोकप्रिय</option>
            <option value="price-asc">मूल्य: कम से अधिक</option>
            <option value="price-desc">मूल्य: अधिक से कम</option>
            <option value="weight-asc">वजन: कम से अधिक</option>
            <option value="weight-desc">वजन: अधिक से कम</option>
            <option value="newest">संग्रह: नए आभूषण पहले</option>
          </select>
        </div>

        {/* Mobile Filters Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center justify-center space-x-2 border border-brand-border py-4.5 bg-brand-cardBg hover:border-brand-gold text-brand-black text-base uppercase tracking-widest font-heading transition-colors cursor-pointer font-bold shadow-sm"
        >
          <SlidersHorizontal size={18} className="text-brand-gold" />
          <span>फ़िल्टर चुनें</span>
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* FILTERS SIDEBAR (DESKTOP) */}
        <aside className="hidden md:block space-y-8 select-none border-r border-brand-border/20 pr-6">
          {/* Material Filters */}
          <div className="space-y-4">
            <h3 className="font-heading text-base sm:text-lg tracking-widest text-brand-gold uppercase font-bold border-b border-brand-border/30 pb-2">
              धातु चयन
            </h3>
            <div className="flex flex-col space-y-2">
              {materials.map((material) => (
                <button
                  key={material}
                  onClick={() => setSelectedMaterial(material)}
                  className={`text-left text-base sm:text-lg tracking-wide py-2.5 px-4 transition-colors cursor-pointer font-body font-semibold ${
                    selectedMaterial === material
                      ? 'bg-brand-burgundy text-brand-gold font-bold shadow-sm'
                      : 'text-brand-black/80 hover:text-brand-gold hover:bg-brand-cream/50'
                  }`}
                >
                  {translateMaterial(material)}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="space-y-4">
            <h3 className="font-heading text-base sm:text-lg tracking-widest text-brand-gold uppercase font-bold border-b border-brand-border/30 pb-2">
              श्रेणी चयन
            </h3>
            <div className="flex flex-col space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchParams(category === 'All' ? {} : { category: category });
                  }}
                  className={`text-left text-base sm:text-lg tracking-wide py-2.5 px-4 transition-colors truncate cursor-pointer font-body font-semibold ${
                    selectedCategory === category
                      ? 'bg-brand-burgundy text-brand-gold font-bold shadow-sm'
                      : 'text-brand-black/80 hover:text-brand-gold hover:bg-brand-cream/50'
                  }`}
                >
                  {translateCategory(category)}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Up Action */}
          <button
            onClick={resetFilters}
            className="w-full border border-brand-border py-4 text-sm sm:text-base uppercase font-heading tracking-widest text-brand-black hover:border-brand-burgundy hover:text-brand-burgundy transition-colors cursor-pointer font-bold shadow-sm"
          >
            फ़िल्टर हटाएं
          </button>
        </aside>

        {/* FILTERS PANEL (MOBILE OVERLAY) */}
        {showMobileFilters && (
          <div className="md:hidden fixed inset-0 z-50 bg-brand-darkBg p-8 flex flex-col justify-between select-none">
            <div className="space-y-8 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <span className="font-heading text-lg text-brand-burgundy uppercase tracking-wider font-bold">फ़िल्टर विकल्प</span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-brand-black text-base uppercase font-heading tracking-widest cursor-pointer font-bold"
                >
                  बंद करें
                </button>
              </div>

              {/* Material List */}
              <div className="space-y-3">
                <h4 className="font-heading text-base text-brand-gold uppercase font-bold">धातु</h4>
                <div className="flex flex-wrap gap-2">
                  {materials.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMaterial(m)}
                      className={`text-base py-2.5 px-6 border cursor-pointer font-body font-semibold ${
                        selectedMaterial === m ? 'border-brand-gold bg-brand-burgundy text-brand-gold font-bold shadow-sm' : 'border-brand-border text-brand-black/80'
                      }`}
                    >
                      {translateMaterial(m)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category List */}
              <div className="space-y-3 pt-4">
                <h4 className="font-heading text-base text-brand-gold uppercase font-bold">श्रेणी</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCategory(c);
                        setSearchParams(c === 'All' ? {} : { category: c });
                      }}
                      className={`text-sm sm:text-base py-2.5 px-5.5 border cursor-pointer font-body font-semibold ${
                        selectedCategory === c ? 'border-brand-gold bg-brand-burgundy text-brand-gold font-bold shadow-sm' : 'border-brand-border text-brand-black/80'
                      }`}
                    >
                      {translateCategory(c)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <button
                onClick={() => {
                  resetFilters();
                  setShowMobileFilters(false);
                }}
                className="w-full border border-brand-border py-4.5 text-sm sm:text-base uppercase font-heading tracking-widest text-brand-black cursor-pointer font-bold shadow-sm"
              >
                सभी हटाएं
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-brand-burgundy py-4.5 text-sm sm:text-base uppercase font-heading tracking-widest text-brand-gold font-semibold cursor-pointer border border-brand-gold/25 shadow-md"
              >
                फ़िल्टर लागू करें
              </button>
            </div>
          </div>
        )}

        {/* PRODUCT CATALOGUE GRID */}
        <main className="md:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="border border-brand-border p-16 text-center space-y-6 bg-brand-cardBg shadow-sm">
              <BadgeInfo size={48} className="text-brand-gold mx-auto animate-pulse" />
              <div className="space-y-2 select-none">
                <h3 className="font-heading text-2xl text-brand-burgundy uppercase font-bold">कोई आभूषण नहीं मिला</h3>
                <p className="text-brand-black/60 text-base sm:text-lg font-light max-w-sm mx-auto leading-relaxed font-body">
                  आपके द्वारा चुने गए फ़िल्टर के अनुसार वर्तमान में कोई आभूषण उपलब्ध नहीं है। कृपया फ़िल्टर बदलें।
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="gold-btn-outline inline-flex items-center text-sm sm:text-base px-10 py-4.5 font-heading font-bold"
              >
                सभी फ़िल्टर हटाएं
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-brand-border/60 bg-brand-cardBg shadow-sm hover:shadow-md hover:border-brand-gold/40 transition-all duration-300 group flex flex-col justify-between h-full"
                >
                  {/* Card Media */}
                  <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square border-b border-brand-border/30 block">
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

                  {/* Card Specs */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-sm sm:text-base tracking-wider text-brand-darkGold uppercase font-heading select-none font-bold">
                        <span>{product.purity}</span>
                        <span>{product.weight} ग्राम</span>
                      </div>
                      
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-burgundy group-hover:text-brand-gold transition-colors duration-300 truncate">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-brand-darkGold font-bold text-lg sm:text-xl font-body">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-border/20 mt-5 flex items-center justify-between">
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
                        className="flex items-center space-x-2 border border-[#1FAF38] hover:bg-[#1FAF38]/10 text-[#1FAF38] px-4.5 py-3 text-sm sm:text-base font-heading font-bold uppercase tracking-widest transition-colors duration-300 bg-transparent rounded-none cursor-pointer shadow-sm"
                        aria-label="WhatsApp Inquiry"
                      >
                        <MessageCircle size={16} />
                        <span>पूछताछ</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
