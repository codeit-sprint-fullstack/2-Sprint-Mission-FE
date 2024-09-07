import "./style/PageEntire.css";
import PageButton from "./PageButton.js";
import PageArrow from "./PageArrow.js";
import { useEffect, useState } from "react";
function PageEntire({ onChangePage, pageInfo }) {
  const { currentPage, totalPage } = pageInfo;
  const [buttonList, setButtonList] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    if (currentPage >= 4) {
      if (currentPage + 2 === totalPage) {
        return;
      } else {
        setButtonList([currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]);
      }
    } else {
      setButtonList([1, 2, 3, 4, 5]);
    }

  }, [currentPage, totalPage]);
  const showPage = (buttonPage) => {
    if (buttonPage <= totalPage) {
      return true;
    } else return false;
  }
  const handleNextPageGroup = () => {
    setButtonList(prevButtonList => {
      if (prevButtonList.includes(totalPage)) {
        return prevButtonList;
      } else {
        return prevButtonList.map(pageValue => pageValue + 5)
      }
    }
    )
  };
  const handlePrevPageGroup = () => {
    setButtonList(prevButtonList => {
      if (prevButtonList[0] < 6) {
        return [1, 2, 3, 4, 5];
      } else {
        return prevButtonList.map(pageValue => pageValue - 5)
      }
    }
    )
  }
  return (
    <div id="page-entire">
      <PageArrow onChangePageGroup={handlePrevPageGroup}>{'<'}</PageArrow>
      <ul id="page-button-list">
        {buttonList.map((buttonPage) => (
          showPage(buttonPage) && <li key={buttonPage}>
            <PageButton className="page-button" buttonPage={buttonPage} onChangePage={onChangePage} pageInfo={pageInfo}>
              {buttonPage}
            </PageButton>
          </li>
        ))}
      </ul>
      <PageArrow onChangePageGroup={handleNextPageGroup} pageInfo={pageInfo}>{'>'}</PageArrow>
    </div>
  );
}
export default PageEntire;
