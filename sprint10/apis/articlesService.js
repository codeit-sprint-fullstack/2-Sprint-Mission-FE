import instance from "./instance.js";

async function getArticles(params = { page: 1, pageSize: 10, sort: "recent", keyword: "" }) {
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

async function getArticleWithIdComments(id) {
	try {
		const article = await instance.get(`/articles/${id}/comments`);
		return article.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function patchArticleComment(commentId, articleId, { content }) {
	try {
		const resp = await instance.patch(`/articles/${articleId}/comments/${commentId}`, { content });
		return resp.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function deleteArticleComment(commentId, articleId) {
	try {
		const resp = await instance.delete(`/articles/${articleId}/comments/${commentId}`);
		return resp.data;
	}
	catch (err) {
		return err?.response?.data || err;
	}
}

async function postArticle(data = { title: "", content: "", favoriteCount: 0 }) {
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
		const resp = await instance.post(`/articles/${articleId}/comments`, data);
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
	getArticleWithIdComments,
	patchArticleComment,
	deleteArticleComment,
	postArticleComment,
};
