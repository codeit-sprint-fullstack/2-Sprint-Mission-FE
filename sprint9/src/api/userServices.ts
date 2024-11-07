import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

export async function getUserMe() {
  try {
    const response = await getRequest(`/users/me`);
    return response.data;
  } catch (error) {
    console.error("Error on signing up:", error);
    throw error;
  }
}
