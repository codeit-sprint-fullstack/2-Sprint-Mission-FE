import React, { useEffect, useState } from "react";
import { Navbar } from "./Nav.js";
import BestProductList from "./BestProductList.js";
import { getList, getListItem } from "./api.js";
import ProductList from "./ProductList.js";
import PageButton from "./PageButton.js";
import Footer from "./Footer.js";

const ITEMS_PER_PAGE = 10;


function App() {
  const [bestItems, setBestItems] = useState([]);//bestItems를 빈배열로 실행
  const [productItems, setProductItems] = useState([]);//productItems를 빈배열로 실행
  const [order, setOrder] = useState('recent');//order를 recent로 실행
  const [totalItems, setTotalItems] = useState(0); // 전체 아이템 수 (totalItems 초기값 0)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 (crrentPage 초기값 1)


  

  const handleLoadBestItems = async () => {
    try {
      const data = await getList({ pageSize: 4 });
      const sortedItems = data.list.sort(
        (a, b) => b.favorite - a.favorite
      );
      setBestItems(sortedItems);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleLoadProductItems = async (page) => {
    try {
      const data = await getListItem({ order, pageSize: ITEMS_PER_PAGE, page });
      const sortedItems = data.list.sort((a, b) => b[order] - a[order]);
      setProductItems(sortedItems);
      setTotalItems(data.totalCount); // 전체 아이템 개수를 설정
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

    // 페이지 변경 시 데이터를 불러오는 함수
    const handlePageChange = (page) => {
      setCurrentPage(page); // 현재 페이지 설정
      handleLoadProductItems(page); // 해당 페이지 데이터 불러오기
    };

  useEffect(() => {
    handleLoadBestItems();
    handleLoadProductItems(currentPage);
  }, [order, currentPage]);

  return (
    <div>
      <Navbar />
      <BestProductList items={bestItems} />
      <ProductList items={productItems} onChange={setOrder} />
      <PageButton 
        totalItems={totalItems} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} // 페이지 변경 함수
      />
      <Footer />
    </div>
  );
}

export default App;




