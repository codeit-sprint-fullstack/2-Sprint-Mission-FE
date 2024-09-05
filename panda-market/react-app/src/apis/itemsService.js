import axios from "axios";

const instance = axios.create({
  baseURL: `https://panda-market-api.vercel.app`
});

export async function getProducts({ page = 1, pageSize = 10, orderBy = "recent", keyword = "" }) {
	const products = await instance.get(`/products`, { page, pageSize, orderBy, keyword });
	const data = await products.json();
	return data;
}

export async function getProductWithId(id) {
	const product = await instance.get(`/products/${id}`);
	const data = await product.json();
	return data;
}

export async function postProduct({ images = [], tags = [], price = 0, description = "", name = "" }) {
	const resp = await instance.post(`/products`, {images, tags, price, description, name});
	const data = await resp.json();
	return data;
}

export async function patchProductWithId(id, {images, tags, price, description, name}) {
	const resp = await instance.patch(`/products/${id}`, {images, tags, price, description, name});
	const data = await resp.json();
	return data;
}

export async function deleteProductWithId(id) {
	const resp = await instance.delete(`/products/${id}`);
	const data = await resp.json();
	return data;
}

export async function putProductToFavorite(id) {
	const resp = await instance.post(`/products/${id}/favorite`);
	const data = await resp.json();
	return data;
}

export async function deleteProductFromFavorite(id) {
	const resp = await instance.delete(`/products/${id}/favorite`);
	const data = await resp.json();
	return data;
}
