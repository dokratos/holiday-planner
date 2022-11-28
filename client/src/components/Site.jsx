import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppProvider';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Site = () => {
  const { siteData, setSiteData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);

  let { site } = useParams();

  useEffect(() => {
    const getData = async (site) => {
      const response = await axios.get(`/api/sites/${site}`);
      setSiteData(response.data);
      setIsLoading(false);
    };

    getData(site);
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  const handleAddClick = async (e) => {
    e.preventDefault();
    try {
      const data = {
        siteData,
        email: localUser.email
      };
      return await axios.patch('/api/favorites', data);
    } catch (err) {
      console.error(err);
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
      <h2>title: {siteData.name}</h2>
      <img alt={siteData.name} src={siteData.image} />
      <p>desc: {siteData.text}</p>
      <p>rate: {siteData.rate}</p>
      <button onClick={user ? handleAddClick : handleClickOpen}>Add</button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'It looks like you are not signed in'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please sign in to add to favorites
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </DialogActions>
      </Dialog>
      <button>
        <Link to="/search">Back</Link>
      </button>
    </>
  );
};

export default Site;
