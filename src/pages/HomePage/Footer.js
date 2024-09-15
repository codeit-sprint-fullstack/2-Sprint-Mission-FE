import React from "react";
import facebookImg from "./images/image.png"
import twitterImg from "./images/image copy.png";
import youtubeImg from "./images/image copy 2.png";
import instagramImg from "./images/image copy 3.png";

const Footer = () => (
    <footer>
        <div className="bar">
            <div className="codeit">@codeit-2024</div>
            <div className="ppf">    
                <a href="privacy">Privacy Policy</a>
                <a href="faq">FAQ</a>
            </div>
            <div className="sns">    
                <a href="https://www.facebook.com"><img id="facebook" src={facebookImg} alt="페이스북"/></a>
                <a href="https://www.twitter.com"><img id="twitter" src={twitterImg} alt="트위터" /></a>
                <a href="https://www.youtube.com"><img id="youtube" src={youtubeImg} alt="유튜브" /></a>
                <a href="https://www.instagram.com"><img id="instagram" src={instagramImg} alt="인스타그램" /></a>
            </div>
        </div>
    </footer>
);

export default Footer;