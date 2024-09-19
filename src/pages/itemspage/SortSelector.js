import React from "react";
import Select from "react-select";
import styles from "./SortSelector.module.css";
import pcArrowImage from "./image/pc_arrow.png";
import mobileArrowImage from "./image/mobile_arrow.png";

const options = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" }
];

function SortSelector({ onChangeOrder, className }) {
  const handleSelectChange = (selectedOption) => {
    onChangeOrder(selectedOption.value); // 선택된 값 전달
  };
  const isMobile = window.innerWidth <= 743;
  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "1.6rem",
      width: isMobile ? "4.2rem" : "13rem",
      height: "100%",
      borderRadius: "1.2rem",
      background: `url(${
        isMobile ? mobileArrowImage : pcArrowImage
      }) no-repeat`,
      backgroundPosition: isMobile ? "center" : "calc(100% - 20px) center"
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: isMobile ? 0 : "1.6rem", // 선택된 값의 글씨 크기 설정
      marginLeft: "2rem"
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "1.6rem", // 드롭다운 옵션의 글씨 크기 설정
      borderRadius: "1.2rem"
    }),
    indicatorSeparator: () => ({
      display: "none" // 구분선 없애기
    }),
    dropdownIndicator: () => ({
      display: "none"
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "1.6rem", // 옵션 메뉴의 글씨 크기 설정
      width: "13rem", // 메뉴의 너비를 고정 (필요에 따라 조정)
      borderRadius: "1.2rem"
    })
  };
  return (
    <div className={`${styles.frame} ${className}`}>
      <label htmlFor="options" />
      <Select
        options={options}
        styles={customStyles}
        onChange={handleSelectChange}
        className={styles.sortSelector} // 스타일 클래스 적용
        isSearchable={false} // 검색 기능 비활성화
        defaultValue={options[0]} // 기본값 설정 (최신순)
      />
    </div>
  );
}

export default SortSelector;
