import style from "./css/RegistrationPage.module.css";
import { useEffect, useState } from "react";
import TagButton from "../components/TagButton.jsx";
import useValidation from "../hooks/useValidation.js";

function RegistrationPage() {
  const validation = useValidation();
  const [nameObj, setNameObj] = useState({
    name: "name",
    value: "",
    isOK: true,
    errMsg: "",
  });
  const [descriptionObj, setDescriptionObj] = useState({
    name: "description",
    value: "",
    isOK: true,
    errMsg: "",
  });
  const [priceObj, setPriceObj] = useState({
    name: "price",
    value: "",
    isOK: true,
    errMsg: "",
  });
  const [tagObj, setTagObj] = useState({
    name: "tag",
    value: "",
    isOK: true,
    errMsg: "",
  });
  const [tags, setTags] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "name":
        validation(name, value, setNameObj);
        break;
      case "description":
        validation(name, value, setDescriptionObj);
        break;
      case "price":
        validation(name, value, setPriceObj);
        break;
      case "tag":
        validation(name, value, setTagObj);
        break;
      default:
    }
  };
  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      validation(tagObj.name, e.target.value, setTagObj);
      if (!tagObj.isOK) return;
      if (tags.includes(e.target.value))
        return setTagObj((prev) => {
          return { ...prev, errMsg: "같은 태그가 존재합니다" };
        });

      setTags((prev) => [...prev, e.target.value]);
      setTagObj((prev) => {
        return { ...prev, value: "" };
      });
    }
  };
  const handleRemoveTag = (name) => {
    const idx = tags.findIndex((t) => t === name);
    const newTags = [...tags.slice(0, idx), ...tags.slice(idx + 1)];
    setTags(newTags);
  };

  useEffect(() => {
    setCanSubmit(
      nameObj.isOK && descriptionObj.isOK && priceObj.isOK && tagObj.isOK
    );
  }, [nameObj.isOK, descriptionObj.isOK, priceObj.isOK, tagObj.isOK]);

  useEffect(() => setCanSubmit(false), []); // 최초 렌더링시 등록 버튼 비활성화

  return (
    <div id={`${style.registrationPage}`}>
      <form>
        <div id={`${style.title}`}>
          <p>상품 등록하기</p>
          <button
            id={`${style.registButton}`}
            className="button"
            type="button"
            disabled={!canSubmit}
          >
            등록
          </button>
        </div>
        <div id={`${style.info}`}>
          <div className={`${style["input-wrap"]}`}>
            <label htmlFor="name">상품명</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="상품명을 입력해주세요"
              className={nameObj.isOK ? "" : `${style.error}`}
              value={nameObj.value}
              onChange={(e) =>
                setNameObj((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
              onBlur={handleValidation}
            />
            <p>{nameObj.errMsg}</p>
          </div>
          <div className={`${style["input-wrap"]}`}>
            <label htmlFor="description">상품 소개</label>
            <textarea
              id="description"
              name="description"
              cols="30"
              rows="10"
              placeholder="상품 소개를 입력해주세요"
              className={descriptionObj.isOK ? "" : `${style.error}`}
              value={descriptionObj.value}
              onChange={(e) =>
                setDescriptionObj((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
              onBlur={handleValidation}
            ></textarea>
            <p>{descriptionObj.errMsg}</p>
          </div>
          <div className={`${style["input-wrap"]}`}>
            <label htmlFor="price">판매가격</label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="판매 가격을 입력해주세요"
              className={priceObj.isOK ? "" : `${style.error}`}
              value={priceObj.value}
              onChange={(e) =>
                setPriceObj((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
              onBlur={handleValidation}
            />
            <p>{priceObj.errMsg}</p>
          </div>
          <div className={`${style["input-wrap"]} ${style["tag-wrap"]}`}>
            <label htmlFor="tag">태그</label>
            <input
              id="tag"
              name="tag"
              type="text"
              placeholder="태그를 입력해주세요"
              className={tagObj.isOK ? "" : `${style.error}`}
              value={tagObj.value}
              onChange={(e) =>
                setTagObj((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
              onBlur={handleValidation}
              onKeyDown={handleAddTag}
            />
            <p style={{ marginBottom: "0.8rem" }}>{tagObj.errMsg}</p>
            <div className="tag-button-wrap">
              {tags.map((tag) => (
                <TagButton name={tag} key={tag} onClick={handleRemoveTag} />
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
