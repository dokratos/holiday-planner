import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppProvider';
import { Box, Button, Container, Typography } from '@mui/material';
import Card from './Card';

const Favorites = () => {
  const { favorites, setFavorites } = useContext(AppContext);
  const navigate = useNavigate();

  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);

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
                onClick={() => navigate('/login')}
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
          flexDirection: 'column',
          flexFlow: 'wrap',
          justifyContent: 'center',
          gap: '2vw',
          margin: '0 0.5rem'
        }}
      >
        {favorites?.map((fav) => (
          <Card
            key={fav.siteId}
            id={fav.siteId}
            name={fav.name}
            image={fav.image}
            text={fav.text}
            city={fav.city}
            handleDelete={handleDelete}
          />
        ))}
      </Box>
    </div>
  );
};

export default Favorites;
