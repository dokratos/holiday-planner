import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FlightIcon from '@mui/icons-material/Flight';
import { useTheme } from '@mui/material/styles';

export default function Info() {
  const theme = useTheme({
    breakpoints: {
      values: {
        sm: 600,
        md: 900
      }
    }
  });

  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // margin: '40px 5px',
        [theme.breakpoints.down('sm')]: {
          margin: '15px 5px'
        },
        [theme.breakpoints.up('sm')]: {
          margin: '40px 5px'
        }
      })}
    >
      <Card
        sx={{
          width: '33%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          boxShadow: 'none'
        }}
      >
        <TravelExploreIcon sx={{ fontSize: '7vw', color: '#324021a3' }} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={(theme) => ({
              color: '#324021a3',
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem'
              },
              [theme.breakpoints.up('sm')]: {
                fontSize: '1.5rem'
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '2rem'
              }
            })}
          >
            Explore by city
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '33%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          boxShadow: 'none'
        }}
      >
        <AddLocationAltIcon sx={{ fontSize: '7vw', color: '#324021a3' }} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={(theme) => ({
              color: '#324021a3',
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem'
              },
              [theme.breakpoints.up('sm')]: {
                fontSize: '1.5rem'
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '2rem'
              }
            })}
          >
            Create your list
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '33%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          boxShadow: 'none'
        }}
      >
        <FlightIcon sx={{ fontSize: '7vw', color: '#324021a3' }} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={(theme) => ({
              color: '#324021a3',
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem'
              },
              [theme.breakpoints.up('sm')]: {
                fontSize: '1.5rem'
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '2rem'
              }
            })}
          >
            Enjoy your trip
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
