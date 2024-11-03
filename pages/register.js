import ValidatedInputBox from "@/components/ValidatedInputBox";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { postProduct } from "@/api/api";
import { FIELD_TYPES, VALIDATION_STATE } from "@/constants";
export default function Register() {
  const registerPage = `w-full h-full flex justify-center`;
  const registerContents = `flex flex-col justify-between
      w-[1200px] h-[830px] mt-[26px] mb-[162px]
      md:w-[696px] md:h-[806px] md:mt-[18px] md:mb-[194px]
      sm:w-[344px] sm:h-[806px] sm:mt-[24px] sm:mb-[186px] `;
  const header = `w-full h-[42px] flex justify-between items-center`;
  const title = `w-[108px] h-[24px] flex items-center font-bold text-1f2937
      lg:h-[32px]`;
  const basicRegisterBtn = `w-[74px] h-[42px] rounded-[8px] px-[23px] py-[12px]
      text-ffffff whitespace-nowrap`;
  const { NAME, DESCRIPTION, PRICE, TAG } = FIELD_TYPES;
  const { INITIAL, SUCCESS, FALSE } = VALIDATION_STATE;
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: "",
    tag: "",
    tagList: []
  });
  const [validation, setValidation] = useState({
    name: INITIAL,
    description: INITIAL,
    price: INITIAL,
    tag: INITIAL
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    description: "",
    price: "",
    tag: ""
  });
  const router = useRouter();

  const validateBtn = () => {
    const isValidate =
      Object.entries(validation).every(
        ([key, value]) => value === SUCCESS || key === TAG
      ) && productInfo.tagList.length >= 1;
    return isValidate;
  };
  const handleSumbit = async (e) => {
    const submitData = {
      name: productInfo.name,
      description: productInfo.description,
      price: productInfo.price,
      tags: productInfo.tagList,
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png"
      ],
      userId: "c2b44a5b-5d1f-4e6e-9b55-3f8e5e7e8b18"
    };
    try {
      const response = await postProduct(submitData);
      console.log(response.data);
      router.push(`/items/${response.data.id}`);
    } catch (e) {
      console.error(`데이터 전송 실패: ${e.message}`);
    }
  };
  const onChangeInfo = (type) => (e) => {
    setProductInfo((prev) => ({
      ...prev,
      [type]: e.target.value
    }));
    validateField(type, e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      if (validation.tag === SUCCESS)
        setProductInfo((prev) => ({
          ...prev,
          tagList: [...prev.tagList, prev.tag],
          tag: ""
        }));
    }
  };
  const onClickDeleteTag = (tagName) => {
    const nextTagList = productInfo.tagList.filter((tag) => tag !== tagName);
    setProductInfo((prev) => ({
      ...prev,
      tagList: nextTagList
    }));
  };
  const validateField = (name, value) => {
    const changeState = (validation, message) => {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: message
      }));
      setValidation((prev) => ({
        ...prev,
        [name]: validation
      }));
    };
    function isInteger(value) {
      // 숫자 타입일 경우
      if (typeof value === "number") {
        return Number.isInteger(value);
        //return true;
      }
      if (typeof value === "string") {
        // 문자열이 정수로 변환 가능한지 체크
        const trimmedValue = value.trim(); // 공백 제거
        const parseIntValue = parseInt(trimmedValue);
        const result =
          !isNaN(parseIntValue) && parseIntValue.toString() === trimmedValue;
        return result;
      }
      return false;
    }
    switch (name) {
      case NAME:
        if (value.length < 1) changeState(FALSE, "1글자 이상 입력하세요");
        else if (value.length > 10)
          changeState(FALSE, "10글자 이내로 입력하세요");
        else changeState(SUCCESS, "");
        break;
      case DESCRIPTION:
        if (value.length < 10) changeState(FALSE, "10글자 이상 입력하세요");
        else if (value.length > 100)
          changeState(FALSE, "100글자 이내로 입력하세요");
        else changeState(SUCCESS, "");
        break;
      case PRICE:
        if (!isInteger(value)) changeState(FALSE, "정수를 입력해주세요");
        else if (Number(value) < 1)
          changeState(FALSE, "1이상의 값을 넣어주세요");
        else changeState(SUCCESS, "");
        break;
      case TAG:
        if (value.length < 1) changeState(FALSE, "1글자 이상 입력하세요");
        else if (value.length > 5)
          changeState(FALSE, "5글자 이내로 입력하세요");
        else if (productInfo.tagList.includes(value))
          changeState(FALSE, "이미 등록된 태그 입니다");
        else changeState(SUCCESS, "");
        break;
    }
  };
  const registerBtn = validateBtn()
    ? `${basicRegisterBtn} bg-3692ff`
    : `${basicRegisterBtn} bg-9ca3af`;
  return (
    <div className={registerPage}>
      <form className={registerContents} noValidate>
        <div className={header}>
          <h1 className={title}>상품 등록하기</h1>

          <button
            type="button"
            disabled={!validateBtn()}
            className={registerBtn}
            onClick={handleSumbit}
          >
            등록
          </button>
        </div>
        <ValidatedInputBox
          onChange={onChangeInfo(NAME)}
          type={NAME}
          value={productInfo.name}
          message={errorMessage.name}
        />
        <ValidatedInputBox
          onChange={onChangeInfo(DESCRIPTION)}
          type={DESCRIPTION}
          value={productInfo.description}
          message={errorMessage.description}
        />
        <ValidatedInputBox
          onChange={onChangeInfo(PRICE)}
          type={PRICE}
          value={productInfo.price}
          message={errorMessage.price}
        />
        <ValidatedInputBox
          onChange={onChangeInfo(TAG)}
          onKeyDown={onKeyDown}
          type={TAG}
          value={productInfo.tag}
          message={errorMessage.tag}
          tagList={productInfo.tagList}
          onClick={onClickDeleteTag}
        />
      </form>
    </div>
  );
}
