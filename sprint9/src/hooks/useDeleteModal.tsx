"use client";

import { useState } from "react";
import { useModalAction } from "@/src/hooks/useModalAction";
import TwoButtonModal from "../components/items/TwoButtonModal";

//TODO: API 연결 후 다시 확인 필요
export function useDeleteModal() {
  const { modalRef, onModalOpen, onModalCancel, onModalConfirm, isModalOpen } =
    useModalAction();
  const [action, setAction] = useState<() => void>(() => {});

  const onDeleteConfirm = (deleteAction: () => void) => {
    setAction(() => deleteAction);
    onModalOpen({ msg: "정말로 삭제하시겠습니까?" });
  };

  const handleConfirm = () => {
    action();
    onModalConfirm();
  };

  const handleCancel = () => {
    onModalCancel();
  };

  return {
    Modal: () =>
      isModalOpen && (
        <TwoButtonModal
          msg="정말로 삭제하시겠e습니까?"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      ),
    onDeleteConfirm
  };
}
