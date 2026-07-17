import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { es } from './locales/es';

const getDeviceLanguage = (): string => {
  try {
    // Absolutely confirm Localization and getLocales are defined before calling
    if (Localization && typeof Localization.getLocales === 'function') {
      const locales = Localization.getLocales();
      const rawLanguage = locales?.[0]?.languageCode;
      if (typeof rawLanguage === 'string') {
        return rawLanguage.split('-')[0];
      }
    }
  } catch (error) {
    console.warn("[i18n] Localization module not ready, using fallback 'en'");
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });

export default i18n;