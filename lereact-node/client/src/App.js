import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Fonction de validation des numéros de téléphone
const isValidPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  const cleanedNumber = phoneNumber.replace(/\s+/g, '');
  const phoneRegex = /^(?:(?:\+33|0033)[\s]?|0)([1-9])(?:[\s]?\d{2}){4}$/;
  return phoneRegex.test(cleanedNumber);
};

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const parsedData = results.data;
          setData(parsedData);
          setColumns(parsedData.length > 0 ? Object.keys(parsedData[0]) : []);
        },
        error: function (error) {
          console.error('Erreur lors du parsing du CSV:', error);
        },
      });
    }
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', p: 4 }}>
      <Container maxWidth="md" sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Lecteur de fichiers CSV
        </Typography>

        {/* Champ fichier caché et bouton déclencheur */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            Choisir un fichier CSV
          </Button>
        </Box>

        {data.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col} align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: '#fff' }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      '&:hover': { bgcolor: 'grey.200' },
                    }}
                  >
                    {columns.map((col) => {
                      const cellValue = row[col];
                      let cellColor = 'inherit';
                      let Icon = null;

                      if (col.toLowerCase().includes('phone') || col.toLowerCase().includes('tel')) {
                        if (cellValue) {
                          if (isValidPhoneNumber(cellValue)) {
                            cellColor = 'success.main';
                            Icon = <CheckCircleIcon color="success" sx={{ mr: 1 }} />;
                          } else {
                            cellColor = 'error.main';
                            Icon = <ErrorIcon color="error" sx={{ mr: 1 }} />;
                          }
                        } else {
                          cellColor = 'grey.500';
                        }
                      }

                      return (
                        <TableCell
                          key={col}
                          align="center"
                          sx={{
                            bgcolor: cellColor !== 'inherit' ? cellColor : 'inherit',
                            color: cellColor !== 'inherit' ? '#fff' : 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {Icon}
                          {cellValue || 'N/A'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}

export default App;
