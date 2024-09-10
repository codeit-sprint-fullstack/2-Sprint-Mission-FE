import "./App.css";
import Nav from "./Nav/Nav.js";
import Contents from "./Contents/Contents.js";
import Footer from "./Footer/Footer.js";
import { getProductList } from "../api/ProductService.js";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import test from "../api/test.js";
import styles from "./App.module.css";

function App() {
  const [bestList, setBestList] = useState([]);
  const [sellingList, setSellingList] = useState([]);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getPageSize = (width) => {
    if (width > 1200)
      return {
        bestList: 4,
        sellingList: 10,
      };
    if (width > 744)
      return {
        bestList: 2,
        sellingList: 6,
      };
    return {
      bestList: 1,
      sellingList: 4,
    };
  };
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));

  useEffect(() => {
    const handleReSize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };
    window.addEventListener("resize", handleReSize);
    return () => window.removeEventListener("resize", handleReSize);
  }, []);

  const handleChangePageSize = () => {};
  const handleBestLoad = async (options) => {
    const { list, totalCount } = await test(options);
    setBestList(list);
  };
  const handleSellingLoad = async (options) => {
    const { list, totalCount } = await test(options);
    setSellingList(list);
    const nextTotalPage = Math.ceil(totalCount / options.pageSize);
    setTotalPage(nextTotalPage);
  };
  const handleChangePage = async (pageValue) => {
    setCurrentPage(pageValue);
    const options = {
      page: pageValue,
      pageSize: pageSize.sellingList,
      orderBy: order,
    };
    console.log("바뀌는 페이지 정보");
    console.log(`page: ${options.page}`);
    console.log(`pageSize: ${options.pageSize}`);
    console.log(`orderyBy: ${options.orderBy}`);
    console.log(`totalPage: ${totalPage}`);
  };
  const handleChangeOrder = (chosenOrder) => {
    setOrder(chosenOrder);
  };
  const handleChangeKeyword = (inputKeyword) => setKeyword(inputKeyword);

  useEffect(() => {
    handleBestLoad({ pageSize: pageSize.bestList, orderBy: "favoriteCount" });
    handleSellingLoad({
      page: currentPage,
      pageSize: pageSize.sellingList,
      orderBy: order,
      keyword,
    });
  }, [order, currentPage, keyword, pageSize.bestList]);

  const totalList = {
    bestList,
    sellingList,
  };
  const pageInfo = {
    currentPage,
    totalPage,
    pageSize,
  };
  return (
    <>
      <Nav className={styles.nav} />

      <Routes>
        <Route
          path="/"
          element={
            <Contents
              totalList={totalList}
              pageInfo={pageInfo}
              onChangePage={handleChangePage}
              onChangeOrder={handleChangeOrder}
              onChangeKeyword={handleChangeKeyword}
            />
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
