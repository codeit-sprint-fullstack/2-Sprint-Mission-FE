"use client";

import { useState } from "react";
import { useModalAction } from "@/src/hooks/useModalAction";
import Modal from "../components/Modal";

export function useSingleButtonModal() {
  const { onModalOpen, onModalCancel, isModalOpen } = useModalAction();
  const [action, setAction] = useState<() => void>(() => {});

  const onActionConfirm = (actionToConfirm: () => void) => {
    setAction(() => actionToConfirm);
    onModalOpen({ msg: "정말로 실행하시겠습니까?" });
  };

  const handleClose = () => {
    onModalCancel();
  };

  return {
    Modal: () => isModalOpen && <Modal msg={/* 수정 필요 */} onClose={handleClose} />,
    onActionConfirm
  };
}
