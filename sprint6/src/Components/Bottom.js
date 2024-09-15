import "./Bottom.css";
import bottomImg from "../assets/Img_home_bottom.png";

export default function Bottom() {
  return (
    <div className="blueAreaBottom">
      <div className="bottomContainer">
        <div className="bottomText">
          <h1 className="headline" id="kv-head">
            믿을 수 있는 <br /> 판다마켓 중고 거래
          </h1>
        </div>
        <div>
          <img src={bottomImg} alt="Two pandas meet up and exchange their items" />
        </div>
      </div>
    </div>
  );
}
