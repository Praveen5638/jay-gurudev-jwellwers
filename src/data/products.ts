export interface Product {
  id: string;
  name: string;
  category: string;
  material: 'Gold' | 'Silver' | 'Diamond';
  price: number;
  weight: number; // in grams
  purity: string;  
  makingCharges: number; // percentage
  description: string;
  images: string[]; 
  featured: boolean;
  stock: number;
  createdAt: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "शाही कुंदन एवं पोलकी ब्राइडल सेट",
    category: "विवाह आभूषण",
    material: "Gold",
    price: 385000,
    weight: 68.5,
    purity: "22K BIS हॉलमार्क सोना",
    makingCharges: 12,
    description: "पारंपरिक भारतीय कारीगरी का एक उत्कृष्ट नमूना। यह 22K सोने का ब्राइडल सेट शुद्ध कुंदन, अनकट पोलकी हीरों और पन्ने के मोतियों से सुसज्जित है। यह विवाह के विशेष अवसर पर आपको राजसी भव्यता प्रदान करता है।",
    images: [
      "/images/bridal_necklace.jpg",
      "/images/bridal_necklace_detail.jpg",
      "/images/bridal_necklace_model.jpg"
    ],
    featured: true,
    stock: 2,
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: "prod-2",
    name: "एंटीक कारीगरी स्वर्ण कंगन सेट",
    category: "स्वर्ण आभूषण",
    material: "Gold",
    price: 245000,
    weight: 42.0,
    purity: "22K BIS हॉलमार्क सोना",
    makingCharges: 10,
    description: "बारीक नक्काशी से अलंकृत पारंपरिक मंदिर शैली के सोने के कंगन। इसका एंटीक फिनिश और रूबी नगों की सजावट आपके परिधान को विंटेज और शाही लुक प्रदान करती है।",
    images: [
      "/images/gold_bangles.jpg",
      "/images/gold_bangles_detail.jpg"
    ],
    featured: true,
    stock: 5,
    createdAt: "2026-02-15T11:30:00Z"
  },
  {
    id: "prod-3",
    name: "शाही चांदी का हाथी कड़ा",
    category: "रजत आभूषण",
    material: "Silver",
    price: 18500,
    weight: 85.0,
    purity: "92.5 स्टर्लिंग सिल्वर",
    makingCharges: 15,
    description: "ठोस और भारी चांदी का कड़ा, जिसके सिरों पर पारंपरिक हाथी की आकृति बनी है। वरिष्ठ कारीगरों द्वारा हस्तनिर्मित और ऑक्सीडाइज्ड फिनिश के साथ तैयार।",
    images: [
      "/images/silver_kada.jpg",
      "/images/silver_kada_detail.jpg"
    ],
    featured: true,
    stock: 8,
    createdAt: "2026-03-01T09:15:00Z"
  },
  {
    id: "prod-4",
    name: "सॉलिटेयर हीरा पेंडेंट",
    category: "नित्य धारण",
    material: "Diamond",
    price: 85000,
    weight: 3.5,
    purity: "18K गोल्ड + VVS1 डायमंड",
    makingCharges: 8,
    description: "नित्य धारण (डेली वियर) के लिए एक अत्यंत सुरुचिपूर्ण 18K पीले सोने की चैन के साथ 0.5-कैरेट चमकदार हीरे का सिंगल सॉलिटेयर पेंडेंट।",
    images: [
      "/images/diamond_pendant.jpg",
      "/images/diamond_pendant_detail.jpg"
    ],
    featured: true,
    stock: 12,
    createdAt: "2026-04-10T14:45:00Z"
  },
  {
    id: "prod-5",
    name: "महाराजा बॉक्स-लिंक सोने की चैन",
    category: "पुरुष कलेक्शन",
    material: "Gold",
    price: 165000,
    weight: 28.2,
    purity: "22K BIS हॉलमार्क सोना",
    makingCharges: 9,
    description: "मजबूत और चमकदार 22K सोने की चैन, जो पुरुषों के व्यक्तित्व को एक राजसी गरिमा प्रदान करती है। इसमें आजीवन चलने वाला S-हुक लगा है।",
    images: [
      "/images/men_chain.jpg",
      "/images/men_chain_detail.jpg"
    ],
    featured: false,
    stock: 4,
    createdAt: "2026-04-20T16:20:00Z"
  },
  {
    id: "prod-6",
    name: "स्वर्ण झुमकी (मोती बूंद)",
    category: "स्वर्ण आभूषण",
    material: "Gold",
    price: 125000,
    weight: 21.5,
    purity: "22K BIS हॉलमार्क सोना",
    makingCharges: 11,
    description: "बारीक जालीदार गुंबद और असली मीठे पानी के सुंदर लटकते मोतियों से सजी 22K सोने की क्लासिक और पारंपरिक झुमकी।",
    images: [
      "/images/gold_jhumkas.jpg",
      "/images/gold_jhumkas_detail.jpg"
    ],
    featured: true,
    stock: 7,
    createdAt: "2026-05-01T12:00:00Z"
  },
  {
    id: "prod-7",
    name: "डायमंड कट सोने की अंगूठी",
    category: "पुरुष कलेक्शन",
    material: "Gold",
    price: 54000,
    weight: 8.8,
    purity: "22K BIS हॉलमार्क सोना",
    makingCharges: 8,
    description: "आधुनिक ज्यामितीय कट के साथ पुरुषों के लिए 22K सोने की अंगूठी। यह विवाह या उपहार देने के लिए अत्यंत उपयुक्त और आरामदायक है।",
    images: [
      "/images/men_ring.jpg",
      "/images/men_ring_detail.jpg"
    ],
    featured: false,
    stock: 15,
    createdAt: "2026-05-10T10:10:00Z"
  },
  {
    id: "prod-8",
    name: "ऑक्सीडाइज्ड शाही चांदी की पायल",
    category: "रजत आभूषण",
    material: "Silver",
    price: 9500,
    weight: 48.0,
    purity: "92.5 स्टर्लिंग सिल्वर",
    description: "बारीक फूलों की नक्काशीदार चांदी की पायल, जिसमें मधुर आवाज करने वाले घुंघरू लगे हैं। यह भारतीय पारंपरिक नारीत्व का सुंदर शृंगार है।",
    makingCharges: 12,
    images: [
      "/images/silver_anklets.jpg",
      "/images/silver_anklets_detail.jpg"
    ],
    featured: false,
    stock: 10,
    createdAt: "2026-05-15T09:00:00Z"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "आराध्या सेन",
    city: "प्रयागराज",
    rating: 5,
    text: "जय गुरुदेव ज्वेलर्स ने मेरी शादी के आभूषण मेरी पसंद के अनुसार बनाए। पोल्की सेट की फिनिश कमाल की थी। इनकी शुद्धता और व्यवहार पर पूरा भरोसा है।"
  },
  {
    id: 2,
    name: "राजेश मिश्रा",
    city: "सिविल लाइंस",
    rating: 5,
    text: "हम दो पीढ़ियों से यहीं से सोना खरीद रहे हैं। हॉलमार्क की शुद्धता हमेशा खरी उतरती है और बिलिंग बेहद पारदर्शी होती है। शानदार अनुभव।"
  },
  {
    id: 3,
    name: "अनन्या कपूर",
    city: "प्रयागराज",
    rating: 5,
    text: "मैंने रोज पहनने के लिए एक हीरे का पेंडेंट लिया। इसकी चमक शानदार है और मेकिंग चार्जेस की स्पष्टता की वजह से खरीदारी का अनुभव बहुत सहज रहा।"
  }
];
