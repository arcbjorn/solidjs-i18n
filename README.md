# Solid-i18n

A lightweight, type-safe internationalization library for SolidJS applications.

## Features

- 🎯 Simple, intuitive API
- 💪 Full TypeScript support
- 🔍 Nested translation keys
- 🎲 Parameter interpolation
- 🔄 Runtime language switching
- 📦 Zero dependencies (except for SolidJS)
- 🪶 Lightweight (~2KB minified)
- 🚀 Reactive updates

## Installation

```bash
npm install solid-i18n
# or
yarn add solid-i18n
# or
pnpm add solid-i18n
```

## Quick Start

```typescript
import { I18nProvider, useI18n } from 'solid-i18n';

// Define your translations
const translations = {
  en: {
    greeting: 'Hello, {{name}}!',
    nav: {
      home: 'Home',
      about: 'About',
    },
  },
  es: {
    greeting: '¡Hola, {{name}}!',
    nav: {
      home: 'Inicio',
      about: 'Sobre nosotros',
    },
  },
};

// Wrap your app with the provider
const App = () => {
  return (
    <I18nProvider translations={translations} defaultLocale="en">
      <MainContent />
    </I18nProvider>
  );
};

// Use translations in your components
const MainContent = () => {
  const { t, setLocale, currentLocale } = useI18n();

  return (
    <div>
      <p>{t('greeting', { name: 'John' })}</p>
      <button onClick={() => setLocale('es')}>
        Switch to Spanish
      </button>
    </div>
  );
};
```

## API Reference

### I18nProvider

The root provider component that makes translations available throughout your app.

#### Props

- `translations: Translations` - An object containing all translations
- `defaultLocale: string` - The initial locale to use
- `children: JSX.Element` - Child components

```typescript
type Translations = {
  [locale: string]: {
    [key: string]: string | { [key: string]: string };
  };
};
```

### useI18n Hook

The main hook to access translation functionality in your components.

#### Returns

- `t: (key: string, params?: Record<string, string | number>) => string`
  - Translates a key into the current locale
  - Supports parameter interpolation using {{param}} syntax
  - Returns the key itself if translation is not found
  
- `setLocale: (locale: string) => void`
  - Changes the current locale
  - Triggers reactive updates in all components using translations
  
- `currentLocale: () => string`
  - Returns the current active locale
  
- `availableLocales: () => string[]`
  - Returns an array of all available locales

## Advanced Usage

### Nested Keys

You can use dot notation to access nested translations:

```typescript
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: {
        title: 'About Us',
        description: 'Learn more about our company'
      }
    }
  }
};

// Usage
t('nav.home') // 'Home'
t('nav.about.title') // 'About Us'
```

### Parameter Interpolation

Use double curly braces for parameters:

```typescript
const translations = {
  en: {
    welcome: 'Welcome to {{site}}, {{name}}!',
    items: 'You have {{count}} items'
  }
};

// Usage
t('welcome', { site: 'My App', name: 'John' })
t('items', { count: 5 })
```

### Plural Forms

The library supports plural forms using the native `Intl.PluralRules` API. You can define different translations based on quantity:

```typescript
const translations = {
  en: {
    messages: {
      count: {
        zero: 'No messages',
        one: '{{count}} message',
        other: '{{count}} messages'
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
    }
  }
};

// Usage
t('messages.count', { count: 0 }) // "No messages"
t('messages.count', { count: 1 }) // "1 message"
t('messages.count', { count: 5 }) // "5 messages"
```

Plural forms support:
- `zero`: Used for zero quantity (optional)
- `one`: Used for singular form
- `other`: Used for plural form (required as fallback)

The correct plural form is automatically selected based on the current locale's rules using `Intl.PluralRules`.

### Language Switching

```typescript
const LanguageSwitcher = () => {
  const { setLocale, currentLocale, availableLocales } = useI18n();

  return (
    <select 
      value={currentLocale()} 
      onChange={(e) => setLocale(e.target.value)}
    >
      {availableLocales().map(locale => (
        <option value={locale}>{locale}</option>
      ))}
    </select>
  );
};
```

## Limitations

1. **Async Loading**
   - Currently doesn't support async loading of translation files
   - All translations must be loaded at initialization

2. **Pluralization**
   - Basic pluralization support through `Intl.PluralRules`
   - Supports `zero`, `one`, and `other` plural forms
   - More complex plural rules must be handled manually

3. **Number/Date Formatting**
   - No built-in number or date formatting
   - Consider using native `Intl` APIs for these features

4. **RTL Support**
   - No built-in RTL (Right-to-Left) support
   - You'll need to handle RTL layouts separately

5. **Fallback Chains**
   - No support for fallback locale chains
   - Missing translations simply return the key

6. **Type Safety**
   - While the library is written in TypeScript, it doesn't provide type checking for translation keys
   - Consider using a code generation step if you need compile-time checking of translation keys

7. **Performance**
   - All translations are kept in memory
   - Not suitable for extremely large translation sets (>1MB)

## Best Practices

1. **Translation Keys**
   - Use descriptive, hierarchical keys
   - Avoid deeply nested structures (max 3-4 levels)
   - Use consistent naming conventions

2. **Parameters**
   - Keep parameter names descriptive
   - Document required parameters in comments
   - Consider using TypeScript interfaces for parameter types

3. **Organization**
   - Split large translation files by feature/module
   - Use a consistent file structure across locales
   - Consider automated validation of translation completeness

## Development

### Available Scripts

- `pnpm start` or `pnpm run dev` - Starts the development server using Vite
- `pnpm run build` - Builds the project for production
- `pnpm run serve` - Previews the production build locally
- `pnpm test` - Runs the test suite
- `pnpm run test:coverage` - Runs tests with coverage reporting
- `pnpm run lint` - Checks for linting issues
- `pnpm run lint:fix` - Automatically fixes linting issues
- `pnpm run format` - Formats all TypeScript/TSX files using Prettier
- `pnpm run format:check` - Checks if files are properly formatted

### Development Workflow

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Make your changes
5. Run tests and linting:
   ```bash
   npm test
   npm run lint
   ```
6. Format your code:
   ```bash
   npm run format
   ```
7. Build for production:
   ```bash
   npm run build
   ```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT License - feel free to use this in your own projects!

## Support

If you encounter any issues or have questions, please file an issue on GitHub.