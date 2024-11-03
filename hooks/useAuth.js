import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import Instance from '@/lib/axiosInstance';


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}


export function useAuth() {
    return useContext(AuthContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = async ({ email, password }) => {
        try {
            const response = await Instance.post('/users/login', { email, password });
            setUser(response.data.user);
            router.push('/product');
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    const logout = () => {
        setUser(null);
        router.push('/login');
    };

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await Instance.get('/users');
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            }
        };

        checkUser();
    }, []);

    return {
        user,
        login,
        logout,
    };
}