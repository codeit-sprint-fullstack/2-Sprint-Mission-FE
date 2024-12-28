import axios from './axios';

interface GetProductsParams {
  orderBy?: string;
  page?: number;
  pageSize?: number;
  keyword?: string;
}

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  tags?: string[];
  images?: string[];
}

interface ProductsResponse {
  totalCount: number;
  list: Product[];
}

interface ProductComment {
  id: string;
  content: string;
  createdAt: string;
}

interface ProductCommentsResponse {
  totalCount: number;
  list: ProductComment[];
}

interface GetProductCommentsParams {
  productId: string;
  params: {
    limit?: number;
    cursor?: string;
  };
}

export async function getProducts({
  orderBy = 'recent',
  page = 1,
  pageSize = 10,
  keyword,
}: GetProductsParams = {}): Promise<ProductsResponse> {
  const response = await axios.get<ProductsResponse>('/products', {
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

export async function addProduct(product: Product): Promise<Product> {
  const response = await axios.post<Product>('/products', product);
  const newProduct = response.data;
  return newProduct;
}

export async function getProduct(productId: string): Promise<Product> {
  const response = await axios.get<Product>(`/products/${productId}`);
  const product = response.data;
  return product;
}

export async function patchProduct(productId: string, partialProduct: Partial<Product>): Promise<Product> {
  const response = await axios.patch<Product>(`/products/${productId}`, partialProduct);
  const product = response.data;
  return product;
}

export async function deleteProduct(productId: string): Promise<void> {
  await axios.delete(`/products/${productId}`);
}

export async function addProductFavorite(productId: string): Promise<Product> {
  const response = await axios.post<Product>(`/products/${productId}/favorite`);
  const product = response.data;
  return product;
}

export async function deleteProductFavorite(productId: string): Promise<Product> {
  const response = await axios.delete<Product>(`/products/${productId}/favorite`);
  const product = response.data;
  return product;
}

export async function getProductComments({
  productId,
  params: { limit, cursor },
}: GetProductCommentsParams): Promise<ProductComment[]> {
  const response = await axios.get<ProductCommentsResponse>(`/products/${productId}/comments`, {
    params: { limit, cursor },
  });
  const { totalCount, list: comments } = response.data;
  return comments;
}

export async function addProductComment(productId: string, { content }: { content: string }): Promise<ProductComment> {
  const response = await axios.post<ProductComment>(`/products/${productId}/comments`, {
    content,
  });
  const comment = response.data;
  return comment;
}
