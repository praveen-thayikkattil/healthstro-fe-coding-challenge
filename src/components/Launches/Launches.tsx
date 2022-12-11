import { useLaunchesQuery } from 'generated';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThumbUp from '@mui/icons-material/ThumbUp'
import ThumbDown from '@mui/icons-material/ThumbDown'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Masonry from '@mui/lab/Masonry';
import { ChangeEvent, Key, ReactChild, ReactFragment, ReactPortal, useState } from 'react';

const Launches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useLaunchesQuery();
  const filteredData = data?.launchesPast?.filter(launch => 
    launch?.mission_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    launch?.rocket?.rocket_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTerm(e.target.value);
  }

  return (
    <Box sx={{ backgroundColor: '#dfdfdf', p: 4 }}>
      <TextField
          label="Search by Mission or Rocket Name..."
          variant='filled'
          type='search'
          sx={{
            mb: 2,
            background: 'white',
            minWidth: 320
          }}
          onChange={e => handleOnSearch(e)}
      />
      <Box>
        <Masonry columns={4} spacing={2}>
          {isLoading && <p>Loading...</p>}
          {filteredData && filteredData.map((launch, index) => (
            <Card sx={{ minWidth: 240 }} key={index} variant='elevation'>
              <header style={{ borderBottom: '1px dotted #cecece', padding: 16, marginBottom: 16, height: 100}}>
                <Typography variant="h5" gutterBottom>
                  {launch?.mission_name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {new Date(launch?.launch_date_local).toLocaleDateString()}
                </Typography>
              </header>

              <section>
                <Box px={2}>
                  <Typography variant="body1" gutterBottom>Launch Site: {launch?.launch_site?.site_name_long}</Typography>
                </Box>
              </section>

              <section>
                <Box px={2}>
                  <Typography variant="subtitle2" gutterBottom>Launch Success: {launch?.launch_success ? <ThumbUp style={{ height: 18, position: 'relative', color: 'green', top: 3 }} /> : <ThumbDown style={{ height: 18, position: 'relative', color: 'red', top: 3 }} />}</Typography>
                </Box>
              </section>

                <Box px={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    <a style={{ fontSize: 'smaller' }} href={launch?.links?.wikipedia || ''} target='_blank'>Wikipedia Link</a>
                  </Typography>
                </Box>

              {launch?.rocket?.rocket_name && <Box px={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Rocket Name: {launch?.rocket?.rocket_name}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Rocket Type: {launch?.rocket?.rocket_type}
                </Typography>
              </Box>}

              {launch?.ships?.length ?
                <Box px={2} pb={2}>
                  <header>
                    <Typography variant="subtitle2" gutterBottom>Ships:</Typography>
                  </header>

                  {launch?.ships?.map((ship, idx) => {
                    return (
                      <ul style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0
                      }}>
                        <li style={{ paddingBottom: 8 }}>{ship?.home_port}</li>
                        <li style={{ paddingBottom: 8 }}><strong>{ship?.name}</strong></li>
                        {ship?.image && <li>
                          <img
                            src={ship?.image}
                            alt={ship?.name || ''}
                            style={{
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4,
                              display: 'block',
                              width: '100%',
                            }}
                          />
                        </li>}
                      </ul>
                    );
                  })}
                </Box>
                : null
              }
            </Card>
          ))}
        </Masonry>
      </Box>
    </Box>
  );
};

export default Launches;