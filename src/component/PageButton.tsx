import React from "react";
import "../style/PageButton.css";
import RightArrow from "../imgFile/오른쪽화살표.png";
import LeftArrow from "../imgFile/왼쪽화살표.png";

const PAGE_BUTTON_COUNT = 5;

interface PageButtonProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

function PageButton({
  totalItems,
  currentPage,
  onPageChange,
  pageSize,
}: PageButtonProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startPage =
    Math.floor((currentPage - 1) / PAGE_BUTTON_COUNT) * PAGE_BUTTON_COUNT + 1;
  const endPage = Math.min(startPage + PAGE_BUTTON_COUNT - 1, totalPages);

  const handlePageClick = (pageNum: number) => {
    onPageChange(pageNum); // 페이지 클릭 시 부모 컴포넌트로 페이지 전달
  };

  return (
    <div className="PagiNation">
      {startPage > 1 && (
        <button
          className="PageButton ArrowButton"
          onClick={() => handlePageClick(startPage - 1)}
        >
          <img src={LeftArrow} alt="Left Arrow" />
        </button>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(startPage + index)}
          className={`PageButton ${
            currentPage === startPage + index ? "active" : ""
          }`}
        >
          {startPage + index}
        </button>
      ))}

      {endPage < totalPages && (
        <button
          className="PageButton ArrowButton"
          onClick={() => handlePageClick(endPage + 1)}
        >
          <img src={RightArrow} alt="Right Arrow" />
        </button>
      )}
    </div>
  );
}

export default PageButton;
