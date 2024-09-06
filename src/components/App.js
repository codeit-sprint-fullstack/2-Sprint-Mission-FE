import "./App.css";
import Nav from "./Nav/Nav.js";
import Contents from "./Contents/Contents.js";
import Footer from "./Footer/Footer.js";
import { getProductList } from "../api/ProductService.js";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  async function test() {
    const params = {
      page: 1,
      pageSize: 4,
      keyword: "",
      orderBy: "updateAt",
    };
    const res = await axios("https://sprint-mission-api.vercel.app/products", {
      params,
    });
    const data = res.data;
    console.log(data);
  }
  test();
  const [bestList, setBestList] = useState([]);
  const [sellingList, setSellingList] = useState([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);

  const handleBestLoad = async (options) => {
    const nextBestList = await getProductList(options);
    setBestList(nextBestList);
  };
  const handleSellingLoad = async (options) => {
    const nextSellingList = await getProductList(options);
    setSellingList(nextSellingList);
  };
  const handleChangePage = async (pageValue) => {
    setPage(pageValue);
    const options = {
      page: pageValue,
      pageSize: 10,
      orderBy: order,
    };
    handleSellingLoad(options);
  };
  useEffect(() => {
    handleBestLoad({ pageSize: 4, orderBy: "favoriteCount" });
    handleSellingLoad({ page, pageSize: 10, orderBy: order });
  }, [order, page]);
  return (
    <>
      <Nav />
      <Contents
        bestList={bestList}
        sellingList={sellingList}
        onChangePage={handleChangePage}
      />
      <Footer />
    </>
  );
}

export default App;
