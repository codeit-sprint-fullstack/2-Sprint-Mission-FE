import "./Footer.css";
import facebook from "../assets/ic_facebook.png";
import twitter from "../assets/ic_twitter.png";
import youtube from "../assets/ic_youtube.png";
import instagram from "../assets/ic_instagram.png";

export default function Footer() {
  const externalPages = [
    { title: "Privacy Policy", href: "/privacy", id: "privacy" },
    { title: "FAQ", href: "/faq", id: "faq" },
  ];
  const socialMedia = [
    { alt: "Facebook Logo", src: facebook, href: "https://www.facebook.com/" },
    { alt: "Twitter Logo", src: twitter, href: "https://x.com/" },
    { alt: "Youtube Logo", src: youtube, href: "https://www.youtube.com/" },
    { alt: "Instagram Logo", src: instagram, href: "https://www.instagram.com/" },
  ];

  return (
    <footer>
      <div className="footerContainer">
        <div>
          <p id="copyright">©codeit - 2024</p>
        </div>
        <div className="externalPageContainer">
          {externalPages.map((page) => (
            <a className="externalPage" key={page.id} href={page.href}>
              {page.title}
            </a>
          ))}
        </div>
        <div className="snsContainer">
          {socialMedia.map((logo) => (
            <a key={logo.alt} href={logo.href}>
              <img className="snsLogo" src={logo.src} alt={logo.alt}></img>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
