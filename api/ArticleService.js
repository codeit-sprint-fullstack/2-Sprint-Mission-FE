const API_URL = "https://sprint-mission-api.vercel.app/articles";

export function getArticleList(page = 1, pageSize = 100, keyword = "") {
  return fetch(
    `${API_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(
      keyword
    )}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`게시글 목록을 가져오는 데 실패했습니다.`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export function getArticle(articleId) {
  return fetch(`${API_URL}/${articleId}`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`게시글 상세 정보를 가져오는 데 실패했습니다.`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export function createArticle(title, content, image) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, image }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`게시글을 등록하는 데 실패했습니다.`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export function patchArticle(articleId, updateData) {
  return fetch(`${API_URL}/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`게시글을 수정하는 데 실패했습니다.`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export function deleteArticle(articleId) {
  return fetch(`${API_URL}/${articleId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`게시글을 삭제하는 데 실패했습니다.`);
      }
      return { message: "게시글이 성공적으로 삭제되었습니다." };
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

const article = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};

export default article;
