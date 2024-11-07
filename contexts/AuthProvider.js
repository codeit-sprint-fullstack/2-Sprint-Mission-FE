import { postUserLogin, getUser, postUser } from "@/api/api";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { TOKEN } from "@/constants";
import Signup from "@/pages/signup";
import { useError } from "./ErrorProvider";
const AuthContext = createContext({
  user: null,
  signup: () => {},
  login: () => {},
  logout: () => {},
  updateMe: () => {}
});
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { ACCESS_TOKEN, REFRESH_TOKEN } = TOKEN;
  const { handleError } = useError();
  const getMe = async () => {
    try {
      const response = await getUser();
      const nextUser = response.data;
      setUser(nextUser);
    } catch (error) {
      const { status } = error.response;
      const isTokenError = status === 400 || status === 401;
      if (error.response && isTokenError) {
        handleError(
          new Error(
            "토큰이 만료되었거나 유효하지 않은 토큰입니다. 다시 로그인해주세요."
          )
        );
        logout();
      }
    }
  };
  const signup = async (formData) => {
    const response = await postUser(formData);
    const { user: nextUser, accessToken, refreshToken } = response.data;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    await getMe();
    return response;
  };
  const login = async (formData) => {
    const response = await postUserLogin(formData);
    const { user: nextUser, accessToken, refreshToken } = response.data;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    await getMe();
    return response;
  };
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
  };
  const updateMe = async (formData) => {
    //나의 정보 가져오기?
  };

  useEffect(() => {
    getMe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        updateMe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(required) {
  const context = useContext(AuthContext);
  if (!context) return new Error("반드시 AuthProvider 안에서 사용해야 됩니다");
  // useEffect(() => {
  //   if (required && !context.user) router.push("/login");
  // }, [context.user, required]);
  return context;
}
