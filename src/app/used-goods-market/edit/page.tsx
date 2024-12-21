export default function ProductDetailPage() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex w-[120rem] flex-col mt-[2.6rem]">
        <div className="flex justify-between">
          <p className="font-bold text-[2rem] leading-[3.2rem] text-[#1F2937]">
            상품 등록하기
          </p>
          <button className="h-[4.2rem] rounded-[0.8rem] px-[2.3rem] bg-[#9CA3AF] text-semibold text-[1.6rem] leading-[2.6rem] text-[#F3F4F6]">
            등록
          </button>
        </div>
        <div>
          <div>
            <p>상품 이미지</p>
          </div>
          <div>
            <p>상품명</p>
          </div>
          <div>
            <p>상품 소개</p>
          </div>
          <div>
            <p>판매가격</p>
          </div>
          <div>
            <p>태그</p>
          </div>
        </div>
      </div>
    </div>
  );
}
