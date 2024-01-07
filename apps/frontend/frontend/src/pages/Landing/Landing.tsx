import React from 'react';
import {
  Typography,
  Button,
  Box,
  Container,
  Stack,
  SxProps,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <Box
      sx={{
        marginTop: '-100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        flex: 1,
        gap: '30px',
      }}
    >
      <Box>
        <Typography variant={isSmallScreen ? 'h2' : 'h1'} gutterBottom>
          <span style={{ color: '#D88B1E' }}>Package</span>
          <span style={{ color: theme.palette.secondary.main }}>Watch</span>
        </Typography>
        <Typography variant={isSmallScreen ? 'subtitle1' : 'h6'}>
          Automatic package delivery notifications for your household.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ fontSize: isSmallScreen ? '1rem' : '1.5rem' }}
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/login')}
          sx={
            {
              fontSize: isSmallScreen ? '1rem' : '1.5rem',
              color: 'black',
              bgcolor: 'white',
              '&:hover': { bgcolor: 'white' },
              '&:active': { bgcolor: 'white' },
            } as SxProps<Theme>
          }
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
