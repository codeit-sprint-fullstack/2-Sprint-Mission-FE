import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import closeButton from "../imgFile/닫기X버튼.png";
import axios from "../lib/axios";
import imgInput from "../imgFile/imgInput.png";
import XButton from "../imgFile/ic_X.png";

export interface RegistrationValues {
  name: string;
  description: string;
  price: string;
  tags: string[];
  images: string[];
}

const INITIAL_VALUES: RegistrationValues = {
  name: "",
  description: "",
  price: "",
  tags: [],
  images: [],
};

function Registration() {
  const navigate = useNavigate();
  const [values, setValues] = useState<RegistrationValues>(INITIAL_VALUES);
  const [inputValue, setInputValue] = useState<string>(""); // 입력 값을 저장할 상태변수
  const [isTagAdd, setIsTagAdd] = useState<boolean>(false); // 태그 추가 여부 상태
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 참조 추가

  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      if (inputValue.trim() !== "") {
        setValues((prevValues) => ({
          ...prevValues,
          tags: [...prevValues.tags, inputValue.trim()],
        }));
        setInputValue("");
        setIsTagAdd(true);
      }
    }
  };

  const handleTagRemove = (tagToRemove: string): void => {
    setValues((prevValues) => {
      const updatedTags = prevValues.tags.filter((tag) => tag !== tagToRemove);
      if (updatedTags.length === 0) {
        setIsTagAdd(false);
      }
      return {
        ...prevValues,
        tags: updatedTags,
      };
    });
  };

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = Array.from(e.target.files || []);
    if (selectedImages.length + files.length > 1) {
      alert("이미지는 최대 1개까지 업로드할 수 있습니다."); // 경고 메시지
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

          const imageUrl = response.data.url; // 업로드된 이미지 URL 반환
          return imageUrl; // URL 반환
        })
      );
      setSelectedImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
      setValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, ...uploadedImageUrls], // URL로 업데이트
      }));
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleImageRemove = (imageToRemove: string): void => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter(
        (image) => image !== imageToRemove
      );
      return updatedImages;
    });
    setValues((prevValues) => {
      const updatedFiles = prevValues.images.filter(
        (url) => url !== imageToRemove
      );
      return {
        ...prevValues,
        images: updatedFiles,
      };
    });
  };

  const openFileDialog = (): void => {
    fileInputRef.current?.click(); // 파일 입력 클릭
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = {
      name: values.name,
      description: values.description,
      price: values.price,
      tags: values.tags,
      images: selectedImages, // 이미지 URL 사용
    };

    try {
      const newItem = await axios.post("/products", formData, {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 요청
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setValues(INITIAL_VALUES);
      setSelectedImages([]); // 제출 후 선택된 이미지 초기화
      navigate(`/items/${newItem.data.id}`);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form className="Main" onSubmit={handleSubmit}>
      <div className="PostProductMenu">
        <p> 상품등록하기</p>
        <button type="submit">등록</button>
      </div>
      <div className="RegImg">
        <p> 상품 이미지</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef} // ref 추가
          style={{ display: "none" }} // input 숨김
        />
        <div className="ImagePreview">
          <img
            src={imgInput}
            alt="imgInput"
            onClick={openFileDialog}
            className="addImg"
            style={{ cursor: "pointer" }}
          />
          {selectedImages.map((image, index) => (
            <div key={index} className="ImageItem">
              <img src={image} className="prevImg" alt={`preview-${index}`} />
              <img
                src={XButton}
                className="Xbutton"
                onClick={() => handleImageRemove(image)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="form">
        <p>상품명</p>
        <input
          className="ProductName"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="상품명을 입력해주세요"
        />
        <p>상품 소개</p>
        <textarea
          className="ProductDescript"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="상품 소개을 입력해주세요"
        />
        <p>판매가격</p>
        <input
          name="price"
          type="number"
          className="Price"
          value={values.price}
          onChange={handleChange}
          placeholder="판매 가격을 입력해주세요"
        />
        <p>태그</p>
        <input
          name="tags"
          className="Tags"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="태그를 입력해주세요"
        />
        <div className="TagName">
          {isTagAdd &&
            values.tags.map((tag, index) => (
              <div key={index} className="TagItem">
                <p>{tag}</p>
                <img
                  className="CloseButton"
                  src={closeButton}
                  alt="closebutton"
                  onClick={() => handleTagRemove(tag)}
                />
              </div>
            ))}
        </div>
      </div>
    </form>
  );
}

export default Registration;
