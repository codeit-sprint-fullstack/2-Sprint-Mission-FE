export async function getProductList() {
    try {
        const res = await fetch('https://sprint-mission-api.vercel.app/products?page=1&pageSize=1&keyword=');
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getProduct(id) {
    try {
        const res = await fetch(`https://sprint-mission-api.vercel.app/products/${id}`);
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function createproduct(name, description, price, tags, images) {
    try {
        const res = await fetch('https://sprint-mission-api.vercel.app/products', {
            method: POST,
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, description, price, tags, images}),
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getProductList(id, data) {
    try {
        const res = await fetch(`https://sprint-mission-api.vercel.app/products/${id}`, {
            method: patchArticle,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct() {
    try {
        const res = await fetch('https://sprint-mission-api.vercel.app/products', {
            method: DELETE,
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}
