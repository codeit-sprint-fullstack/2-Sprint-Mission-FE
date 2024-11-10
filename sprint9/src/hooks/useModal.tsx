"use client";

import Modal from "@/src/components/Modal";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export function useModalAction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [redirectTo, setRedirectTo] = useState(null);
  const [nextAction, setNextAction] = useState();

  const router = useRouter();
  const modalRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  const onModalOpen = ({ msg = "", path = null, action = null }) => {
    return new Promise((resolve) => {
      setIsModalOpen(true);
      setModalMsg(msg);

      if (path) {
        setRedirectTo(path);
      }
      if (action) {
        actionRef.current = () => {
          action();
          resolve();
        };
        setNextAction(() => actionRef.current);
      }
    });
  };

  const onModalCancel = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
      actionRef.current = null;
    }
  };

  const onModalConfirm = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);

      if (redirectTo) {
        router.push(redirectTo);
        setRedirectTo(null);
      }

      if (typeof actionRef.current === "function") {
        actionRef.current();
        actionRef.current = null;
      }
    }
  };

  return {
    modalRef,
    onModalOpen,
    onModalConfirm,
    isModalOpen,
    modalMsg,
    onModalCancel
  };
}

export const useModal = () => {
  const { modalRef, onModalOpen, onModalConfirm, isModalOpen, modalMsg } =
    useModalAction();

  const Modal = () => {
    return (
      isModalOpen && (
        <Modal msg={modalMsg} ref={modalRef} onClose={onModalConfirm} />
      )
    );
  };

  return { Modal, onModalOpen };
};

export const useDeleteModal = () => {
  const {
    modalRef,
    onModalOpen,
    onModalConfirm,
    onModalCancel,
    isModalOpen,
    modalMsg
  } = useModalAction();

  const Modal = () => {
    return (
      isModalOpen && (
        <Modal
          msg={modalMsg}
          ref={modalRef}
          onConfirm={onModalConfirm}
          onCancel={onModalCancel}
        />
      )
    );
  };

  return { Modal, onModalOpen };
};
