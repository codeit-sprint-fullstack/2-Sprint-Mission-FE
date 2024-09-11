import { useEffect, useState } from "react";
import "../style/ProductList.css";
import arrowDown from "../imgFile/아래화살표이미지.png";

function ProductListItem({ item }) {
  return (
    <div className="ProductListItem">
      <img src={item.images} alt={item.name} />
      <div>
        <p className="ListFont1">{item.name}</p>
        <p className="ListFont2">{item.price}</p>
        <p className="ListFont3">♡ {item.favoriteCount}</p>
      </div>
    </div>
  );
}

function ProductList({ items, onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("최신순");
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setDisplayCount(4); //모바일 4개
      } else if (width <= 1199) {
        setDisplayCount(6); //태블릿 6개
      } else {
        setDisplayCount(10); //pc 10개
      }
    };

    window.addEventListener("resize", updateDisplayCount);
    updateDisplayCount(); //초기 로드 시 실행
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order === "recent" ? "최신순" : "좋아요순");
    onChange(order);
    setIsDropdownOpen(false);
  };

  const handleNewestClick = () => handleOrderSelect("recent");
  const handleBestClick = () => handleOrderSelect("favorite");

  return (
    <div className="Main">
      <div className="ProductMenuBox">
        <p className="ProductMenuFont">판매 중인 상품</p>
        {/* <div className="ProductMenuBar"> */}
        <input
          className="ProductSerchInput"
          placeholder="검색할 상품을 입력해주세요"
        />
        <p className="PostProduct">상품 등록하기</p>
        <div className="DropdownBox">
          <ul
            className="ProductDropdown"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen); //true가 됨.그래서 화면에 보여짐.
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
        {/* </div> */}
      </div>
      <ul className="ProductListFrame">
        {items.slice(0, displayCount).map((item) => (
          <li key={item.id}>
            <ProductListItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
