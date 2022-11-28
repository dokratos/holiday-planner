import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import SearchField from './SearchField';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { AppContext } from '../AppProvider';

const SearchResults = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const { searchValue } = useContext(AppContext);

  const [map, setMap] = useState(null);
  const [sites, setSites] = useState([]);
  const [markerImage, setMarkerImage] = useState('');
  const [center, setCenter] = useState({
    lat: 52.3676,
    lng: 4.9041
  });
  const [isMarkerActive, setIsMarkerActive] = useState(null);


  const getSiteImage = async (id) => {
    const response = await axios.get(`/api/sites/${id}`);
    setMarkerImage(response.data.image);
  };

  const getSites = async (search) => {
    const response = await axios.get(`/api/${search}`);
    return response;
  };

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

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  };

  const handleMarkerClick = async (id) => {
    if (id === isMarkerActive) return;
    setIsMarkerActive(id);
    getSiteImage(id);
  };


  
  return (
    <>
      <SearchField />
      <Box
        sx={{
          width: 'auto',
          height: 800,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7]
          }
        }}
      >
        {isLoaded && (
          <GoogleMap
            onLoad={handleOnLoad}
            center={center}
            zoom={16}
            mapContainerStyle={{ width: '100%', height: '100vh' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              minZoom: 12,
              maxZoom: 18
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
                        <img src={markerImage} alt="" />
                        <CardActions disableSpacing  sx={{display: "flex", width: "100%", position:"relative"}}>
                          <IconButton aria-label="add to favorites" sx={{color: "red"}}>
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share" sx={{color: "green"}}>
                            <AddIcon />
                          </IconButton>
                          <Button size="small" component='a' href={`/search/${site.properties.xid}`} sx={{ position:"absolute", right: 10, bottom: 0}}>Learn More</Button>
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

export default SearchResults;
