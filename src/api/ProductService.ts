import { deleteRequest, getRequest, postRequest } from "@/utils/UtilApi";

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

export const fetchProductFavorite = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await postRequest(
      `/products/${id}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("post product favorite failed");
  }
};

export const fetchProductUnFavorite = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await deleteRequest(`/products/${id}/favorite`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("delete product favorite failed");
  }
};

export const fetchProductRegister = async (
  images: File[],
  tags: string[],
  price: string,
  description: string,
  name: string
) => {
  try {
    const params = {
      images,
      tags,
      price,
      description,
      name,
    };

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await postRequest(
      `/products`,
      { params },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("post product register failed");
  }
};
