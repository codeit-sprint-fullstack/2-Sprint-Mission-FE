import "../styles/reset.css";
import "../styles/variables.css";
import "./RendingPage.css";
import RendingHeader from "../components/RendingHeader.js";
import Footer from "../components/Footer.js";
import RendingSection1 from "../components/RendingSection1.js";
import RendingSection2 from "../components/RendingSection2.js";
import RendingSection3 from "../components/RendingSection3.js";

export default function RendingPage() {
  return (
    <>
      <RendingHeader />
      <RendingSection1 />
      <RendingSection2 />
      <RendingSection3 />
      <Footer />
    </>
  );
}
