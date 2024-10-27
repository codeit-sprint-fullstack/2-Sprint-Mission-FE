import { useState } from "react";
import style from "./styles/KebabMenu.module.css"; // CSS 파일도 생성 필요
import kebab from "@/public/ic_kebab.png";
import Image from "next/image";

const KebabMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEdit = () => {
    onEdit();
    toggleMenu();
  };

  const handleDelete = () => {
    onDelete();
    toggleMenu();
  };

  return (
    <div className={style.kebabContainer}>
      <div className={style.kebabIcon} onClick={toggleMenu}>
        <Image className={style.commentKebabIcon} src={kebab} alt="kebab" />
      </div>
      {isOpen && (
        <div className={style.menu}>
          <button onClick={handleEdit}>수정하기</button>
          <button onClick={handleDelete}>삭제하기</button>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
