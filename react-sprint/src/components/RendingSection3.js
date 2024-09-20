import "./RendingSection3.css";
import pandaTwo from "../assets/pandaTwo.svg";

export default function RendingSection3() {
  return (
    <section className="rendingSection3">
      <div className="pandaTwoBox">
        <div className="pandaTwoText">
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h1>
        </div>
        <div>
          <img className="pandaTwoImg" alt="pandaTwoImg" src={pandaTwo} />
        </div>
      </div>
    </section>
  );
}
