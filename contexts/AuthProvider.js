import { postUserLogin, getUser } from "@/api/api";
import { createContext, useState, useContext } from "react";
import { TOKEN } from "@/constants";
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {}
});
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { ACCESS_TOKEN, REFRESH_TOKEN } = TOKEN;
  const getMe = getUser;
  const login = async (formData) => {
    const response = await postUserLogin(formData);
    const { user: nextUser, accessToken, refreshToken } = response.data;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    setUser(nextUser);
    await getMe();
    return response;
  };
  const logout = () => {};
  const updateMe = async (formData) => {
    //나의 정보 가져오기?
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateMe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) return new Error("반드시 AuthProvider 안에서 사용해야 됩니다");
  return context;
}
