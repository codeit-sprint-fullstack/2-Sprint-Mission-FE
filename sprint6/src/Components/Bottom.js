import bottomImg from "../assets/Img_home_bottom.png";

export default function Kv() {
  return (
    <>
      <div className="kv-text">
        <h1 classNAme="headline-heading" id="kv-head">
          믿을 수 있는 판다마켓 중고 거래
        </h1>
      </div>
      <div>
        <img src={bottomImg} alt="Two pandas meet up and exchange their items" />
      </div>
    </>
  );
}
