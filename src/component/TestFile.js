import { useEffect, useState } from "react";
import { getItemList } from "./PandaApi.js";
import itemImg from "../imgFile/디폴트이미지.png";

function TestProject() {
  const [items, setItems] = useState([]); // 'item' -> 'items'로 변수명을 더 명확하게 변경

  const handleLoad = async () => {
    try {
      const data = await getItemList();
      console.log(data); // 데이터 확인용 로그
      setItems(data.items); // items가 배열인지 확인
    } catch (error) {
      console.error("Failed to load items:", error);
    }
  };

  useEffect(() => {
    handleLoad(); // 컴포넌트 마운트 시 데이터 로드
  }, []);

  return (
    <>
      <h1>안녕하세요</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img src={itemImg} />
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TestProject;
