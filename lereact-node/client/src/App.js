import React, { useState, useRef } from 'react';
import Papa from 'papaparse';

// Composants d'icônes
const CheckCircleIcon = (props) => {
  const { style, ...other } = props;
  return (
    <span {...other} style={{ color: '#4caf50', marginRight: '8px', ...style }}>
      ✔️
    </span>
  );
};

const ErrorIcon = (props) => {
  const { style, ...other } = props;
  return (
    <span {...other} style={{ color: '#f44336', marginRight: '8px', ...style }}>
      ❌
    </span>
  );
};

// Fonction de validation pour les numéros de téléphone
const isValidPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  const cleanedNumber = phoneNumber.replace(/\s+/g, '');
  const phoneRegex = /^(?:(?:\+33|0033)[\s]?|0)([1-9])(?:[\s]?\d{2}){4}$/;
  return phoneRegex.test(cleanedNumber);
};

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  
  // Référence vers l'élément input
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
          console.error("Erreur lors du parsing du CSV:", error);
        },
      });
    }
  };

  const containerStyle = {
    maxWidth: '960px',
    margin: '0 auto',
    marginTop: '40px',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    textTransform: 'none',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#005bb5',
    transform: 'scale(1.05)',
    transition: 'transform 0.2s, background-color 0.2s',
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', padding: '20px' }}>
      <div style={containerStyle}>
        <h4 style={{ textAlign: 'center', color: '#1976d2' }}>
          Lecteur de fichiers CSV
        </h4>

        {/* Champ fichier caché et bouton déclencheur */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <input
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".csv"
            type="file"
            onChange={handleFileUpload}
          />
          <button
            style={buttonStyle}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) =>
              Object.assign(e.target.style, {
                backgroundColor: '#1976d2',
                transform: 'scale(1)',
              })
            }
          >
            Choisir un fichier CSV
          </button>
        </div>

        {data.length > 0 && (
          <div style={{ overflowX: 'auto', marginTop: '24px' }}>
            <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      style={{
                        fontWeight: 'bold',
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '8px',
                        border: '1px solid #ddd',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{ transition: 'background-color 0.3s' }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {columns.map((col) => {
                      const cellValue = row[col];
                      let cellColor = 'inherit';
                      let Icon = null;

                      if (col.toLowerCase().includes('phone') || col.toLowerCase().includes('tel')) {
                        if (cellValue) {
                          if (isValidPhoneNumber(cellValue)) {
                            cellColor = '#4caf50'; // Vert
                            Icon = <CheckCircleIcon style={{ color: cellColor }} />;
                          } else {
                            cellColor = '#f44336'; // Rouge
                            Icon = <ErrorIcon style={{ color: cellColor }} />;
                          }
                        } else {
                          cellColor = '#bdbdbd'; // Gris
                        }
                      }

                      return (
                        <td
                          key={col}
                          style={{
                            backgroundColor: cellColor,
                            color: cellColor !== 'inherit' ? '#fff' : '#000',
                            textAlign: 'center',
                            padding: '8px',
                            border: '1px solid #ddd',
                            transition: 'background-color 0.3s',
                          }}
                        >
                          {Icon}
                          {cellValue || 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
