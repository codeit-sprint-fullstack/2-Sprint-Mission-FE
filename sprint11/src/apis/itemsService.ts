import instance from "./instance.ts";

async function getProducts(
	{ page = 1, pageSize = 10, sort = "recent", keyword = "" },
) {
	try {
		const products = await instance.get(`/products`, {
			params: { page, pageSize, sort, keyword },
		});
		return products.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function getProductWithId(id) {
	try {
		const product = await instance.get(`/products/${id}`);
		return product.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function getProductWithIdComments(id, params = { limit: 10 }) {
	try {
		const product = await instance.get(`/products/${id}/comments`, { params });
		return product.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function postProduct(
	data = { images: [], tags: [], price: 0, description: "", name: "" },
) {
	try {
		const resp = await instance.post(`/products`, data);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

// * = {images, tags, price, description, name}
async function patchProductWithId(id, data) {
	try {
		const resp = await instance.patch(`/products/${id}`, data);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function deleteProductWithId(id) {
	try {
		const resp = await instance.delete(`/products/${id}`);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function patchComment(commentId, productId, { content }) {
	try {
		const resp = await instance.patch(
			`/products/${productId}/comments/${commentId}`,
			{ content },
		);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function deleteComment(commentId, productId) {
	try {
		const resp = await instance.delete(
			`/products/${productId}/comments/${commentId}`,
		);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function postProductWithIdComment(productId, { content }) {
	try {
		const resp = await instance.post(`/products/${productId}/comments`, {
			content,
		});
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function likeProductWithId(productId) {
	try {
		const resp = await instance.post(`/products/${productId}/favorite`);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function unlikeProductWithId(productId) {
	try {
		const resp = await instance.delete(`/products/${productId}/favorite`);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
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
