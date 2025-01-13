import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Fade,
  Box,
  CssBaseline
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
    background: {
      default: '#f4f6f8', 
    },
  },
});

const HiddenInput = styled('input')({
  display: 'none',
});

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  const handleFileUpload = event => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          const parsedData = results.data;
          setData(parsedData);
          setColumns(parsedData.length > 0 ? Object.keys(parsedData[0]) : []);
          setFadeIn(true);
        },
        error: function(error) {
          console.error("Erreur lors du parsing du CSV:", error);
        }
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Lecteur de fichiers CSV
        </Typography>

        <Box display="flex" justifyContent="center" my={3}>
          <label htmlFor="csv-file-input">
            <HiddenInput
              accept=".csv"
              id="csv-file-input"
              type="file"
              onChange={handleFileUpload}
            />
            <Button variant="contained" component="span" color="primary">
              Choisir un fichier CSV
            </Button>
          </label>
        </Box>

        {data.length > 0 && (
          <Fade in={fadeIn} timeout={1000}>
            <Paper 
              sx={{ 
                mt: 4, 
                p: 2, 
                overflowX: 'auto', 
                boxShadow: 3, 
                borderRadius: 2 
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="tableau CSV">
                <TableHead>
                  <TableRow>
                    {columns.map(col => (
                      <TableCell 
                        key={col} 
                        sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} hover>
                      {columns.map(col => (
                        <TableCell key={col}>{row[col]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Fade>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
