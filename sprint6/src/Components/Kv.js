import { useEffect, useState } from "react";
import "./Kv.css";
import kvImg from "../assets/Img_home_top.png";

// KV = Key Visual
export default function Kv() {
  const [lines, setLines] = useState(
    <>
      일상의 모든 물건을 <br /> 거래해 보세요
    </>,
  );

  function updatePageSize() {
    if (window.matchMedia("(min-width: 375px) and (max-width: 743px)").matches) {
      setLines(
        <>
          일상의 모든 물건을 <br /> 거래해 보세요
        </>,
      );
    } else if (window.matchMedia("(min-width: 744px) and (max-width: 1199px)").matches) {
      setLines("일상의 모든 물건을 거래해 보세요");
    } else {
      setLines(
        <>
          일상의 모든 물건을 <br /> 거래해 보세요
        </>,
      );
    }
  }

  useEffect(() => {
    updatePageSize();

    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  return (
    <>
      <div className="blueArea">
        <div className="kvContainer">
          <div className="kvText">
            <h1 className="headline" id="kvHead">
              {lines}
            </h1>
            <a href="items">
              <button className="view">구경하러 가기</button>
            </a>
          </div>
          <div>
            <img src={kvImg} alt="A panda shaking a hand" />
          </div>
        </div>
      </div>
    </>
  );
}
