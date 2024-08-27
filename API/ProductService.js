//공통
const baseURL = 'https://sprint-mission-api.vercel.app/products/'

// getProductList() : GET 메서드를 사용, page, pageSize, keyword 쿼리 파라미터를 이용
export async function getProductList(params={}){
    //params default 값
    const paramsDefault ={page:1,pageSize:100,keyword:''};
    //params 에 값이 주어졌을때(병합)
    const paramsFinal ={...paramsDefault,...params};
    //params 에 값이 주어지면 paramsDefault 값을 덮음.
    
    const url = new URL(baseURL);
    Object.keys(paramsFinal).forEach((key)=>
        url.searchParams.append(key, paramsFinal[key])
    );
    const res = await fetch(url);
    const data = await res.json()
    return data;
}
// getProduct() : GET 메서드를 사용
export async function getProduct(id){
    try{
    const res = await fetch(baseURL+`${id}`);
    const data = await res.json();
    return data;
} catch(err) {
    if(!res.ok){
    return err.response.data}
}
}
// createProduct() : POST 메서드를 사용,request body에 name, description, price, tags, images 를 포함
export async function createProduct(productData){
   
   try{
    const res = await fetch(baseURL,{
        method:'POST',
        body: JSON.stringify(productData),
        headers:{
            'Content-Type':'application/json',
        },
    });
    const data = await res.json();
    return data;
} catch (err) {
    if(!res.ok){
        return err.response.data;
    }
}
}

// patchProduct() : PATCH 메서드를 사용
export async function patchProduct(id,productData){
    try{
    const res= await fetch(baseURL+`${id}`,{
        method:'PATCH',
        body:JSON.stringify(productData),
        headers:{
            'Content-Type':'application/json',
        },   
    });

    const data = await res.json();
    return data;
}catch(err) {
    if(!res.ok){
    return err.response.data}
}
}

// deleteProduct() : DELETE 메서드를 사용
export async function deleteProduct(id){

    try{
    const res = await fetch(baseURL+`${id}`,{
        method:'DELETE'
    });
    const data = await res.json();
    return data;
    }catch(err) {
        if(!res.ok){
        return err.response.data}
    }
}
