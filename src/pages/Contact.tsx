import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';

export const Contact: React.FC = () => {
  const { submitInquiry } = useApp();

  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert("कृपया पूछताछ फॉर्म के सभी फ़ील्ड भरें।");
      return;
    }

    setLoading(true);
    
    // Simulate luxury API lag
    setTimeout(() => {
      submitInquiry(name, phone, message);
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleWhatsAppRedirect = () => {
    const text = `नमस्ते जय गुरुदेव ज्वेलर्स, मेरा नाम ${name} है। मैं आभूषण संबंधी पूछताछ दर्ज करना चाहता हूँ:\n\n*नाम:* ${name}\n*मोबाइल नंबर:* ${phone}\n*विवरण:* ${message}`;
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left font-body">
      {/* Page Header */}
      <div className="border-b border-brand-border/40 pb-6 mb-12 select-none">
        <span className="text-sm sm:text-base text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">हमसे संपर्क करें</span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-brand-burgundy">शोरूम संपर्क एवं पूछताछ</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Contact Information Cards (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6 select-none">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl text-brand-burgundy font-bold uppercase tracking-wider">
              कोरांव (देवघाट) शोरूम
            </h2>
            <p className="text-brand-black/70 text-sm sm:text-base leading-relaxed font-light font-body">
              स्वर्णकार: <strong>{BRAND_CONFIG.owner}</strong><br />
              हमारे भव्य बरोखर, देवघाट शोरूम पर पधारकर डिजिटल डेंसिटी विश्लेषक से सोने की शुद्धता की जांच करें एवं हमारे शाही विवाह कलेक्शन का अवलोकन करें।
            </p>
          </div>

          {/* Quick info list */}
          <div className="space-y-4 text-sm sm:text-base font-body">
            {/* Address */}
            <div className="flex items-start space-x-3.5 border border-brand-border/60 bg-brand-cardBg shadow-sm p-4">
              <MapPin size={22} className="text-brand-gold shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-left">
                <span className="text-xs sm:text-sm text-brand-gold uppercase tracking-wider font-heading font-bold">शोरूम का पता</span>
                <p className="text-brand-black leading-relaxed font-light text-sm sm:text-base">{BRAND_CONFIG.address}</p>
              </div>
            </div>

            {/* Calling */}
            <div className="flex items-start space-x-3.5 border border-brand-border/60 bg-brand-cardBg shadow-sm p-4">
              <Phone size={20} className="text-brand-gold shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-left">
                <span className="text-xs sm:text-sm text-brand-gold uppercase tracking-wider font-heading font-bold">कॉल बुकिंग / पूछताछ</span>
                <p className="font-bold text-brand-burgundy font-heading text-sm sm:text-base">
                  <a href={`tel:${BRAND_CONFIG.phone}`} className="hover-gold-text">
                    {BRAND_CONFIG.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3.5 border border-brand-border/60 bg-brand-cardBg shadow-sm p-4">
              <Mail size={20} className="text-brand-gold shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-left">
                <span className="text-xs sm:text-sm text-brand-gold uppercase tracking-wider font-heading font-bold">ईमेल संपर्क</span>
                <p className="font-semibold text-brand-black text-sm sm:text-base">
                  <a href={`mailto:${BRAND_CONFIG.email}`} className="hover-gold-text font-semibold">
                    {BRAND_CONFIG.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start space-x-3.5 border border-brand-border/60 bg-brand-cardBg shadow-sm p-4">
              <Clock size={20} className="text-brand-gold shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-left">
                <span className="text-xs sm:text-sm text-brand-gold uppercase tracking-wider font-heading font-bold">शोरूम का समय</span>
                <p className="text-brand-black font-light font-body text-sm sm:text-base">{BRAND_CONFIG.workingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Inquiry Form (lg:col-span-7) */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            /* Success confirmation box */
            <div className="border border-brand-border/60 bg-brand-cardBg shadow-md p-8 sm:p-12 text-center space-y-6 select-none">
              <CheckCircle2 size={54} className="text-brand-gold mx-auto animate-pulse" />
              <div className="space-y-2">
                <span className="text-xs sm:text-sm text-brand-gold tracking-[0.25em] uppercase font-heading font-bold">पूछताछ दर्ज हुई</span>
                <h3 className="font-heading text-2xl text-brand-burgundy uppercase font-bold">आपकी पूछताछ सबमिट हो गई है</h3>
                <p className="text-brand-black/70 text-sm sm:text-base font-light max-w-sm mx-auto leading-relaxed">
                  आपकी मांग हमारी कार्यशाला के डेटाबेस में दर्ज कर ली गई है। शीघ्र अनुमान और त्वरित बातचीत के लिए नीचे दिए गए बटन से व्हाट्सएप पर साझा करें।
                </p>
              </div>

              <div className="space-y-4 max-w-xs mx-auto pt-4 font-heading">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="flex items-center justify-center space-x-2.5 border border-[#1FAF38] hover:bg-[#1FAF38]/10 text-[#1FAF38] font-semibold py-4.5 uppercase tracking-widest text-sm transition-colors duration-300 bg-transparent w-full cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>व्हाट्सएप पर विवरण भेजें</span>
                </button>
                <button
                  onClick={handleResetForm}
                  className="gold-btn-outline w-full py-4.5 text-sm cursor-pointer text-brand-black"
                >
                  दूसरी पूछताछ दर्ज करें
                </button>
              </div>
            </div>
          ) : (
            /* Standard Inquiry Form */
            <div className="border border-brand-border/60 bg-brand-cardBg shadow-sm p-6 sm:p-10 space-y-6">
              <div className="space-y-1.5 border-b border-brand-border/30 pb-3 select-none text-left">
                <h3 className="font-heading text-lg sm:text-xl text-brand-gold font-bold uppercase tracking-wider">
                  निजीकृत आभूषण पूछताछ
                </h3>
                <p className="text-brand-black/60 text-xs sm:text-sm font-light font-body">
                  अपनी पसंद के आभूषणों के डिजाइन, वजन या रत्न संबंधी जानकारी नीचे दर्ज करें।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-sm select-none font-body">
                <div className="space-y-1.5 text-left">
                  <label className="text-brand-black/75 uppercase tracking-widest text-xs sm:text-sm font-bold font-heading">आपका पूरा नाम *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. आराध्या सेन"
                    className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-5 py-4 placeholder-brand-black/40 focus:outline-none focus:border-brand-gold rounded-none transition-all text-sm sm:text-base shadow-sm"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-brand-black/75 uppercase tracking-widest text-xs sm:text-sm font-bold font-heading">मोबाइल नंबर (व्हाट्सएप) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="उदा. +91 98765 43210"
                    className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-5 py-4 placeholder-brand-black/40 focus:outline-none focus:border-brand-gold rounded-none transition-all text-sm sm:text-base shadow-sm"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-brand-black/75 uppercase tracking-widest text-xs sm:text-sm font-bold font-heading">आभूषण की जानकारी / मांग *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="आभूषण का प्रकार (सोना/चांदी), अनुमानित वजन, रत्न की प्राथमिकता या अपनी कोई विशेष पसंद यहाँ लिखें..."
                    className="w-full bg-brand-cardBg text-brand-black border border-brand-border px-5 py-4 placeholder-brand-black/40 focus:outline-none focus:border-brand-gold rounded-none transition-all resize-none text-sm sm:text-base shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="gold-btn w-full py-5 text-sm sm:text-base flex items-center justify-center space-x-2.5 disabled:opacity-60 disabled:pointer-events-none cursor-pointer font-bold"
                >
                  <Send size={16} />
                  <span>{loading ? 'पूछताछ दर्ज हो रही है...' : 'पूछताछ सबमिट करें'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
