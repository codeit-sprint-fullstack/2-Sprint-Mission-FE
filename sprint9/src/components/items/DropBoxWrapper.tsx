"use client";

import DropBox from "../DropBox";

interface DropBoxWrapperProps {
  editOnClick: () => void;
  deleteOnClick: () => void;
}

export default function DropBoxWrapper() {
  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };
  return <DropBox editOnClick={handleEdit} deleteOnClick={handleDelete} />;
}
