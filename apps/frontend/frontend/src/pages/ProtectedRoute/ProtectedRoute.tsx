import { ReactNode, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

type ProtectedRouteProps = {
	children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const userContext = useContext(UserContext);
	const { user } = userContext;
	const location = useLocation();
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			// Redirect them to the /login page, but save the current location they were
			// trying to go to when they were redirected. This allows us to send them
			// along to that page after they login, which is a nicer user experience
			// than dropping them off on the home page.
			navigate('/login', { state: { next: location } });
		}
		setIsLoading(false);
	}, [user, navigate]);

	if (!user) {
		return null;
	}

	if (isLoading) {
		return <CircularProgress />; // Show loading indicator while checking authentication
	}

	return children;
};

export default ProtectedRoute;
