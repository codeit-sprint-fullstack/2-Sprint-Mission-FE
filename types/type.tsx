export interface User {
  id: number;
  nickname: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface Comments {
  nextCursor: number;
  list: Comment[];
}

export interface Writer {
  nickname: string;
  id: number;
}

export interface ArticleType {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface ArticleListType {
  totalCount: number;
  list: ArticleType[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  ownerId: number;
  ownerNickname: string;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface ArticleData {
  title: string;
  content: string;
  image: string;
}

export interface ProductData {
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}
