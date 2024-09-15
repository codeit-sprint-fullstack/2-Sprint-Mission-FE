import { useState } from "react";
import styles from "./RegistrationPage.module.css";
import RegisterHeader from "./RegisterHeader.js";
import ProductInfo from "./ProductInfo.js";
function RegistrationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
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
  const onSubmit = () =>
    console.log({
      name,
      description,
      price,
      tags
    });

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
