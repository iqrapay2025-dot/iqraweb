import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '.././../translations';

type Language = 'en' | 'ar' | 'fr' | 'es' | 'yo' | 'ig' | 'ha' | 'nl' | 'de' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage for saved language preference
    try {
      const saved = localStorage.getItem('iqrapay-language');
      return (saved as Language) || 'en';
    } catch (error) {
      console.warn('localStorage not available:', error);
      return 'en';
    }
  });

  // Determine text direction (RTL for Arabic)
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Save language preference to localStorage
    try {
      localStorage.setItem('iqrapay-language', language);
    } catch (error) {
      console.warn('localStorage not available:', error);
    }
    // Update document direction
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        return value || key;
      }
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
