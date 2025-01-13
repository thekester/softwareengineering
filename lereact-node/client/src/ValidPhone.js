import React, { useState } from 'react';
import { isValid } from './phoneNumberValidation'; // Assurez-vous que cette fonction valide correctement les numéros
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

function ValidPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = isValid(phoneNumber);
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
        {/* Champ de saisie */}
        <TextField
          label="Numéro de téléphone"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Bouton de soumission */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Valider
        </Button>
      </Box>

      {/* Message de validation */}
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
