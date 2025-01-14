import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

// Function to clean the phone number
const cleanPhoneNumber = (phoneNumber) => {
  // Remove spaces, dashes, parentheses, and trim the input
  return phoneNumber.replace(/[\s()-]+/g, '').trim();
};

// Function to validate phone numbers
const isValid = (phoneNumber) => {
  if (!phoneNumber) return false;
  // Regex to validate French phone numbers
  const phoneRegex = /^(?:(?:\+33|0033|0)[1-9])(?:\d{2}){4}$/;
  return phoneRegex.test(phoneNumber);
};

function ValidPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);
    console.log('Cleaned Phone Number:', cleanedPhoneNumber); // Debugging log
    const valid = isValid(cleanedPhoneNumber);
    console.log('Is Valid:', valid); // Debugging log
    setIsValidPhone(valid);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 4,
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        color="primary"
        gutterBottom
      >
        Validation de numéro de téléphone
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 2 }}
      >
        {/* Input field for phone number */}
        <TextField
          label="Numéro de téléphone"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Valider
        </Button>
      </Box>

      {/* Validation message */}
      {isValidPhone !== null && (
        <Box sx={{ mt: 3 }}>
          {isValidPhone ? (
            <Alert severity="success">Numéro valide</Alert>
          ) : (
            <Alert severity="error">Numéro invalide</Alert>
          )}
        </Box>
      )}
    </Container>
  );
}

export default ValidPhone;
