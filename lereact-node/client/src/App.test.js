import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('affiche le titre Lecteur de fichiers CSV', () => {
  render(<App />);
  const titleElement = screen.getByText(/Lecteur de fichiers CSV/i);
  expect(titleElement).toBeInTheDocument();
});

test('affiche le bouton Choisir un fichier CSV', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /Choisir un fichier CSV/i });
  expect(buttonElement).toBeInTheDocument();
});
