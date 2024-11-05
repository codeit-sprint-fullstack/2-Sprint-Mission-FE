import { useState } from "react";
import style from "./Dropdown.module.css";

export default function Dropdown({ isOpen, itemId, toggleDropdown }) {
  const handleEdit = () => {
    console.log("수정하기");
  };

  const handleDelete = () => {
    console.log("삭제하기");
  };
  return (
    <>
      {isOpen && (
        <div className={style.container}>
          <button className={style.editButton} onClick={handleEdit}>
            수정하기
          </button>
          <button className={style.deleteButton} onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      )}
    </>
  );
}
