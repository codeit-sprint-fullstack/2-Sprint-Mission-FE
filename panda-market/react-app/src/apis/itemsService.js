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
