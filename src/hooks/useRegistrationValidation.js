import { useState, useEffect } from "react";

const useValidation = (itemName, itemDescription, itemPrice, tagInput) => {
  const [errors, setErrors] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    tagInput: "",
  });

  const validate = () => {
    const newErrors = {
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      tagInput: "",
    };

    if (!itemName || itemName.length < 1 || itemName.length > 10) {
      newErrors.itemName = "10자 이내로 입력해주세요";
    }

    if (
      !itemDescription ||
      itemDescription.length < 10 ||
      itemDescription.length > 100
    ) {
      newErrors.itemDescription = "10자 이상 입력해주세요";
    }

    if (!itemPrice || isNaN(Number(itemPrice))) {
      newErrors.itemPrice = "숫자로 입력해주세요";
    }

    if (tagInput.length > 5) {
      newErrors.tagInput = "태그는 5자 이내여야 합니다.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemName, itemDescription, itemPrice, tagInput]);

  return { errors, validate };
};

export default useValidation;
