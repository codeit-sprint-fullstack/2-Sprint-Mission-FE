import instance from './apiService';

const handleResponse = async (request) => {
  try {
    const res = await request();
    return res;
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