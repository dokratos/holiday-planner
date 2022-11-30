import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../AppProvider';
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
  }, [addToList]);

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

  const search = [];
  const city = [];

  if (lists.length > 0) {
    lists.forEach((item) => {
      item.sites.forEach((siteItem) => {
        if (siteItem.siteId === site) {
          search.push(siteItem.siteId);
          city.push(item.listName);
        }
        return;
      });
    });
  }

  let siteInList = search.includes(site);

  if (siteInList) {
    setAddToList(false);
  }

  const handleAddToList = async () => {
    try {
      const data = {
        siteData,
        searchValue: searchValue.toLowerCase(),
        email: localUser.email
      };
      setAddToList(siteInList);
      return await axios.patch(`/api/lists/${city[0]}`, data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '100vw' }}>
      <div style={{ margin: 'auto' }}>
        <h2 style={{ fontSize: '4.4vw' }}>{siteData.name}</h2>
        <img style={{ maxWidth: '50vw' }} alt={siteData.name} src={siteData.image} />
        <p
          style={{
            margin: '3vw 10vw',
            width: '60vw',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '20px'
          }}
        >
          {siteData.text}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
      </div>
    </div>
  );
};

export default Site;
