import MarketPage from "./pages/MarketPage/MarketPage";
import Header from "./components/Layout/Header";

function App() {
  return (
    <>
      <Header />

      <div className="withHeader">
        <MarketPage />
      </div>
    </>
  );
}

export default App;
