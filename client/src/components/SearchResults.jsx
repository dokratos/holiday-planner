import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import SearchField from './SearchField';
import { AppContext } from '../AppProvider';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const { searchValue } = useContext(AppContext);
  console.log(searchValue, 'the search value in searchresults');

  const [map, setMap] = useState(null);
  const [sites, setSites] = useState([]);
  const [center, setCenter] = useState({
    lat: 52.3676,
    lng: 4.9041
  });
  const [isMarkerActive, setIsMarkerActive] = useState(null);

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
  };

  return (
    <>
      <SearchField />
      <Box
        sx={{
          width: 'auto',
          height: '100%',
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
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '150vh' }}
            options={{
              zoomControl: true,
              streetViewControl: true,
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
                        <button>
                          <Link to={`/search/${site.properties.xid}`}>Learn more</Link>
                        </button>
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
