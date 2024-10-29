import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/",
});

export default instance;

// instance.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const { response, request, message } = error;
//     if (response) {
//       console.error(
//         "API 응답 에러:",
//         response.data.message || response.statusText
//       );
//       throw new Error(response.data.message || "서버에서 오류가 발생했습니다.");
//     }
//     if (request) {
//       console.error("API 요청 실패:", request);
//       throw new Error("서버와 연결할 수 없습니다. 네트워크를 확인해주세요.");
//     }
//     console.error("요청 중 에러 발생:", message);
//     throw new Error("요청 중 문제가 발생했습니다. 다시 시도해주세요.");
//   }
// );

// export const getArticleList = async ({
//   page,
//   pageSize,
//   orderBy = "recent",
// }) => {
//   try {
//     const res = await instance.get("/articles", {
//       params: { page, pageSize, orderBy },
//     });
//     return Array.isArray(res.list) ? res.list : [];
//   } catch (error) {
//     console.error("게시글 목록을 가져오는데 실패했습니다:", error);
//     throw error;
//   }
// };

// export const createArticle = async (data) => {
//   try {
//     return await instance.post("/articles", data);
//   } catch (error) {
//     console.error("게시글 생성에 실패했습니다:", error);
//     throw error;
//   }
// };

// export const getArticleById = async (id) => {
//   try {
//     return await instance.get(`/articles/${id}`);
//   } catch (error) {
//     console.error("게시글을 가져오는데 실패했습니다:", error);
//     throw error;
//   }
// };

// export const deleteArticle = async (id) => {
//   try {
//     await instance.delete(`/articles/${id}`);
//   } catch (error) {
//     console.error("게시글 삭제에 실패했습니다:", error);
//     throw error;
//   }
// };

// export const updateArticle = async (id, data) => {
//   try {
//     return await instance.patch(`/articles/${id}`, data);
//   } catch (error) {
//     console.error("게시글 수정에 실패했습니다:", error);
//     throw error;
//   }
// };

// export const createArticleComment = async (articleId, data) => {
//   try {
//     return await instance.post(`/articles/${articleId}/comments`, data);
//   } catch (error) {
//     console.error("댓글 등록에 실패했습니다:", error);
//     throw error;
//   }
// };

// export const deleteArticleComment = async (commentId) => {
//   try {
//     await instance.delete(`/articles/comments/${commentId}`);
//   } catch (error) {
//     console.error("댓글 삭제에 실패했습니다:", error);
//     throw error;
//   }
// };

// export const updateArticleComment = async (commentId, data) => {
//   try {
//     return await instance.patch(`/articles/comments/${commentId}`, data);
//   } catch (error) {
//     console.error("댓글 수정에 실패했습니다:", error);
//     throw error;
//   }
// };
