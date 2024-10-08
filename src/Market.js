import MarketPage from "./pages/MarketPage/MarketPage";
import Header from "./components/Layout/Header";

function Market() {
  return (
    <>
      <Header />

      <div className="withHeader">
        <MarketPage />
      </div>
    </>
  );
}

export default Market;
