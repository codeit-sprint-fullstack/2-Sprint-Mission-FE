import "./Product.css";
import heartImg from "../assets/heartImg.svg";
import defaultImg from "../assets/defaultImg.svg";

export default function Product({ item }) {
  if (!item) {
    return null; // 또는 로딩 스피너나 기본 이미지 등을 반환할 수 있습니다.
  }

  return (
    <div className="product">
      <img className="productImg" src={defaultImg} alt={item.name} />
      <div className="productText">
        <h4 className="productTextName">{item.name}</h4>
        <h3 className="productTextPrice">{item.price}원</h3>
        <div className="heart">
          <img className="heartImg" src={heartImg} alt="heart" />
          <p className="heartNextNum">{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}
