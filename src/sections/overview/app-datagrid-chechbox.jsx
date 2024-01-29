import React, { useState } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';

const SearchResultGrid = () => {
  const [, setSuccessMessage] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchKey, setKeywords] = useState({
    keyword: '',
  });

  const handleSearch = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/search_user_bd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchKey),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.user_info);
        console.log('Data received:', data.user_info);
        setSuccessMessage('La recherche a été effectuée avec succès.');
      } else {
        console.error('search failed');
        setSuccessMessage('Erreur lors de la recherche. Veuillez réessayer.');
      }

      setTimeout(() => setSuccessMessage(''), 10000);
    } catch (error) {
      console.error('Error during search:', error.toString());
      setSuccessMessage('Erreur lors de la recherche. Veuillez réessayer.');
    }
  };

  const transformedRows = searchResults
    ? searchResults.reduce((acc, item) => {
        Object.entries(item).forEach(([key, value]) => {
          acc.push({
            id: `${key}-${item.id}`, // Assurez-vous d'avoir une propriété unique comme identifiant
            property: key,
            value,
          });
        });
        return acc;
      }, [])
    : [];

  return (
<>
        
            <Box
                sx={{
                display: 'flex',
                marginTop: '20vh',
                width: 1000,
                maxWidth: '100%',
                marginBottom: '5vh',
                }}
            >
                <TextField
                fullWidth
                label="fullWidth"
                id="fullWidth"
                value={searchKey.keyword}
                onChange={(e) => setKeywords({ ...searchKey, keyword: e.target.value })}
                sx={{
                    marginRight: '1vh',
                }}
                />
                <Button
                variant="contained"
                sx={{
                    width: 150,
                }}
                onClick={handleSearch}
                >
                Submit
                </Button>
            </Box>

            {/* Afficher les résultats avec le composant SearchResultGrid */}
            {searchResults && (
            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: '1' }}>
                    <Box>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                        rows={transformedRows}
                        columns={[
                            { field: 'property', headerName: 'Property', width: 200 },
                            { field: 'value', headerName: 'Value', width: 200 },
                        ]}
                        pageSize={5}
                        checkboxSelection
                        />
                    </div>
                    </Box>
                </div>
                    <div style={{ flexGrow: '1', marginLeft: '5vh' }}>
                        <div>
                            <h2>Anonymiser les données</h2>
                        </div>
                        <div>
                            {/* <div>
                                <TextField autoFocus fullWidth disableUnderline label="Données à anonymiser " />
                            </div> */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'end',
                                marginTop: '2vh',
                            }}>
                                <Button variant="contained">Annonymiser</Button>
                            </div>
                        </div>
                    </div>
            </div>
            )}
</>
        
        

  );
};

export default SearchResultGrid;
