// import { faker } from '@faker-js/faker';
import React, { useState,useEffect } from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { DataGrid } from '@mui/x-data-grid';
// import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';


// import AppPagination from 'src/sections/overview/App-Pagination';

// import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
import SearchDrive from '../app-result-drive';
import SearchResultGrid from '../app-datagrid-chechbox';
// import AppConversionRates from '../app-conversion-rates';
import Searchbar from '../../../layouts/dashboard/common/searchbar';


// ----------------------------------------------------------------------

export default function AppView() {

  // eslint-disable-next-line no-unused-vars
        const [statisticsData, setData] = useState([{}]);
        const [searchResults, setSearchResults] = useState(null);

        useEffect(() => {
          fetch("http://127.0.0.1:5000/statistics")
            .then(res => {
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.text(); // Essayez avec res.text() au lieu de res.json()
            })
            .then(data => {
              setData(data)
              // console.log("Raw Data:", data);
        
              try {
                const jsonData = JSON.parse(data);
                // console.log("Parsed Data:", jsonData);
                setData(jsonData);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            })
            .catch(error => console.error("Error fetching data:", error));
        }, []);
  
        const [searchData, setSearchData] = useState(null);
        const [showAlert, setShowAlert] = useState(false);
        const [alertMessage, setAlertMessage] = useState('');

        const handleDataReceived = (data) => {
          // Handle the received data as needed
          setSearchData(data);

          // Check if there's an alert message in the data
          if (data.message) {
            setAlertMessage(data.message);
            setShowAlert(true);
          }
        };

        const handleAlertClose = () => {
          setShowAlert(false);
        };



        // api users
        // const handleClose = () => {
        //   setOpen(false);
        // };

          // const [, setSuccessMessage] = useState('');
          // const [open, setOpen ] = useState(false);
          // const [searchResults, setSearchResults] = useState(null);
          // const [key, setKeywords] = useState({
          //   keyword :''
          // });

          // const handleSearch = async () => {
          //   try{
          //     const response = await fetch('http://127.0.0.1:5000/search_user_bd',{
          //       method: 'POST',
          //       headers: {
          //         'Content-Type' : 'application/json',
          //       },
          //       body: JSON.stringify(key),
          //     });

          //     if (response.ok) {
          //       const data = await response.json();
          //       setSearchResults(data.user_info);
          //       console.log('Data received:', data.user_info);
          //       setSuccessMessage('La recherche a été effectuée avec succès.');
          //     } else {
          //         console.error('search failed');
          //         setSuccessMessage('Erreur lors de la recherche. Veuillez réessayer.');
          //     } 

          //     setTimeout(() => setSuccessMessage(''), 10000);
          //   } catch (error) {
          //     console.error('Error during search:', error.toString());
          //     setSuccessMessage('Erreur lors de la recherche. Veuillez réessayer.');
          //   }
          // };  

          // base de données: 


  return (
    <Container maxWidth="xl" position="relative" >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3} justifyContent='center'>
      <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Others"
              // total={statisticsData?.file_counts?.other !== undefined ? (
              //   <Typography variant="h3">{statisticsData.file_counts.other}</Typography>
              //   ) : (
              //     <Typography variant="h3">0</Typography>
              //   )}
                total={statisticsData?.file_counts?.other || 0}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/7.png" />}
            />
      </Grid>
      <Grid  xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tous Fichier"
            // total={statistics.file_counts.word}
            total={statisticsData?.total_files|| 0}
            // total = {1000}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/6.png" />}
          />
      </Grid>
    </Grid>

      <Grid  container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Excel"
            total={statisticsData?.file_counts?.excel || 0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/3.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="DOC"
            total={statisticsData?.file_counts?.word || 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/2.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="PDF"
            total={statisticsData?.file_counts?.pdf || 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/1.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="TEXTS"
            total={statisticsData?.file_counts?.text || 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/4.png" />}
          />
        </Grid>
        
        <Grid md={12} lg={12}>
          <Searchbar onDataReceived={handleDataReceived} />
        </Grid>

        {searchData && searchData.referencing_tables && (
        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title={`The Concerned Person : ${searchData.person_name}`}
            list={searchData.referencing_tables.map((refTable) => ({
              id: refTable.constraint_name,
              title: `has information on  - ${refTable.table_name} - Table`,
              type: 'order3',
              time: refTable.referenced_records_count,
            }))}
          />
        </Grid>
      )}

      {searchData && searchData.referencing_tables && searchData.person_id && searchData.source_table && (
        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Anonymiser"
            list={searchData.referencing_tables.map((refTable) => ({
              id: refTable.constraint_name,
              name: refTable.table_name,
              referencing_tables: searchData.referencing_tables,
              person_id: searchData.person_id,
              source_table: searchData.source_table,
            }))}
            onSendData={(data) => {
              // Handle sending data to the backend
              console.log('Selected Tables:', data.selectedTables);
              console.log('Person ID:', data.personId);
              console.log('Source Table:', data.sourceTable);
              console.log('Referencing Tables:', data.referencingTables);
              // Add your API call logic here
            }}
          />
        </Grid>
      )}

      {/* ... other components ... */}

      {/* Bootstrap Alert */}
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleAlertClose} />
        </div>
      )}

            {/* search of user from database  with khalil */}
              {/* <Box
                    sx={{
                      display: 'flex',
                      marginTop:'20vh',
                      width: 1000,
                      maxWidth: '100%',
                      marginBottom: '5vh'
                    }}
                  >
                  <TextField 
                      fullWidth label="fullWidth" 
                      id="fullWidth" 
                      value={key.keyword}
                      onChange={(e)=>
                        setKeywords({ ...key, keyword: e.target.value})
                      }
                      sx={{
                        marginRight: '1vh'
                      }}
                  />
                  <Button 
                      variant='contained'
                      sx={{
                        width:150
                      }}
                      onClick={handleSearch}
                      >Submit
                  </Button>
                </Box> */}
                  
                  {/* <Box 
                    sx={{
                      width:'100%'
                    }}
                  >
                    {searchResults && Object.entries(searchResults).map(([tableName, tableData]) => (
                      <div key={tableName}>
                        <h3>Résultats pour la table {tableName}</h3>
                        {tableData.length > 0 ? (
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  {Object.keys(tableData[0]).map(columnName => (
                                    <TableCell key={columnName}>{columnName}</TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {tableData.map((row, index) => (
                                  <TableRow key={index}>
                                    {Object.values(row).map((value, columnIndex) => (
                                      <TableCell key={columnIndex}>{value}</TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        ) : (
                          <p>Aucun résultat trouvé dans cette table.</p>
                        )}
                      </div>
                    ))}
                  </Box> */}

                  {/* from the database */}
                <SearchResultGrid searchResults={searchResults} />


                                                
                        {/* <Box>
                          <AppPagination searchResults={searchResults} />
                      </Box> */}

                  <Grid md={12} lg={12}>
                    <SearchDrive onDataReceived={handleDataReceived} />
                  </Grid>

      </Grid>
      
    </Container>
  );
}
