import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function MediaControlCard({ name, id, image, rate, handleDelete}) {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {rate}
          </Typography>
          <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Box>
      {image && <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={image}
        alt="Live from space album cover"
      />}
    </Card>
  );
};
