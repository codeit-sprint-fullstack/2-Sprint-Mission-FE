
export function getArticleList(page = 1, pageSize = 1, keyword = '') {
    return fetch(`https://sprint-mission-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
        .then((response) => {
            return response.json();
        })
        .catch((error) => console.log('Error:', error));
};
  
export function getArticle(id) {
    return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`)
        .then((response) => {
            return response.json();
        })
        .catch((error) => console.log('Error:', error));
};
  
export function createArticle(title, content, image) {
    return fetch('https://sprint-mission-api.vercel.app/articles', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image }),
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => console.log('Error:', error));
};

export function patchArticle(id, data) {
    return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => console.log('Error:', error));
};

export function deleteArticle(id) {
    return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
        method: 'DELETE',
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => console.log('Error:', error));
};