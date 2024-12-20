import arrowDown from "../imgFile/아래화살표이미지.png";
import { useState } from "react";
import "../style/ProductList.css";
import { Link } from "react-router-dom";

interface ProductMenuContainerProps {
  onChange: (order: string) => void;
}

function ProductMenuContainer({ onChange }: ProductMenuContainerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<string>("최신순");

  const handleOrderSelect = (order: string) => {
    setSelectedOrder(order === "recent" ? "최신순" : "좋아요순");
    onChange(order);
    setIsDropdownOpen(false);
  };

  const handleNewestClick = () => handleOrderSelect("recent");
  const handleBestClick = () => handleOrderSelect("favorite");

  return (
    <>
      <div className="ProductMenuBox">
        <p className="ProductMenuFont">판매 중인 상품</p>

        <input
          className="ProductSerchInput"
          placeholder="검색할 상품을 입력해주세요"
        />
        <Link to="/registration">
          <p className="PostProduct">상품 등록하기</p>
        </Link>
        <div className="DropdownBox">
          <ul
            className="ProductDropdown"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen); // true가 됨. 그래서 화면에 보여짐.
            }}
          >
            {selectedOrder}
            <img src={arrowDown} alt="arrow" className="DropdownArrow" />
            {isDropdownOpen && (
              <div className="ProductDropMenu">
                <li className="NewestList" onClick={handleNewestClick}>
                  최신순
                </li>
                <li className="BestList" onClick={handleBestClick}>
                  좋아요순
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductMenuContainer;
