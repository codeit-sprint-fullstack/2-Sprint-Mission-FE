import React from "react";
import Header from "./pages/Rendering page/Header";
import Main1 from "./pages/Rendering page/Main1";
import Main2 from "./pages/Rendering page/Main2";
import Main3 from "./pages/Rendering page/Main3";
import Main4 from "./pages/Rendering page/Main4";
import Main5 from "./pages/Rendering page/Main5";
import Footer from "./pages/Rendering page/Footer";
import "./Rendering.css";

function Rendering() {
  return (
    <div className="Rendering">
      <Header />
      <Main1 />
      <Main2 />
      <Main3 />
      <Main4 />
      <Main5 />
      <Footer />
    </div>
  );
}

export default Rendering;
