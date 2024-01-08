import React, { useContext, useState } from 'react';
import {
	TextField,
	Button,
	FormControl,
	Box,
	Typography,
	useTheme,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { UserContext } from '../../context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
	const theme = useTheme();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const userContext = useContext(UserContext);
	const navigate = useNavigate();
	const location = useLocation();
	const next = location.state?.next;

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { user } = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			userContext.setUser(user);
			// TODO: test that this actually works: it doesnt :(
			location ? navigate(next) : navigate('/home');
		} catch (error) {
			console.error(`Error logging in: ${error}`);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				bgcolor: 'primary.main',
			}}
		>
			<FormControl
				component="form"
				onSubmit={handleSignIn}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
					marginTop: '-100px',
					backgroundColor: 'white',
					gap: '20px',
					padding: '40px',
					minWidth: '400px', // Set the minimum width to 300px
					maxWidth: '700px', // Set the maximum width to 500px
					width: '60%',
					borderRadius: '25px',
				}}
			>
				<Typography variant="h5">Sign in</Typography>
				<TextField
					label="Email Address"
					required
					variant="outlined"
					value={email}
					fullWidth
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					label="Password"
					required
					type="password"
					variant="outlined"
					value={password}
					fullWidth
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
						alignItems: 'center',
					}}
				>
					<Typography>
						<Link
							to="/register"
							style={{
								color: theme.palette.secondary.main,
								textDecoration: 'none',
							}}
						>
							Sign up instead
						</Link>
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						type="submit"
						sx={{
							fontSize: { sm: '1rem', md: '1.2rem' },
							padding: { sm: '10px 20px', md: '15px 30px' },
							minWidth: { xs: '100px', sm: '150px', md: '200px' },
						}}
					>
						Login
					</Button>
				</Box>
			</FormControl>
		</Box>
	);
};

export default Login;
