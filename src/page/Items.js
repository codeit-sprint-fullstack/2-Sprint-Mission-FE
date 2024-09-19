import { useEffect, useState } from "react";
import ProductMenuContainer from "../component/ProductMenuContainer.js";
import { getItemList } from "../component/PandaApi.js";
import PageButton from "../component/PageButton.js";
import ItemList from "../component/ItemList.js";
import "../style/ProductList.css";

function Items() {
  const [sort, setSort] = useState("recent");
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10); //페이지당 아이템수
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setLimit(4); // 모바일: 4개
      } else if (width <= 1199) {
        setLimit(6); // 태블릿: 6개
      } else {
        setLimit(10); // PC: 10개
      }
    };

    window.addEventListener("resize", updateLimit);
    updateLimit(); // 초기 로드 시 실행
    return () => window.removeEventListener("resize", updateLimit);
  }, []); // 빈 배열로 초기 로드 시 실행

  const handleLoadProductItems = async (page = currentPage) => {
    try {
      const data = await getItemList({ sort, limit, page }); //limit = pageSize
      setItems(data.items);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleLoadProductItems(page);
  };

  useEffect(() => {
    handleLoadProductItems();
    // console.log(items)
  }, [currentPage, limit]);

  return (
    <>
      <div className="Main">
        <ProductMenuContainer onChange={setSort} />
        <ItemList items={items} />
      </div>
      <PageButton
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={limit}
      />
    </>
  );
}

export default Items;
