import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ValidPhone from './ValidPhone';

test('rend le formulaire de validation de numéro de téléphone', () => {
  render(<ValidPhone />);
  const headingElement = screen.getByText(/Validation de numéro de téléphone/i);
  expect(headingElement).toBeInTheDocument();

  const inputElement = screen.getByLabelText(/Numéro de téléphone/i);
  expect(inputElement).toBeInTheDocument();

  const buttonElement = screen.getByRole('button', { name: /Valider/i });
  expect(buttonElement).toBeInTheDocument();
});

test('affiche "Numéro valide" pour un numéro valide', () => {
  render(<ValidPhone />);
  const inputElement = screen.getByLabelText(/Numéro de téléphone/i);
  const buttonElement = screen.getByRole('button', { name: /Valider/i });

  // Entrer un numéro de téléphone valide
  fireEvent.change(inputElement, { target: { value: "0123456789" } });
  fireEvent.click(buttonElement);

  const successAlert = screen.findByText(/Numéro valide/i);
  expect(successAlert).toBeDefined();
});

test('affiche "Numéro invalide" pour un numéro invalide', () => {
  render(<ValidPhone />);
  const inputElement = screen.getByLabelText(/Numéro de téléphone/i);
  const buttonElement = screen.getByRole('button', { name: /Valider/i });

  // Entrer un numéro de téléphone invalide
  fireEvent.change(inputElement, { target: { value: "123" } });
  fireEvent.click(buttonElement);

  const errorAlert = screen.findByText(/Numéro invalide/i);
  expect(errorAlert).toBeDefined();
});
