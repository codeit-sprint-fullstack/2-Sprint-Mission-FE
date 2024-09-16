import validateName from "./validateName.js";
import validatePrice from "./validatePrice.js";
import validateDescription from "./validateDescription.js";
import validateTags from "./validateTags.js";
import { useState } from "react";
function useValidation() {
  const [fieldStatus, setFieldStatus] = useState({
    name: "INITIAL",
    price: "INITIAL",
    description: "INITIAL",
    tags: "INITIAL"
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    price: "",
    description: "",
    tags: ""
  });
  const updateState = (field, status, message) => {
    setFieldStatus((prev) => ({
      ...prev,
      [field]: status
    }));
    setErrorMessage((prev) => ({
      ...prev,
      [field]: message
    }));
  };
  const validate = async (field, value, tags = []) => {
    switch (field) {
      case "name": {
        const { status, message } = validateName(value);
        updateState("name", status, message);
        break;
      }
      case "description": {
        const { status, message } = validateDescription(value);
        updateState("description", status, message);
        break;
      }
      case "price": {
        const { status, message } = validatePrice(value);
        updateState("price", status, message);
        break;
      }
      case "tags": {
        const { status, message } = await validateTags(tags, value);
        updateState("tags", status, message);
        return { status, message };
        break;
      }
      default:
        break;
    }
  };
  return { fieldStatus, errorMessage, validate };
}
export default useValidation;
