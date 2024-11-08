import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import useAsync from '@hooks/useAsync';
import { getMe as getMeApi, signIn } from '@utils/api';

const AuthContext = createContext({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export default function AuthProvider({ children }) {
  const [userObj, setUserObj] = useState({ user: null, isPending: true });
  const signInAsync = useAsync(signIn);

  const login = async ({ email, password }) => {
    const res = await signInAsync({ email, password });
    if (!res) return null;

    localStorage.setItem('accessToken', res.accessToken);
    return getMe();
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    setUserObj(old => ({ ...old, user: null }));
  };
  const getMe = async () => {
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
  // async function updateMe(formData) {
  //   const res = await axios.patch('/users/me', formData);
  //   const nextUser = res.data;
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     user: nextUser,
  //   }));
  // }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: userObj.user, isPending: userObj.isPending, login, logout, updateMe }}>
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
