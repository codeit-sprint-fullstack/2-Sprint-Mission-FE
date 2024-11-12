import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { postSignIn, patchUser, refreshToken } from "@/pages/api/AuthService";
import { getUser } from "@/pages/api/UserService";

const AuthContext = createContext({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  updateMe: () => {}
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    isPending: true
  });

  function getStoredToken() {
    return localStorage.getItem("accessToken");
  }

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true
    }));
    let nextUser;
    try {
      const token = getStoredToken();
      if (token) {
        const res = await getUser();
        nextUser = res;
      } else {
        throw new Error("No token stored");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        await refreshToken();
        const res = await getUser();
        nextUser = res;
      }
      console.error("Error fetching user:", error);
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false
      }));
    }
  }

  async function login(email, password) {
    try {
      const userData = await postSignIn({ email, password });
      if (userData && userData.accessToken) {
        localStorage.setItem('accessToken', userData.accessToken);
        localStorage.setItem('refreshToken', userData.refreshToken);
        await getMe();
        return true;
      } else {
        throw new Error("No token returned");
      }
    } catch (e) {
      console.error(e.message);
      alert("요청에 실패했습니다. 다시 시도해 주세요");
      return false;
    }
  }

  async function logout() {
    localStorage.removeItem("accessToken");
    setValues((prevValues) => ({
      ...prevValues,
      user: null
    }));
  }

  async function updateMe(formData) {
    const res = patchUser(formData);
    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
      isPending: false
    }));
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
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
  const navigate = useRouter();
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      navigate.push("/login");
    }
  }, [context.user, context.isPending, navigate, required]);

  return context;
}
