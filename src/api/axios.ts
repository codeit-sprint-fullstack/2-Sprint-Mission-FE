/**
 * @TODO
 * 래퍼함수는 기본 요구사항 모두 충족한 뒤 작성하겠습니다.
 */

import { ifError } from "assert";
import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

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
