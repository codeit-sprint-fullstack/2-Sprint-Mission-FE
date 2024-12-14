import React, { useState } from "react";
import "./DropdownMenu.css";
import { ReactComponent as SortIcon } from "../../assets/images/icons/ic_sort.svg";

type SortOption = "recent" | "favorite";
interface DropdownMenuProps {
  onSortSelection: (onSortSelection: SortOption) => void;
}

function DropdownMenu({ onSortSelection }: DropdownMenuProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="sortButtonWrapper">
      <button className="sortDropdownTriggerButton" onClick={toggleDropdown}>
        <SortIcon />
      </button>

      {isDropdownVisible && (
        <div className="dropdownMenu">
          <div
            className="dropdownItem"
            onClick={() => {
              onSortSelection("recent");
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </div>
          <div
            className="dropdownItem"
            onClick={() => {
              onSortSelection("favorite");
              setIsDropdownVisible(false);
            }}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
}
export default DropdownMenu;
