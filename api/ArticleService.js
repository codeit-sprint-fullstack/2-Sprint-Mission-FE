const ARTICLE_URL = 'https://sprint-mission-api.vercel.app/articles';

function getArticleList(page, pageSize, keyword = ''){
  const url = new URL(ARTICLE_URL);
  url.searchParams.append('page', page);
  url.searchParams.append('pageSize', pageSize);
  if(keyword){
    url.searchParams.append('keword', keyword);
  }

  fetch(url)
    .then(res => {
      if(!res.ok) {
        throw new Error(`Error fetching articles: ${res.statusText}`);
      }
      return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
} 

function getArticle(id) {
  const url = new URL(`${ARTICLE_URL}/${id}`);

  fetch(url)
    .then(res => {
      if(!res.ok){
        throw new Error(`Error fetching article ${id}: ${res.statusText}`)
      }
      return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

function createArticle(title, content, image) {
  const article = {
    title,
    content,
    image
  };

  fetch(ARTICLE_URL, {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(!res.ok){
      throw new Error(`Error creating article: ${res.statusText}`);
    }
    return res.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log(error));
}

function patchArticle(id, title, content, image){
  const article = {
    title,
    content,
    image
  }

  const url = new URL(`${ARTICLE_URL}/${id}`);

  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(res => {
    if(!res.ok){
      throw new Error(`Error updating article ${id}: ${res.statusText}`);
    }
    return res.json();
  })
  .then(data => console.log('updated data', data))
  .catch(error => console.log(error));
}

function deleteArticle(id){
  const url = new URL(`${ARTICLE_URL}/${id}`);

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(res => {
    if(!res.ok){
      throw new Error(`Error deleting article ${id}: ${res.statusText}`);
    }
    return res.text().then(text => {
      if(text){
        return JSON.parse(text);
      } else{
        return {};
      }
    })
  })
  .then(data => console.log(`delete data id: ${id} ->`, data))
  .catch(error => console.log(error));
}

export {ARTICLE_URL, getArticle, getArticleList, createArticle, patchArticle, deleteArticle};


