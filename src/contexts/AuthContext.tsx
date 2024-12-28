import React, { createContext, useCallback, useContext, useEffect, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn as requestSignIn, signUp as requestSignUp, getMe } from "../api/auth";
import { clearTokens, setTokens } from "../utils/authToken";
import { User } from "../../types/user";
import { SignUpParams } from "../../types/user";
import { SignInParams } from "../../types/user";


interface AuthContextType {
  user: User | null;
  signup: (params: SignUpParams) => Promise<void>;
  signin: (params: SignInParams) => Promise<void>;
  signout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: async () => {
    throw new Error("signup function is not implemented");
  },
  signin: async () => {
    throw new Error("signin function is not implemented");
  },
  signout: () => {
    throw new Error("signout function is not implemented");
  },
});

/**
 * 쿼리스트링에서 토큰을 가져와 저장하고 URL을 정리하는 Hook
 */
function useTokensFromParams(): void {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("at") && searchParams.has("rt")) {
      setTokens({
        accessToken: searchParams.get("at") || "",
        refreshToken: searchParams.get("rt") || "",
      });
      const newPath = location.pathname; // 현재 경로에서 쿼리 파라미터를 제외한 경로만 사용
      navigate(newPath, { replace: true }); // 새 경로로 이동
    }
  }, [location.pathname, location.search, navigate]);
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
    <AuthContext.Provider value={{ user: user || null, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하는 커스텀 Hook
export const useAuth = (): AuthContextType => useContext(AuthContext);
