// ValidPhone.js
import React, { useState } from 'react';
import { isValid } from './phoneNumberValidation'; // Assurez-vous que le fichier est en module ES

function ValidPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = isValid(phoneNumber);
    setIsValidPhone(valid);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#1976d2' }}>Validation de numéro de téléphone</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Entrez un numéro de téléphone"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Valider
        </button>
      </form>
      {isValidPhone !== null && (
        <p style={{ textAlign: 'center', color: isValidPhone ? 'green' : 'red', marginTop: '10px' }}>
          {isValidPhone ? 'Numéro valide' : 'Numéro invalide'}
        </p>
      )}
    </div>
  );
}

export default ValidPhone;
