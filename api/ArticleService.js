const baseUrl = 'https://sprint-mission-api.vercel.app/articles/articles';
const header = {
  'Content-Type': 'application/json',
}

export async function getArticleList(page, pageSize, keyword) {
  try {
    const url = new URL(baseUrl);
    const params = { page, pageSize, keyword };

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.append(key, params[key]);
      }
    });

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('데이터를 불러오지 못했습니다.');
    }
    
    const data = await res.json();
    return data;
    
  } catch(e) {
    console.log(e.message);
  }
}

export async function getArticle(id) {
  try {
    const article = await fetch(`${baseUrl}/${id}`);

    if (!article.ok) {
      throw new Error('데이터를 불러오지 못했습니다.');
    }

    const data = await article.json();
    return data;
  } catch(e) {
    console.log(e.message);
  }
}

export async function createArticle(articleData) {
  const errors = [];

  function ValidateData(key, type) {
    if (typeof articleData[key] !== type) {
      const currentType = typeof articleData[key];
      errors.push({
        path: key,
        message: `Expected a(an) ${type}, but received: ${currentType}`
      })
    }
  }

  ValidateData('title', 'string');
  ValidateData('content', 'string');
  ValidateData('image', 'string');

  if (errors.length > 0) {
    return {
      message: '유효성 검사 오류입니다.',
      errors: errors
    }
  }

  try {
    const article = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(articleData),
      headers: header,
  });

  if (!article.ok) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }

  const data = await article.json();
  return data;
  } catch(e) {
    console.log(e.message);
  }
  
}

export async function patchArticle(id, articleData) {
  try {
    const article = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(articleData),
      headers: header,
  });

  if (!article.ok) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }

  const data = await article.json();
  return data;
  } catch(e) {
    console.log(e.message);
  }
}

export async function deleteArticle(id) {
  try {
    const article = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    });

    if (!article.ok) {
      throw new Error('데이터를 불러오지 못했습니다.');
    } else if (article.status === 204) {
      return `${id}번 글이 정상적으로 삭제되었습니다.`;
    }
  } catch(e) {
    console.log(e.message);
  }
}
