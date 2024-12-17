export type TItem = {
	id: string;
	name: string;
	description: string;
	images: string[];
	price: number;
	favoriteCount: number;
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
