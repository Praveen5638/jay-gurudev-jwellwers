import React from 'react';
import { ShieldCheck, Sparkles, Hammer, Users } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const About: React.FC = () => {
  return (
    <div className="pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* 1. Page Header */}
      <div className="border-b border-brand-border/40 pb-6 mb-12 select-none">
        <span className="text-sm sm:text-base text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">हमारी विरासत</span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-brand-burgundy">जय गुरुदेव ज्वेलर्स की कहानी</h1>
      </div>

      {/* 2. Brand Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 border border-brand-gold/30 px-4 py-2.5 bg-brand-burgundy text-brand-gold text-xs sm:text-sm uppercase tracking-widest font-heading font-bold">
            <Sparkles size={14} className="text-brand-gold" />
            <span>30 वर्षों से अधिक का अटूट विश्वास</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-burgundy leading-tight">
            प्रयागराज के हृदय में शुद्धता और सौंदर्य का निर्माण
          </h2>
          
          <p className="text-brand-black/80 text-base sm:text-lg leading-relaxed font-body">
            जय गुरुदेव ज्वेलर्स की स्थापना वर्ष {BRAND_CONFIG.establishedYear} में प्रोपराइटर <strong>{BRAND_CONFIG.owner}</strong> द्वारा प्रयागराज के कोरांव (देवघाट) क्षेत्र में एक छोटे पारंपरिक आभूषण कार्यशाला के रूप में हुई थी। हमारा एकमात्र उद्देश्य था: स्थानीय ग्राहकों, किसान परिवारों और वधुओं को बिना किसी मिलावट के 100% शुद्ध आभूषण और पारदर्शी सेवा प्रदान करना।
          </p>
          
          <p className="text-brand-black/80 text-base sm:text-lg leading-relaxed font-body">
            पिछले तीन दशकों से, श्री बाल कृष्ण सोनी जी के कुशल नेतृत्व में हमें कोरांव और आस-पास के ग्रामीण व अर्ध-शहरी परिवारों के सबसे मांगलिक प्रसंगों का हिस्सा बनने का गौरव मिला है। सगाई की अंगूठी से लेकर भारी विवाह सेटों तक, हमारे आभूषण भारतीय पारंपरिक कला, शुद्धता और कोरांव की संस्कृति को दर्शाते हैं।
          </p>
          
          <p className="text-brand-black/80 text-base sm:text-lg leading-relaxed font-body">
            आज हमारे भव्य बरोखर, देवघाट शोरूम में हजारों अत्याधुनिक हॉलमार्क डिजाइन उपलब्ध हैं। बदलते समय के साथ हमने आधुनिक शुद्धता विश्लेषक और 3D डिजाइन तकनीक को अपनाया है, पर हमारा मूल्य आज भी पूर्ण पारदर्शिता और अटूट विश्वास पर अडिग है।
          </p>
        </div>

        {/* Visual Showcase */}
        <div className="lg:col-span-5 relative aspect-[4/5] border border-brand-gold/25 overflow-hidden group shadow-gold-glow">
          <div className="absolute inset-0 bg-brand-burgundy/40 z-10" />
          <img
            src="/images/gold_bangles_detail.jpg"
            alt="Artisanal Work"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'><rect width='400' height='500' fill='%234a0a12'/><text x='50%' y='50%' font-family='Marcellus' font-size='16' fill='%23D4AF37' text-anchor='middle'>OUR CRAFT</text></svg>";
            }}
          />
          <div className="absolute bottom-6 left-6 z-20 space-y-1 select-none text-left">
            <span className="text-xs sm:text-sm text-brand-gold uppercase tracking-[0.2em] font-heading font-medium">हमारी कार्यशाला से</span>
            <p className="text-sm sm:text-base text-brand-white font-heading font-bold">हस्तनिर्मित बारीक कलाकृति की नक्काशी</p>
          </div>
        </div>
      </div>

      {/* 3. Core Pillars Grid */}
      <div className="space-y-12">
        <div className="text-center space-y-3 mb-12 select-none">
          <span className="text-xs sm:text-sm text-brand-gold tracking-[0.3em] uppercase font-heading font-bold">हमारे सिद्धांत</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brand-burgundy">हमारे विश्वास के तीन मुख्य स्तंभ</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck size={32} className="text-brand-gold" />,
              title: "100% शुद्धता की गारंटी",
              desc: "हम केवल सरकार द्वारा प्रमाणित 100% BIS हॉलमार्क शुद्धता वाले स्वर्ण आभूषण बेचते हैं। सोने के वजन और दर का बिलिंग विवरण पूर्ण रूप से स्पष्ट और पारदर्शी होता है।"
            },
            {
              icon: <Hammer size={32} className="text-brand-gold" />,
              title: "कारीगरी का संरक्षण",
              desc: "हम आभूषणों के निर्माण में पीढ़ियों से काम कर रहे अनुभवी स्वर्णकारों के कौशल का उपयोग करते हैं। हम हस्तनिर्मित जालीदार कला, पोलकी नक्काशी और बारीक कुंदन काम का विशेष संरक्षण करते हैं।"
            },
            {
              icon: <Users size={32} className="text-brand-gold" />,
              title: "पारिवारिक ग्राहक सेवा",
              desc: "हम अपने ग्राहकों को केवल खरीदार नहीं, बल्कि अपने परिवार का अभिन्न सदस्य मानते हैं। आभूषणों की सफाई, पॉलिश और एक्सचेंज दरों में पूर्ण सहयोग प्रदान किया जाता है।"
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-brand-border/60 p-8 bg-brand-cardBg shadow-sm hover:shadow-md transition-all space-y-4 text-left">
              <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center bg-brand-cream">
                {item.icon}
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-brand-burgundy">{item.title}</h3>
              <p className="text-brand-black/75 text-base sm:text-lg leading-relaxed font-light font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
