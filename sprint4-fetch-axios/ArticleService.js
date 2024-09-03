import instance from "./instance.js";

// * params = {page, pageSize, keyword}
const getArticleList = async ({page, pageSize, keyword}) => {
  try {
    const res = await instance.get(`/articles`, {page, pageSize, keyword});
    return res.data;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
};

const getArticle = async (id) => {
  try {
    const res = await instance.get(`/articles/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
};

/*
data = {
  "title": "string",
  "content": "string",
  "image": "string"
};
 */
const createArticle = async (data = {}) => {
  try {
    const res = await instance.post(`/articles`, data, {
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

const patchArticle = async (id, data) => {
  try {
    const res = await instance.patch(`/articles/${id}`, data, {
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

const deleteArticle = async (id) => {
  try {
    const res = await instance.delete(`/articles/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
  return res.data;
}

const articleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};

export default articleService;