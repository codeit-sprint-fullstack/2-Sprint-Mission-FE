
export interface Product extends ProductData {
    id: number;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
    likes: number;
    isFavorite?: boolean | undefined;
    favoriteCount?: number;
}

export interface ProductData extends TagDisplayProps {
    name: string;
    description: string;
    price: number;
    images: string[];
}

export interface TagDisplayProps {
    tags: string[];
}

export interface GetProductsParams {
    orderBy?: string;
    page?: number;
    pageSize?: number;
    keyword?: string;
}