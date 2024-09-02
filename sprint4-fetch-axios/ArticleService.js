import instance from "./instance.js";

// * params = {page, pageSize, keyword}
const getArticleList = async ({page, pageSize, keyword}) => {
  let res = null;
  try {
    res = await instance.get(`/articles`, {page, pageSize, keyword});
  } catch (err) {
    console.log(err);
    return res?.message;
  }
  return res.data;
};

const getArticle = async (id) => {
  let res = null;
  try {
    res = await instance.get(`/articles/${id}`);
  } catch (err) {
    console.log(err);
    return res?.message;
  }
  return res.data;
};

/*
data = {
  "title": "string",
  "content": "string",
  "image": "string"
};
 */
const createArticle = async (data = {}) => {
  let res = null;
  try {
    res = await instance.post(`/articles`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return res?.message;
  }
  return res.data;
};

const patchArticle = async (id, data) => {
  let res = null;
  try {
    res = await instance.patch(`/articles/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return res?.message;
  }
  return res.data;
};

const deleteArticle = async (id) => {
  let res = null;
  try {
    res = await instance.delete(`/articles/${id}`);
  } catch (err) {
    console.log(err);
    return res?.message;
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