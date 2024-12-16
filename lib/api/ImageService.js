import { post } from './axios';

export async function uploadImage(file) {
  // FormData 객체를 생성하여 파일을 담습니다.
  const formData = new FormData();
  formData.append('image', file); // 'image'는 서버에서 받는 필드명

  try {
    // 서버로 POST 요청을 보냅니다. (업로드할 파일을 FormData로 전송)
    const res = await post('/images/upload', formData, true); // true는 인증 토큰이 필요할 경우
    console.log(res.data); // 응답된 데이터 확인

    // 응답에서 이미지 URL을 반환
    return res.data.url; // 서버에서 반환한 이미지 URL
  } catch (err) {
    console.error('이미지 업로드 실패:', err);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
}
