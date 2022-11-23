import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Favorites = () => {
  const [favorites, setFavorites] = useState()

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await axios.get('/api/list/favorites');
        setFavorites(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getFavorites();
  }, [favorites])

  const handleDelete = async id => {
    try {
      const response = await axios.patch('/api/list/favorites', { id: id });
      setFavorites(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {favorites?.map(fav => (
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
  )
};

export default Favorites;
