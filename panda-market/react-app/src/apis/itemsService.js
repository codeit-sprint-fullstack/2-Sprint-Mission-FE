import axios from "axios";

const instance = axios.create({
  baseURL: `https://two-sprint-mission-be-t2e7.onrender.com`
});

async function getProducts(params = { page: 1, pageSize: 10, orderBy: "recent", keyword: "" }) {
	try {
		const products = await instance.get(`/products`, {params});
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

async function postProduct(data = { images: [], tags: [], price: 0, description: "", name: "" }) {
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

async function putProductToFavorite(id) {
	try {
		const resp = await instance.post(`/products/${id}/favorite`);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function deleteProductFromFavorite(id) {
	try {
		const resp = await instance.delete(`/products/${id}/favorite`);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

export {
	getProducts,
	getProductWithId,
	postProduct,
	patchProductWithId,
	deleteProductWithId,
	putProductToFavorite,
	deleteProductFromFavorite
};