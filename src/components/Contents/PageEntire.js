import "./style/PageEntire.css";
import PageButton from "./PageButton.js";
function PageEntire({ onMoreLoad }) {
  const buttonList = [1, 2, 3, 4, 5];
  return (
    <ul id="page-entire">
      <PageButton>{"<"}</PageButton>
      {buttonList.map((buttonPage) => (
        <li key={buttonPage}>
          <PageButton>{buttonPage}</PageButton>
        </li>
      ))}
      <PageButton>{">"}</PageButton>
    </ul>
  );
}
export default PageEntire;
