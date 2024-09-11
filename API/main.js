import { getArticleList,getArticle,createArticle,patchArticle,deleteArticle } from "./ArticleService.js";
import { getProductList,getProduct,createProduct,patchProduct,deleteProduct } from './ProductService.js';

//ArticleService 

//getArticleList
getArticleList().then(el =>console.log(el));//불러오기

//getArticle
getArticle(1).then(el => console.log(el)).catch(err=>console.log(err.response.data))//실패
getArticle(86).then(el => console.log(el));//성공

//creatArticle
createArticle(2).then(el => console.log(el));//실패
createArticle('string','string',"").then(el => console.log(el))//성공

//patchArticle
const patchSauce = {
    "title": "수정",
    "content": "patch",
    "image": "PATCH TEST-<HI,Codeit>"
  }
patchArticle(92,patchSauce).then(el => console.log(el));//성공
patchArticle(1).then(el => console.log(el));//실패

//deleteArticle
deleteArticle(2).then(el=>console.log(el));//존재하지 않을때


//ProductService
//getProductList
const data = await getProductList();
console.log(data);//성공만

//getProduct
const productId = await getProduct(1);
console.log(productId);//실패
const productId2 = await getProduct(9);
console.log(productId2);//성공

//createProduct
const postSauce={
    "name":"손흥민", 
    "description":"피규어 토트넘 No.7", 
    "price":777777, 
    "tags":["퀄리티 장난아니다."], 
    "images":["역시 손흥민"]
}
const productPost = await createProduct(postSauce);
console.log(productPost);//성공
const productPost2=await createProduct({price:"7777"})
console.log(productPost2)//실패

//patchProduct
const productPatch = await patchProduct(5,{name:"Lenovo NoteBook 2"})
console.log(productPatch)//성공
const productPatch2 = await patchProduct(1);
console.log(productPatch2)//실패

//deleteProduct
const productDelete = await deleteProduct(2)
console.log(productDelete)// 존재하지 않을때
