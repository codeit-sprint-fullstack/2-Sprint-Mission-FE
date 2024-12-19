import { getRequest } from "@/utils/UtilApi";

export const signin = async (email: string, password: string) => {
  const params = {
    email,
    password,
  };

  try {
    const response = await getRequest("/auth/signIn", params);
    return response.data;
  } catch {
    throw new Error("Login failed");
  }
};
