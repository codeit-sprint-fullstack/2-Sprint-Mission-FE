import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import RegisterHeader from "./RegisterHeader.js";
import ProductInfo from "./ProductInfo.js";
import { createProduct } from "../../api/ProductService.js";
function RegistrationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const onChangeName = (value) => setName(value);
  const onChangeDescription = (value) => setDescription(value);
  const onChangePrice = (value) => setPrice(value);
  const onChangeTags = (value) => setTags(value);
  const onChange = {
    name: onChangeName,
    description: onChangeDescription,
    price: onChangePrice,
    tags: onChangeTags
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

  return (
    <div className={styles.page}>
      <div className={styles.contents}>
        <RegisterHeader onSubmit={onSubmit} />
        <ProductInfo onChange={onChange} />
      </div>
      <div></div>
    </div>
  );
}
export default RegistrationPage;
