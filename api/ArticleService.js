export async function getArticleList(page, pageSize, keyword) {
  const url = new URL('https://sprint-mission-api.vercel.app/articles');
  const params = { page, pageSize, keyword };

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getArticle(id) {
  const article = await fetch(`https://sprint-mission-api.vercel.app/articles/${id}`);
  const data = await article.json();
  return data;
}

export async function createArticle(articleData) {
  const article = await fetch(`https://sprint-mission-api.vercel.app/articles`, {
    method: 'POST',
    body: JSON.stringify(articleData),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await article.json();
  return data;
}

export async function patchArticle(id, articleData) {
  const article = await fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(articleData),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await article.json();
  return data;
}

export async function deleteArticle(id) {
  const article = await fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
    method: 'DELETE',
  });
  
}
