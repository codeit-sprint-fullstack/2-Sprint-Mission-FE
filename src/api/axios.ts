/**
 * @TODO
 * 래퍼함수는 기본 요구사항 모두 충족한 뒤 작성하겠습니다.
 */

import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // timeout: 5000,
});

/**
 * @NOTE
 * 추후 리프레시 토큰 발급을 위한 로직입니다.
 * 시도하다가 시간이 오래 걸릴 것 같아서 주석처리 해두었습니다!
 */

// instance.interceptors.request.use(
//   async (config) => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401) {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         const newAccessToken = await refreshAccessToken({ refreshToken });
//         localStorage.setItem("accessToken", newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return instance(originalRequest);
//       } else {
//         alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export interface SignUpData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LogInData {
  email: string;
  password: string;
}

// export interface RefreshAccessToken {
//   refreshToken: string;
// }

export interface UserInfo {
  id: number;
  nickname: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export async function postSignUp(data: SignUpData) {
  try {
    const res = await instance.post("/auth/signUp", data);
    return res.data;
  } catch (error) {
    console.error("회원가입 요청 중 오류 발생:", error);
    throw error;
  }
}

export async function postLogIn(data: LogInData) {
  try {
    const res = await instance.post("/auth/signIn", data);
    return res.data;
  } catch (error) {
    console.error("로그인 요청 중 오류 발생:", error);
    throw error;
  }
}

/**
 * @NOTE
 * 추후 리프레시 토큰 발급을 위한 로직입니다.
 * 시도하다가 시간이 오래 걸릴 것 같아서 주석처리 해두었습니다!
 */

// export async function refreshAccessToken(
//   data: RefreshAccessToken
// ): Promise<string> {
//   try {
//     const res = await instance.post("/auth/refresh-token", data);
//     return res.data.accessToken;
//   } catch (error) {
//     console.error(
//       "리프레시 토큰으로 액세스 토큰을 가져오는 중 오류 발생:",
//       error
//     );
//     throw error;
//   }
// }

export async function getUserInfo(token: string): Promise<UserInfo> {
  try {
    const res = await instance.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("회원 정보를 가져오는 중 오류 발생:", error);
    throw error;
  }
}

export async function getProduct(
  page: number = 1,
  pageSize: number = 10,
  orderBy: string = "recent",
  keyword?: string
) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy,
  });

  const res = await instance.get(`/products?${params.toString()}`);
  return res.data;
}

export async function getProductDetail(id: string) {
  try {
    const res = await instance.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("제품 상세 정보를 가져오는 중 오류 발생:", error);
    throw error;
  }
}
