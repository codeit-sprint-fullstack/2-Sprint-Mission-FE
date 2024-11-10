import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import useAsync from '@hooks/useAsync';
import { getMe as getMeApi, signIn } from '@utils/api';
import { isTokenExpired } from '@utils/utils';
import { useSetError } from './ErrorProvider';

const AuthContext = createContext({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export default function AuthProvider({ children }) {
  const [userObj, setUserObj] = useState({ user: null, isPending: true });
  const router = useRouter();
  const signInAsync = useAsync(signIn);
  const setError = useSetError();

  const login = async ({ email, password }) => {
    const res = await signInAsync({ email, password });
    if (!res) return null;

    localStorage.setItem('accessToken', res.accessToken);
    return getMe();
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    setUserObj(old => ({ ...old, user: null, isPending: false }));
  };
  const getMe = async () => {
    // NOTE accessToken의 유효기간 검사 후 만료시 logout
    const token = localStorage.getItem('accessToken');
    if (token && isTokenExpired(token)) {
      setError(new Error('로그인이 만료되었습니다.'));
      return logout();
    }

    setUserObj(old => ({ ...old, isPending: true }));

    let nextUser = null;
    try {
      nextUser = await getMeApi();
      return nextUser;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      setUserObj(old => ({ ...old, user: nextUser, isPending: false }));
    }
  };
  const updateMe = () => {};
  const tokenExpireCheck = () => {
    // NOTE accessToken의 유효기간 검사 후 만료시 logout
    const token = localStorage.getItem('accessToken');
    if (token && isTokenExpired(token)) {
      setError(new Error('로그인이 만료되었습니다.'));
      logout();
      return false;
    }
    return true;
  };

  useEffect(() => {
    getMe();

    // NOTE 페이지 변경 시 token 체크
    router.events.on('routeChangeStart', tokenExpireCheck);

    return () => router.events.off('routeChangeStart', tokenExpireCheck);
  }, []);

  return (
    <AuthContext.Provider value={{ user: userObj.user, isPending: userObj.isPending, login, logout, updateMe, tokenExpireCheck }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required = false) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) throw new Error(`Don't use useAuth() out of AuthProvider`);

  useEffect(() => {
    // NOTE 유저가 필수인 페이지에 접속했을 때, 유저 정보가 없으며 유저 정보를 불러오는 중이 아니라면
    if (required && !context.user && !context.isPending) router.push('/auth/signIn');
  }, [context.user, context.isPending, required]);

  return context;
}
