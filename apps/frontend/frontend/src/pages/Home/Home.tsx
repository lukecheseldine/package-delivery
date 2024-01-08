import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Home = () => {
	const userContext = useContext(UserContext);
	const { user } = userContext;

	return <h1>Welcome, {user?.email}</h1>;
};

export default Home;
