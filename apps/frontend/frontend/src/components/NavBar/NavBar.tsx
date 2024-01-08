import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const NavBar = () => {
	const theme = useTheme();
	const userContext = useContext(UserContext);
	const { user } = userContext;
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			userContext.setUser(undefined);
			navigate('/login');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AppBar position="static">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h6">
					<span style={{ color: '#D88B1E' }}>Package</span>
					<span style={{ color: theme.palette.secondary.main }}>
						Watch
					</span>
				</Typography>
				{user ? (
					<Box>
						<Button
							component={RouterLink}
							to="/settings"
							color="inherit"
						>
							Settings
						</Button>
						<Button onClick={handleLogout} color="inherit">
							Logout
						</Button>
					</Box>
				) : (
					<Box>
						<Button
							component={RouterLink}
							to="/register"
							color="inherit"
						>
							Get Started
						</Button>
						<Button
							component={RouterLink}
							to="/login"
							color="inherit"
						>
							Login
						</Button>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
