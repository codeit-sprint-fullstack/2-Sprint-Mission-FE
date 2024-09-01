import axios from "axios";
//https://sprint-mission-api.vercel.app/products
const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/products",
  timeout: 3000,
});
function validateInteger(data) {
    const result = Number.isInteger(data);
    return result;
  }
  
function validatePositiveInteger(params, paramsName) {
    if (params === undefined) {
      if(paramsName ==="페이지"){
          params = 1;
      }else if(paramsName === "페이지 크기"){
        params = 10;
      }
    } else if (params <= 0) {
      const rangeError = new Error(`${paramsName}는(은) 0보다 커야합니다.`);
      throw rangeError;
    } else if (!validateInteger(params)) {
      const integerError = new Error(`${paramsName}는(은) 정수여야 합니다.`);
      throw integerError;
    }
    return params;
  }
//page = 1, pageSize = 100, keyword = ''
async function getProductList(params={}) {
    params.page = validatePositiveInteger(params.page, "페이지");
    params.pageSize = validatePositiveInteger(params.pageSize, "페이지 크기");
    const res = await instance.get('', { params });
    return res.data;
}
async function getProduct(id='') { //id는 숫자가 아닐수 있어서
    if(id !== ''){
        const res = await instance.get(`/${id}`);
        return res.data;
    }else{
        const error = new Error("id는 필수 기입 요소입니다.");
        throw error;
    }
}//name='', description='', price=0, tags=[], images=[], manufacturer=''
async function createProduct(productData) {
    console.log(productData);
    console.log("----------------");
    const requestBody ={
        name: productData.name,
        description: productData.description,
        price: productData.price,
        manufacturer: productData.manufacturer? productData.manufacturer : '',
        tags : productData.tags? productData.tags : [],
        images: productData.images? productData.images : [],
    };
    if(!productData.name || !productData.description || !productData.price){
        const error = new Error("이름, 가격, 설명은 필수 기재 사항입니다.");
        throw error;
    }
    productData.price = validatePositiveInteger(productData, "가격"); // 양의정수 유효성 검증
    const res = await instance.post('', requestBody);
    return res.data;
}
async function patchProduct(id, productData) {
    if(id){
        const res = await instance.patch(`/${id}`, productData);
        return res.data;
    }else{
        const error = new Error("id는 필수 기재 사항입니다.");
        throw error;
    }
    productData.price = validatePositiveInteger(productData.price, "가격");
}
async function deleteProduct(id){
    if(id){
        const res = await instance.delete(`/${id}`);
        return res.data;
    }else{
        const error = new Error("id는 필수 기재 사항입니다.");
        throw error;
    }
}
const productService ={
    validateInteger,
    validatePositiveInteger,
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct,
};
export default productService;