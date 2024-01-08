import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import { Box } from '@mui/material';
import { User, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../firebase';

const Root = () => {
	const [user, setUser] = useState<User | undefined>();
	const [authLoaded, setAuthLoaded] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				setUser(authUser);
				setAuthLoaded(true);
			} else {
				setUser(undefined);
				setAuthLoaded(true);
			}
		});

		return;
	}, [user]);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			<Box
				sx={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<NavBar />
				<Outlet />
			</Box>
		</UserContext.Provider>
	);
};

export default Root;
