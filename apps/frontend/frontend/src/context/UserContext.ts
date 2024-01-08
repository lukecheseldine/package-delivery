import { User } from 'firebase/auth';
import { createContext } from 'react';

type UserContext = {
	user: User | undefined;
	setUser: (user: User | undefined) => void;
};

export const UserContext = createContext<UserContext>({
	user: undefined,
	setUser: () => {
		throw new Error('setUser function not defined.');
	},
});
