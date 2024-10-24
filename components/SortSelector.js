import React, { useEffect, useState } from "react";
import Select from "react-select";

const options = [
  { value: "newest", label: "최신순" },
  { value: "favoritest", label: "좋아요순" }
];

function SortSelector({ onChangeOrder, className }) {
  const sortSelector = `w-[130px] h-[42px] text-[16px] leading-26px
        sm: w-[42px]`;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSelectChange = (selectedOption) =>
    onChangeOrder(selectedOption.value); // 선택된 값 전달

  const pcArrowImage = "/images/pc_arrow.png";
  const mobileArrowImage = "/images/mobile_arrow.png";
  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "16px",
      width: isMobile ? "42px" : "130px",
      height: "100%",
      borderRadius: "12px",
      background: `url(${
        isMobile ? mobileArrowImage : pcArrowImage
      }) no-repeat`,
      backgroundPosition: isMobile ? "center" : "calc(100% - 20px) center"
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: isMobile ? 0 : "16px", // 선택된 값의 글씨 크기 설정
      marginLeft: "20px"
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "16px", // 드롭다운 옵션의 글씨 크기 설정
      borderRadius: "12px"
    }),
    indicatorSeparator: () => ({
      display: "none" // 구분선 없애기
    }),
    dropdownIndicator: () => ({
      display: "none"
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "16px", // 옵션 메뉴의 글씨 크기 설정
      width: "130px", // 메뉴의 너비를 고정 (필요에 따라 조정)
      borderRadius: "12px"
    })
  };
  return (
    <div className={`${className}`}>
      <label htmlFor="options" />
      <Select
        options={options}
        styles={customStyles}
        onChange={handleSelectChange}
        className={sortSelector} // 스타일 클래스 적용
        isSearchable={false} // 검색 기능 비활성화
        defaultValue={options[0]} // 기본값 설정 (최신순)
      />
    </div>
  );
}

export default SortSelector;
