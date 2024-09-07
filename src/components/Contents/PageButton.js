import "./style/PageButton.css";
function PageButton({ buttonPage, onChangePage, pageInfo, children }) {
  const { currentPage, totalPage } = pageInfo;
  const handleChangePageClick = () => {
    onChangePage(buttonPage);
  };
  const highlightCurrentPage = () => {
    if (buttonPage === currentPage) {
      return true;
    }
  };

  return (
    <button id="page-button" onClick={handleChangePageClick}
      className={highlightCurrentPage(buttonPage) ? 'current-page' : 'not-current-page'}>
      {children}
    </button>
  );
}
export default PageButton;
