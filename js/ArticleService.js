import axios from 'axios';

const ARTICLE_URL= 'https://sprint-mission-api.vercel.app/articles';

async function getArticleList(page, pageSize, keyword){ //GET
    return axios.get(ARTICLE_URL, {
        params: {
            page,
            pageSize,
            keyword
        }
    }).then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            console.error(res.status);
        }
    }).catch(e => {
        console.error(e);
    });
};

async function getArticle(id){ //GET
    return axios.get(`${ARTICLE_URL}/${id}`)
    .then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            console.error(res.status);
        }
    }).catch(e => {
        console.error(e);
    });
};

async function createArticle(title, content, image){ //POST
    return axios.post(ARTICLE_URL, {
        title,
        content,
        image
    }).then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            console.error(res.status);
        }
    }).catch(e => {
        console.error(e);
    });
};

async function patchArticle(id, data){ //PATCH
    return axios.patch(`${ARTICLE_URL}/${id}`, data)
    .then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            console.error(res.status);
        }
    }).catch(e => {
        console.error(e);
    });
};

async function deleteArticle(id){ //DELETE
    return axios.delete(`${ARTICLE_URL}/${id}`)
    .then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            console.error(res.status);
        }
    }).catch(e => {
        console.error(e);
    });
};

export default {
    getArticleList, 
    getArticle, 
    createArticle, 
    patchArticle, 
    deleteArticle
};