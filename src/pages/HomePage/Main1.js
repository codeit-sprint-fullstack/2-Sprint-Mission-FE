import React from "react";
import { Link } from "react-router-dom";
import panda1Img from "./images/panda1.png";

const Main1 = () => (
    <div class="main_content_1">
        <div className="check">
            <div className="check_items">
                <h1 className="text1">
                    일상의 모든 물건을<br />거래해 보세요
                </h1>
                <button className="items">
                    <Link to="/items">구경하러 가기</Link>
                </button>
            </div>
            <img id="panda1" src={panda1Img} alt="판다마켓이미지1" />
        </div>
    </div>
);

export default Main1;