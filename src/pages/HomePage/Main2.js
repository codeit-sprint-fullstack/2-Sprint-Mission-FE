import React from "react";
import panda3Img from "./images/panda3.png";

const Main2 = () => (
    <div className="main_content_2">
        <div className="boxbox">
            <img id="panda3" src={panda3Img} alt="판다마켓이미지3" />
            <div className="explain_box">
                <p className="subtitle">Hot item</p>
                <h1>인기상품을<br /> 확인해 보세요</h1>
                <p className="content">가장 HOT한 중고거래 물품을<br /> 판다 마켓에서 확인해 보세요</p>
            </div>
        </div>
    </div>
);

export default Main2;
