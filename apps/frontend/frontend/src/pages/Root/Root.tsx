import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import { Box, Stack } from '@mui/material';
import { User } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';

const Root = () => {
	const [user, setUser] = useState<User | undefined>();

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
