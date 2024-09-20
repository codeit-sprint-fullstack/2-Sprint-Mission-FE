import "./RendingSection1.css";
import pandaOne from "../assets/pandaOne.svg";
import { Link } from "react-router-dom";

export default function RendingSection1() {
  return (
    <section className="rendingSection1">
      <div className="sectionBox">
        <div className="perchaseBox">
          <h1 className="perchaseText">
            일상의 모든 물건을 <br className="navBr" /> 거래해 보세요
          </h1>
          <Link to="/items">
            <button className="perchaseBtn" type="button">
              구경하러 가기
            </button>
          </Link>
        </div>
        <img className="pandaOneImg" alt="판다 1마리" src={pandaOne} />
      </div>
    </section>
  );
}
