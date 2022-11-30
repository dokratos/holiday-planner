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
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleDeleteList = async (e, listName) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/lists/${listName}`, { data: { listName, email: localUser.email } });
      setLists(lists.filter((list) => list.listName !== listName));
    } catch (err) {
      console.error(err);
    }
  };

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
                style={{ backgroundColor: 'rgb(101 116 83)', marginTop: '1rem' }}
                onClick={() => navigate('/signup')}
              >
                Log in
              </Button>
            </Container>
          </Box>
        </>
      )}
      {/* <ImageList cols={mediaQueries ? 1 : 2} gap={8}>
        {lists?.map((item) => (
          <ImageListItem key={item.image}>
            <Link to={`/lists/${item.listName}`}>
              <img
                src={`${item.image}?w=248&fit=crop&auto=format`}
                alt={item.listName}
                loading="lazy"
              />
            </Link>
            <ImageListItemBar
              sx={{ textTransform: 'capitalize' }}
              title={item.listName}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                  onClick={(e) => handleDeleteList(e, item.listName)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList> */}
      <ImageList>
      {lists?.map((item) => (
        <ImageListItem key={item.image}>
          <Link to={`/lists/${item.listName}`}>
            <img
              src={item.image}
              alt={item.listName}
              loading="lazy"
            />
          </Link>
          <ImageListItemBar
            sx={{ textTransform: 'capitalize' }}
            title={item.listName}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
                onClick={(e) => handleDeleteList(e, item.listName)}
              >
              <DeleteIcon />
            </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </>
  );
};

export default Lists;
