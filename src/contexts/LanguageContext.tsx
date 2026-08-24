import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../../translations';

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

  // Translation function.
  // Resolves a dotted key ("home.universityTitle") against the active language.
  // If the key is missing in the active language (or resolves to an empty
  // string), it transparently falls back to the English translation so the
  // raw key is never shown to visitors. Only if the key is missing from
  // English too does it return the key itself.
  const t = (key: string): string => {
    const keys = key.split('.');

    const lookupIn = (source: any): string | undefined => {
      let value = source;
      for (const k of keys) {
        // Only descend when the key actually exists and the parent is an
        // object — otherwise treat the chain as "not found" for a full
        // English fallback.
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return undefined;
        }
      }
      return typeof value === 'string' && value.length > 0 ? value : undefined;
    };

    return (
      lookupIn(translations[language]) ||
      lookupIn(translations.en) ||
      key
    );
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
    // Graceful fallback when rendered outside a LanguageProvider
    // (e.g. Figma component preview iframe)
    return {
      language: 'en' as Language,
      setLanguage: (_lang: Language) => {},
      t: (key: string): string => {
        const keys = key.split('.');
        let value: any = translations['en'];
        for (const k of keys) {
          if (value && typeof value === 'object') {
            value = value[k];
          } else {
            return key;
          }
        }
        return value || key;
      },
      dir: 'ltr' as const,
    };
  }
  return context;
}