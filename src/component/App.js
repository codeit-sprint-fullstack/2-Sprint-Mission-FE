import { Fragment } from "react";
import "../css/App.css";
import Footer from "./Footer";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

function App({ children }) {

  return (
    <Fragment>
      <Nav className="Nav" />
      <div className="body"><Outlet /></div>
      <Footer className="Footer" />
    </Fragment>
  );
}

export default App;
