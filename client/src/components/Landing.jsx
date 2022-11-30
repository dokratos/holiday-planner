import React, { useContext, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Image from '../images/bg_main.jpg';
import Typography from '@mui/material/Typography';
import SearchField from './SearchField';
import ImageList from './ImageList';
import { AppContext } from '../AppProvider';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';

function Landing (){
  const { searchValue } = useContext(AppContext);
  const scrollToRef = useRef();

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
        <Typography variant="h1" sx={{ color: '#fefff9' }}>
          Welcome to PLANit
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: '#ff5722', backgroundColor: 'white', fontWeight: 600 }}
        >
          Plan your trip to wisely!
        </Typography>

        <IconButton onClick={() => scrollToRef?.current.scrollIntoView({behavior: "smooth"})} >
          <ArrowDownwardIcon  sx={{ color: 'white', fontSize: '50px', fontWeight: 300}}/>
        </IconButton>
        <main ref={scrollToRef} style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}></main>
      </Box>
      <SearchField/>
      {searchValue && <Navigate to="/search" />}
      <ImageList />
    </>
  );
};

export default Landing;
