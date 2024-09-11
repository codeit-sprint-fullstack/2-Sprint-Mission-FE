import * as ownFetch from './own_fetch.js';

const SERVER = 'https://panda-market-api.vercel.app/products';

async function getProducts(params = {}) {
  return await ownFetch.fetchGet(SERVER, params);
}

export { getProducts };
