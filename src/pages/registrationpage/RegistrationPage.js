import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import RegisterHeader from "./RegisterHeader.js";
import RegisterProductName from "./RegisterProductName.js";
import RegisterProductDescription from "./RegisterProductDescription.js";
import RegisterProductPrice from "./RegisterProductPrice.js";
import RegisterProductTag from "./RegisterProductTag.js";
import { createProduct } from "../../api/ProductService.js";
import useValidation from "../../hooks/useValidation.js";
function RegistrationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const { fieldStatus, errorMessage, validate } = useValidation();
  const navigate = useNavigate();

  const onChange = {
    name: (value) => setName(value),
    description: (value) => setDescription(value),
    price: (value) => setPrice(value),
    tags: (value) => setTags((prev) => [...prev, value])
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
  return (
    <div className={styles.page}>
      <div className={styles.contents}>
        <RegisterHeader onSubmit={onSubmit} fieldStatus={fieldStatus} />
        <RegisterProductName
          fieldStatus={fieldStatus.name}
          errorMessage={errorMessage.name}
          validate={validate}
          onChange={onChange.name}
        />
        <RegisterProductDescription
          fieldStatus={fieldStatus.description}
          errorMessage={errorMessage.description}
          validate={validate}
          onChange={onChange.description}
        />
        <RegisterProductPrice
          fieldStatus={fieldStatus.price}
          errorMessage={errorMessage.price}
          validate={validate}
          onChange={onChange.price}
        />
        <RegisterProductTag
          fieldStatus={fieldStatus.tags}
          errorMessage={errorMessage.tags}
          validate={validate}
          onChange={onChange.tags}
          onDelete={onDeleteTag}
          tags={tags}
        />
      </div>
      <div></div>
    </div>
  );
}
export default RegistrationPage;
