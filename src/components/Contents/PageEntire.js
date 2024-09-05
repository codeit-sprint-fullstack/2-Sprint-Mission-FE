import "./style/PageEntire.css";
import PageButton from "./PageButton.js";
function PageEntire() {
  return (
    <div id="page-entire">
      <PageButton>{"<"}</PageButton>
      <PageButton>1</PageButton>
      <PageButton>2</PageButton>
      <PageButton>3</PageButton>
      <PageButton>4</PageButton>
      <PageButton>5</PageButton>
      <PageButton>{">"}</PageButton>
    </div>
  );
}
export default PageEntire;
