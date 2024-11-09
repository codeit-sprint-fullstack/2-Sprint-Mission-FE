"use client";

import DropBox from "../DropBox";

interface DropBoxWrapperProps {
  editOnClick: () => void;
  deleteOnClick: () => void;
}

export default function DropBoxWrapper({
  editOnClick,
  deleteOnClick
}: DropBoxWrapperProps) {
  const handleEdit = () => {
    console.log("Edit clicked");
    editOnClick(); // 부모에서 전달된 editOnClick 호출
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    deleteOnClick(); // 부모에서 전달된 deleteOnClick 호출
  };

  return <DropBox editOnClick={handleEdit} deleteOnClick={handleDelete} />;
}
