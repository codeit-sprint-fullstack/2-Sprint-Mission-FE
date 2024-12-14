import axios from "./axios";


interface uploadImageResponse {
  url: string;
}

export async function uploadImage(imageFile: File): Promise<string> {
  const response = await axios.post<uploadImageResponse>(`/images/upload`, {
    image: imageFile
  });
  const { url } = response.data;
  return url;
}
