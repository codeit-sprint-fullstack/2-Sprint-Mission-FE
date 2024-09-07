import "./App.css";
import Nav from "./Nav/Nav.js";
import Contents from "./Contents/Contents.js";
import Footer from "./Footer/Footer.js";
import { getProductList } from "../api/ProductService.js";
import { useEffect, useState } from "react";
import axios from "axios";
import test from '../api/test.js';

function App() {
  const [bestList, setBestList] = useState([]);
  const [sellingList, setSellingList] = useState([]);
  const [order, setOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handleBestLoad = async (options) => {
    const { list, totalCount } = await test(options);
    setBestList(list);
  };
  const handleSellingLoad = async (options) => {
    const { list, totalCount } = await test(options);
    setSellingList(list);
    const nextTotalPage = Math.ceil(totalCount / (options.pageSize));
    setTotalPage(nextTotalPage);
  };
  const handleChangePage = async (pageValue) => {
    setCurrentPage(pageValue);
    const options = {
      page: pageValue,
      pageSize: 10,
      orderBy: order,
    };
    console.log('바뀌는 페이지 정보');
    console.log(`page: ${options.page}`);
    console.log(`pageSize: ${options.pageSize}`);
    console.log(`orderyBy: ${options.orderBy}`);
    console.log(`totalPage: ${totalPage}`);
  };

  useEffect(() => {
    handleBestLoad({ pageSize: 4, orderBy: "favoriteCount" });
    handleSellingLoad({ page: currentPage, pageSize: 10, orderBy: order });
  }, [order, currentPage]);

  const totalList = {
    bestList,
    sellingList,
  };
  const pageInfo = {
    currentPage,
    totalPage,
  };

  return (
    <>
      <Nav />
      <Contents
        totalList={totalList}
        onChangePage={handleChangePage}
        pageInfo={pageInfo}
      />
      <Footer />
    </>
  );
}

export default App;
