import { requestGet, requestPost, requestPatch, requestDelete } from "./api.js";

export async function getArticleList(params = {}) {
  try {
    const response = await requestGet(`/articles`, params);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function getArticle(id) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    const response = await requestGet(
      `/articles/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function createArticle(ArticleData) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    const response = await requestPost(`/articles`, ArticleData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("response:", response);

    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function patchArticle(id, ArticleData) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    const response = await requestPatch(`/articles/${id}`, ArticleData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  } catch (e) {
    console.error(e.message);
  }
}

export async function deleteArticle(id) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    const response = await requestDelete(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  } catch (e) {
    console.error(e.message);
  }
}

export async function createLike(id) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    const response = await requestPost(
      `/articles/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  } catch (e) {
    console.error(e.message);
  }
}

export async function deleteLike(id) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    const response = await requestDelete(`/articles/${id}/like`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  } catch (e) {
    console.error(e.message);
  }
}
