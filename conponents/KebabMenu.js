import styles from "./KebabMenu.module.css";
import kebabIcon from "@/public/ic_kebab.svg";
import Image from "next/image";
import { useState } from "react";

export default function KebabMenu({ id, onEditClick, onDeleteClick }) {
  const [kebabMenuOpen, setKebabMenuOpen] = useState(null);

  const toggleDropdown = (id) => {
    if (kebabMenuOpen === id) {
      setKebabMenuOpen(null);
    } else {
      setKebabMenuOpen(id);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.kebabIcon}
        width="24"
        height="24"
        src={kebabIcon}
        alt="kebabIcon"
        onClick={() => toggleDropdown(id)}
      />
      {kebabMenuOpen && (
        <ul className={styles.menu}>
          <li className={styles.edit} onClick={onEditClick}>
            수정하기
          </li>
          <li className={styles.delete} onClick={onDeleteClick}>
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
}
