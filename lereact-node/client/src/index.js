// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CSVReader from './CSVReader';  // Import du nouveau composant
import ValidPhone from './ValidPhone'; // Assurez-vous que ce fichier existe et est correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CSVReader />} />
      <Route path="/valid_phone" element={<ValidPhone />} />
    </Routes>
  </BrowserRouter>
);
