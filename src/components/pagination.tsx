import Image from "next/image";
import arrowLeft from "@/../public/assets/arrow_left.svg";
import arrowRight from "@/../public/assets/arrow_right.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNext = false,
}: PaginationProps) {
  const maxPageNumbers = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage < maxPageNumbers - 1) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  return (
    <div className="flex gap-[1.2rem] items-center">
      <>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-[50%] border border-[#E5E7EB] w-[4rem] h-[4rem] flex items-center justify-center"
        >
          <Image src={arrowLeft} alt="화살표" width={16} height={16} />
        </button>
        <div className="flex gap-[0.6rem]">
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              className={`w-[4rem] h-[4rem] rounded-[50%] font-semibold text-[1.6rem] leading-[2.6rem] ${
                startPage + index === currentPage
                  ? "text-[#F9FAFB] bg-[#2F80ED]"
                  : "text-[#6B7280] border border-[#E5E7EB]"
              }`}
              key={startPage + index}
              onClick={() => onPageChange(startPage + index)}
            >
              {startPage + index}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext || currentPage === totalPages}
          className="rounded-[50%] border border-[#E5E7EB] w-[4rem] h-[4rem] flex items-center justify-center"
        >
          <Image src={arrowRight} alt="화살표" width={16} height={16} />
        </button>
      </>
    </div>
  );
}
