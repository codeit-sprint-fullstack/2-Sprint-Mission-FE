import axios from "axios"

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
});

instance.interceptors.response.use(
  (res) => res.data, // 성공 응답 시 데이터만 반환
  (error) => {
    let errorMessage = '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    if (error.response) {
      console.error('API 응답 에러:', error.response.data.message || error.response.statusText);
      errorMessage = error.response.data.message || error.response.statusText || '서버에서 오류가 발생했습니다.';
    } else if (error.request) {
      console.error('API 요청 실패:', error.request);
      errorMessage = '서버와 연결할 수 없습니다. 네트워크를 확인해주세요.';
    } else {
      console.error('API 요청 중 에러 발생:', error.message);
      errorMessage = error.message || '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    }
    // 직렬화 가능한 객체로 에러 전달
    return Promise.reject({ message: errorMessage });
  }
);

const signUp = async(data) => {
  try {
    /* 다른 도메인으로 리퀘스트를 보낼 때, 쿠키를 보내거나 받고 싶다면 withCredentials 사용 */
    //const res = await instance.post('/auth/signUp', data, { withCredentials: true });  // { email, nickname, password, passwordConfirmation }
    const res = await instance.post('/auth/signUp', data);  // { email, nickname, password, passwordConfirmation }
    return res;
  } catch (error) {
    //console.error(`${data.email} : 회원가입에 실패하였습니다.`);
    throw error;
  }
}

const signIn = async(data) => {
  try {
    //const res = await instance.post('/auth/signIn', data, { withCredentials: true });  // { email, password }
    const res = await instance.post('/auth/signIn', data);  // { email, password }
    return res;
  } catch (error) {
    //console.error(`${data.email} : 로그인에 실패하였습니다.`);
    throw error;
  }
}

export const authApi = {
  signUp,
  signIn,
}

