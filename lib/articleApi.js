import { axiosApi } from "./api";
import { requestMethod } from "./api";

export async function getArticle(id) {
  return axiosApi({ url: `/articles/${id}`, method: requestMethod.GET });
}
