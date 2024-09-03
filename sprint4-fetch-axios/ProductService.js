import instance from "./instance.js";

// * params = {page, pageSize, keyword};
const getProductList = async ({page, pageSize, keyword}) => {
  try {
    const res = await instance.get(`/products`, {page, pageSize, keyword});
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
const createProduct = async ({name, description, price, tags, images}) => {
  try {
    const res = await instance.post(`/products`, {name, description, price, tags, images}, {
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

const patchProduct = async (id, {name, description, price, tags, images}) => {
  try {
    const res = await instance.patch(`/products/${id}`, {name, description, price, tags, images}, {
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