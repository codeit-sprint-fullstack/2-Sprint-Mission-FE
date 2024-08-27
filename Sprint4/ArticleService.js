import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/articles'
});

function requestGet(url, params) {
  return instance.get(url, params);
}

function requestPost(url, body) {
  return instance.post(url, body);
}

function requestPatch(url, body) {
  return instance.patch(url, body);
}

function requestDelete(url) {
  return instance.delete(url);
}

export async function getArticleList(page, pageSize, keyword) {
  return requestGet('/', {
    params: {
      page,
      pageSize,
      keyword
    }
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
    })
    .catch((err) => {
      return `${err.response.status} 에러 발생!`;
    });
}

export async function getArticle(id) {
  return requestGet(`/${id}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
    })
    .catch((err) => {
      return `${err.response.status} 에러 발생!`;
    });
}

export async function createArticle(article) {
  return requestPost('/', article)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
    })
    .catch((err) => {
      return `${err.response.status} 에러 발생!`;
    });
}

export async function patchArticle(id, article) {
  return requestPatch(`/${id}`, article)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
    })
    .catch((err) => {
      return `${err.response.status} 에러 발생!`;
    });
}

export async function deleteArticle(id) {
  return requestDelete(`/${id}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.status;
      }
    })
    .catch((err) => {
      return `${err.response.status} 에러 발생!`;
    });
}

const articles = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};

export default articles;
