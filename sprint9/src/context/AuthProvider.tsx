"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { getUserMe } from "@/src/api/userServices";
import { postSignup, postLogin } from "@/src/api/authServices";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
  useQuery
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useModalAction } from "@/src/hooks/useModalAction";

interface SignupData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

interface LoginResponse {
  accessToken: string;
}

//NOTE: UseMutationResult: <성공시 반환할 데이터 타입, 에러 객체 타입, 파라미터 타입>
export const AuthContext = createContext<{
  user: any;
  isLoading: boolean;
  login: UseMutationResult<LoginResponse, Error, LoginData>;
  signUp: UseMutationResult<SignupResponse, Error, SignupData>;
  isModalOpen: boolean;
  isRedirecting: boolean;
}>({
  user: null,
  isLoading: false,
  login: {} as UseMutationResult<LoginResponse, Error, LoginData>,
  signUp: {} as UseMutationResult<SignupResponse, Error, SignupData>,
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
  const router = useRouter();

  const { onModalOpen } = useModalAction();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      router.push("/items");
    }
  }, [accessToken, router]);

  //NOTE: useQuery를 사용하여 accessToken이 있을 때만 getUserMe 함수를 호출해 사용자 정보 가져오기
  const {
    data,
    isLoading: isUserLoading,
    refetch: getMe
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserMe,
    staleTime: Infinity,
    gcTime: Infinity,
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
  const loginMutation = useMutation<LoginResponse, Error, LoginData>({
    onMutate: () => setIsLoading(true),
    mutationFn: (data: LoginData) => postLogin(data),
    onSuccess: (data) => {
      if (data?.accessToken) {
        const { accessToken } = data;
        console.log("Login Success Data:", accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        setAccessToken(data.accessToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        getMe();
        setIsRedirecting(true);
      }
    },
    onError: (error) => {
      console.error("로그인 에러:", error);
      onModalOpen({ msg: "로그인 실패. 다시 시도해주세요." });
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  //NOTE: 회원가입 mutation
  const signUpMutation = useMutation<SignupResponse, Error, SignupData>({
    onMutate: () => setIsLoading(true),
    mutationFn: (data: SignupData) => postSignup(data),
    onSuccess: (data) => {
      console.log("Sign Up Success Data:", data);
      if (data?.accessToken) {
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setIsRedirecting(true);
      }
    },
    onError: (error) => {
      console.error("Sign Up Error:", error);
      onModalOpen({ msg: "회원가입 실패. 다시 시도해주세요." });
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading,
        login: loginMutation,
        signUp: signUpMutation,
        isModalOpen: false,
        isRedirecting
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
