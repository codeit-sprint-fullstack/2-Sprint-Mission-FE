import { useState } from "react";

export function useValidation() {
  const [errors, setErrors] = useState({});

  function isProductNameValid(name) {
    return name.length >= 1 && name.length <= 10 ? null : "10자 이내로 입력해주세요";
  }
  
  function isProductDescriptionValid(description) {
    return description.length >= 10 && description.length <= 100 ? null : "10자 이상 입력해주세요";
  }
  
  function isProductPriceValid(price) {
    return Number(price) && price >= 0 ? null : "숫자로 입력해주세요";
  }
  
  function isProductTagsValid(tags) {
    for(let tag of tags) {
      if (tag.length > 5) return "5글자 이내로 입력해주세요";
    }
    return null;
  }

  const validateField = (name, value, productData) => {
    let validationError = null;

    switch (name) {
      case "name":
        validationError = isProductNameValid(value);
        break;
      case "description":
        validationError = isProductDescriptionValid(value);
        break;
      case "price":
        validationError = isProductPriceValid(value);
        break;
      case "tags":
        validationError = isProductTagsValid(productData.tags);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        if (validationError) {
            updatedErrors[name] = validationError;
        } else {
            delete updatedErrors[name];
        }

        return updatedErrors;
    });

    return validationError;
  };
  
  const validationCheck = (productData) => {
    const { name, description, price, tags } = productData;
    const validationErrors = {};
    
    validationErrors.name=isProductNameValid(name);
    validationErrors.description=isProductDescriptionValid(description);
    validationErrors.price=isProductPriceValid(price);
    validationErrors.tags=isProductTagsValid(tags);

    const validErrors = Object.fromEntries(
        Object.entries(validationErrors).filter(([_, value]) => value)
    );

    setErrors(validErrors);
    return validErrors;
  };

  return { errors, validateField, validationCheck };
}