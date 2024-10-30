import axios from "./axios";
import { handleError } from "./handleError";

// export async function getArticle(id) {
//   try {
//     const res = await axios.get(`/articles/${id}`);
//     return res.data;
//   } catch (e) {
//     handleError(e);
//   }
// }

export const requestMethod = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
});

export async function axiosApi(
  url,
  method,
  data = {},
  params = {},
  options = {}
) {
  try {
    const res = await axios({
      url,
      method,
      data,
      params,
      options,
    });
    return res.data;
  } catch (e) {
    handleError(e);
  }
}
