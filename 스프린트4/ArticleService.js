import axios from "axios";
const instance = axios.create({
    baseURL: 'https://sprint-mission-api.vercel.app',
    timeout: 3000,
})
function validateInteger(data) {
    const result = Number.isInteger(data);
    return result;
  }
  
function validatePositiveInteger(params, paramsName) {
 if (params <= 0) {
      const rangeError = new Error(`${paramsName}는(은) 0보다 커야합니다.`);
      throw rangeError;
    } else if (!validateInteger(params)) {
      const integerError = new Error(`${paramsName}는(은) 정수여야 합니다.`);
      throw integerError;
    }
  }
async function getArticleList(page=1,pageSize=10,keyword=''){
    try{
        validatePositiveInteger(page, "페이지");
        validatePositiveInteger(pageSize,"페이지 크기");
    }catch(error){
        console.error("에러발생");
        console.error(error.message);
    }
    const params={
        page,
        pageSize,
        keyword,
    };
    const data = await instance.get('/articles',{params}).then(res=> res.data)
    .catch(e=>{
        if(e.response){
            console.log(e.response.status);
            console.log(e.response.data);
        }else{
            console.log("리퀘스트 실패");
        }
    });
    return data;
}
async function getArticle(id) {
    try{
        if(id === undefined){
            const error = new Error("id는 필수 기재사항입니다.");
            throw error;
        }
    }catch(error){
        console.error("에러발생");
        console.error(error.message);
    }
    const data = await instance.get(`/articles/${id}`).then(res=>res.data)
    .catch(e=> {
        if(e.response){
            console.log(e.response.status);
            console.log(e.data);
        }else{
            console.log("리퀘스트 실패");
        }
    });
    return data;
}
async function createArticle(title,content,image) {
    const requestBody = {
        title,
        content,
        image,
    };
    const data = await instance.post('/articles', requestBody).then(res=> res.data)
    .catch(e => {
        if(e.response){
            console.log(e.response.status);
            console.log(e.response.data);
        }else{
            console.log("리퀘스트 실패");
        }
    });
    return data;
}
async function patchArticle(id, article){
    try{
        if(id === undefined){
            const error = new Error("id는 필수 기재사항입니다.");
            throw error;
        }
    }catch(error){
        console.error("에러발생");
        console.error(error.message);
    }
   
    const data = await instance.patch('/articles', article).then(res=> res.data)
    .catch(e=> {
        if(e.response){
            console.log(e.response.status);
            console.log(e.response.data);
        }else{
            console.log("리퀘스트 실패");
        }
    });
    return data;
}
async function deleteArticle(id){
    try{
        if(id === undefined){
            const error = new Error("id는 필수 기재사항입니다.");
            throw error;
        }
    }catch(error){
        console.error("에러발생");
        console.error(error.message);
    }
    const res = await instance.delete(`/articles/${id}`)
    .catch(e=>{
        if(e.response){
            console.log(e.response.status);
            console.log(e.response.data);
        }else{
            console.log("리퀘스트 실패");
        }
    });
    return res.data;
}   
const articleService = {
    validateInteger,
    validatePositiveInteger,
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
};
export default articleService;