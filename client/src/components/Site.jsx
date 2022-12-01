import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../AppProvider';
import { useTheme } from '@mui/material/styles';
import { Box, formHelperTextClasses } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ArroBackIcon from '@mui/icons-material/ArrowBack';

const Site = () => {
  const theme = useTheme({
    breakpoints: {
      values: {
        sm: 600,
        md: 900
      }
    }
  });

  const { searchValue } = useContext(AppContext);
  const { addToList, setAddToList } = useContext(AppContext);
  const { favorites, setFavorites } = useContext(AppContext);
  const { lists, setLists } = useContext(AppContext);
  const { siteData, setSiteData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  let { site } = useParams();

  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);

  useEffect(() => {
    const getData = async (site) => {
      const response = await axios.get(`/api/sites/${site}`);
      setSiteData(response.data);
      setIsLoading(false);
    };

    getData(site);
  }, []);

  useEffect(() => {
    if (user) {
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
    }
  }, []);

  useEffect(() => {
    if (user) {
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
    }
  }, []);

  const search = [];
  const city = [];

  useEffect(() => {
    if (lists.length > 0) {
      lists.forEach((item) => {
        item.sites.forEach((siteItem) => {
          if (siteItem.siteId === site) {
            search.push(siteItem.siteId);
            city.push(item.listName);
          }
          let siteInList = search.includes(site);
          setAddToList(!siteInList);
          return;
        });
      });
    }
  }, [lists]);

  if (isLoading) {
    return <>Loading...</>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToFavorites = async () => {
    const favItem = favorites.find((item) => item.siteId === siteData.siteId);
    if (!favItem) {
      setFavorites([...favorites, siteData]);
      try {
        const data = {
          siteData,
          email: localUser.email
        };
        return await axios.patch('/api/favorites', data);
      } catch (err) {
        console.error(err);
      }
    } else {
      const newFavorites = favorites.filter((item) => item.siteId !== siteData.siteId);
      setFavorites(newFavorites);
      try {
        await axios.patch('/api/list/favorites', {
          id: siteData.siteId,
          email: localUser.email
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddToList = async () => {
    try {
      const data = {
        siteData,
        searchValue: searchValue.toLowerCase(),
        email: localUser.email
      };
      setAddToList(false);
      return await axios.patch(`/api/lists/${siteData.city}`, data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      })}
    >
      <h2 style={{ fontSize: '4.4vw' }}>{siteData.name}</h2>
      <div>
        <img
          sx={{
            [theme.breakpoints.down('sm')]: {
              maxWidth: '100vw'
            },
            [theme.breakpoints.up('sm')]: {
              maxWidth: '70vw'
            }
          }}
          alt={siteData.name}
          src={siteData.image}
        />
      </div>
      <p
        style={{
          textAlign: 'left',
          padding: '0 1.2rem',
          fontSize: '20px',
          [theme.breakpoints.up('sm')]: {
            padding: '0 3rem'
          }
        }}
      >
        {siteData.text}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 1.2rem',
          [theme.breakpoints.up('sm')]: {
            padding: '0 3rem'
          }
        }}
      >
        <IconButton>
          <Link to="/search">
            <ArroBackIcon />
          </Link>
        </IconButton>
        <div>
          <IconButton
            aria-label="Add to favorites"
            onClick={user ? handleAddToFavorites : handleClickOpen}
            sx={
              favorites.findIndex((item) => item.siteId === siteData.siteId) >= 0
                ? { color: 'red' }
                : { color: 'grey' }
            }
          >
            <FavoriteIcon />
          </IconButton>
          {addToList && (
            <IconButton
              aria-label="Add to list"
              sx={{ color: 'green' }}
              onClick={user ? handleAddToList : handleClickOpen}
            >
              <AddIcon />
            </IconButton>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'It looks like you are not signed in'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please sign in to add to a list
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Site;
