//.then() 메서드를 이용하여 비동기 처리
//.catch() 를 이용하여 오류 처리

//import axios
import axios from 'axios';

//axios instance
const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/articles',
});

//getArticleList() : GET
export function getArticleList(params = {}) {
  const { page = 1, pageSize = 100, keyword = '' } = params;

  return instance.get('/', {
    params: {
      page: page,
      pageSize: pageSize,
      keyword: keyword,
    }
  })
  .then(res => {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('에러가 발생했습니다.');
    }
    return res.data;
  })
  .catch(e => {console.log(`Error:${e.message}`)});
}

//getArticle() : GET 
export function getArticle(id){
  return instance.get(`/${id}`)
    .then(res => res.data)
    .catch(e => {console.log(`message: 존재하지 않습니다.`)});
}

//createArticle() : POST 
export function createArticle(title, content, image) {
  return instance.post(
    `/`, {
    'title': title,
    'content': content, 
    'image': image
    }
  )
    .then(res => res.data)
    .catch(e => {console.log(`Error:${e.message}`)});
}

//patchArticle() : PATCH 
export function patchArticle(id, title, content, image) {
  return instance.patch(
    `/${id}`, {
    'title': title,
    'content': content, 
    'image': image
    }
  )
  .then(res => res.data)
  .catch(e => {console.log(`Error:${e.message}`)});
}

// deleteArticle() : DELETE 
export function deleteArticle(id) {
  return instance.delete(`/${id}`)
  .then(res => res.data)
  .catch(e => {console.log(`message: 존재하지 않습니다.`)});
}