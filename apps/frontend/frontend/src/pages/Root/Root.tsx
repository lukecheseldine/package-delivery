import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import { Box, Stack } from '@mui/material';

const Root = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar isAuthenticated={false} />
      <Outlet />
    </Box>
  );
};

export default Root;
