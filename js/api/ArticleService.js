const ARTICLE_API_URL = 'https://sprint-mission-api.vercel.app/articles';

// Article 목록 가져오기
export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  const fetchResult = fetch(`${ARTICLE_API_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`)
  .then(response => {
    if (!response.ok) {
      return response.text().then(erroMessage => {
        console.log('errorMessage',erroMessage);
        throw new Error(`Error: ${response.status}`);
      });
      /*
      const errorMessage = await response.text();
      console.log('errorMessage',errorMessage);
      throw new Error(`Error: ${response.status}`);
      */
    }
    return response.json();
  })
    .catch(error => console.error(error.message));
  return fetchResult;
}

// 특정 Article 가져오기
export function getArticle(id) {
  const fetchResult = fetch(`${ARTICLE_API_URL}/${id}`)
    .then(response => {
      if (!response.ok) {
        return response.text().then(erroMessage => {
          console.log('errorMessage',erroMessage);
          throw new Error(`Error: ${response.status}`);
        });
      }
      return response.json();
    })
    .catch(error => console.error(error.message));
  return fetchResult
}

// Article 생성
export function createArticle(articleData) {
  const fetchResult = fetch(ARTICLE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData)
  })
    .then(response => {
     if(!response.ok) {
      return response.text().then(errorMessage => {
        console.log('errorMessage', errorMessage);
        throw new Error(`Error: ${response.status}`);
      })
     }
      return response.json();
    })
    .catch(error => console.error(error.message));
  return fetchResult;
}

// 기존 Article 수정
export function patchArticle(id, data) {
  const fetchResult = fetch(`${ARTICLE_API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorMessage => {
          console.log('errorMessage',errorMessage);
          throw new Error(`Error: ${response.status}`);
        })
      }
      return response.json();
    })
    .catch(error => console.error(error.message));
  return fetchResult;
}

// Article 삭제
export function deleteArticle(id) {
  const fetchResult =  fetch(`${ARTICLE_API_URL}/${id}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorMessage => {
          console.log('errorMessage',errorMessage);
          throw new Error(`Error: ${response.status}`);
        })
      }
      return response.text();
    })
    .catch(error => console.error(error.message));
  return fetchResult;
}
