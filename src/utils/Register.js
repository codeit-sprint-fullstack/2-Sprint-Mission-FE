import { createProduct } from "../api/ProductService";

export const initialProductData = {
  name: "",
  description: "",
  price: "",
  tags: "",
};

function isProductNameValid(name) {
  return name.length < 1 || name.length > 10;
}

function isProductDescriptionValid(description) {
  return description.length < 10 || description.length > 100;
}

function isProductPriceValid(price) {
  return !Number(price) || price < 0;
}

function isProductTagsValid(tags) {
  return tags.length > 5;
}

export function validationCheck(productData) {
  const errors = {};
  const { name, description, price, tags } = productData;
  if (isProductNameValid(name)) errors.name="10자 이내로 입력해주세요";
  if (isProductDescriptionValid(description)) errors.description="10자 이상 입력해주세요";
  if (isProductPriceValid(price)) errors.price="숫자로 입력해주세요";
  if (isProductTagsValid(tags)) errors.tags="5글자 이내로 입력해주세요";

  return errors;
}

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
  } catch (e) {
    console.log('상품 등록에 실패했습니다.', e.response);
    throw new Error('상품 등록에 실패했습니다.');
  }

}
