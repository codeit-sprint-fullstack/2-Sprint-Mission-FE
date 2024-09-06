import "./style/PageButton.css";
function PageButton({ buttonPage, onChangePage }) {
  const handleChangePageClick = () => {
    if (onChangePage) {
      onChangePage(buttonPage);
    }
  };

  return (
    <button id="page-button" onClick={handleChangePageClick}>
      {buttonPage}
    </button>
  );
}
export default PageButton;
