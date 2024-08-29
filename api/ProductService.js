const PRODUCT_URL = 'https://sprint-mission-api.vercel.app/products'; 

async function getProductList(page, pageSize, keyword = '') {
  const url = new URL(PRODUCT_URL);
  url.searchParams.append('page', page);
  url.searchParams.append('pageSize', pageSize);
  if(keyword){
    url.searchParams.append('keyword', keyword);
  }

  try{
    const res = await fetch(url);
    if(!res.ok){
      throw new Error(`Error fetching products: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch(err) {
      console.log(err);
  }
}

async function getProduct(id) {
  const url = `${PRODUCT_URL}/${id}`;

  try{
    const res = await fetch(url);
    if(!res.ok){
      throw new Error(`Error fetching product: ${res.statusText}`);
    } 
    const data = await res.json()
    console.log(data);
    return data;
  } catch(err){
    console.log(err);
  }
}

async function createProduct(name, description, price, tags, images){
  const product = {name, description, price, tags, images};

  try{
    const res = await fetch(PRODUCT_URL, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!res.ok){
      throw new Error(`Error creating product: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data); 
    return data;
  } catch(err){
    console.log(err);
  }
}


async function patchProduct(id, name, description, price, tags, images){
  try{
    const product = {name, description, price, tags, images};

    const url = `${PRODUCT_URL}/${id}`;

    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!res.ok){
      throw new Error(`Error patching product: ${res.statusType}`);
    }
    const data = await res.json();
    console.log('updated data', data);
    return data;
  } catch(err){
    console.log(err);
  }
}

async function deleteProduct(id){
  const url = `${PRODUCT_URL}/${id}`;

  try{
    const res = await fetch(url,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    });
    if(!res.ok){
      throw new Error('')
    }
    const text= await res.text();
    const data = text ? JSON.Parse(text) : {};
    console.log(`deleted data id: ${id} ->`, data);
    return data;
  } catch(err){
    console.log(err);
  }
}

export {PRODUCT_URL, getProductList, getProduct, createProduct, patchProduct, deleteProduct};
