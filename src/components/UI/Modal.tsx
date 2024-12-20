import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ModalProps } from "../../../types/components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 28px;
  border-radius: 8px;
  min-width: 327px;
  position: relative;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 23px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

function useScrollLock(enabled: boolean) {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = "hidden"; // 스크롤 고정
      return () => {
        document.body.style.overflow = ""; // 스크롤 고정 해제
      };
    }
  }, [enabled]);
}

function Modal({ isOpen, closeButton = false, onClose, children }: ModalProps) {
  useScrollLock(isOpen);

  const preventOverlayClick = (e: React.MouseEvent) => e.stopPropagation();

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={preventOverlayClick}>
        {closeButton && <CloseButton onClick={onClose}>X</CloseButton>}
        {children}
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
}

export default Modal;
