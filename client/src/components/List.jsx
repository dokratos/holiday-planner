import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { AppContext } from '../AppProvider';
import Box from '@mui/material/Box';
import SearchField from './SearchField';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from '../images/image_placeholder.png';

const List = () => {
  // const { favorites, setFavorites } = useContext(AppContext);
  const { lists, setLists } = useContext(AppContext);
  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);

  let { list } = useParams();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const [map, setMap] = useState(null);
  const [currentList, setCurrentList] = useState(lists.find(item => item.listName === list));
  const [center, setCenter] = useState({
    lat: 40.4168,
    lng: -3.70379
  });
  const [isMarkerActive, setIsMarkerActive] = useState(null);
  
  useEffect(() => {
    setCenter((center) => ({
      ...center,
      lat: currentList.sites[0].point.lat,
      lng: currentList.sites[0].point.lon
    }));
  }, []);

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  };

  const handleMarkerClick = async (id) => {
    if (id === isMarkerActive) return;
    setIsMarkerActive(id);
  };
    
  const handleRemoveFromList = async (e, id) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/lists/listName/${id}`, { id: id, list: list, email: localUser.email });
      setCurrentList({...currentList, sites: currentList.sites.filter(item => item.siteId !== id)})
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <SearchField /> */}
      <h1 style={{ textTransform: 'capitalize' }}>{currentList.listName}</h1>
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
            mapContainerStyle={{ width: '100%', height: '100vh' }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              minZoom: 11,
              maxZoom: 15
            }}
          >
            {currentList.sites?.map((site) => {
              const obj = {
                lng: site.point.lon,
                lat: site.point.lat
              };
              return (
                <Marker
                  key={site.siteId}
                  position={obj}
                  id={site.siteId}
                  onClick={() => handleMarkerClick(site.siteId)}
                >
                  {isMarkerActive === site.siteId ? (
                    <InfoWindow>
                      <>
                        <h2>{site.name}</h2>
                        {site.image ? (
                          <img src={site.image} alt={site.name} />
                        ) : (
                          <img src={Image} alt="no image available" />
                        )}
                        <CardActions
                          disableSpacing
                          sx={{ display: 'flex', width: '100%', position: 'relative' }}
                        >
                          {/* <IconButton aria-label="add to favorites" onClick={() => handleAddToFavorites(site)} sx={favorites.indexOf(site.siteId) >= 0  ?  { color: "red"} : {color: "grey"  }}>
                            <FavoriteIcon />
                          </IconButton> */}
                          <IconButton
                            aria-label="delete"
                            sx={{ color: 'grey' }}
                            onClick={(e) => handleRemoveFromList(e, site.siteId)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <Button
                            size="small"
                            sx={{ position: 'absolute', right: 10, bottom: 0 }}
                          >
                            <Link to={`/search/${site.siteId}`}>Learn more</Link>
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
      </Box>
    </>
  );
};

export default List;
