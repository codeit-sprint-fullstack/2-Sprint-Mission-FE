import { createProduct, patchProduct } from "../pages/api/ProductService";

export const initialProductData = {
  name: "",
  description: "",
  price: "",
  tags: [],
  images: []
};

export async function submitProductData(id, isEditing, productData) {
  const { name, description, price, tags, images } = productData;
  const product = {
    name,
    description,
    price: Number(price),
    tags,
    images
  };

  try {
    if (isEditing) {
      const response = await patchProduct(id, product);
      console.log(response);
      return response;
    } else {
      const response = await createProduct(product);
      console.log(response);
      return response;
    }
  } catch (e) {
    console.log("상품 등록에 실패했습니다.", e.response);
    throw new Error("상품 등록에 실패했습니다.");
  }
}
