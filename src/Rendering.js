import React from "react";
import Header from "./pages/HomePage/Header";
import Main1 from "./pages/HomePage/Main1";
import Main2 from "./pages/HomePage/Main2"
import Main3 from "./pages/HomePage/Main3";
import Main4 from "./pages/HomePage/Main4";
import Main5 from "./pages/HomePage/Main5";
import Footer from "./pages/HomePage/Footer";
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