import { useRef, useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import closeButton from "../imgFile/닫기X버튼.png";
import axios from "../lib/axios.js";
import imgInput from "../imgFile/imgInput.png";
import XButton from "../imgFile/ic_X.png";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  tags: [],
  images: [], // 빈 배열 추가
};

function Registration() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [inputValue, setInputValue] = useState(""); // 입력 값을 저장할 상태변수
  const [isTagAdd, setIsTagAdd] = useState(false); //태그 추가 여부 상태
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null); // 파일 입력 참조 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); //폼제출방지
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

  const handleTagRemove = (tagToRemove) => {
    setValues((prevValues) => {
      const updateTags = prevValues.tags.filter((tag) => tag !== tagToRemove);
      if (updateTags.length === 0) {
        setIsTagAdd(false);
      }
      return {
        ...prevValues,
        tags: updateTags,
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 3) {
      alert("이미지는 최대 3개까지 업로드할 수 있습니다."); // 경고 메시지
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    setValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, ...files],
    }));
  };

  const handleImageRemove = (imageToRemove) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter(
        (image) => image !== imageToRemove
      );
      return updatedImages;
    });
    setValues((prevValues) => {
      const updatedFiles = prevValues.images.filter((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return imageUrl !== imageToRemove;
      });
      return {
        ...prevValues,
        images: updatedFiles,
      };
    });
  };

  const openFileDialog = () => {
    fileInputRef.current.click(); // 파일 입력 클릭
  };

  const accessToken = localStorage.getItem("accessToken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    //JSON 데이터로 변환
    const formData = {
      name: values.name,
      description: values.description,
      price: values.price,
      tags: values.tags,
      images: [], // 빈 배열 추가
    };
    try {
      const newItem = await axios.post(`/products`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // 데이터베이스에 전송
      setValues(INITIAL_VALUES); // 초기값으로 리셋
      navigate(`/items/${newItem.data.id}`); // 페이지 이동
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
            style={{ cursor: "pointer" }}
          />
          {selectedImages.map((image, index) => (
            <div key={index} className="ImageItem">
              <img src={image} alt={`preview-${index}`} />
              <img src={XButton} onClick={() => handleImageRemove(image)} />
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
