import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

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

export async function postSignup(data: SignupData) {
  try {
    const response = await postRequest(`/auth/signUp`, data);
    return response.data;
  } catch (error) {
    console.error("Error on signing up:", error);
    throw error;
  }
}

export async function postSignin(data: LoginData) {
  try {
    const response = await postRequest(`/auth/signIn`, data);
    return response.data;
  } catch (error) {
    console.error("Error on signing in:", error);
    throw error;
  }
}
