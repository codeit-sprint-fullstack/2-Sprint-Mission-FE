const PRODUCT_URL = 'https://sprint-mission-api.vercel.app/products';

async function getProductList(page = 1, pageSize = 100, keyword =''){  //GET (default 값)
    try {
        const response = await fetch (`${PRODUCT_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
        
        return await response.json();
    }

    catch(error) {
        console.error(error);
    }
};

async function getProduct(id){ //GET
    try {
        const response = await fetch(`${PRODUCT_URL}/${id}`);

        return await response.json();
    }

    catch(error) {
        console.error(error);
    }
};

async function createProduct({name, description, price, manufacturer, tags, images}){ //POST
    try {
        const response = await fetch(PRODUCT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, description, price, tags, images })

        })

        return await response.json();
    }

    catch(error) {
        console.error(error);
    }
};

async function patchProduct(id, data){ //PATCH
    try {
        const response = await fetch(`${PRODUCT_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        });
        return response.json();
    }

    catch(error) {
        console.error(error);
    }
};

async function deleteProduct(id){ //DELETE
    try {
        const response = await fetch(`${PRODUCT_URL}/${id}`, {
            method: 'DELETE' 
        });
        return 'product deledted successfully!'
    }

    catch(error) {
        console.error(error);
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