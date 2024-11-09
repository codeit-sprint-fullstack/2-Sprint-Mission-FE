import axios from "axios";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // JWT 만료 에러 확인
//       if (
//         error.response.status === 401 &&
//         error.response.data.message === "jwt expired"
//       ) {
//         // 로그인 페이지로 리디렉션
//         const navigate = useNavigate();
//         navigate("/login"); // 로그인 페이지 경로로 이동
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
