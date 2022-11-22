import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import SearchField from './SearchField';
import { AppContext } from '../AppProvider';

const SearchResults = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })

  const { searchValue } = useContext(AppContext);
  const [map, setMap] = useState(null);
  const [sites, setSites] = useState([]);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0
  });

  const getSites = async search => {
    const response = await axios.get(`/api/${search}`)
    return response;
  }
  
  useEffect(() => {
    const getData = async() => {
      if (searchValue) {
        const results = await getSites(searchValue);

        setCenter(center => ({
          ...center,
          lat: results.data.lat,
          lng: results.data.lon
        }));

        setSites(results.data.sites);
      }
    }
    getData();
  }, [searchValue]);
  
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  };

  const handleClick = async id => {
    const response = await axios.get(`/api/search/${id}`);
    return response;
  }

  return (
    <>
      <SearchField />
      <Box
        sx={{
          width: 800,
          height: 800,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
      {isLoaded &&  <GoogleMap
          onLoad={handleOnLoad}
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {sites?.map(site => {
            const obj = {
              lng: site.geometry.coordinates[0],
              lat: site.geometry.coordinates[1]
            }
            return (
              <Marker
                key={site.properties.xid}
                position={obj}
                id={site.properties.xid}
                onClick={() => handleClick(site.properties.wikidata)}
              />)
          })}
        </GoogleMap>}
    </Box>
    </>
  )
}

export default SearchResults;
