import React, { useContext, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Image from '../images/bg_main.jpg';
import Typography from '@mui/material/Typography';
import SearchField from './SearchField';
import ImageList from './ImageList';
import Info from './Info';
import { AppContext } from '../AppProvider';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

function Landing() {
  const { searchValue } = useContext(AppContext);
  const scrollToRef = useRef();

  const theme = useTheme({
    breakpoints: {
      values: {
        sm: 600,
        md: 900
      }
    }
  });

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          width: 'auto',
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: '500',
            color: '#fefff9',
            backgroundColor: 'rgba(50, 64, 33, 0.3)',
            [theme.breakpoints.down('sm')]: {
              fontSize: '3rem'
            },
            [theme.breakpoints.up('sm')]: {
              fontSize: '4.5rem'
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '6rem'
            }
          }}
        >
          Plan your next holidays
        </Typography>

        <IconButton onClick={() => scrollToRef?.current.scrollIntoView({ behavior: 'smooth' })}>
          <ArrowDownwardIcon sx={{ color: 'white', fontSize: '70px', fontWeight: 300 }} />
        </IconButton>
      </Box>
      <main
        ref={scrollToRef}
        style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}
      ></main>
      <SearchField />
      {searchValue && <Navigate to="/search" />}
      <Info />
      <ImageList />
    </>
  );
}

export default Landing;
