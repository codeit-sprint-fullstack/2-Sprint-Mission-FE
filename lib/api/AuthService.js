import instance from './axiosInstance';

// 회원가입
const signUp = async (data) => {
  try {
    const res = await instance.post('/auth/signUp', data);
    return res;
  } catch (error) {
    console.error("회원가입 요청 중 오류 발생:", error);
    throw error;
  }
};

// 로그인
const signIn = async (data) => {
  try {
    const res = await instance.post('/auth/signIn', data);
    const { accessToken, refreshToken } = res;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    return res;
  } catch (error) {
    console.error("로그인 요청 중 오류 발생:", error);
    throw error;
  }
};

// 사용자 정보 가져오기
const getUser = async () => {
  try {
    const res = await instance.get('/users/me');
    return res;
  } catch (error) {
    // 401 에러일 경우에는 오류를 남기지 않고 null 반환
    if (error.response && error.response.status === 401) {
      console.warn("인증이 필요합니다. 로그인되지 않은 상태입니다.");
      return null; // 401 에러 시 null 반환
    }
    console.error("사용자 정보 가져오기 중 오류 발생:", error);
    throw error;
  }
};

// 로그아웃
const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const authApi = {
  signUp,
  signIn,
  getUser,
  logout,
};
