const SERVER = 'https://sprint-mission-api.vercel.app/articles/';

function jsonIfOK(res) {
  // return res.ok ? res.json() : res;
  if (res.ok) return res.json();

  throw new Error(res.status + ' ' + res.statusText);
}

async function getArticleList(params = {}) {
  const url = new URL(SERVER);
  for (let key in params) {
    url.searchParams.append(key, params[key]);
  }

  // const res = await fetch(url);
  // const data = await res.json();

  return fetch(url)
    .then((res) => jsonIfOK(res))
    .catch((e) => console.log(e.message));
}

async function getArticle(id) {
  const url = new URL(SERVER + id);

  // const res = await fetch(url);
  // const data = await res.json();

  return fetch(url)
    .then((res) => jsonIfOK(res))
    .catch((e) => console.log(e.message));
}

async function createArticle(article) {
  const url = new URL(SERVER);

  // const res = await fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(article),
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // const data = await res.json();

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(article),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => jsonIfOK(res))
    .catch((e) => console.log(e.message));
}

async function patchArticle(id, article) {
  const url = new URL(SERVER + id);

  // const res = await fetch(url, {
  //   method: 'PATCH',
  //   body: JSON.stringify(article),
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // const data = await res.json();

  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(article),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => jsonIfOK(res))
    .catch((e) => console.log(e.message));
}

async function deleteArticle(id) {
  const url = new URL(SERVER + id);

  const res = await fetch(url, {
    method: 'DELETE'
  });
  return res.status;
}

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};
