import { faker } from '@faker-js/faker';
import React, { useState,useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import Searchbar from '../../../layouts/dashboard/common/searchbar';


// ----------------------------------------------------------------------

export default function AppView() {

  // eslint-disable-next-line no-unused-vars
        const [statisticsData, setData] = useState([{}]);

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
              console.log("Raw Data:", data);
        
              try {
                const jsonData = JSON.parse(data);
                console.log("Parsed Data:", jsonData);
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



        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
                  <AppCurrentVisits
                    title="Current Visits"
                    chart={{
                      series: Object.keys(statisticsData?.file_counts || {}).map(label => ({
                        label: label.charAt(0).toUpperCase() + label.slice(1), // Mettre en majuscule la première lettre
                        value: statisticsData?.file_counts[label] || 0,
                      })),
                    }}
                  />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
            <AppConversionRates
              title = "Conversion Rates"
              subheader = "(+43%) than last year"
              chart={{
                series: Object.keys(statisticsData?.file_counts || {}).map(label => ({
                  label: label.charAt(0).toUpperCase()+ label.slice(1),
                  value : statisticsData?.file_counts[label] || 0,
                })),
              }}
            />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>
{/* 
        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>


      </Grid>
      
    </Container>
  );
}
