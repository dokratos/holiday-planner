import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Image from '../images/bg_main.jpg';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchField from './SearchField';
import ImageList from './ImageList';
import { AppContext } from '../AppProvider';

const Landing = () => {
  const { searchValue } = useContext(AppContext);

  return (
    <>
      <Box
        sx={{
          height: '100%',
          width: 'auto',
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h1" gutterBottom sx={{ color: '#fefff9' }}>
          Welcome to PLANit
        </Typography>
        <main style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Link
            to="/signup"
            style={{
              textDecoration: 'none'
            }}
          >
            <Button variant="contained" size="large" sx={{ backgroundColor: '#2b3a07' }}>
              Sign Up
            </Button>
          </Link>
          <Link
            to="/login"
            style={{
              textDecoration: 'none'
            }}
          >
            <Button variant="contained" size="large" sx={{ backgroundColor: '#2b3a07' }}>
              Login
            </Button>
          </Link>
        </main>
      </Box>
      <SearchField />
      {searchValue && <Navigate to="/search" />}
      <ImageList />
    </>
  );
};

export default Landing;
