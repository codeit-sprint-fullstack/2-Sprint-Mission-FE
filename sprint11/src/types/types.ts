export type TItem = {
	id: string;
	name: string;
	description: string;
	images: string[];
	price: number;
	favoriteCount: number;
}

export type TProduct = {
	id: string;
	name: string;
	description: string;
	images: string[];
	price: number;
	tags: string[];
	favoriteCount: number;
	createdAt: Date;
	updatedAt: Date;
	owner: {
		id: number;
		nickname: string;
	}
	isFavorite: boolean;
} | {
	name: string;
	description: string;
	price: number;
	images: string[];
	tags: string[];
}

export type TArticle = {
	id: string;
	title: string;
	description: string;
	images: string[];
	price: number;
	tags: string[];
	favoriteCount: number;
	createdAt: Date;
	author: {
		id: number;
		nickname: string;
	}
}
