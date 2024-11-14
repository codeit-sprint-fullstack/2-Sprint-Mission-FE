import { useState, useEffect } from "react";
import "./Registration.css";
import { updateProductItem } from "../component/PandaApi.js";
import { useNavigate, useParams } from "react-router-dom";
import closeButton from "../imgFile/닫기X버튼.png";
import axios from "../lib/axios.js";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  tags: [],
  images: [], // 빈 배열 추가
};

function PatchPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [inputValue, setInputValue] = useState(""); // 입력 값을 저장할 상태변수
  const [isTagAdd, setIsTagAdd] = useState(false); //태그 추가 여부 상태
  const { itemId } = useParams();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProductItem = async () => {
      try {
        const response = await axios.get(`/products/${itemId}`); // 상품 정보 가져오기
        const product = response.data;
        setValues({
          name: product.name,
          description: product.description,
          price: product.price,
          tags: product.tags || [], // 태그가 없을 경우 빈 배열로 설정
          images: product.images || [], // 이미지가 없을 경우 빈 배열로 설정
        });
        setIsTagAdd(product.tags && product.tags.length > 0); // 기존 태그가 있을 경우 true로 설정
      } catch (error) {
        console.log("id값", itemId);
        console.error("상품 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchProductItem();
  }, [itemId]); // id가 변경될 때마다 이펙트 실행

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      const trimmedInput = inputValue.trim();

      // 입력한 태그가 비어있지 않고, 이미 존재하지 않을 때만 추가
      if (trimmedInput !== "" && !values.tags.includes(trimmedInput)) {
        setValues((prevValues) => ({
          ...prevValues,
          tags: [...prevValues.tags, trimmedInput],
        }));
        setInputValue("");
        setIsTagAdd(true);
      } else if (values.tags.includes(trimmedInput)) {
        alert("이미 존재하는 태그입니다."); // 사용자에게 알림
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    //JSON 데이터로 변환
    const formData = {
      name: values.name,
      description: values.description,
      price: values.price,
      tags: values.tags,
      images: values.images,
    };
    try {
      await updateProductItem(itemId, formData); // 데이터베이스에 전송
      setValues(INITIAL_VALUES); // 초기값으로 리셋
      navigate(`/items/${itemId}`); // 페이지 이동
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

export default PatchPage;
