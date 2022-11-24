import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: 'rgb(91 150 147)' }}
          onClick={() => navigate('/')}
        >
          Back Home
        </Button>
      </Container>
    </Box>
  );
}
export default NotFoundPage;
