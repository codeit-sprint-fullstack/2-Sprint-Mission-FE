import instance from "./instance.ts";

async function getProducts(
	{ page = 1, pageSize = 10, sort = "recent", keyword = "" }: {
		page: number;
		pageSize: number;
		sort: string;
		keyword: string;
	},
) {
	try {
		const products = await instance.get(`/products`, {
			params: { page, pageSize, sort, keyword },
		});
		return products.data;
	} catch (err) {
		return err;
	}
}

async function getProductWithId(id: string) {
	try {
		const product = await instance.get(`/products/${id}`);
		return product.data;
	} catch (err) {
		return err;
	}
}

async function getProductWithIdComments(id: string, params: { limit: number } = { limit: 10 }) {
	try {
		const product = await instance.get(`/products/${id}/comments`, { params });
		return product.data;
	} catch (err) {
		return err;
	}
}

async function postProduct(
	data: {
		images: string[];
		tags: string[];
		price: number;
		description: string;
		name: string;
	} = { images: [], tags: [], price: 0, description: "", name: "" }
) {
	try {
		const resp = await instance.post(`/products`, data);
		return resp.data;
	} catch (err) {
		return err;
	}
}

// * = {images, tags, price, description, name}
async function patchProductWithId(id: string, data: Partial<{
		images: string[];
		tags: string[];
		price: number;
		description: string;
		name: string;
	}>) {
	try {
		const resp = await instance.patch(`/products/${id}`, data);
		return resp.data;
	} catch (err) {
		return err;
	}
}

async function deleteProductWithId(id: string) {
	try {
		const resp = await instance.delete(`/products/${id}`);
		return resp.data;
	} catch (err) {
		return err;
	}
}

async function patchComment(commentId: string, productId: string, { content }: { content: string }) {
	try {
		const resp = await instance.patch(
			`/products/${productId}/comments/${commentId}`,
			{ content },
		);
		return resp.data;
	} catch (err) {
		return err;
	}
}

async function deleteComment(commentId: string, productId: string) {
	try {
		const resp = await instance.delete(
			`/products/${productId}/comments/${commentId}`,
		);
		return resp.data;
	} catch (err) {
		return err;
	}
}

async function postProductWithIdComment(productId: string, { content }: { content: string }) {
	try {
		const resp = await instance.post(`/products/${productId}/comments`, {
			content,
		});
		return resp.data;
	} catch (err) {
		return err;
	}
}

async function likeProductWithId(productId: string) {
	try {
		const resp = await instance.post(`/products/${productId}/favorite`);
		return resp.data;
	} catch (err) {
		return err;
	}
}

async function unlikeProductWithId(productId: string) {
	try {
		const resp = await instance.delete(`/products/${productId}/favorite`);
		return resp.data;
	} catch (err) {
		return err;
	}
}

export {
	deleteComment,
	deleteProductWithId,
	getProducts,
	getProductWithId,
	getProductWithIdComments,
	likeProductWithId,
	patchComment,
	patchProductWithId,
	postProduct,
	postProductWithIdComment,
	unlikeProductWithId,
};
