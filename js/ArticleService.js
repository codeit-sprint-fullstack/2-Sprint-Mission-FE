const ARTICLE_URL = 'https://sprint-mission-api.vercel.app/articles';

async function getArticleList(page = 1, pageSize = 100, keyword =''){ //GET
    return fetch (`${ARTICLE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
        .then(response => response.json())
        .catch(error => console.error(error))
};

async function getArticle(id){ //GET
    return fetch (`${ARTICLE_URL}/${id}`)
    .then(response => response.json())
    .catch(error => console.error(error))
};

async function createArticle(title, content, image){ //POST
    return fetch(ARTICLE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, image })
    })
    .then(response => response.json())
    .catch(error => console.error(error))
};

async function patchArticle(id, data){ //PATCH
    return fetch(`${ARTICLE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.error(error))
};

async function deleteArticle(id){ //DELETE
    return fetch(`${ARTICLE_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => 'article deledted successfully!')
};


const articles = {
    getArticleList, 
    getArticle, 
    createArticle, 
    patchArticle, 
    deleteArticle
};

export default articles;