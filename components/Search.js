import Image from "next/image";
import style from "./styles/Search.module.css";
import ic_search from "@/public/ic_search.png";
import ic_X from "@/public/ic_X.png";
import { useState } from "react";

export default function Search({ setSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handlesearchChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setSearch("");
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div className={style.searchGroup}>
      <Image className={style.searchIcon} src={ic_search} alt="ic_search" />
      <input
        className={style.search}
        placeholder="검색할 상품을 입력해주세요"
        value={inputValue}
        onChange={handlesearchChange}
        onKeyDown={handleSearchKeyPress}
      ></input>
      {inputValue && (
        <Image
          className={style.clearIcon}
          src={ic_X}
          alt="ic_X"
          onClick={handleClear}
        />
      )}
    </div>
  );
}
