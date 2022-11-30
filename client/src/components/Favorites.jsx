import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { AppContext } from '../AppProvider';

const Favorites = () => {
  const { favorites, setFavorites } = useContext(AppContext);
  const navigate = useNavigate();

  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);
  const { searchValue } = useContext(AppContext);

  console.log(favorites, 'fav');
  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await axios.get('/api/list/favorites', {
          params: { email: localUser.email }
        });

        setFavorites(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getFavorites();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await axios.patch('/api/list/favorites', { id: id, email: localUser.email });
      setFavorites(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!user && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh'
            }}
          >
            <Container maxWidth="md">
              <Typography variant="h2">Oh no! It seems like you are not logged in :(</Typography>
              <Typography variant="h6" style={{ marginTop: '1rem' }}>
                Please log in to add favorites
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: 'rgb(101 116 83)', marginTop: '1rem' }}
                onClick={() => navigate('/signup')}
              >
                Log in
              </Button>
            </Container>
          </Box>
        </>
      )}

      <h1>Favorites</h1>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'start',
          gap: '5vw'
        }}
      >
        {favorites?.map((fav) => (
          <Card
            key={fav.siteId}
            id={fav.siteId}
            name={fav.name}
            image={fav.image}
            text={fav.text}
            rate={fav.rate}
            handleDelete={handleDelete}
          />
        ))}
      </Box>
    </div>
  );
};

export default Favorites;
