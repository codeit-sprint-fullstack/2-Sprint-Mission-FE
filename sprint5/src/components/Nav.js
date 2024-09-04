import logoImg from "../assets/pndamarket_logo.png";
import profileImg from "../assets/size=medium.png";

export default function Nav() {
  const topics = [
    { title: "자유게시판", id: "board" },
    { title: "중고마켓", id: "secondmarket" },
  ];

  return (
    <nav>
      <img className="logo" alt="Panadamarket CI" src={logoImg} />
      {topics.map((topic) => (
        <p key={topic.id} className="menu">
          {topic.title}
        </p>
      ))}
      <img className="profileImg" alt="Panda Image in grayscale" src={profileImg} />
      <p>김코드</p>
      <p>-------------</p>
    </nav>
  );
}
