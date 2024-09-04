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
    { alt: "facebook Logo", src: facebook, href: "https://www.facebook.com/" },
    { alt: "twitter Logo", src: twitter, href: "https://x.com/" },
    { alt: "youtube Logo", src: youtube, href: "https://www.youtube.com/" },
    { alt: "instagram Logo", src: instagram, href: "https://www.instagram.com/" },
  ];

  return (
    <footer>
      <p>------------</p>
      <div>
        <p>©codeit - 2024</p>
      </div>
      <div>
        {externalPages.map((page) => (
          <a key={page.id} href={page.href}>
            {page.title}
          </a>
        ))}
      </div>
      <div>
        {socialMedia.map((logo) => (
          <a key={logo.alt} href={logo.href}>
            <img src={logo.src} alt={logo.alt}></img>
          </a>
        ))}
      </div>
    </footer>
  );
}
