import { useState, createContext, useContext, Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';

export interface UserJSON {
	accessToken: string;
	user: {
		id: number;
    email: string;
    nickname: string | null;
    image: string | null;
    provider: string;
    providerId: string | null;
    createdAt: Date;
    updatedAt: Date;
	};
}

const UserContext = createContext<{
	user: null | UserJSON;
	setUser: Dispatch<SetStateAction<null | UserJSON>>;
}>({
	user: null,
	setUser: () => {}
});

interface Props {
	children: React.ReactNode;
}

export function UserProvider({ children }: Props) {
	const [user, setUser] = useState<null | UserJSON>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	return <UserContext value={{ user, setUser }}>{children}</UserContext>;
}

export function useUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error('반드시 UserProvider 안에서 사용해야 합니다.');
	}

	const { user } = context;
	return user;
}

export function useSetUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error('반드시 UserProvider 안에서 사용해야 합니다.');
	}

	const { setUser } = context;
	return setUser;
}
