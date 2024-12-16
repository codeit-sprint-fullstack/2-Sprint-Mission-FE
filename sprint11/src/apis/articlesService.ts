import instance from "./instance.ts";

async function getArticles(
	params = { page: 1, pageSize: 10, sort: "recent", keyword: "" },
) {
	try {
		const articles = await instance.get(`/articles`, { params });
		return articles.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function getArticleWithId(id: string) {
	try {
		const article = await instance.get(`/articles/${id}`);
		return article.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function getArticleWithIdComments(id: string) {
	try {
		const article = await instance.get(`/articles/${id}/comments`);
		return article.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function patchArticleComment(
	commentId: string,
	articleId: string,
	{ content }: { content: string },
) {
	try {
		const resp = await instance.patch(
			`/articles/${articleId}/comments/${commentId}`,
			{ content },
		);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function deleteArticleComment(commentId: string, articleId: string) {
	try {
		const resp = await instance.delete(
			`/articles/${articleId}/comments/${commentId}`,
		);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function postArticle(formData) {
	try {
		const resp = await instance.post(`/articles`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

// * = {images, tags, price, description, name}
async function patchArticleWithId(id: string, formData) {
	try {
		const resp = await instance.patch(`/articles/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function deleteArticleWithId(id: string) {
	try {
		const resp = await instance.delete(`/articles/${id}`);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function postArticleWithIdComment(articleId, data = { content: "" }) {
	try {
		const resp = await instance.post(`/articles/${articleId}/comments`, data);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function likeArticleWithId(articleId) {
	try {
		const resp = await instance.post(`/articles/${articleId}/favorite`);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function unlikeArticleWithId(articleId) {
	try {
		const resp = await instance.delete(`/articles/${articleId}/favorite`);
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

async function uploadImages(formData) {
	try {
		const resp = await instance.post(`/images`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return resp.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}

export {
	deleteArticleComment,
	deleteArticleWithId,
	getArticles,
	getArticleWithId,
	getArticleWithIdComments,
	likeArticleWithId,
	patchArticleComment,
	patchArticleWithId,
	postArticle,
	postArticleWithIdComment,
	unlikeArticleWithId,
	uploadImages,
};
