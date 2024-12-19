interface ValidationModalProps {
  message: string;
  onClose: () => void;
}

export default function ValidationModal({
  message,
  onClose,
}: ValidationModalProps) {
  return (
    <div className="w-full h-full flex items-center justify-center absolute bg-[#000000] bg-opacity-70">
      <div className="w-[54rem] h-[25rem] rounded-[0.8rem] gap-[1rem] bg-[#FFFFFF] items-center justify-center flex flex-col gap-[4rem]">
        <p className="font-medium text-[1.8rem] leading-[2.6rem] text-[#1F2937] text-center">
          {message}
        </p>
        <button
          className="w-[16.5rem] h-[4.8rem] rounded-[0.8rem] py-[1.2rem] px-[2.3rem] gap-[1rem] bg-[#3692FF] font-semibold text-[1.6rem] leading-[2.6rem] text-[#F3F4F6]"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}
