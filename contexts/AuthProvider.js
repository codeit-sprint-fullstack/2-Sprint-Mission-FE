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
      // console.error('로그인 오류:', error.message);  // Axios 기본 오류가 전달되는 듯
      // return error.message;    // 로그인창에서 에러를 전달 받을 수 있도록 리턴함  

      // 서버에서 반환된 에러 메시지 읽기
      const errorMessage = error.response?.data?.message || '로그인 중 알 수 없는 오류가 발생했습니다.';
      console.error('로그인 오류:', errorMessage);
      // 프론트엔드에서 사용할 수 있도록 에러 메시지 반환
      return errorMessage;      
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