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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
    await createItemList(formData);
    setValues(INITIAL_VALUES);
    navigate("/detailpage");
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
          value={values.tags}
          onChange={handleChange}
          placeholder="태그를 입력해주세요"
        />
        <div className="TagName">
          <div className="Tag1">
            <p>#티셔츠</p>
            <img
              className="FirstCloseButton"
              src={closeButton}
              alt="closebutton"
            />
          </div>
          <div className="Tag2">
            <p>#상의</p>
            <img
              className="SecondCloasButton"
              src={closeButton}
              alt="closebutton"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Registration;
