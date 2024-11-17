import React, { createContext, useCallback, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn as requestSignIn, signUp as requestSignUp, getMe } from "../api/auth";
import { clearTokens } from "../utils/authToken";

const AuthContext = createContext({
  user: null,
  signup: ({ email, nickname, password, passwordConfirmation }) => {},
  signin: ({ email, password }) => {},
  signout: () => {},
});

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const user = await getMe();
      return user;
    },
    retry: 2,
  });

  const signup = useCallback(
    async ({ email, nickname, password, passwordConfirmation }) => {
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
    async ({ email, password }) => {
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
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
