import axios from "axios";

interface SignUpData {
  email: string;
  nickname: string;
  password: string;
  passwordcheck: string;
}

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

export async function postSignUp(data: SignUpData) {
  try {
    const res = await instance.post("/auth/signUp", data);
    return res;
  } catch (error) {
    console.error("회원가입 요청 중 오류 발생:", error);
    throw error;
  }
}
