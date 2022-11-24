import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Card from './Card';

const Favorites = () => {
  const [favorites, setFavorites] = useState(); 
  const user = localStorage.getItem('user')
  const localUser = JSON.parse(user)

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await axios.get('/api/list/favorites', {params: {email: localUser.email}});
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
    </div>
  );
};

export default Favorites;
