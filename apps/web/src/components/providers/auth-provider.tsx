"use client"

import { getUser, tuyau } from '@/lib/auth';
import { useQuery } from '@tanstack/react-query';
import { InferResponseType } from '@tuyau/client';
import { createContext, useContext, useState } from 'react';

type MeResponse = InferResponseType<typeof tuyau.auth.me.$get>;
const AuthContext = createContext({
	auth: null,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setAuth: (auth: any) => {},
	user: undefined as MeResponse | undefined,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState(null);

	const { data: user } = useQuery({
		queryKey: ["currentUser", auth],
		queryFn: getUser,
	});
	
	return (
		<AuthContext.Provider value={{ auth, setAuth, user}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;