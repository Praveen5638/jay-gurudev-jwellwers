import React, { useState } from 'react';
import { 
  BarChart3, Plus, Edit2, Trash2, 
  MessageSquare, Settings, Phone, MessageCircle, ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Product } from '../data/products';

export const AdminDashboard: React.FC = () => {
  const { 
    products, inquiries, promoBanner,
    addProduct, updateProduct, deleteProduct, setPromoBanner
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inquiries' | 'settings'>('overview');

  // Product Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('स्वर्ण आभूषण');
  const [material, setMaterial] = useState<'Gold' | 'Silver' | 'Diamond'>('Gold');
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [purity, setPurity] = useState('22K BIS हॉलमार्क सोना');
  const [makingCharges, setMakingCharges] = useState(10);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [featured, setFeatured] = useState(false);
  const [stock, setStock] = useState(10);

  // Settings states
  const [bannerInput, setBannerInput] = useState(promoBanner || '');

  // Predefined Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('jg_admin_logged') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Stats calculation
  const goldCount = products.filter(p => p.material === 'Gold').length;
  const silverCount = products.filter(p => p.material === 'Silver').length;
  const diamondCount = products.filter(p => p.material === 'Diamond').length;
  
  const resetForm = () => {
    setIsEditing(false);
    setEditingId('');
    setName('');
    setCategory('स्वर्ण आभूषण');
    setMaterial('Gold');
    setPrice(0);
    setWeight(0);
    setPurity('22K BIS हॉलमार्क सोना');
    setMakingCharges(10);
    setDescription('');
    setImages('');
    setFeatured(false);
    setStock(10);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !weight) {
      alert("नाम, मूल्य और वजन दर्ज करना अनिवार्य है।");
      return;
    }

    const parsedImages = images 
      ? images.split(',').map(s => s.trim()) 
      : ['/images/placeholder.jpg'];

    const productData = {
      name,
      category,
      material,
      price,
      weight,
      purity,
      makingCharges,
      description,
      images: parsedImages,
      featured,
      stock
    };

    if (isEditing) {
      updateProduct({
        ...productData,
        id: editingId,
        createdAt: new Date().toISOString()
      });
      alert("आभूषण का विवरण सफलतापूर्वक सहेज लिया गया है!");
    } else {
      addProduct(productData);
      alert("नया आभूषण सफलतापूर्वक सूची में जोड़ दिया गया है!");
    }

    resetForm();
  };

  const startEdit = (prod: Product) => {
    setIsEditing(true);
    setEditingId(prod.id);
    setName(prod.name);
    setCategory(prod.category);
    setMaterial(prod.material);
    setPrice(prod.price);
    setWeight(prod.weight);
    setPurity(prod.purity);
    setMakingCharges(prod.makingCharges);
    setDescription(prod.description);
    setImages(prod.images.join(', '));
    setFeatured(prod.featured);
    setStock(prod.stock);
    setActiveTab('products');
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm("क्या आप वास्तव में इस आभूषण को सूची से हटाना चाहते हैं?")) {
      deleteProduct(id);
      alert("आभूषण को सूची से सफलतापूर्वक हटा दिया गया है।");
    }
  };

  const handleBannerSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoBanner(bannerInput === "" ? null : bannerInput);
    alert("घोषणा बैनर सफलतापूर्वक अपडेट हो गया है!");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'gurudev@1995') {
      setIsLoggedIn(true);
      sessionStorage.setItem('jg_admin_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('गलत संचालक यूजरनेम या पासवर्ड! कृपया दोबारा जांचें।');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('jg_admin_logged');
    setUsername('');
    setPassword('');
    resetForm();
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-10 pb-20 max-w-md mx-auto px-4 min-h-[75vh] flex items-center justify-center font-body">
        <div className="w-full border border-brand-gold/30 bg-brand-cardBg shadow-gold-glow p-8 space-y-6 text-left relative overflow-hidden">
          {/* Royal top line decoration */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-burgundy" />
          
          <div className="text-center space-y-2 select-none pb-2 border-b border-brand-border/30">
            <div className="mx-auto w-14 h-14 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-cream">
              <ShieldCheck size={28} className="text-brand-burgundy animate-pulse" />
            </div>
            <h2 className="font-heading text-2xl text-brand-burgundy uppercase font-bold pt-2">
              संचालक लॉग-इन
            </h2>
            <p className="text-brand-black/60 text-xs sm:text-sm font-light">
              जय गुरुदेव ज्वेलर्स - शोरूम प्रबंधन पैनल
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4.5 py-3 text-sm font-medium rounded-none text-left select-none animate-pulse">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 text-sm select-none">
            <div className="space-y-1.5 text-left">
              <label className="text-brand-black/75 uppercase tracking-widest text-xs font-bold font-heading">यूजरनेम (Username)</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="उदा. admin"
                className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4.5 py-3.5 placeholder-brand-black/40 focus:outline-none focus:border-brand-gold rounded-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-brand-black/75 uppercase tracking-widest text-xs font-bold font-heading">पासवर्ड (Password)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4.5 py-3.5 placeholder-brand-black/40 focus:outline-none focus:border-brand-gold rounded-none transition-all shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="gold-btn w-full py-4 text-base sm:text-lg flex items-center justify-center space-x-2 bg-brand-burgundy text-brand-gold hover:bg-brand-gold hover:text-brand-burgundy transition-colors font-bold shadow-md cursor-pointer"
            >
              <span>पैनल में प्रवेश करें</span>
            </button>
          </form>

          <div className="text-center pt-2 select-none border-t border-brand-border/20">
            <span className="text-[11px] sm:text-xs text-brand-black/40 font-body">
              सुरक्षित प्रमाणीकरण प्रणाली • जय गुरुदेव ज्वेलर्स © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left min-h-[90vh]">
      {/* Page Header */}
      <div className="border-b border-brand-border/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 select-none">
        <div className="space-y-1">
          <span className="text-xs sm:text-sm text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">शोरूम संचालक</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-brand-burgundy">राजसी संचालक डैशबोर्ड</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 border border-brand-gold text-xs sm:text-sm uppercase tracking-widest font-heading px-4 py-2 bg-brand-cream text-brand-darkGold font-bold shadow-sm">
            <ShieldCheck size={16} className="text-brand-gold shrink-0" />
            <span>सुरक्षा स्तर: शोरूम स्वामी</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="border border-brand-burgundy/30 bg-brand-burgundy text-brand-gold hover:bg-brand-gold hover:text-brand-burgundy transition-all text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-4 py-2 cursor-pointer shadow-sm"
          >
            लॉग-आउट
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR NAVIGATION (lg:col-span-3) */}
        <nav className="lg:col-span-3 bg-brand-cardBg border border-brand-border/60 shadow-sm p-4 select-none space-y-2">
          {[
            { id: 'overview', icon: <BarChart3 size={18} />, label: 'सांख्यिकी विवरण' },
            { id: 'products', icon: <Plus size={18} />, label: 'आभूषण प्रबंधन' },
            { id: 'inquiries', icon: <MessageSquare size={18} />, label: `ग्राहक पूछताछ (${inquiries.length})` },
            { id: 'settings', icon: <Settings size={18} />, label: 'घोषणा बैनर' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as 'overview' | 'products' | 'inquiries' | 'settings')}
              className={`w-full flex items-center space-x-3.5 text-sm sm:text-base tracking-wider uppercase font-heading px-5 py-4 transition-all text-left cursor-pointer ${
                activeTab === item.id
                  ? 'bg-brand-burgundy text-brand-gold font-bold shadow-sm'
                  : 'text-brand-black/80 hover:text-brand-gold hover:bg-brand-cream/50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* MAIN PANEL CONTENT (lg:col-span-9) */}
        <main className="lg:col-span-9 border border-brand-border bg-brand-cardBg shadow-md p-6 min-h-[500px]">
          
          {/* TAB 1: STATS OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 select-none">
              <h2 className="font-heading text-2xl text-brand-gold uppercase font-bold border-b border-brand-border/30 pb-2">सांख्यिकी विवरण</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="border border-brand-border bg-brand-cream/50 p-5 space-y-1.5 shadow-sm text-left">
                  <span className="text-xs sm:text-sm text-brand-black/60 uppercase tracking-widest font-heading font-bold">कुल आभूषण</span>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-brand-burgundy">{products.length}</p>
                </div>
                <div className="border border-brand-border bg-brand-cream/50 p-5 space-y-1.5 shadow-sm text-left">
                  <span className="text-xs sm:text-sm text-brand-black/60 uppercase tracking-widest font-heading font-bold">स्वर्ण (Gold)</span>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-brand-burgundy">{goldCount} डिजाइन</p>
                </div>
                <div className="border border-brand-border bg-brand-cream/50 p-5 space-y-1.5 shadow-sm text-left">
                  <span className="text-xs sm:text-sm text-brand-black/60 uppercase tracking-widest font-heading font-bold">रजत (Silver)</span>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-brand-burgundy">{silverCount} डिजाइन</p>
                </div>
                <div className="border border-brand-border bg-brand-cream/50 p-5 space-y-1.5 shadow-sm text-left">
                  <span className="text-xs sm:text-sm text-brand-black/60 uppercase tracking-widest font-heading font-bold">हीरा (Diamond)</span>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-brand-burgundy">{diamondCount} डिजाइन</p>
                </div>
                <div className="border border-brand-border bg-brand-cream/50 p-5 space-y-1.5 shadow-sm text-left">
                  <span className="text-xs sm:text-sm text-brand-black/60 uppercase tracking-widest font-heading font-bold">ग्राहक पूछताछ</span>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-brand-burgundy">{inquiries.length}</p>
                </div>
              </div>

              {/* Action summary info boxes */}
              <div className="border border-brand-border/60 bg-brand-cream/30 p-6 space-y-4 text-left">
                <h3 className="font-heading text-base text-brand-gold uppercase tracking-wider font-bold border-b border-brand-border/20 pb-2">कैटलॉग संचालक मार्गदर्शिका</h3>
                <ul className="space-y-3.5 text-sm sm:text-base font-light leading-relaxed text-brand-black/80 list-disc pl-5 font-body">
                  <li><strong>आभूषण प्रबंधन:</strong> *आभूषण प्रबंधन* टैब में जाकर आप नए आभूषण डिजाइन जोड़ सकते हैं, पुराने का संपादन कर सकते हैं और बिक चुके आभूषणों को हटा सकते हैं। ये सभी परिवर्तन वेबसाइट पर तुरंत लाइव हो जाते हैं।</li>
                  <li><strong>ग्राहक पूछताछ:</strong> इस सेक्शन में ग्राहकों द्वारा आभूषणों के डिजाइन और वजन के संबंध में की गई सभी पूछताछ दर्ज होती हैं। आप यहाँ से ग्राहक को सीधे कॉल कर सकते हैं या एक क्लिक में व्हाट्सएप पर संपर्क साध सकते हैं।</li>
                  <li><strong>घोषणा बैनर:</strong> यहाँ से आप वेबसाइट के शीर्ष भाग में प्रदर्शित होने वाले घोषणा बैनर को बदल सकते हैं, जैसे शादी सीजन विशेष डिस्काउंट या त्योहारों के विशेष ऑफर।</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS SHOWCASE CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-10">
              {/* CRUD Form Area */}
              <div className="space-y-4">
                <h2 className="font-heading text-2xl text-brand-gold uppercase font-bold border-b border-brand-border/30 pb-2">
                  {isEditing ? `आभूषण विवरण संपादित करें (आईडी: ${editingId})` : 'नया आभूषण जोड़ें'}
                </h2>
                
                <form onSubmit={handleProductSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm sm:text-base font-normal text-brand-black select-none font-body">
                  {/* Name */}
                  <div className="space-y-1.5 sm:col-span-2 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">आभूषण का नाम *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="उदा. महारानी कुंदन नेकलेस सेट"
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold text-sm sm:text-base shadow-sm"
                    />
                  </div>

                  {/* Material */}
                  <div className="space-y-1.5 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">धातु का प्रकार *</label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value as Product['material'])}
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold cursor-pointer text-sm sm:text-base shadow-sm"
                    >
                      <option value="Gold">सोना (Gold)</option>
                      <option value="Silver">चांदी (Silver)</option>
                      <option value="Diamond">हीरा (Diamond)</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">प्रदर्शन श्रेणी *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold cursor-pointer text-sm sm:text-base shadow-sm"
                    >
                      <option value="विवाह आभूषण">विवाह आभूषण</option>
                      <option value="स्वर्ण आभूषण">स्वर्ण आभूषण</option>
                      <option value="रजत आभूषण">रजत आभूषण</option>
                      <option value="नित्य धारण">नित्य धारण (डेली वियर)</option>
                      <option value="पुरुष कलेक्शन">पुरुष कलेक्शन</option>
                    </select>
                  </div>

                  {/* Purity */}
                  <div className="space-y-1.5 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">सोने की शुद्धता *</label>
                    <input
                      type="text"
                      required
                      value={purity}
                      onChange={(e) => setPurity(e.target.value)}
                      placeholder="उदा. 22K BIS हॉलमार्क सोना"
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold text-sm sm:text-base shadow-sm"
                    />
                  </div>

                  {/* Base Price */}
                  <div className="space-y-1.5 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">मूल मूल्य (₹) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold text-sm sm:text-base shadow-sm"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-1.5 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">शुद्ध वजन (ग्राम) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold text-sm sm:text-base shadow-sm"
                    />
                  </div>

                  {/* Making charges */}
                  <div className="space-y-1.5 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">मेकिंग चार्ज (%) *</label>
                    <input
                      type="number"
                      required
                      value={makingCharges}
                      onChange={(e) => setMakingCharges(Number(e.target.value))}
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold text-sm sm:text-base shadow-sm"
                    />
                  </div>

                  {/* Stock count */}
                  <div className="space-y-1.5 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">उपलब्ध स्टॉक (नग) *</label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold text-sm sm:text-base shadow-sm"
                    />
                  </div>

                  {/* Image Paths */}
                  <div className="space-y-1.5 sm:col-span-2 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">उत्पाद छवि मार्ग (अल्पविराम से अलग करें)</label>
                    <input
                      type="text"
                      value={images}
                      onChange={(e) => setImages(e.target.value)}
                      placeholder="/images/broad_bangles.jpg, /images/broad_bangles_detail.jpg"
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold text-sm sm:text-base shadow-sm"
                    />
                  </div>

                  {/* Featured Status Toggle */}
                  <div className="flex items-center space-x-3 pt-5 select-none text-sm sm:col-span-1 text-left">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-5 h-5 accent-brand-gold border border-brand-border cursor-pointer bg-brand-cardBg"
                    />
                    <label htmlFor="featured" className="cursor-pointer text-brand-black/85 font-semibold">मुख्य पृष्ठ स्लाइडर में दिखाएं</label>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5 sm:col-span-3 text-left">
                    <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">आभूषण की विस्तृत कहानी और विवरण *</label>
                    <textarea
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="बारीक कारीगरी, कुंदन नक्काशी, मोतियों की लटकन या डिजाइन की विशेषता यहाँ दर्ज करें..."
                      className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-4 py-3.5 focus:outline-none focus:border-brand-gold resize-none text-sm sm:text-base shadow-sm"
                    />
                  </div>

                  {/* Form Submission Buttons */}
                  <div className="sm:col-span-3 flex space-x-4 pt-2">
                    <button
                      type="submit"
                      className="gold-btn px-8 text-sm sm:text-base py-4.5 cursor-pointer text-brand-gold font-semibold"
                    >
                      {isEditing ? 'परिवर्तन सुरक्षित करें' : 'आभूषण प्रकाशित करें'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={resetForm}
                      className="gold-btn-outline px-6 text-sm sm:text-base py-4.5 cursor-pointer text-brand-black"
                    >
                      साफ़ करें
                    </button>
                  </div>
                </form>
              </div>

              {/* Showcase list view */}
              <div className="space-y-4 select-none">
                <h3 className="font-heading text-sm sm:text-base text-brand-gold uppercase tracking-wider font-bold border-b border-brand-border/30 pb-1.5 text-left">
                  वर्तमान सक्रिय आभूषण सूची ({products.length})
                </h3>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-none font-body">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="border border-brand-border bg-brand-cream/20 p-5 flex items-center justify-between gap-4 text-sm sm:text-base"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-14 h-14 object-cover border border-brand-border bg-brand-cardBg shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23faf6ee'/></svg>";
                          }}
                        />
                        <div className="text-left space-y-0.5">
                          <p className="font-bold text-brand-black truncate max-w-xs">{prod.name}</p>
                          <p className="text-xs sm:text-sm text-brand-black/60 font-bold">
                            {prod.category} • {prod.weight}g • {prod.purity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 font-heading font-medium shrink-0">
                        <span className="text-brand-darkGold font-bold text-base sm:text-lg font-body">₹{prod.price.toLocaleString('en-IN')}</span>
                        <div className="flex space-x-2 text-xs sm:text-sm">
                          <button
                            onClick={() => startEdit(prod)}
                            className="p-2 border border-brand-border text-brand-black hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer bg-brand-cardBg"
                            title="संपादित करें"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(prod.id)}
                            className="p-2 border border-brand-border text-brand-black hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer bg-brand-cardBg"
                            title="हटाएं"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <h2 className="font-heading text-2xl text-brand-gold uppercase font-bold border-b border-brand-border/30 pb-2 text-left">ग्राहक पूछताछ सूची</h2>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center text-brand-black/50 text-sm sm:text-base font-light font-body">
                  अभी तक कोई पूछताछ दर्ज नहीं हुई है।
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 font-body">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="border border-brand-border bg-brand-cream/20 p-6 space-y-4 text-sm sm:text-base text-left"
                    >
                      {/* Inquiry Header */}
                      <div className="flex justify-between border-b border-brand-border/40 pb-2">
                        <div className="space-y-0.5">
                          <p className="font-bold text-brand-black text-base sm:text-lg">{inq.name}</p>
                          <p className="text-xs sm:text-sm text-brand-black/60">
                            दर्ज समय: {new Date(inq.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>
                        {inq.productContext && (
                          <span className="text-xs sm:text-sm text-brand-darkGold uppercase font-heading bg-brand-cardBg border border-brand-border px-3 py-1.5 font-bold">
                            संदर्भ आभूषण: {inq.productContext.name}
                          </span>
                        )}
                      </div>

                      {/* Message Body */}
                      <div className="bg-brand-cardBg p-4 border border-brand-border/60 text-brand-black/85 leading-relaxed font-normal italic font-body text-base sm:text-lg">
                        "{inq.message}"
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between border-t border-brand-border/20 pt-3">
                        <div className="flex space-x-2 text-xs sm:text-sm font-heading font-bold text-brand-black/70 select-none">
                          <span>मोबाइल नंबर:</span>
                          <span className="text-brand-black font-bold font-body">{inq.phone}</span>
                        </div>

                        <div className="flex space-x-4 shrink-0 font-bold uppercase tracking-wider text-xs sm:text-sm font-heading">
                          {/* Call shortcut */}
                          <a
                            href={`tel:${inq.phone}`}
                            className="flex items-center space-x-1.5 text-brand-gold hover:text-brand-darkGold transition-colors"
                          >
                            <Phone size={15} />
                            <span>कॉल करें</span>
                          </a>

                          {/* WhatsApp Reply */}
                          <a
                            href={`https://wa.me/${inq.phone.replace(/\D/g,'')}?text=नमस्ते%20${encodeURIComponent(inq.name)}%2C%20जय%20गुरुदेव%20ज्वेलर्स%20की%20ओर%20से%20सादर%20प्रणाम।%20आपके%20आभूषण%20संबंधी%20पूछताछ%20के%20लिए%20यह%20व्हाट्सएप%20चैट%20है।`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1.5 text-[#1FAF38] hover:text-[#1FAF38]/80 transition-colors"
                          >
                            <MessageCircle size={16} />
                            <span>व्हाट्सएप</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GLOBAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 select-none font-body">
              <h2 className="font-heading text-2xl text-brand-gold uppercase font-bold border-b border-brand-border/30 pb-2 text-left">विशेष घोषणा बैनर सेटिंग्स</h2>
              
              <form onSubmit={handleBannerSave} className="space-y-4 text-sm sm:text-base font-normal text-brand-black">
                <div className="space-y-1.5 text-left">
                  <label className="uppercase tracking-widest text-xs sm:text-sm text-brand-black/75 font-bold font-heading">शीर्ष वैश्विक घोषणा बैनर पाठ</label>
                  <textarea
                    rows={3}
                    value={bannerInput}
                    onChange={(e) => setBannerInput(e.target.value)}
                    placeholder="उदा. ✨ विशेष ऑफर: शुद्ध चांदी के बर्तनों पर मेकिंग चार्ज 0% इस सप्ताह! ✨"
                    className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-5 py-4 placeholder-brand-black/40 focus:outline-none focus:border-brand-gold rounded-none resize-none transition-all text-sm sm:text-base shadow-sm"
                  />
                  <p className="text-xs sm:text-sm text-brand-black/60 leading-relaxed pt-2">
                    यह घोषणा बैनर वेबसाइट के सबसे शीर्ष भाग में हर पृष्ठ पर प्रदर्शित होगा। इसका उपयोग विशेष सीजन छूट जैसे *"विवाह सीजन हेतु 0% मेकिंग चार्ज"* या *"नवरात्री एवं दीपावली विशेष शोरूम समय"* जैसी महत्वपूर्ण जानकारियों के लिए किया जा सकता है।
                  </p>
                </div>

                <div className="flex space-x-4 pt-2">
                  <button
                    type="submit"
                    className="gold-btn text-sm sm:text-base py-4 px-8 cursor-pointer font-semibold"
                  >
                    घोषणा बैनर सहेजें
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBannerInput('');
                      setPromoBanner(null);
                      alert("शीर्ष घोषणा बैनर सफलतापूर्वक हटा दिया गया है!");
                    }}
                    className="gold-btn-outline text-sm sm:text-base py-4 px-6 cursor-pointer"
                  >
                    बैनर निष्क्रिय करें
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
