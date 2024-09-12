import { Link } from "react-router-dom";
import logoImg from "../assets/pndamarket_logo.png";

export default function Nav() {
  const topics = [
    { title: "자유게시판", id: "board", link: "/" },
    { title: "중고마켓", id: "secondmarket", link: "items" },
  ];

  return (
    <nav>
      <div className="logoMenu">
        <Link to="/">
          <img id="logo" alt="Panadamarket CI" src={logoImg} />
        </Link>
        {topics.map((topic) => (
          <p key={topic.id} className="menu">
            <Link to={topic.link}>{topic.title}</Link>
          </p>
        ))}
      </div>
      <Link to="/login">
        <button className="login">로그인</button>
      </Link>
    </nav>
  );
}
