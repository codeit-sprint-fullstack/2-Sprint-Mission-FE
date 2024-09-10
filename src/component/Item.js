import React from "react";
import heart from "../assets/ic_heart.svg";
import empty from "../assets/img_default.svg";
import "./Item.css";

const Item = ({ item }) => {
  const image =
    item.images && Array.isArray(item.images) && item.images.length > 0
      ? item.images[0]
      : empty;

  const price = item.price;
  const favorite = item.favoriteCount;

  const isValid = (url) => {
    const validationExtensions = ["jpg", "jpeg", "png", "gif", "svg"];
    const urlExtension = url.split(".").pop().toLowerCase();
    return validationExtensions.includes(urlExtension);
  };

  return (
    <div className="items">
      <img
        className="itemImg"
        src={isValid(image) ? image : empty}
        alt={item.name}
      />
      <div className="itemText">
        <p className="itemName">{item.name}</p>
        <p className="itemPrice">{price}원</p>
        <div className="heart">
          <img className="heartImg" src={heart} alt="heart" />
          <p>{favorite}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
