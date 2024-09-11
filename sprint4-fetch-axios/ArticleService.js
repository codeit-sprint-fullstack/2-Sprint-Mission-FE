import instance from "./instance.js";

// * params = {page, pageSize, keyword}
const getArticleList = async (params = {page, pageSize, keyword}) => {
  try {
    const res = await instance.get(`/articles`, {params});
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

const getArticle = async (id) => {
  try {
    const res = await instance.get(`/articles/${id}`);
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

/*
data = {
  "title": "string",
  "content": "string",
  "image": "string"
};
 */
const createArticle = async (data = {title, content, image}) => {
  try {
    const res = await instance.post(`/articles`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

const patchArticle = async (id, data = {title, content, image}) => {
  try {
    const res = await instance.patch(`/articles/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
};

const deleteArticle = async (id) => {
  try {
    const res = await instance.delete(`/articles/${id}`);
    return res.data;
  } catch (err) {
    return err?.response?.data || err;
  }
}

const articleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};

export default articleService;
