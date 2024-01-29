import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import AppPagination from 'src/sections/overview/App-Pagination';

export default function SearchDrive() {
    const [loading, setLoading] = useState(false);
    const [, setSuccessMessage] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [keywords, setKeywords] = useState({ keyword1: '' });

    const handleSearchDrive = async () => {
        try {
            // Activate loading
            setLoading(true);

            const response = await fetch('http://127.0.0.1:5000/searchDrive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(keywords),
            });

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.resultat_of_search);
                setSuccessMessage('La recherche a été effectuée avec succès.');
            } else {
                console.error('search failed');
                setSuccessMessage('Erreur lors de la recherche. Veuillez réessayer.');
            }

            // Deactivate loading after search
            setLoading(false);

            // Clear success message after 10 seconds
            setTimeout(() => setSuccessMessage(''), 10000);
        } catch (error) {
            console.error('Error during search:', error);
            setSuccessMessage('Erreur lors de la recherche. Veuillez réessayer.');
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                    marginTop: '10vh',
                    marginBottom: '2vh',
                }}
            >
                <TextField
                    autoFocus
                    fullWidth
                    disableUnderline
                    label="Donneé"
                    value={keywords.keyword1}
                    onChange={(e) => setKeywords({ ...keywords, keyword1: e.target.value })}
                />
                <Button variant="contained" onClick={handleSearchDrive}>
                    Search
                </Button>
            </Box>

            {loading ? (
                // Show loading spinner or component during search
                <div>Loading...</div>
            ) : (
                // Show search results when loading is false
                searchResults && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ flexGrow: '1' }}>
                            <Box>
                                <AppPagination searchResults={searchResults} />
                            </Box>
                        </div>
                        <div style={{ flexGrow: '1', marginLeft: '5vh' }}>
                            <div>
                                <h2>Anonymiser une données</h2>
                            </div>
                            <div>
                                <div>
                                    <TextField autoFocus fullWidth disableUnderline label="Données à anonymiser " />
                                </div>
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
                )
            )}
        </>
    );
}
