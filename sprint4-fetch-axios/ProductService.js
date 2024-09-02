import instance from "./instance.js";

// * params = {page, pageSize, keyword};
const getProductList = async (params = {}) => {
  let res = null;
  try {
    res = await instance.get(`/products`, {params});
  } catch (err) {
    console.log(err);
    return res?.message;
  }
  return res.data;
};

const getProduct = async (id) => {
  let res = null;
  try {
    res = await instance.get(`/products/${id}`);
  } catch (err) {
    console.log(err);
    return res?.message;
  }
  return res.data;
};

// * data = {name, description, price, tags, images};
const createProduct = async (data = {}) => {
  let res = null;
  try {
    res = await instance.post(`/products`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return res?.message;
  }
};

const patchProduct = async (id, data = {}) => {
  let res = null;
  try {
    res = await instance.patch(`/products/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return res?.message;
  }
};

const deleteProduct = async (id) => {
  let res = null;
  try {
    res = await instance.delete(`/products/${id}`);
  } catch (err) {
    console.log(err);
    return res?.message;
  }
  return res.data;
}

const product = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};

export default product;