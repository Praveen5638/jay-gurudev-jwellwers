import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import type { Product } from '../data/products';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  productContext?: {
    id: string;
    name: string;
  };
  createdAt: string;
}

interface AppContextType {
  products: Product[];
  inquiries: Inquiry[];
  promoBanner: string | null;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  submitInquiry: (name: string, phone: string, message: string, productContext?: { id: string; name: string }) => void;
  setPromoBanner: (bannerText: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [promoBanner, setPromoBannerState] = useState<string | null>("✨ विवाह उत्सव धमाका: शादी सीजन के लिए पूरा ब्राइडल सेट खरीदने पर 10% की विशेष छूट! ✨");

  // Load initial data from localStorage or fallback
  useEffect(() => {
    const localProducts = localStorage.getItem('jg_products');
    if (localProducts) {
      setProducts(JSON.parse(localProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('jg_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    const localInquiries = localStorage.getItem('jg_inquiries');
    if (localInquiries) setInquiries(JSON.parse(localInquiries));

    const localPromo = localStorage.getItem('jg_promo');
    if (localPromo !== null) setPromoBannerState(localPromo === "" ? null : localPromo);
  }, []);

  // Save products helper
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('jg_products', JSON.stringify(updatedProducts));
  };

  // Product CRUD
  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
  };

  const updateProduct = (updatedProd: Product) => {
    const updated = products.map(p => p.id === updatedProd.id ? updatedProd : p);
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
  };

  // Inquiries Management
  const submitInquiry = (name: string, phone: string, message: string, productContext?: { id: string; name: string }) => {
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name,
      phone,
      message,
      productContext,
      createdAt: new Date().toISOString()
    };

    const updatedInquiries = [newInquiry, ...inquiries];
    setInquiries(updatedInquiries);
    localStorage.setItem('jg_inquiries', JSON.stringify(updatedInquiries));
  };

  const setPromoBanner = (bannerText: string | null) => {
    setPromoBannerState(bannerText);
    localStorage.setItem('jg_promo', bannerText || "");
  };

  return (
    <AppContext.Provider value={{
      products,
      inquiries,
      promoBanner,
      addProduct,
      updateProduct,
      deleteProduct,
      submitInquiry,
      setPromoBanner
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
