import axios from "./axios";
import { handleError } from "./handleError";

export async function fetchPost(id) {
  try {
    const res = await axios.get(`/articles/${id}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
}
