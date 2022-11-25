import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Card from './Card';
import Box from '@mui/material/Box';


const Favorites = () => {
  const [favorites, setFavorites] = useState();
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
  }, [favorites]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.patch('/api/list/favorites', { id: id, email: localUser.email });
      setFavorites(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Favorites</h1>
      <Box  sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'start',
          gap: '5vw'
          
        }}>
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
