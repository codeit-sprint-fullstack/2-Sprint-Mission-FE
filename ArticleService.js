export const BASE_URL = "https://sprint-mission-api.vercel.app/articles";

function validatePositiveInteger(data) {
  if (Number.isInteger(data) && data > 0) {
    return true;
  } else {
    return false;
  }
}
export async function getArticleList(Params) {
  const { page = 1, pageSize = 10, keyword = "" } = Params || {};

  if (!validatePositiveInteger(page)) {
    throw new Error("page는 양의 정수를 기입해주세요.");
  }
  if (!validatePositiveInteger(pageSize)) {
    throw new Error("pageSize는 양의 정수를 기입해주세요.");
  }
  const options = {
    page,
    pageSize,
    keyword,
  };
  const url = new URL(`${BASE_URL}`);
  Object.keys(options).forEach((key) =>
    url.searchParams.append(key, options[key])
  );
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getArticle(id) {
  if (!validatePositiveInteger(id)) {
    throw new Error("id는 양의 정수만 기입해주세요.");
  }
  const url = new URL(`${BASE_URL}/${id}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`리퀘스트 실패: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

export async function createArticle(articleData) {
  //title,content,image
  const { title, content, image } = articleData || {};
  if (title === undefined) {
    throw new Error("title은 필수 항목입니다.");
  }
  if (content === undefined) {
    throw new Error("content는 필수 항목입니다.");
  }
  if (image === undefined) {
    throw new Error("image는 필수 항목입니다.");
  }
  const article = {
    title,
    content,
    image,
  };
  const url = new URL(`${BASE_URL}`);
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(article),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`리퀘스트실패: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}
export async function patchArticle(id, articleData) {
  if (!validatePositiveInteger(id)) {
    throw new Error("id는 양의 정수를 기입해야 합니다.");
  }
  const { title, content, image } = articleData;
  if (!(title || content || image)) {
    throw new Error("수정사항이 없습니다.");
  }
  const url = new URL(`${BASE_URL}/${id}`);
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(articleData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`리퀘스트 실패: ${res.status} ${res.statusText}`);
  }
  const data = res.json();
  return data;
}

export function deleteArticle(id) {
  if (!validatePositiveInteger(id)) {
    throw new Error("id는 양의 정수만 기입해주세요.");
  }
  const url = new URL(`${BASE_URL}/${id}`);
  fetch(url, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`게시글을 찾을 수 없음 ${res.status}`);
        } else {
          throw new Error(`리퀘스트실패: ${res.status} ${res.statusText}`);
        }
      } else {
        console.log("삭제완료");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
