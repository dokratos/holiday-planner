import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../AppProvider';
import { createTheme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    <>
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
                style={{ backgroundColor: 'rgb(91 150 147)', marginTop: '1rem' }}
                onClick={() => navigate('/signup')}
              >
                Log in
              </Button>
            </Container>
          </Box>
        </>
      )}
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
   </> 
  );
};

export default Lists;
