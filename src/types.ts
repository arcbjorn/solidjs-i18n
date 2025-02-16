export type RecursiveRecord<T> = {
  [key: string]: T | RecursiveRecord<T>;
};

export type Translations = {
  [locale: string]: RecursiveRecord<string>;
};

export type TranslationParams = Record<string, string | number>;

export interface I18nContextType {
  t: (key: string, params?: TranslationParams) => string;
  setLocale: (locale: string) => void;
  currentLocale: () => string;
  availableLocales: () => string[];
}

/** Type-safe translation key path generator */
export type TranslationKey<T, Depth extends number[] = []> = Depth['length'] extends 8 ? never : {
  [K in keyof T]: T[K] extends string 
    ? K & string
    : `${K & string}.${TranslationKey<T[K], [...Depth, 1]> & string}`;
}[keyof T]; 