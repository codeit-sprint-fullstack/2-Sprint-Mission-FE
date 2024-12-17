export async function uploadImages(imageFormData) {
  try {
    const res = await post('/images/upload', imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return Array.isArray(res.data) ? res.data : [res.data];
  } catch (error) {
    console.error(
      '이미지 업로드 에러 상세:',
      error.response?.data || error.message
    );
    throw error;
  }
}
