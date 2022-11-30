import React, { useContext, useState } from 'react';
import { AppContext } from '../AppProvider';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

// import { createTheme, ThemeProvider, useTheme } from '@materialui/core/styles';



// const styles = (theme) => ({
//   root: {
//     // backgroundColor: 'blue',
//     // Match [md, md + 1)
//     //       [md, lg)
//     //       [900px, 1200px)
//     [theme.breakpoints.only('sm')]: {
//       width: '350px'
//     }
//   }
// });

export default function SearchField() {
  const { searchValue, setSearchValue } = useContext(AppContext);
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue(value);
    setValue('');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  // const theme = createTheme({
  //   breakpoints: {
  //     values: {
  //       xs: 0,
  //       sm: 600,
  //       md: 900,
  //       lg: 1200,
  //       xl: 1536
  //     }
  //   }
  // });

  return (
    <Box 
      sx={{
        width: 'auto',
        padding: '20px',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Paper
      
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60%',
          // width: {
          //   sm:'350px'
          // }
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={searchValue || 'Search city'}
          inputProps={{ 'aria-label': 'search city' }}
          onChange={handleChange}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
