import { createContext, useState, useEffect, useContext } from 'react';
import { signIn } from '../api/AuthService';
import { getUser } from '../api/UserService';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getMe() {
    try {
      const res = await getUser();
      const nextUser = res.data;
      setUser(nextUser);
    } catch (err) {
      console.error('에러가 발생하였습니다.', err);
      setUser(null);
    }
  }

  async function login({ email, password }) {
    try {
      const { accessToken, refreshToken } = await signIn({ email, password });

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      await getMe();
    } catch (err) {
      console.error('에러가 발생하였습니다.', err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      getMe();
    }
  }, []);

  async function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider 안에서 사용해야 합니다.');
  }
  return context;
}
