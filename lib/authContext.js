import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    isPending: true,
  });
  const router = useRouter();

  const getMe = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const res = await axios.get('/users/me');
        setValues((prevValues) => ({
          ...prevValues,
          user: res.data,
        }));
      } catch {
        logout();
      }
    }
    setValues((prevValues) => ({
      ...prevValues,
      isPending: false,
    }));
  };

  const login = async (loginData) => {
    try {
      const res = await axios.post('/auth/signIn', loginData);
      const token = res.data.accessToken;

      localStorage.setItem('accessToken', token);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.accessToken}`;
      setValues((prevValues) => ({
        ...prevValues,
        user: res.data.user,
      }));
    } catch (error) {
      console.error(error);
			throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setValues((prevValues) => ({
      ...prevValues,
      user: null,
    }));
    router.push('/login');
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: values.user, isPending: values.isPending, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('반드시 AuthProvider 내부에서 사용하세요.');
  }

  return context;
};
