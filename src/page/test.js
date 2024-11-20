export default function Test() {
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 3) {
      alert("이미지는 최대 3개까지 업로드할 수 있습니다."); // 경고 메시지
      return;
    }
    try {
      const uploadedImageUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file); // 이미지 파일 추가

          // 이미지 업로드 요청
          const response = await axios.post("/images/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          return response.data.url; // 업로드된 이미지 URL 반환
        })
      );

      setSelectedImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
      setValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, ...files],
      }));
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };
  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
    </>
  );
}
