import { createSignal, createContext, useContext, ParentComponent } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Translations, I18nContextType, TranslationParams, RecursiveRecord } from './types';

const I18nContext = createContext<I18nContextType>();

/** I18n Provider Component */
export const I18nProvider: ParentComponent<{
  translations: Translations;
  defaultLocale: string;
}> = (props) => {
  const [currentLocale, setCurrentLocale] = createSignal(props.defaultLocale);
  const [translations] = createStore(props.translations);

  const t = (key: string, params?: TranslationParams): string => {
    try {
      const keys = key.split('.');
      let current: string | RecursiveRecord<string> = translations[currentLocale()];

      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        }
      }

      if (typeof current !== 'string') {
        throw new Error(`Translation not found: ${key}`);
      }

      const value = current;

      if (!params) return value;

      return Object.entries(params).reduce<string>((acc, [paramKey, paramValue]) => {
        const placeholder = `{{${paramKey}}}`;
        if (!acc.includes(placeholder)) {
          console.warn(`Unused parameter "${paramKey}" in translation: ${key}`);
        }
        return acc.replace(placeholder, String(paramValue));
      }, value);
    } catch (error) {
      console.warn(error);
      return key;
    }
  };

  const context: I18nContextType = {
    t,
    setLocale: setCurrentLocale,
    currentLocale,
    availableLocales: () => Object.keys(translations),
  };

  return (
    <I18nContext.Provider value={context}>
      {props.children}
    </I18nContext.Provider>
  );
};

/** Hook to use translations in components */
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}; 