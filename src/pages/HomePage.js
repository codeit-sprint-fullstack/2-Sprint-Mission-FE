import React from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import LandingMain from "../component/LandingMain";

function HomePage() {
  return (
    <div className="HomePage">
      <Nav />
      <LandingMain />
      <Footer />
    </div>
  );
}

export default HomePage;
