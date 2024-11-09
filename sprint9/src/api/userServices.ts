import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

export async function getUserMe() {
  try {
    const response = await getRequest(`/users/me`, {}, true);
    return response.data;
  } catch (error) {
    console.error("Error on log in:", error);
    throw error;
  }
}
