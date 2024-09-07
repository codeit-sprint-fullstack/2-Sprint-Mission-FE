import "./style/PageEntire.css";
import PageButton from "./PageButton.js";
import PageArrow from "./PageArrow.js";
import { useEffect, useState } from "react";
function PageEntire({ onChangePage, pageInfo }) {
  const {currentPage, totalPage} = pageInfo;
  const [buttonList, setButtonList] = useState([1,2,3,4,5]);
  useEffect(()=>{
    if(currentPage >= 4){
      setButtonList([currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2]);
    }else{
      setButtonList([1,2,3,4,5]);
    }
  },[currentPage, totalPage]);
  const showPage= (buttonPage)=> {
    if(buttonPage <= totalPage){
      return true;
    }else return false;
  }
  const handleNextPageGroup = ()=>{
    setButtonList(prevButtonList=>
      prevButtonList.map(pageValue=> pageValue+5)
    )
  };
  const handlePrevPageGroup=()=>{
    setButtonList(prevButtonList=>{
      if(prevButtonList[0] === 1){
        return prevButtonList
      }else{
        return prevButtonList.map(pageValue=> pageValue-5)
      }
    }
    )
  }
  return (
    <ul id="page-entire">
      <PageArrow onChangePageGroup={handlePrevPageGroup}>{'<'}</PageArrow>
      {buttonList.map((buttonPage) => (
          showPage(buttonPage)&&<li key={buttonPage}>
        <PageButton buttonPage={buttonPage} onChangePage={onChangePage} pageInfo={pageInfo}>
            {buttonPage}
          </PageButton>
        </li>
      ))}
      <PageArrow onChangePageGroup={handleNextPageGroup} pageInfo={pageInfo}>{'>'}</PageArrow>
    </ul>
  );
}
export default PageEntire;
