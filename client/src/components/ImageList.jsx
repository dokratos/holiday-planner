import React, { useContext, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Paris from '../images/imageListImages/paris.jpg';
import Rome from '../images/imageListImages/rome.jpg';
import TelAviv from '../images/imageListImages/TelAviv.jpg';
import London from '../images/imageListImages/london.jpg';
import Lisbon from '../images/imageListImages/lisbon.jpg';
import NewYork from '../images/imageListImages/newYork.jpg';
import Ibiza from '../images/imageListImages/slow-ibiza.jpg';
import Madrid from '../images/imageListImages/madrid.jpg';
import { Navigate, Link } from 'react-router-dom';
import { AppContext } from '../AppProvider';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from '@mui/material/styles';



export default function StandardImageList() {
  const { searchValue, setSearchValue } = useContext(AppContext);

  useEffect(() => {
    setSearchValue('')
  }, [])
  
  
  const redirect = (e) => {
    e.preventDefault();
    setSearchValue(e.target.name);
  };
  
  const redirectTitle = (e) => {
    e.preventDefault();
    setSearchValue(e.target.innerText);
  };
  
  const theme = useTheme({
    breakpoints: {
      values: {
        sm: 600,
        md: 900
      }
    }
  });

  return (
    <ImageList 
      sx={(theme) => ({
        width: '100%',
        gridAutoFlow: 'column',
        position: 'relative',
        textAlign: 'center',
        overflowX: 'scroll',
        gridTemplateColumns: "repeat(auto-fill,minmax(20rem,1fr)) !important",
        gridAutoColumns: "minmax(20rem, 1fr)",
        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: "repeat(auto-fill,minmax(10rem,1fr)) !important",
          gridAutoColumns: "minmax(10rem, 1fr)",
        },
      })} 
      cols={8}
      >
      {itemData.map((item) => (
        <ImageListItem 
        key={item.img}
        >
          <img
            style={{
              cursor: 'pointer',
            }}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2`}
            alt={item.title}
            name={item.title}
            loading="lazy"
            onClick={redirect}
          />
          <ImageListItemBar
            sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
            title={item.title}
            onClick={redirectTitle}
          />
          {searchValue && <Navigate to='/search' />}
        </ImageListItem>
      ))}
    </ImageList>

  )}

const itemData = [
  {
    img: `${Paris}`,
    title: 'Paris'
  },
  {
    img: `${Rome}`,
    title: 'Rome'
  },
  {
    img: `${London}`,
    title: 'London'
  },
  {
    img: `${Lisbon}`,
    title: 'Lisbon'
  },
  {
    img: `${NewYork}`,
    title: 'New York'
  },
  {
    img: `${TelAviv}`,
    title: 'Tel Aviv'
  },
  {
    img: `${Ibiza}`,
    title: 'Ibiza'
  },
  {
    img: `${Madrid}`,
    title: 'Madrid'
  }
  //   {
  //     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  //     title: 'Coffee',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  //     title: 'Hats',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  //     title: 'Honey',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  //     title: 'Basketball',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  //     title: 'Fern',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  //     title: 'Mushrooms',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //     title: 'Tomato basil',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  //     title: 'Sea star',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  //     title: 'Bike',
  //   },
];
