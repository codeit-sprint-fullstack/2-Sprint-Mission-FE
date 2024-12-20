import React, { useEffect, useState } from "react";
import BestProductList from "../component/BestProductList.js";
import { getList, getListItem } from "../component/PandaApi.js";
import ProductList from "../component/ProductList.js";
import PageButton from "../component/PageButton.js";

function ItemProduct() {
  const [bestItems, setBestItems] = useState<any[]>([]);
  const [productItems, setProductItems] = useState<any[]>([]);
  const [order, setOrder] = useState<string>("recent");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // 페이지당 아이템 수

  // 화면 크기에 따라 페이지당 아이템 수 조정하기
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setPageSize(4); // 모바일: 4개
      } else if (width <= 1199) {
        setPageSize(6); // 태블릿: 6개
      } else {
        setPageSize(10); // PC: 10개
      }
    };

    window.addEventListener("resize", updatePageSize);
    updatePageSize(); // 초기 로드 시 실행
    return () => window.removeEventListener("resize", updatePageSize);
  }, []); // 빈 배열로 초기 로드 시 실행

  const handleLoadBestItems = async (): Promise<void> => {
    try {
      const data = await getList({ pageSize: 4 });
      const sortedItems = data.list.sort((a: any, b: any) => b.favorite - a.favorite);
      setBestItems(sortedItems);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleLoadProductItems = async (page: number = currentPage): Promise<void> => {
    try {
      const data = await getListItem({ order, pageSize, page });
      const sortedItems = data.list.sort((a:any, b:any) => b[order] - a[order]);
      setProductItems(sortedItems);
      setTotalItems(data.totalCount);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    handleLoadProductItems(page);
  };

  useEffect(() => {
    handleLoadBestItems();
    handleLoadProductItems(); // 현재 페이지에서 로드
  }, [order, currentPage, pageSize]); // 변경 시마다 실행

  return (
    <div>
      <BestProductList items={bestItems} />
      <ProductList items={productItems} onChange={setOrder} />
      <PageButton
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
      />
    </div>
  );
}

export default ItemProduct;
