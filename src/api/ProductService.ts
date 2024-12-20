import { getRequest } from "@/utils/UtilApi";

export const fetchProduct = async (
  page: number = 1,
  pageSize: number,
  orderBy?: string,
  keyword?: string
) => {
  const params = {
    page: page,
    pageSize: pageSize,
    orderBy: orderBy,
    keyword: keyword,
  };
  try {
    const response = await getRequest("/products", params);
    return response.data;
  } catch (error) {
    throw new Error("get product failed");
  }
};
