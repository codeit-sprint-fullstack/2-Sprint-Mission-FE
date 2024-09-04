import logoImg from "../assets/pndamarket_logo.png";

export default function Nav() {
  const topics = [
    { title: "자유게시판", id: "board" },
    { title: "중고마켓", id: "secondmarket" },
  ];

  return (
    <nav>
      <img className="logo" alt="Panadamarket CI" src={logoImg} />
      {topics.map((topic) => (
        <p key={topic.id}>{topic.title}</p>
      ))}
      <button>profile</button>
      <p>-------------</p>
    </nav>
  );
}
