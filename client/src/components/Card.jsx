import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function MediaControlCard({ name, id, image, text, handleDelete }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ display: 'flex' }} onClick={() => navigate(`/search/${id}`)}>
      {image && <CardMedia component="img" sx={{ width: 151 }} image={image} alt={name} />}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5"></Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {text.length > 250 ? `${text.substring(0, 200)}...` : text}
          </Typography>
          <IconButton
            aria-label="delete"
            alt="delete from Favorites"
            onClick={(e) => handleDelete(e, id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Box>
    </Card>
  );
}
