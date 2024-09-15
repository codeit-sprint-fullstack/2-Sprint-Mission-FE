import React from "react";
import panda5Img from "./images/panda5.png"; 

const Main4 = () => (
    <div className="main_content_4">
        <div className="boxbox">
            <img id="panda5" src={panda5Img} alt="판다마켓이미지5" />
            <div className="explain_box">
                <p className="subtitle">register</p>
                <h1>판매를 원하는<br /> 상품을 등록하세요</h1>
                <p className="content">어떤 물건이든 판매하고 싶은 상품을<br /> 쉽게 등록하세요</p>
            </div>
        </div>
    </div>
);

export default Main4;
