import axios from './axios';
import { GetProductsParams } from '../../types/products';
import { ProductData } from '../../types/products';
import { Product } from '../../types/products';

export async function getProducts({
  orderBy = 'recent',
  page = 1,
  pageSize = 10,
  keyword,
}: GetProductsParams = {}): Promise<{ totalCount: number; list: Product[] }> {
  const response = await axios.get('/products', {
    params: {
      orderBy,
      page,
      pageSize,
      keyword,
    },
  });
  const { totalCount, list } = response.data;
  return { totalCount, list };
}

export async function addProduct(productData: ProductData): Promise<Product> {
  const response = await axios.post('/products', productData);
  const newProduct = response.data;
  return newProduct;
}

export async function getProduct(productId: number): Promise<Product> {
  const response = await axios.get(`/products/${productId}`);
  const product = response.data;
  return product;
}

export async function patchProduct(productId: number, partialProduct: Partial<Product>): Promise<Product> {
  const response = await axios.patch(`/products/${productId}`, partialProduct);
  const product = response.data;
  return product;
}

export async function deleteProduct(productId: number): Promise<void> {
  await axios.delete(`/products/${productId}`);
}

export async function addProductFavorite(productId: number): Promise<Product> {
  const response = await axios.post(`/products/${productId}/favorite`);
  const product = response.data;
  return product;
}

export async function deleteProductFavorite(productId: number): Promise<Product> {
  const response = await axios.delete(`/products/${productId}/favorite`);
  const product = await response.data;
  return product;
}

export async function getProductComments({
  productId,
  params: { limit, cursor },
}: {
  productId: number,
  params: { limit: number, cursor?: string },
}): Promise<Comment[]> {
  const response = await axios.get(`/products/${productId}/comments`, {
    params: { limit, cursor },
  });
  const { totalCount, list: comments } = response.data;
  return comments;
}

export async function addProductComment(productId: number, { content }: { content: string }): Promise<Comment> {
  const response = await axios.post(`/products/${productId}/comments`, {
    content,
  });
  const comment = response.data;
  return comment;
}
