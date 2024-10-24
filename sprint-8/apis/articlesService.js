import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3000`
});

async function getArticles(params = { skip: 0, take: 10, sort: "recent", keyword: "" }) {
	try {
		const articles = await instance.get(`/articles`, {params});
		return articles.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function getArticleWithId(id) {
	try {
		const article = await instance.get(`/articles/${id}`);
		return article.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function postArticle(data = { title: "", content: "", favoriteCount: 0, authorId: "86f32cda-cc20-49e5-a1c8-a69ff98e5ebf" }) {
	try {
		const resp = await instance.post(`/articles`, data);
		return resp.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

// * = {images, tags, price, description, name}
async function patchArticleWithId(id, data) {
	try {
		const resp = await instance.patch(`/articles/${id}`, data);
		return resp.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function deleteArticleWithId(id) {
	try {
		const resp = await instance.delete(`/articles/${id}`);
		return resp.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function postArticleComment(articleId, data = { commenterId: "", content: "" }) {
	try {
		const resp = await instance.post(`/articles/${articleId}/comment`, data);
		return resp.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function patchArticleComment(articleId, commentId, data = { content: "" }) {
	try {
		const resp = await instance.patch(`/articles/${articleId}/comment/${commentId}`, data);
		return resp.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function deleteArticleComment(articleId, commentId) {
	try {
		const resp = await instance.delete(`/articles/${articleId}/comment/${commentId}`);
		return resp.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

export {
	getArticles,
	getArticleWithId,
	postArticle,
	patchArticleWithId,
	deleteArticleWithId,
	postArticleComment,
	patchArticleComment,
	deleteArticleComment
};