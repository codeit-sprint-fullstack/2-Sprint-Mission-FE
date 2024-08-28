import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/articles'
});

async function requestGet(url, params) {
  return instance.get(url, params);
}

async function requestPost(url, body) {
  return instance.post(url, body);
}

async function requestPatch(url, body) {
  return instance.patch(url, body);
}

async function requestDelete(url) {
  return instance.delete(url);
}

async function handleRequest(request) {
  return request.then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  });
}

async function handleError(err) {
  return `${err.response.status} 에러 발생!`;
}

export async function getArticleList(page, pageSize, keyword) {
  return handleRequest(
    requestGet('/', { params: { page, pageSize, keyword } })
  ).catch(handleError);
}

export async function getArticle(id) {
  return handleRequest(requestGet(`/${id}`)).catch(handleError);
}

export async function createArticle(article) {
  return handleRequest(requestPost('/', article)).catch(handleError);
}

export async function patchArticle(id, article) {
  return handleRequest(requestPatch(`/${id}`, article)).catch(handleError);
}

export async function deleteArticle(id) {
  return handleRequest(requestDelete(`/${id}`)).catch(handleError);
}

const articles = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};

export default articles;
