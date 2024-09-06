import axios from "axios";

const instance = axios.create({
  baseURL: `https://panda-market-api.vercel.app`
});

async function getProducts(params = { page: 1, pageSize: 10, orderBy: "recent", keyword: "" }) {
	const products = await instance.get(`/products`, {params});
	return products;
}

async function getProductWithId(id) {
	const product = await instance.get(`/products/${id}`);
	return product;
}

async function postProduct(data = { images: [], tags: [], price: 0, description: "", name: "" }) {
	const resp = await instance.post(`/products`, data);
	return resp;
}

async function patchProductWithId(id, data = {images, tags, price, description, name}) {
	const resp = await instance.patch(`/products/${id}`, data);
	return resp;
}

async function deleteProductWithId(id) {
	const resp = await instance.delete(`/products/${id}`);
	return resp;
}

async function putProductToFavorite(id) {
	const resp = await instance.post(`/products/${id}/favorite`);
	return resp;
}

async function deleteProductFromFavorite(id) {
	const resp = await instance.delete(`/products/${id}/favorite`);
	return resp;
}

const itemsService = {
	getProducts,
	getProductWithId,
	postProduct,
	patchProductWithId,
	deleteProductWithId,
	putProductToFavorite,
	deleteProductFromFavorite
};

export default itemsService;
