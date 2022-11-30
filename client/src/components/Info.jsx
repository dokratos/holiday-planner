import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box} from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FlightIcon from '@mui/icons-material/Flight';

export default function Info() {
  return (
  <Box sx={{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '40px 5px'
    }}>
    <Card sx={{ 
      width: '33%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: 'none',
      boxShadow: "none"
    }}>
    <TravelExploreIcon sx={{ fontSize: '7vw', color: '#324021a3' }} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: '#324021a3' }} 
          >
          Search and explore by city
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ 
      width: '33%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: 'none',
      boxShadow: "none"
      }}>
    <AddLocationAltIcon sx={{ fontSize: '7vw', color: '#324021a3' }} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: '#324021a3' }} 
          >
          Create your own lists
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ 
      width: '33%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: 'none',
      boxShadow: "none"
      }}>
      <FlightIcon sx={{ fontSize: '7vw', color: '#324021a3' }} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: '#324021a3' }} 
            >
            Enjoy your holidays
          </Typography>
        </CardContent>
    </Card>
    </Box>
  
  )
}
