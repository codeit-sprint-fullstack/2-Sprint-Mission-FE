import { createContext, useState, useEffect, ReactNode } from "react";
import { getUserMe } from "@/src/api/userServices";
import { postSignup, postSignin } from "@/src/api/authServices";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const AuthContext = createContext({
  user: null,
  isLoading: false,
  login: () => {},
  signUp: () => {},
  isModalOpen: false,
  isRedirecting: false
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  //NOTE: 타입스크립트 제네릭<타입||타입>: 
  //제네릭을 통해 상태 값이 string이나 null일 수 있다는 것을 TypeScript에 알려줘서 타입 오류를 방지
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  //NOTE: useQuery를 사용하여 accessToken이 있을 때만 getUserMe 함수를 호출해 사용자 정보 가져오기
  const {
    data,
    isLoading: isUserLoading,
    refetch: getMe
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserMe,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!accessToken
  });

  useEffect(() => {
    setIsLoading(isUserLoading);
  }, [isUserLoading]);

  //TODO: 각 mutation 함수에 onError(모달 띄우기) 옵션 추가하기
  //NOTE: mutationFn는 useMutation가 알아서 비동기 함수도 실행해줌

  //NOTE: 로그인 mutation 설정하기
  const loginMutation = useMutation({
    onMutate: () => setIsLoading(true),
    mutationFn: (data) => postSignin(data),
    onSuccess: (data) => {
      if (data && data.accessToken) {
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        getMe();
        setIsRedirecting(true);
      }
    },
    onSettled: () => setIsLoading(false)
  });

  //NOTE: 회원가입 mutation
  const signUpMutation = useMutation({
    onMutate: () => setIsLoading(true),
    mutationFn: (data) => postSignup(data),
    onSuccess: (data) => {
      if (data && data.accessToken) {
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        getMe();
        setIsRedirecting(true);
      }
    },
    onSettled: () => setIsLoading(false)
  });

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading,
        login: loginMutation,
        signUp: signUpMutation,
        isRedirecting
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
