//axios 도전
import axios from 'axios';

const PRODUCT_URL = 'https://sprint-mission-api.vercel.app/products';

async function getProductList(page, pageSize , keyword){  //GET
    try {
       const res = await axios.get(PRODUCT_URL,{
        params:{
            page,
            pageSize,
            keyword
        }
       })
       return res.data;
    } 
    catch(e) {
        console.error(`${e.message}`);
    }
};

async function getProduct(id){ //GET
    try {
        const res = await axios.get(`${PRODUCT_URL}/${id}`);

        return res.data;
    }
    catch(e) {
        console.error(`${e.message}`);
    }
};

async function createProduct({name, description, price, manufacturer, tags, images}){ //POST
    try {
        const res = await axios.post(PRODUCT_URL, {
            name,
            description,
            price,
            tags,
            images
        })
        return res.data;
    }
    catch(e) {
        console.error(`${e.message}`);
    }
}; //제조사는 어떻게 해결해야하나...

async function patchProduct(id, data){ //PATCH
    try {
        const res = await axios.patch(`${PRODUCT_URL}/${id}`, data);
        return res.data;
    }
    catch(e) {
        console.error(`${e.message}`);
    }
};

async function deleteProduct(id){ //DELETE
    try {
        const res = await axios.delete(`${PRODUCT_URL}/${id}`);
        return res.data;
    }
    catch(e) {
        console.error(`${e.message}`);
    }
};


const products = {
    getProductList, 
    getProduct, 
    createProduct, 
    patchProduct, 
    deleteProduct
};

export default products;