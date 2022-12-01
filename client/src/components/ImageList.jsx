import React, { useContext, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AppContext } from '../AppProvider';
import { useTheme } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Paris from '../images/imageListImages/paris.jpg';
import Rome from '../images/imageListImages/rome.jpg';
import LosAngeles from '../images/imageListImages/losAngeles.jpg';
import London from '../images/imageListImages/london.jpg';
import Lisbon from '../images/imageListImages/lisbon.jpg';
import NewYork from '../images/imageListImages/newYork.jpg';
import Oslo from '../images/imageListImages/oslo.jpg';
import Madrid from '../images/imageListImages/madrid.jpg';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function StandardImageList() {
  const { searchValue, setSearchValue } = useContext(AppContext);

  useEffect(() => {
    setSearchValue('');
  }, []);

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
        minHeight: "50vh",
        gridAutoFlow: 'column',
        position: 'relative',
        textAlign: 'center',
        overflowX: 'scroll',
        gridTemplateColumns: 'repeat(auto-fill,minmax(20rem,1fr)) !important',
        gridAutoColumns: 'minmax(20rem, 1fr)',
        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: 'repeat(auto-fill,minmax(10rem,1fr)) !important',
          gridAutoColumns: 'minmax(10rem, 1fr)'
        }
      })}
      cols={8}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            style={{
              cursor: 'pointer'
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
          {searchValue && <Navigate to="/search" />}
        </ImageListItem>
      ))}
    </ImageList>
  );
}

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
    img: `${Madrid}`,
    title: 'Madrid'
  },
  {
    img: `${NewYork}`,
    title: 'New York City'
  },
  {
    img: `${LosAngeles}`,
    title: 'Los Angeles'
  },
  {
    img: `${Oslo}`,
    title: 'Oslo'
  },

];
