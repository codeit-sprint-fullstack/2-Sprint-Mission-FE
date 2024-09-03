import instance from "./instance.js";

// * params = {page, pageSize, keyword};
const getProductList = async (params = {}) => {
  try {
    const res = await instance.get(`/products`, {params});
    return res.data;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
};

const getProduct = async (id) => {
  try {
    const res = await instance.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
};

// * data = {name, description, price, tags, images};
const createProduct = async (data = {}) => {
  try {
    const res = await instance.post(`/products`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
};

const patchProduct = async (id, data = {}) => {
  try {
    const res = await instance.patch(`/products/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await instance.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err?.response || err;
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