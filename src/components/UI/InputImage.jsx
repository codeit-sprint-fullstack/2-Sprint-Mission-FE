import React, { useState } from "react";
import styled from "styled-components";

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  button {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const FileInput = styled.input`
  display: block;
  margin-top: 16px;
`;

function InputImage({ images, setImages }) {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      alert("이미지는 최대 3개까지 등록 가능합니다.");
      return;
    }

    const newImages = files.slice(0, 3 - images.length);
    setImages((prevImages) => [...prevImages, ...newImages]);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };


  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  return (
    <div>
      <FileInput
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />

      {previewImages.length > 0 && (
        <ImagePreviewContainer>
          {previewImages.map((src, index) => (
            <ImagePreview key={index}>
              <img src={src} alt={`preview-${index}`} />
              <button onClick={() => handleRemoveImage(index)}>x</button>
            </ImagePreview>
          ))}
        </ImagePreviewContainer>
      )}
    </div>
  );
}

export default InputImage;