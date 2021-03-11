import React, { useState, createContext, useEffect } from 'react';
import axios from '../axios';

interface IAuthContext {
	isAuth: boolean;
	auth: (password: string) => Promise<boolean>;
	logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({ isAuth: false, auth: null as any, logout: null as any });

export const AuthProvider: React.FC = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const localAuth = localStorage.getItem('isAuth');
		if (localAuth === 'true') {
			setIsAuth(true);
		}
	}, []);

	const auth = async (password: string) => {
		try {
			const { status } = await axios.post('/login', { password });

			if (status === 200) {
				localStorage.setItem('isAuth', 'true');
				setIsAuth(true);
			}

			return status === 200;
		} catch (e) {
			console.log('Error during authorization', e);
			return false;
		}
	};

	const logout = () => {
		setIsAuth(false);
		localStorage.setItem('isAuth', 'false');
	};

	const contextValue: IAuthContext = {
		isAuth,
		auth,
		logout,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
