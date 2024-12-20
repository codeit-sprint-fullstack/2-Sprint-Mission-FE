import { createContext, useContext, useState, useEffect } from "react";
import { fetchApi } from "@/utils/axiosInstance";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getMe() {
    try {
      const res = await fetchApi("/users/me");
      setUser(res);
    } catch (e) {
      console.error(e);
      setUser(null);
    }
  }

  async function login({ email, password }) {
    try {
      const { accessToken, refreshToken } = await fetchApi(
        "/auth/signIn",
        { email, password },
        "POST"
      );

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      await getMe();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getMe();
    }
  }, []);

  async function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
    throw new Error("AuthProvider 안에서 사용해야 합니다.");
  }
  return context;
}
