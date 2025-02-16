import { Component, createSignal } from 'solid-js';
import { I18nProvider, useI18n } from '../index';

const translations = {
  en: {
    welcome: 'Welcome to our app!',
    greeting: 'Hello, {{name}}!',
    items: {
      count: 'You have {{count}} items',
      empty: 'No items found',
    },
    actions: {
      save: 'Save',
      delete: 'Delete',
    },
  },
  es: {
    welcome: '¡Bienvenido a nuestra aplicación!',
    greeting: '¡Hola, {{name}}!',
    items: {
      count: 'Tienes {{count}} artículos',
      empty: 'No se encontraron artículos',
    },
    actions: {
      save: 'Guardar',
      delete: 'Eliminar',
    },
  },
};

const GreetingContent: Component = () => {
  const { t, setLocale, currentLocale } = useI18n();
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'John' })}</p>

      <div>
        <p>{count() === 0 ? t('items.empty') : t('items.count', { count: count() })}</p>
        <button onClick={() => setCount((c) => c + 1)}>Add Item</button>
      </div>

      <button onClick={() => setLocale(currentLocale() === 'en' ? 'es' : 'en')}>
        Switch to {currentLocale() === 'en' ? 'Spanish' : 'English'}
      </button>
    </div>
  );
};

const Greeting: Component = () => {
  return (
    <I18nProvider translations={translations} defaultLocale="en">
      <GreetingContent />
    </I18nProvider>
  );
};

export default Greeting;
