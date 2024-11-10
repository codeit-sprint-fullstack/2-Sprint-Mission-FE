"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useModalAction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [nextAction, setNextAction] = useState<(() => void) | undefined>();

  const router = useRouter();
  const modalRef = useRef<any>(null);
  const actionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  const onModalOpen = ({
    msg = "",
    path = null,
    action = null
  }: {
    msg: string;
    path?: string | null;
    action?: () => void | null;
  }) => {
    return new Promise<void>((resolve) => {
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
