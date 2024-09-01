const ProductService = {
	getProductList: async (page = 1, pageSize = 10, keyword = '') => {
		try {
			const response = await fetch(`https://sprint-mission-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
			if (!response.ok) throw new Error(`Error: ${response.status}`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching product list:', error.message);
		}
	},

	getProduct: async (productId) => {
		try {
			const response = await fetch(`https://sprint-mission-api.vercel.app/products/${productId}`);
			if (!response.ok) throw new Error(`Error: ${response.status}`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching product:', error.message);
		}
	},

	createProduct: async (name, description, price, tags, images) => {
		try {
			const response = await fetch(`https://sprint-mission-api.vercel.app/products`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, description, price, tags, images }),
			});
			if (!response.ok) throw new Error(`Error: ${response.status}`);
			return await response.json();
		} catch (error) {
			console.error('Error creating product:', error.message);
		}
	},

	patchProduct: async (productId, updates) => {
		try {
			const response = await fetch(`https://sprint-mission-api.vercel.app/products/${productId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updates),
			});
			if (!response.ok) throw new Error(`Error: ${response.status}`);
			return await response.json();
		} catch (error) {
			console.error('Error patching product:', error.message);
		}
	},

	deleteProduct: async (productId) => {
		try {
			const response = await fetch(`https://sprint-mission-api.vercel.app/products/${productId}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error(`Error: ${response.status}`);
			return true;
		} catch (error) {
			console.error('Error deleting product:', error.message);
		}
	},
};

export default ProductService;
