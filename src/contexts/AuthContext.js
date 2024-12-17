import React, { createContext, useCallback, useContext, useEffect, ReactNode, ReactElement } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn as requestSignIn, signUp as requestSignUp, getMe } from "../api/auth";
import { clearTokens, setTokens } from "../utils/authToken";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  email: string;
  nickname: string;
  [key: string]: any;
}

interface SignUpParams {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signup: (params: SignUpParams) => Promise<void>;
  signin: (params: SignInParams) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: async () => { },
  signin: async () => { },
  signout: () => { },
});

function useTokensFromParams(): void {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("at") && searchParams.has("rt")) {
      setTokens({
        accessToken: searchParams.get("at")!,
        refreshToken: searchParams.get("rt")!,
      });
      const newPath = location.pathname; // 현재 경로에서 쿼리 파라미터를 제외한 경로만 사용
      navigate(newPath, { replace: true }); // 새 경로로 이동
    }
  }, [location.pathname, location.search, navigate]);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  useTokensFromParams();

  const queryClient = useQueryClient();

  const { data: user } = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: async () => {
      const user = await getMe();
      return user;
    },
    retry: 2,
  });

  const signup = useCallback(
    async ({ email, nickname, password, passwordConfirmation }: SignUpParams) => {
      await requestSignUp({
        email,
        nickname,
        password,
        passwordConfirmation,
      });
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
    [queryClient]
  );

  const signin = useCallback(
    async ({ email, password }: SignInParams) => {
      await requestSignIn({
        email,
        password,
      });
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
    [queryClient]
  );

  const signout = useCallback(() => {
    clearTokens();
    queryClient.invalidateQueries({
      queryKey: ["me"],
    });
  }, [queryClient]);

  return (
    <AuthContext.Provider value= {{ user, signup, signin, signout }
}>
  { children }
  </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
