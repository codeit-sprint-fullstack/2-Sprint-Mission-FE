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
    editOnClick();
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    deleteOnClick();
  };

  return <DropBox editOnClick={handleEdit} deleteOnClick={handleDelete} />;
}
