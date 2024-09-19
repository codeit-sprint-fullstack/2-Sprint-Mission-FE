import Nav from "./Nav.js";
import Footer from "./Footer.js";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <div className="Body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
