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

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
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
