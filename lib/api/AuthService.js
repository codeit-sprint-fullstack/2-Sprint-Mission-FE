import axios from "axios"

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
});

instance.interceptors.response.use(
  (res) => res, 
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
    // error.message를 사용자 친화적인 메시지로 재정의하여 전달
    error.message = errorMessage;
    return Promise.reject(error);     // 수정된 에러 객체를 반환
  }
);

const handleResponse = async (request) => {
  try {
    const res = await request();
    return res.data;
  } catch (error) {
    // console.error(
    //   `handleResponse: ${error.message ? `'${error.message}'` : '요청 처리 중 문제가 발생했습니다.'}`
    // );
    throw error;
  }
}

const signUp = async(data) => 
  handleResponse(() => instance.post('/auth/signUp', data));  // { email, nickname, password, passwordConfirmation }

const signIn = async(data) =>
  handleResponse(async () => {
    const res = await instance.post('/auth/signIn', data);
    const accessToken = res.data.accessToken;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    return res;
  });


export const authApi = {
  signUp,
  signIn,
}