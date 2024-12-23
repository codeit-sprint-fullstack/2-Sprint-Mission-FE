import { postRequest } from "@/utils/UtilApi";

export const fetchImage = async (image: string) => {
  try {
    const response = await postRequest("/images/upload", { image });
    return response.data;
  } catch (error) {
    throw new Error("post image failed");
  }
};
