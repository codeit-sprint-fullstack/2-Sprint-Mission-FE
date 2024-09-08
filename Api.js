const API_URL = 'https://panda-market-api.vercel.app';

export const getProducts = async (sortBy, limit, offset) => {
  const response = await fetch(`${API_URL}/products?sort=${sortBy}&limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return {
    products: data.items, 
    totalCount: data.totalCount  
  };
};

export const getBestProducts = async () => {
  const response = await fetch(`${API_URL}/products?sort=favorite&limit=4`);
  const data = await response.json();
  return data.items;
};