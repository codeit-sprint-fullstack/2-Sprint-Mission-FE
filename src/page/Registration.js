import { useState } from "react";
import "./Registration.css";
import { createItemList } from "../component/PandaApi.js";
import { useNavigate } from "react-router-dom";
import closeButton from "../imgFile/닫기X버튼.png";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  tags: [],
};

function Registration() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [inputValue, setInputValue] = useState(""); // 입력 값을 저장할 상태변수
  const [isTagAdd, setIsTagAdd] = useState(false); //태그 추가 여부 상태

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setValues((prevValues) => ({
        ...prevValues,
        tags: [...prevValues.tags, inputValue.trim()],
      }));
      setInputValue("");
      setIsTagAdd(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    //JSON 데이터로 변환
    const formData = {
      name: values.name,
      description: values.description,
      price: values.price,
      tags: values.tags,
    };
    try {
      await createItemList(formData); // 데이터베이스에 전송
      setValues(INITIAL_VALUES); // 초기값으로 리셋
      navigate("/detailpage"); // 페이지 이동
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
          onKeyDown={handleInputKeyDown}
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
