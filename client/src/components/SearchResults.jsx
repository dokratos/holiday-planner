import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { AppContext } from '../AppProvider';
import Box from '@mui/material/Box';
import SearchField from './SearchField';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from '../images/image_placeholder.png';

const SearchResults = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const { searchValue } = useContext(AppContext);
  const { siteData, setSiteData } = useContext(AppContext);
  const { favorites, setFavorites } = useContext(AppContext);

  const [map, setMap] = useState(null);
  const [sites, setSites] = useState([]);
  const [markerImage, setMarkerImage] = useState('');
  const [center, setCenter] = useState({
    lat: 52.3676,
    lng: 4.9041
  });
  const [isMarkerActive, setIsMarkerActive] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);

  const getSiteImage = async (id) => {
    const response = await axios.get(`/api/sites/${id}`);
    setSiteData(response.data);
    setMarkerImage(response.data.image);
    setIsLoading(false);
  };

  const getSites = async (search) => {
    const response = await axios.get(`/api/search/${search}`);
    return response;
  };

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
    const getData = async () => {
      if (searchValue) {
        const results = await getSites(searchValue);
        setCenter((center) => ({
          ...center,
          lat: results.data.lat,
          lng: results.data.lon
        }));

        setSites(results.data.sites);
      }
    };

    getData();
  }, [searchValue]);

  useEffect(() => {
    if (isMarkerActive) {
      setIsLoading(true);
      getSiteImage(isMarkerActive);
      setIsLoading(false);
    }
  }, [isMarkerActive]);

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  };

  const handleMarkerClick = async (id) => {
    if (id === isMarkerActive) return;
    setIsMarkerActive(id);
  };

  const handleAddToList = async () => {
    try {
      const data = {
        siteData,
        searchValue: searchValue.toLowerCase(),
        email: localUser.email
      };
      return await axios.patch(`/api/lists/${searchValue}`, data);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <>Loading...</>;
  }

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
        const response = await axios.patch('/api/list/favorites', {
          id: siteData.siteId,
          email: localUser.email
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SearchField />
      <Box
        sx={{
          width: 'auto',
          height: '100%',
          backgroundColor: 'primary.dark'
        }}
      >
        {isLoaded && (
          <GoogleMap
            onLoad={handleOnLoad}
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '150vh' }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              minZoom: 11,
              maxZoom: 15
            }}
          >
            {sites?.map((site) => {
              const obj = {
                lng: site.geometry.coordinates[0],
                lat: site.geometry.coordinates[1]
              };
              return (
                <Marker
                  key={site.properties.xid}
                  position={obj}
                  id={site.properties.xid}
                  onClick={() => handleMarkerClick(site.properties.xid)}
                >
                  {isMarkerActive === site.properties.xid ? (
                    <InfoWindow>
                      <>
                        <h2>{site.properties.name}</h2>
                        {markerImage ? (
                          <img src={markerImage} alt={site.properties.name} />
                        ) : (
                          <img src={Image} alt="no image available" />
                        )}
                        <CardActions
                          disableSpacing
                          sx={{ display: 'flex', width: '100%', position: 'relative' }}
                        >
                          <IconButton
                            aria-label="add to favorites"
                            onClick={user ? handleAddToFavorites : handleClickOpen}
                            sx={
                              favorites.findIndex((item) => item.siteId === site.properties.xid) >=
                              0
                                ? { color: 'red' }
                                : { color: 'grey' }
                            }
                          >
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="share"
                            sx={{ color: 'green' }}
                            onClick={user ? handleAddToList : handleClickOpen}
                          >
                            <AddIcon />
                          </IconButton>
                          <Button size="small" sx={{ position: 'absolute', right: 10, bottom: 0 }}>
                            <Link to={`/search/${site.properties.xid}`}>Learn more</Link>
                          </Button>
                        </CardActions>
                      </>
                    </InfoWindow>
                  ) : null}
                </Marker>
              );
            })}
          </GoogleMap>
        )}
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
    </>
  );
};

export default SearchResults;
