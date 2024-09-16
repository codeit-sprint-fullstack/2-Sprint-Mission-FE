import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import RegisterHeader from "./RegisterHeader.js";
import RegisterProductName from "./RegisterProductName.js";
import RegisterProductDescription from "./RegisterProductDescription.js";
import RegisterProductPrice from "./RegisterProductPrice.js";
import RegisterProductTag from "./RegisterProductTag.js";
import { createProduct } from "../../api/ProductService.js";
function RegistrationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [validationErrors, setValidationErrors] = useState({
    name: "INITIAL",
    description: "INITIAL",
    price: "INITIAL",
    tags: "INITIAL"
  });
  const checkValidationErrors = () =>
    Object.values(validationErrors).every((value) => value === "PASS");
  const navigate = useNavigate();

  const onChange = {
    name: (value) => setName(value),
    description: (value) => setDescription(value),
    price: (value) => setPrice(value),
    tags: (value) => {
      if (tags.length === 0) setTags([value]);
      else setTags((prev) => [...prev, value]);
    }
  };

  const onSubmit = async () => {
    const { id } = await createProduct({
      name,
      description,
      price,
      tags
    });
    navigate(`/items/${id}`);
  };

  const onDeleteTag = (index) =>
    setTags((prevTags) => prevTags.filter((tag, i) => i !== index));
  const onValidate = (fieldName, isVlid) => {
    const validationResult = isVlid === true ? "PASS" : "ERROR";
    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: validationResult
    }));
  };
  return (
    <div className={styles.page}>
      <div className={styles.contents}>
        <RegisterHeader onSubmit={onSubmit} isValid={checkValidationErrors()} />
        <RegisterProductName
          onChange={onChange.name}
          onValidate={onValidate}
          error={validationErrors.name}
        />
        <RegisterProductDescription
          onChange={onChange.description}
          onValidate={onValidate}
          error={validationErrors.description}
        />
        <RegisterProductPrice
          onChange={onChange.price}
          onValidate={onValidate}
          error={validationErrors.price}
        />
        <RegisterProductTag
          onChange={onChange.tags}
          onDelete={onDeleteTag}
          onValidate={onValidate}
          error={validationErrors.tags}
          tags={tags}
        />
      </div>
      <div></div>
    </div>
  );
}
export default RegistrationPage;
