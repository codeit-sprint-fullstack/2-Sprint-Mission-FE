import { AxiosError } from 'axios';
import { post } from './axios';

export async function uploadImages(imageFormData: string) {
  try {
    const res = await post('/images/upload', imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return Array.isArray(res.data) ? res.data : [res.data];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        '이미지 업로드 중 오류 발생:',
        error.response ? error.response.data : error.message
      );
      throw error;
    } else {
      console.error('알 수 없는 오류 발생:', error);
      throw error;
    }
  }
}
