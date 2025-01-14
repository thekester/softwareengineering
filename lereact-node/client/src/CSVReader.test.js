import React from 'react';
import { render, screen } from '@testing-library/react';
import CSVReader from './CSVReader';

test('affiche le titre Lecteur de fichiers CSV', () => {
  render(<CSVReader />);
  const titleElement = screen.getByText(/Lecteur de fichiers CSV/i);
  expect(titleElement).toBeInTheDocument();
});

test('affiche le bouton Choisir un fichier CSV', () => {
  render(<CSVReader />);
  const buttonElement = screen.getByRole('button', { name: /Choisir un fichier CSV/i });
  expect(buttonElement).toBeInTheDocument();
});
