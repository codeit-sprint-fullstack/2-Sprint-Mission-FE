import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

export async function postSignup(data: object) {
  try {
    const response = await postRequest(`/auth/signUp`, data);
    return response.data;
  } catch (error) {
    console.error("Error on signing up:", error);
    throw error;
  }
}

export async function postSignin(data: object) {
    try {
      const response = await postRequest(`/auth/signIn`, data);
      return response.data;
    } catch (error) {
      console.error("Error on signing up:", error);
      throw error;
    }
  }
