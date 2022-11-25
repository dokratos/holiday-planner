import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { AppContext } from '../AppProvider';

export default function SearchField() {
  const { setSearchValue } = useContext(AppContext);
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

  return (
    <Box
        sx={{
          width: 'auto',
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', flexDirection: 'row',alignItems: 'center', justifyContent: 'center',  width: 400, marginTop: "30px", marginBottom: "30px" }}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search city"
        inputProps={{ 'aria-label': 'search city' }}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
     </Box>
  );
}
