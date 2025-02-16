import { createSignal, createContext, useContext, ParentComponent } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Translations, I18nContextType, TranslationParams, RecursiveRecord, PluralRules } from './types';

const I18nContext = createContext<I18nContextType>();

/** I18n Provider Component */
export const I18nProvider: ParentComponent<{
  translations: Translations;
  defaultLocale: string;
}> = (props) => {
  const [currentLocale, setCurrentLocale] = createSignal(props.defaultLocale);
  const [translations] = createStore(props.translations);

  const getPluralForm = (count: number, locale: string): keyof PluralRules => {
    const pluralRules = new Intl.PluralRules(locale);
    return pluralRules.select(count) as keyof PluralRules;
  };

  const t = (key: string, params?: TranslationParams): string => {
    try {
      const keys = key.split('.');
      let current: string | RecursiveRecord<string> | PluralRules = translations[currentLocale()];

      // Navigate to the translation
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = (current as Record<string, any>)[k];
        }
      }

      // Handle pluralization
      if (current && typeof current === 'object' && 'other' in current) {
        if (typeof params?.count !== 'number') {
          console.warn(`Count parameter missing for plural translation: ${key}`);
          return key;
        }
        
        const pluralForm = getPluralForm(params.count, currentLocale());
        const pluralKey = pluralForm as keyof typeof current;
        const value = (current[pluralKey] || current.other) as string;
        return interpolateParams(value, params);
      }

      if (typeof current !== 'string') {
        throw new Error(`Translation not found: ${key}`);
      }

      return interpolateParams(current, params);
    } catch (error) {
      console.warn(error);
      return key;
    }
  };

  const interpolateParams = (value: string, params?: TranslationParams): string => {
    if (!params) return value;

    return Object.entries(params).reduce<string>((acc, [paramKey, paramValue]) => {
      const placeholder = `{{${paramKey}}}`;
      if (!acc.includes(placeholder)) {
        console.warn(`Unused parameter "${paramKey}" in translation`);
      }
      return acc.replace(placeholder, String(paramValue));
    }, value);
  };

  const context: I18nContextType = {
    t,
    setLocale: setCurrentLocale,
    currentLocale,
    availableLocales: () => Object.keys(translations),
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(currentLocale(), options).format(value);
    },
    formatDate: (value: Date | number, options?: Intl.DateTimeFormatOptions) => {
      return new Intl.DateTimeFormat(currentLocale(), options).format(value);
    },
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