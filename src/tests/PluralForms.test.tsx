import { fireEvent, render, screen } from '@solidjs/testing-library';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import PluralForms from '../examples/PluralForms';

describe('PluralForms', () => {
  test('renders with initial zero state in English', () => {
    render(() => <PluralForms />);
    expect(screen.getByText('0 messages')).toBeInTheDocument();
    expect(screen.getByText('0 apples')).toBeInTheDocument();
  });

  test('updates counts correctly in English', async () => {
    render(() => <PluralForms />);
    const plusButton = screen.getByText('+');

    // Test singular
    await fireEvent.click(plusButton);
    expect(screen.getByText('1 message')).toBeInTheDocument();
    expect(screen.getByText('One apple')).toBeInTheDocument();

    // Test plural
    await fireEvent.click(plusButton);
    expect(screen.getByText('2 messages')).toBeInTheDocument();
    expect(screen.getByText('2 apples')).toBeInTheDocument();
  });

  test('switches language and maintains counts', async () => {
    render(() => <PluralForms />);
    const plusButton = screen.getByText('+');
    const switchButton = screen.getByText('Switch to Spanish');

    // Set count to 2
    await fireEvent.click(plusButton);
    await fireEvent.click(plusButton);

    // Switch to Spanish
    await fireEvent.click(switchButton);
    expect(screen.getByText('2 mensajes')).toBeInTheDocument();
    expect(screen.getByText('2 manzanas')).toBeInTheDocument();

    // Back to zero in Spanish
    const minusButton = screen.getByText('-');
    await fireEvent.click(minusButton);
    await fireEvent.click(minusButton);
    expect(screen.getByText('0 mensajes')).toBeInTheDocument();
    expect(screen.getByText('0 manzanas')).toBeInTheDocument();
  });
});
