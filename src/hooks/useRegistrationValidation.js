import { useState } from "react";

const useRegistrationValidation = () => {
  const [errors, setErrors] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    tag: "",
  });

  const validateItemName = (itemName) => {
    if (itemName.length < 1 || itemName.length > 10) {
      setErrors((prev) => ({
        ...prev,
        itemName: "10자 이내로 입력해주세요",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, itemName: "" }));
    return true;
  };

  const validateItemDescription = (itemDescription) => {
    if (itemDescription.length < 10 || itemDescription.length > 100) {
      setErrors((prev) => ({
        ...prev,
        itemDescription: "10자 이상 입력해주세요",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, itemDescription: "" }));
    return true;
  };

  const validateItemPrice = (itemPrice) => {
    if (isNaN(itemPrice) || itemPrice.length < 1) {
      setErrors((prev) => ({
        ...prev,
        itemPrice: "숫자로 입력해주세요",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, itemPrice: "" }));
    return true;
  };

  const validateTag = (tag) => {
    if (tag.length > 5) {
      setErrors((prev) => ({ ...prev, tag: "5글자 이내로 입력해주세요" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, tag: "" }));
    return true;
  };

  return {
    errors,
    validateItemName,
    validateItemDescription,
    validateItemPrice,
    validateTag,
  };
};

export default useRegistrationValidation;
