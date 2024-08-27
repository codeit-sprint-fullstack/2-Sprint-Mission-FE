const SERVER = 'https://sprint-mission-api.vercel.app/articles/';
const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
});

async function fetchData({
  url: requestUrl,
  method,
  body = {},
  params = {},
  options = {}
}) {
  if (!requestUrl || !method) throw new Error('URL and Method is required');
  if (!HTTP_METHODS[method]) throw new Error('Invalid HTTP method');

  const url = new URL(requestUrl);
  for (let key in params) {
    url.searchParams.append(key, params[key]);
  }

  let res;
  try {
    switch (method) {
      case HTTP_METHODS.GET:
      case HTTP_METHODS.DELETE:
        res = await fetch(url, { method, headers: options.headers });
        break;
      case HTTP_METHODS.POST:
      case HTTP_METHODS.PATCH:
        res = await fetch(url, {
          method,
          body: JSON.stringify(body),
          headers: options.headers
        });
        break;
    }

    if (!res.ok) throw new Error('Failed to fetch data');
    // DELETE 작업시 리턴
    if (res.status === 204) return res.status;

    return await res.json();
  } catch (err) {
    throw err;
  }
}

async function fetchGet(url, params, options) {
  return await fetchData({ url, method: HTTP_METHODS.GET, params, options });
}

async function fetchPost(
  url,
  body,
  options = { headers: { 'Content-Type': 'application/json' } }
) {
  return await fetchData({ url, method: HTTP_METHODS.POST, body, options });
}

async function fetchPatch(
  url,
  body,
  options = { headers: { 'Content-Type': 'application/json' } }
) {
  return await fetchData({ url, method: HTTP_METHODS.PATCH, body, options });
}

async function fetchDelete(url, options) {
  return await fetchData({ url, method: HTTP_METHODS.DELETE, options });
}

async function getArticleList(params = {}) {
  // const url = new URL(SERVER);
  // for (let key in params) {
  //   url.searchParams.append(key, params[key]);
  // }

  // const res = await fetch(url);
  // const data = await res.json();

  // return fetch(url)
  //   .then((res) => jsonIfOK(res))
  //   .catch((e) => console.log(e.message));
  return await fetchGet(SERVER, params);
}

async function getArticle(id) {
  // const url = new URL(SERVER + id);

  // const res = await fetch(url);
  // const data = await res.json();

  // return fetch(url)
  //   .then((res) => jsonIfOK(res))
  //   .catch((e) => console.log(e.message));
  return await fetchGet(SERVER + id);
}

async function createArticle(article) {
  // const url = new URL(SERVER);

  // const res = await fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(article),
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // const data = await res.json();

  // return fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(article),
  //   headers: { 'Content-Type': 'application/json' }
  // })
  //   .then((res) => jsonIfOK(res))
  //   .catch((e) => console.log(e.message));
  return await fetchPost(SERVER, article);
}

async function patchArticle(id, article) {
  // const url = new URL(SERVER + id);

  // const res = await fetch(url, {
  //   method: 'PATCH',
  //   body: JSON.stringify(article),
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // const data = await res.json();

  // return fetch(url, {
  //   method: 'PATCH',
  //   body: JSON.stringify(article),
  //   headers: { 'Content-Type': 'application/json' }
  // })
  //   .then((res) => jsonIfOK(res))
  //   .catch((e) => console.log(e.message));
  return await fetchPatch(SERVER + id, article);
}

async function deleteArticle(id) {
  // const url = new URL(SERVER + id);

  // const res = await fetch(url, {
  //   method: 'DELETE'
  // });
  // return res.status;
  return await fetchDelete(SERVER + id);
}

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};
