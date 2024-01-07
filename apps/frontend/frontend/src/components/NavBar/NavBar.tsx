import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface NavBarProps {
  isAuthenticated: boolean;
}

const NavBar = ({ isAuthenticated }: NavBarProps) => {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">
          <span style={{ color: '#D88B1E' }}>Package</span>
          <span style={{ color: theme.palette.secondary.main }}>Watch</span>
        </Typography>
        {isAuthenticated ? (
          <IconButton color="inherit" aria-label="settings">
            <SettingsIcon />
          </IconButton>
        ) : (
          <Box>
            <Button component={RouterLink} to="/register" color="inherit">
              Get Started
            </Button>
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
