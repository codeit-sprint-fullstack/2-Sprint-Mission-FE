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
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    try {
      const res = await getUser();
      setUser(res);
      return res;
    } catch (err) {
      console.error('사용자 정보를 가져오는 중 에러 발생:', err);
      logout();
    }
  }

  async function login({ email, password }) {
    try {
      const { accessToken, refreshToken } = await signIn({ email, password });

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const userData = await getMe();
      return userData;
    } catch (err) {
      console.error('로그인 에러:', err);
      throw err;
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
