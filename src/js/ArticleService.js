const SERVER = 'https://sprint-mission-api.vercel.app/articles/';

async function fetchData(url, method, body = {}, params = {}) {
  const server = new URL(url);
  for (let key in params) {
    server.searchParams.append(key, params[key]);
  }

  const res =
    method === 'POST' || method === 'PATCH'
      ? fetch(server, {
          method,
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' }
        })
      : fetch(server);

  const data = await res
    .then((r) => {
      if (r.status === 204) return r.status;
      else if (r.ok) return r.json();

      throw new Error(r.status + ' ' + r.statusText);
    })
    .catch((e) => console.log(e.message));

  // const res = await fetch(server, {
  //   method,
  //   body: JSON.stringify(body),
  //   headers: { 'Content-Type': 'application/json' }
  // })
  //   .then((r) => {
  //     if (r.ok) return r.json();

  //     throw new Error(r.status + ' ' + r.statusText);
  //   })
  //   .catch((e) => console.log(e.message));
  return data;
}

// function jsonIfOK(res) {
//   // return res.ok ? res.json() : res;
//   if (res.ok) return res.json();

//   throw new Error(res.status + ' ' + res.statusText);
// }

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
  return fetchData(SERVER, 'GET', {}, params);
}

async function getArticle(id) {
  // const url = new URL(SERVER + id);

  // const res = await fetch(url);
  // const data = await res.json();

  // return fetch(url)
  //   .then((res) => jsonIfOK(res))
  //   .catch((e) => console.log(e.message));
  return fetchData(SERVER + id, 'GET');
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
  return fetchData(SERVER, 'POST', article);
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
  return fetchData(SERVER + id, 'PATCH', article);
}

async function deleteArticle(id) {
  // const url = new URL(SERVER + id);

  // const res = await fetch(url, {
  //   method: 'DELETE'
  // });
  // return res.status;
  return fetchData(SERVER + id, 'DELETE');
}

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};
