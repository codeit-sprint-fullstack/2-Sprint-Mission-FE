import axios from "./axios";

export async function uploadImage(imageFile: File): Promise<string> {
  const response = await axios.postForm(`/images/upload`, {
    image: imageFile
  });
  const { url } = response.data;
  return url;
}
