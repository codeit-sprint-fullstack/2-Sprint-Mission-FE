import { getRequest } from "@/utils/UtilApi";

export const fetchProduct = async (
  page?: number,
  pageSize?: number,
  orderBy?: string,
  keyword?: string
) => {
  try {
    const params = {
      page: page,
      pageSize: pageSize,
      orderBy: orderBy,
      keyword: keyword,
    };
    const response = await getRequest("/products", { params });
    return response.data;
  } catch (error) {
    throw new Error("get product failed");
  }
};

export const fetchProductDetail = async (id: string) => {
  try {
    const response = await getRequest(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("get product detail data failed");
  }
};
