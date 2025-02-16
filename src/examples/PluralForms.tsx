import { Component, createSignal } from 'solid-js';
import { I18nProvider, useI18n } from '../index';

const translations = {
  en: {
    messages: {
      count: {
        zero: 'No messages',
        one: '{{count}} message',
        other: '{{count}} messages'
      }
    },
    apples: {
      count: {
        zero: 'No apples',
        one: 'One apple',
        other: '{{count}} apples'
      }
    }
  },
  es: {
    messages: {
      count: {
        zero: 'No hay mensajes',
        one: '{{count}} mensaje',
        other: '{{count}} mensajes'
      }
    },
    apples: {
      count: {
        zero: 'No hay manzanas',
        one: 'Una manzana',
        other: '{{count}} manzanas'
      }
    }
  }
};

const PluralFormsContent: Component = () => {
  const { t, setLocale, currentLocale } = useI18n();
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <div>
        <p>{t('messages.count', { count: count() })}</p>
        <p>{t('apples.count', { count: count() })}</p>
        <button onClick={() => setCount(c => Math.max(0, c - 1))}>-</button>
        <span>{count()}</span>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>

      <button onClick={() => setLocale(currentLocale() === 'en' ? 'es' : 'en')}>
        Switch to {currentLocale() === 'en' ? 'Spanish' : 'English'}
      </button>
    </div>
  );
};

const PluralForms: Component = () => (
  <I18nProvider translations={translations} defaultLocale="en">
    <PluralFormsContent />
  </I18nProvider>
);

export default PluralForms; 