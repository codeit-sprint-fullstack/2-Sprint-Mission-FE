import style from "./Dropdown.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios.js";
import DeleteModal from "./DeleteModal.js";
import { useState } from "react";

export default function Dropdown({
  item,
  handleDeleteItem,
  isOpen,
  toggleDropdown,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 모달 열기 상태
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log("수정하기");
    navigate(`/items/${item.id}/patchitem`);
  };

  const handleDelete = async () => {
    console.log("삭제하기");
  };

  return (
    <>
      {isOpen && (
        <div className={style.container}>
          <button className={style.editButton} onClick={handleEdit}>
            수정하기
          </button>
          <button
            className={style.deleteButton}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            삭제하기
          </button>
        </div>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onDelete={handleDeleteItem}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
