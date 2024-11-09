import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

export async function getComment(id: string, limit: number) {
  try {
    const response = await getRequest(
      `/products/${id}/comments`,
      {
        limit
      },
      false
    );
    return response.data;
  } catch (error) {
    console.error("Error on fetching data", error);
    throw error;
  }
}
