import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import '@testing-library/jest-dom';
import Greeting from '../examples/Greeting';

describe('i18n Example', () => {
  test('renders with default English translations', () => {
    render(() => <Greeting />);
    expect(screen.getByText('Welcome to our app!')).toBeInTheDocument();
    expect(screen.getByText('Hello, John!')).toBeInTheDocument();
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  test('switches language to Spanish', async () => {
    render(() => <Greeting />);
    const switchButton = screen.getByText('Switch to Spanish');
    await fireEvent.click(switchButton);
    
    expect(screen.getByText('¡Bienvenido a nuestra aplicación!')).toBeInTheDocument();
    expect(screen.getByText('¡Hola, John!')).toBeInTheDocument();
    expect(screen.getByText('No se encontraron artículos')).toBeInTheDocument();
  });

  test('handles item count updates', async () => {
    render(() => <Greeting />);
    const addButton = screen.getByText('Add Item');
    await fireEvent.click(addButton);
    
    expect(screen.getByText('You have 1 items')).toBeInTheDocument();
  });
}); 