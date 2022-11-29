import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  const { lists } = useContext(AppContext);
  let { list } = useParams();
  const currentList = lists.find(item => item.listName === list)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const [map, setMap] = useState(null);
  // const [markerImage, setMarkerImage] = useState('');
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

  const handleRemoveFromList = () => {};

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
                          <IconButton aria-label="add to favorites" sx={{ color: 'red' }}>
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            sx={{ color: 'grey' }}
                            onClick={handleRemoveFromList}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <Button
                            size="small"
                            component="a"
                            href={`/search/${site.siteId}`}
                            sx={{ position: 'absolute', right: 10, bottom: 0 }}
                          >
                            Learn More
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

// const mockList = {
//   listName: 'madrid',
//   iamge: 'img.jpg',
//   sites: [
//     {
//       siteId: 'W4263036',
//       name: 'Main Square',
//       image:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Plaza_Mayor_De_Madrid_%28215862629%29_%28cropped%29.jpeg/400px-Plaza_Mayor_De_Madrid_%28215862629%29_%28cropped%29.jpeg',
//       rate: '3h',
//       text: 'The Plaza Mayor (English: Main Square) is a major public space in the …',
//       point: {
//         lon: -3.707374334335327,
//         lat: 40.4153938293457
//       }
//     },
//     {
//       siteId: 'W4518846',
//       name: 'Mercado de San Miguel',
//       image:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Mercado_de_San_Miguel_%28Madrid%29_04.jpg/400px-Mercado_de_San_Miguel_%28Madrid%29_04.jpg',
//       rate: '3h',
//       text: 'The Market of San Miguel (Spanish: Mercado de San Miguel) is a covered market located in Madrid, Spain. Originally built in 1916, it was purchased b...',
//       point: {
//         lon: -3.7090156078338623,
//         lat: 40.415374755859375
//       }
//     },
//     {
//       siteId: 'R7726080',
//       name: 'Museo del Prado',
//       image:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sala_de_Tiziano_en_el_Museo_del_Prado.jpg/400px-Sala_de_Tiziano_en_el_Museo_del_Prado.jpg',
//       rate: '3h',
//       text: 'The Prado Museum ( PRAH-doh; Spanish: Museo del Prado [muˈseo ðel ˈpɾaðo]), offici...',
//       point: {
//         lon: -3.69203782081604,
//         lat: 40.41379165649414
//       }
//     },
//     {
//       siteId: 'N4688465171',
//       name: 'Palacio de Cibeles',
//       image:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Palacio_de_Comunicaciones_-_46.jpg/400px-Palacio_de_Comunicaciones_-_46.jpg',
//       rate: '3h',
//       text: 'Cibeles Palace (Spanish: Palacio de Cibeles), formally known as Palacio de Comunica...',
//       point: {
//         lon: -3.692185640335083,
//         lat: 40.41889953613281
//       }
//     }
//   ]
// };
