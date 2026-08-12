import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 1. Import all of your translation layer resource objects
import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { zh } from './locales/zh';
import { sw } from './locales/sw';
import { pt } from './locales/pt';
import { jp } from './locales/jp';
import { de } from './locales/de';
import { hi } from './locales/hi';

const getDeviceLanguage = (): string => {
  try {
    // Using require avoids a top-level native import crash on builds without the module bakes in
    const Localization = require('expo-localization');
    
    if (Localization && typeof Localization.getLocales === 'function') {
      const locales = Localization.getLocales();
      const rawLanguage = locales?.[0]?.languageCode;
      if (typeof rawLanguage === 'string') {
        return rawLanguage.split('-')[0];
      }
    }
  } catch (error) {
    // Captures the missing native module silently so your app boots up normally
    console.warn("[i18n] ExpoLocalization native module missing from build wrapper, using fallback 'en'");
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      zh: { translation: zh },
      sw: { translation: sw },
      pt: { translation: pt },
      jp: { translation: jp },
      de: { translation: de },
      hi: { translation: hi },
    },
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });

export default i18n;