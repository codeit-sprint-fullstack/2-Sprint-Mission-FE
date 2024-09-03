const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT'
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
    // eslint-disable-next-line default-case
    switch (method) {
      case HTTP_METHODS.GET:
      case HTTP_METHODS.DELETE:
        res = await fetch(url, { method });
        break;
      case HTTP_METHODS.POST:
      case HTTP_METHODS.PATCH:
      case HTTP_METHODS.PUT:
        const reqBody =
          options?.headers['Content-Type'] === 'application/json'
            ? JSON.stringify(body)
            : body;
        res = await fetch(url, {
          method,
          body: reqBody
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

async function fetchPut(
  url,
  body,
  options = { headers: { 'Content-Type': 'application/json' } }
) {
  return await fetchData({ url, method: HTTP_METHODS.PUT, body, options });
}

async function fetchDelete(url, options) {
  return await fetchData({ url, method: HTTP_METHODS.DELETE, options });
}

export { fetchGet, fetchPost, fetchPatch, fetchDelete, fetchPut };
