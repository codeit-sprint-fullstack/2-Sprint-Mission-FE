import { postUserLogin, getUser, postUser } from "@/api/api";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { TOKEN } from "@/constants";
import Signup from "@/pages/signup";
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
  const getMe = async () => {
    const response = await getUser();
    console.log(response);
    const nextUser = response.data;
    setUser(nextUser);
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
  const logout = () => {};
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
