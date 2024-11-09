import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authApi } from '@/lib/api/AuthService';

const AuthContext = createContext({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    isPending: true,
  });
  const router = useRouter();

  // 사용자 정보를 가져오는 함수
  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
  
    let nextUser;
    try {
      nextUser = await authApi.getUser();
    } catch (e) {
      console.error('사용자 정보 가져오기 실패:', e);
      nextUser = null;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  // 로그인 함수
  async function login(loginData) {
    try {
      await authApi.signIn(loginData);
      await getMe(); // 로그인 후 사용자 정보 갱신
      router.push('/items');
    } catch (error) {
      console.error('로그인 오류:', error.message);
      return error.message;    // 로그인창에서 에러를 전달 받을 수 있도록 리턴함  
    }
  }

  // 로그아웃 함수
  function logout() {
    authApi.logout();
    setValues((prevValues)=> ({
      ...prevValues,
      user: null
    }))
    router.push('/');
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user: values.user, 
      isPending: values.isPending, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required = false) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  useEffect(() => {
    //if (required && !context.user && !context.isPending) {
    if (required && !context.user && !context.isPending && router.pathname !== '/signin') {
      router.push('/signin'); 
    }
  }, [required, context.user, context.isPending, router]);

  return context;
}