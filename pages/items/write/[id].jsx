import ValidatedInputBox from "@/components/ValidatedInputBox";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProduct, patchProduct } from "@/api/api";
import { FIELD_TYPES, VALIDATION_STATE } from "@/constants";
import { changeInputValue, validateField } from "@/utils/validateInputHelper";
import { useError } from "@/contexts/ErrorProvider";
import { useAuth } from "@/contexts/AuthProvider";
export default function Register() {
  const router = useRouter();
  const { id } = router.query;
  const { NAME, DESCRIPTION, PRICE, TAG } = FIELD_TYPES;
  const { INITIAL, SUCCESS, FALSE } = VALIDATION_STATE;
  const { user } = useAuth(true);
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
  useEffect(() => {
    const applyGetProduct = async () => {
      const response = await getProduct(id);
      const { name, description, price, tags } = response.data;
      console.log(response.data);
      const initialProductInfo = {
        name,
        description,
        price,
        tagList: tags
      };
      setProductInfo(initialProductInfo);
      setValidation({
        name: SUCCESS,
        description: SUCCESS,
        price: SUCCESS,
        tagList: SUCCESS
      });
    };
    if (id) applyGetProduct();
  }, [id]);
  const { handleError } = useError();
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
      ]
    };
    try {
      const response = await patchProduct({ id, formData: submitData });
      router.push(`/items/${response.data.id}`);
    } catch (e) {
      handleError(new Error("데이터 전송 실패"));
    }
  };
  const onChangeInfo = (fieldName) => (e) => {
    const value = e.target.value;
    changeInputValue(setProductInfo, fieldName, value);
    validateField(
      setValidation,
      setErrorMessage,
      fieldName,
      value,
      productInfo
    );
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
  const isSubmit = validateBtn();
  const isBtnValidate = validateBtn();
  if (!id) return;
  return (
    <div className="w-full h-full flex justify-center">
      <form
        className="flex flex-col justify-between
      w-[1200px] h-[830px] mt-[26px] mb-[162px]
      md:w-[696px] md:h-[806px] md:mt-[18px] md:mb-[194px]
      sm:w-[344px] sm:h-[806px] sm:mt-[24px] sm:mb-[186px]"
        noValidate
      >
        <div className="w-full h-[42px] flex justify-between items-center">
          <h1
            className="w-[108px] h-[24px] flex items-center font-bold text-1f2937
      lg:h-[32px]"
          >
            상품 등록하기
          </h1>

          <button
            type="button"
            disabled={!isSubmit}
            className={`w-[74px] h-[42px] rounded-[8px] px-[23px] py-[12px]
      text-ffffff whitespace-nowrap ${
        isBtnValidate ? "bg-3692ff" : "bg-9ca3af"
      }`}
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
