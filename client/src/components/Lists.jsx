import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../AppProvider';
import { createTheme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700
    }
  }
});

const Lists = () => {
  const { lists, setLists } = useContext(AppContext);

  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);

  const mediaQueries = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getLists = async () => {
      try {
        const response = await axios.get('/api/lists', {
          params: { email: localUser.email }
        });

        setLists(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getLists();
  }, []);

  return (
    //<>
    //{lists?.map(list => (
    //<>
    //<img src={list.image} alt="list.listName" />
    // <h2 style={{ textTransform: 'capitalize' }}>{list.listName}</h2>
    //</>
    //  ))}
    // {/* <ImageList variant="masonry" cols={3} gap={8}>
    // {lists.map((item) => (
    //  <ImageListItem key={item.img}>
    <ImageList variant="masonry" cols={mediaQueries ? 1 : 3} gap={8}>
      {lists?.map((item) => (
        <Link to={`/lists/${item.listName}`} key={item.image}>
          <ImageListItem>
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              alt={item.listName}
              loading="lazy"
            />
            <ImageListItemBar sx={{ textTransform: 'capitalize' }} title={item.listName} />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};

export default Lists;
