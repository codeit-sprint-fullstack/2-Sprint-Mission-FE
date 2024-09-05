// src/api/api-test.js

import { getProductList } from './ProductService';

const BestProducts = await getProductList(1, 4, 'favorite');
//console.log('Best Product List"', BestProducts);

// 싱픔 목록 기져오기
const products = await getProductList(1, 10);
//console.log('Product List:', products);
