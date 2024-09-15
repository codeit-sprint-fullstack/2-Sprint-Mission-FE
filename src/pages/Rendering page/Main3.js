import React from "react";
import panda4Img from "./images/panda4.png";

const Main3 = () => (
    <div className="main_content_3">
        <div className="boxbox">
            <div className="explain_box">
                <p className="subtitle">search</p>
                <h1>구매를 원하는<br /> 상품을 검색하세요</h1>
                <p className="content">구매하고 싶은 물품은 검색해서<br /> 쉽게 찾아보세요</p>
            </div>
            <img id="panda4" src={panda4Img} alt="판다마켓이미지4" />
        </div>
    </div>
);

export default Main3;
