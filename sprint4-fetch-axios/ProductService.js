import instance from "./instance.js";

// * params = {page, pageSize, keyword};
const getProductList = async (params = {page, pageSize, keyword}) => {
  try {
    const res = await instance.get(`/products`, {params});
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

const getProduct = async (id) => {
  try {
    const res = await instance.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

// * data = {name, description, price, tags, images};
const createProduct = async (data = {name, description, price, tags, images}) => {
  try {
    const res = await instance.post(`/products`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

const patchProduct = async (id, data = {name, description, price, tags, images}) => {
  try {
    const res = await instance.patch(`/products/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await instance.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

const productService = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};

export default productService;
