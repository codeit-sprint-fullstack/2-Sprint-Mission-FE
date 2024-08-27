import axios from "axios";

//공통
const instance = axios.create({
    baseURL:'https://sprint-mission-api.vercel.app'
});

//getArticleList : GET 메서드 사용{page,pageSize,keyword파라미터 이용}
export async function getArticleList(params={}){
    const {page= 1 ,pageSize=100,keyword=''}=params;

    return instance.get('/articles',{
    params:{page:page,
            pageSize:pageSize,
            keyword:keyword }
}).then(res=> res.data).catch(err=>err.response.data)

}

//getArticle() : GET 메서드를 사용

export async function getArticle(id){
    return instance.get(`/articles/${id}`)
    .then(res=> res.data).catch(err=>err.response.data)
 
}



//createArticle() : POST 메서드를 사용 {title,content,image 사용}

export async function createArticle(title, content, image){
    return instance.post('/articles',{
        title:title,
        content:content,
        image:image
    }).then(res=>res.data).catch(err=>err.response.data)
  
}

// patchArticle() : PATCH 메서드를 사용
export async function patchArticle(id,articleData){
    return instance.patch(`/articles/${id}`,articleData).then(res=>res.data)
    .catch(err=>err.response.data)
  
}

// deleteArticle() : DELETE 메서드를 사용해 주세요.
export async function deleteArticle(id){
    return instance.delete(`/articles/${id}`).then(res=>res.data).catch(err=>err.response.data)
    

    
    // .catch(e=>{
    //     const result ={
    //         message: e.response ? e.response.data.message :'데이터를 불러올 수 없습니다.'
    //         // e.response가 null,undefined -> undefined값이되고 -> data.message로 '데이터를 불러올수 없습니다.'를 출력함.
    //     };
    //     if(e.response && e.response.data.errors && e.response.data.errors.length >0){
    //         //위 조건식이 모두 true 일때 ,
    //         result.errors = e.response.data.errors //결과값의 errors 는 출력에 표시된다.
    //     }
    //     return result;// 둘중하나의 식을 충족하는 result 값을 출력함.
    // });
        
}
