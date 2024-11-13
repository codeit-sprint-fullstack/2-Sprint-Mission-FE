import React, { useState } from "react";
import Image from "next/image";

export default function Modal({ isOpen, onClose, onComplete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className=" w-[298px] h-[202px] flex flex-col items-center bg-white rounded-lg">
        <Image
          width={24}
          height={24}
          src="/images/ic_check.png"
          className="mt-[24px]"
          alt="체크이미지"
        />
        <p className="mt-[24px]">정말로 상품을 삭제하시겠어요?</p>
        <div className="w-[184px] h-[48px] flex justify-between mt-[24px]">
          <button
            onClick={onClose}
            className="w-[88px] h-full rounded-[8px] bg-f9fafb border-f74747 border-[1px]
            font-semibold text-f74747"
          >
            취소
          </button>
          <button
            onClick={onComplete}
            className="w-[88px] h-full rounded-[8px] bg-f74747
            font-semibold text-f9fafb"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
