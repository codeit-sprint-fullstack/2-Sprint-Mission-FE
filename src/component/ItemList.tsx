import { useEffect, useState } from "react";
import "../style/ProductList.css";
import itemImg from '../imgFile/디폴트이미지.png'
import './ItemList.css'

function ProductListItem({ item }) {
  return (
    <div className="ProductListItem">
      <img src={itemImg} alt={item.name} />
      <div>
        <p className="ListFont1">{item.name}</p>
        <p className="ListFont2">{item.price}</p>
        <p className="ListFont3">♡ 240</p>
      </div>
    </div>
  );
}

function ItemList({ items}) {
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



  return (
    <>
      <ul className="ProductListFrame">
        {items.slice(0, displayCount).map((item) => (
          <li key={item.id}>
            <ProductListItem item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemList;
