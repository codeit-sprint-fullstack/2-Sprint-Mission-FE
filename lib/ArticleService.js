import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/articles'
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('주의 : 에러 발생!');
    if (err.response.status >= 400 && err.response.status < 500) {
      console.log('4XX, 클라이언트 에러 응답');
    }
    throw err;
  }
);

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

// async function handleRequest(request) {
//   return request.then((res) => {
//     if (res.status >= 200 && res.status < 300) {
//       return res.data;
//     }
//   });
// }

// async function handleError(err) {
//   return `${err.response.status} 에러 발생!`;
// }

export async function getArticleList(page, pageSize, keyword) {
  const res = await requestGet('/', { params: { page, pageSize, keyword } });
  return res.data;
  // return handleRequest(requestGet('/', { params: { page, pageSize, keyword } }))
  //.catch(handleError);
}

export async function getArticle(id) {
  const res = await requestGet(`/${id}`);
  return res.data;
  // return handleRequest(requestGet(`/${id}`)).catch(handleError);
}

export async function createArticle(article) {
  const res = await requestPost('/', article);
  return res.data;
  // return handleRequest(requestPost('/', article)).catch(handleError);
}

export async function patchArticle(id, article) {
  const res = await requestPatch(`/${id}`, article);
  return res.data;
  // return handleRequest(requestPatch(`/${id}`, article)).catch(handleError);
}

export async function deleteArticle(id) {
  const res = await requestDelete(`/${id}`);
  return res.data;
  // return handleRequest(requestDelete(`/${id}`)).catch(handleError);
}

const articles = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};

export default articles;
