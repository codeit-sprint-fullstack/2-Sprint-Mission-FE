const API_BASE_URL = "https://sprint-mission-api.vercel.app/products";

export async function getProductList(page = 1, pageSize = 100, keyword = "") {
  try {
    const res = await fetch(
      `${API_BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(
        keyword
      )}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("상품 목록을 가져오는 데 실패했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function getProduct(productId) {
  try {
    const res = await fetch(`${API_BASE_URL}/${productId}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("상품 상세 정보를 가져오는 데 실패했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function createProduct({
  name,
  description,
  price,
  tags = [],
  images = [],
}) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) {
      throw new Error("상품을 등록하는 데 실패했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function patchProduct(productId, updateData) {
  try {
    const res = await fetch(`${API_BASE_URL}/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updateData,
        tags: updateData.tags || [], // 수정할 tags 배열
        images: updateData.images || [], // 수정할 images 배열),
      }),
    });
    if (!res.ok) {
      throw new Error("상품을 수정하는 데 실패했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function deleteProduct(productId) {
  try {
    const res = await fetch(`${API_BASE_URL}/${productId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("제품을 삭제하는 데 실패했습니다.");
    }
    return { message: "제품이 성공적으로 삭제되었습니다." };
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

const product = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};

export default product;
