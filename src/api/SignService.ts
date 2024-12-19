import { postRequest } from "@/utils/UtilApi";
import { isAxiosError } from "axios";

export const signin = async (email: string, password: string) => {
  const params = {
    email: email,
    password: password,
  };

  try {
    const response = await postRequest("/auth/signIn", params);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw new Error("Login failed");
  }
};

export const signup = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string
) => {
  const params = {
    email: email,
    nickname: nickname,
    password: password,
    passwordConfirmation: passwordConfirmation,
  };

  try {
    const response = await postRequest("/auth/signUp", params);
    return response.data;
  } catch {
    throw new Error("SignUp failed");
  }
};
