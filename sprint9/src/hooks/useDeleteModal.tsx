"use client";

import { useModalAction } from "@/src/hooks/useModalAction";
import TwoButtonModal from "../components/items/TwoButtonModal";

export function useDeleteModal() {
  const { modalRef, onModalOpen, onModalCancel, onModalConfirm } =
    useModalAction();

  const onDeleteConfirm = (action: () => void) => {
    onModalOpen({
      msg: "정말로 삭제하시겠습니까?",
      action
    });
  };

  return {
    Modal: () => (
      <TwoButtonModal
        msg="정말로 삭제하시겠습니까?"
        onCancel={onModalCancel}
        onConfirm={onModalConfirm}
      />
    ),
    onDeleteConfirm
  };
}
