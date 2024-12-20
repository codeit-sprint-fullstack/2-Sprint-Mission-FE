import { getRequest, postRequest } from "@/utils/UtilApi";

export const fetchProductComment = async (id: string) => {
  try {
    const response = await getRequest(`/products/${id}/comments?limit=3`);
    return response.data;
  } catch (error) {
    throw new Error("get product comment failed");
  }
};

export const fetchProductCommentWrite = async (id: string, comment: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await postRequest(
      `/products/${id}/comments`,
      {
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error posting product comment:", error.message || error);
    throw new Error("post product comment failed");
  }
};
