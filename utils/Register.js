import { createProduct } from "../pages/api/ProductService";

export const initialProductData = {
  name: "",
  description: "",
  price: "",
  tags: [],
};

export async function submitProductData(productData) {
  const { name, description, price, tags } = productData;
  const product = {
    name,
    description,
    price: Number(price),
    tags,
  };

  try {
    const response = await createProduct(product);
    console.log(response);
    return response;
  } catch (e) {
    console.log('상품 등록에 실패했습니다.', e.response);
    throw new Error('상품 등록에 실패했습니다.');
  }

}