import React, { useContext, useState } from 'react';
import {
	TextField,
	Button,
	Typography,
	Box,
	FormControl,
	useTheme,
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { UserContext } from '../../context/UserContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			navigate('/login');
		} catch (error) {
			console.error(`Error creating account: ${error}`);
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
				onSubmit={handleSignUp}
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
				<Typography variant="h5">Create Your Account</Typography>
				<TextField
					label="First Name"
					required
					variant="outlined"
					value={firstName}
					fullWidth
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<TextField
					label="Last Name"
					required
					variant="outlined"
					value={lastName}
					fullWidth
					onChange={(e) => setLastName(e.target.value)}
				/>
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
							to="/login"
							style={{
								color: theme.palette.secondary.main,
								textDecoration: 'none',
							}}
						>
							Have an account?
						</Link>
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						type="submit"
						sx={{
							fontSize: { sm: '1rem', md: '1.2rem' },
							padding: { sm: '10px 20px', md: '15px 30px' },
						}}
					>
						Create Account
					</Button>
				</Box>
			</FormControl>
		</Box>
	);
};

export default Register;
