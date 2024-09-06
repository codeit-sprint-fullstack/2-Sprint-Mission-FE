import "./App.css";
import Nav from "./Nav/Nav.js";
import Contents from "./Contents/Contents.js";
import Footer from "./Footer/Footer.js";
import { getProductList } from "../api/ProductService.js";
import { useEffect, useState } from "react";

function App() {
  const [bestList, setBestList] = useState([]);
  const [sellingList, setSellingList] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [page, setPage] = useState(1);

  const handleBestLoad = async (options) => {
    const nextBestList = await getProductList(options);
    setBestList(nextBestList);
  };
  const handleSellingLoad = async (options) => {
    const nextSellingList = await getProductList(options);
    setSellingList(nextSellingList);
  };
  const handleSellingLoadMore = async (pageValue) => {
    setPage(pageValue);
    const options = {
      page,
      pageSize: 10,
      orderBy: order,
    };
    handleSellingLoad(options);
  };
  useEffect(() => {
    handleBestLoad({ pageSize: 4, orderBy: "favoriteCount" });
    handleSellingLoad({ page, pageSize: 10, orderBy: "createdAt" });
  }, []);
  return (
    <>
      <Nav />
      <Contents
        bestList={bestList}
        sellingList={sellingList}
        onMoreLoad={handleSellingLoadMore}
      />
      <Footer />
    </>
  );
}

export default App;
