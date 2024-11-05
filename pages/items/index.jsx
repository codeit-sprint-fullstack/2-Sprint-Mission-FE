import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useResponsiveItemCount from "@/hooks/useResponsiveItemCount";
import Link from "next/link";
import Image from "next/image";
import SortSelector from "@/components/SortSelector";
import { getProducts } from "@/api/api";
import { MODEL_TYPE } from "@/constants";
const { PRODUCT_LIST } = MODEL_TYPE;

export default function Items() {
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(0);
  const pageSize = useResponsiveItemCount({ sm: 4, md: 6, lg: 10 });
  const [keyword, setKeyword] = useState("");
  const [buttonList, setButtonList] = useState([]);
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery({
    queryKey: ["productList", order, pageSize, page],
    queryFn: () =>
      getProducts({
        orderBy: order,
        page: page + 1,
        pageSize
      }),
    enabled: !!pageSize
  });
  const { list: productList, totalCount } = data?.data || {};
  const totalPage = Math.ceil(totalCount / pageSize);
  const onClickPageButton = (e) => setPage(Number(e.target.value));
  const onClickLeftArrowButton = (e) => {
    if (buttonList[0] <= 5) {
      setButtonList(
        Array.from({ length: Math.min(totalPage, 5) }, (_, index) => index)
      );
    } else setButtonList((prev) => prev.map((page) => Number(page) - 5));
  };
  const onClickRightArrowButton = (e) => {
    if (buttonList[4] >= Number(totalPage) - 5)
      setButtonList([
        totalPage - 5,
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1
      ]);
    else setButtonList((prev) => prev.map((page) => Number(page) + 5));
  };
  const handleChangeOrder = (chosenOrder) => setOrder(chosenOrder);
  const handleOnChangeKeyword = (e) => setKeyword(e.target.value);
  useEffect(() => {
    // totalPage가 변경될 때 buttonList 업데이트
    if (totalPage < page) setPage(0);
    const startPage = Math.floor(page / 5) * 5; // 현재 페이지를 기준으로 시작 페이지 계산
    const endPage = Math.min(startPage + 5, totalPage); // 끝 페이지 계산
    const nextButtonList = Array.from(
      { length: endPage - startPage },
      (_, index) => startPage + index
    );
    setButtonList(nextButtonList);
  }, [totalPage, pageSize, page]);
  if (isPending) return <div>로딩중입니다</div>;
  return (
    <div className="w-full h-full flex justify-center bg-fcfcfc">
      <div
        className="w-[1200px] h-[827px] mt-[26px] mb-[140px] flex flex-col justify-between items-center
        md:w-[696px] md:h-[832px] md:mb-[165px]
        sm:w-[344px] sm:h-[754px] sm:mt-[17px] sm:mb-[135px]"
      >
        <div className="w-full h-[42px] flex relative sm:h-[92px]">
          <h1 className="w-[113px] h-[32px] text-[20px] font-bold leading-32px text-1f2937 whitespace-nowrap">
            판매 중인 상품
          </h1>
          <div
            className="w-[325px] h-[42px] flex relative py-[9px] pl-[44px] pr-[16px] bg-f3f4f6 rounded-12px
            lg:ml-[475px]
            md:w-[242px] md:ml-[50px]
            sm:w-[288px] sm:ml-0 sm:absolute sm:bottom-0 sm:left-0"
          >
            <Image
              className="absolute left-[16px] top-[50%] transform -translate-y-[50%]"
              width={24}
              height={24}
              src="/images/ic_search.png"
              alt="검색 돋보기 이미지"
            />
            <input
              className="w-full h-full bg-f3f4f6 text-[16px] leading-24px focus:outline-none"
              onChange={handleOnChangeKeyword}
              placeholder="검색할 상품을 입력해주세요"
            ></input>
          </div>
          <Link
            href="/items/write"
            className="w-[133px] h-[42px] flex items-center justify-center text-f3f4f6 font-semibold rounded-8px bg-3692ff ml-[12px] whitespace-nowrap
            sm:ml-0 sm:absolute sm:top-0 sm:right-[45px]"
          >
            상품 등록하기
          </Link>
          <SortSelector
            className="flex justify-center items-center ml-[12px] whitespace-nowrap
            sm:ml-0 sm:absolute sm:bottom-0 sm:right-0"
            onChangeOrder={handleChangeOrder}
          />
        </div>
        <div
          className="w-full h-[678px] grid grid-cols-5 grid-rows-2 gap-x-[25px] gap-y-[39px]
          md:grid-cols-3 md:gap-x-[17px]  md:gap-y-[40px]
          sm:h-[566px] sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-[10px] sm:gap-y-[32px]"
        >
          {productList?.map((product) => (
            <Link href={`/items/${product.id}`} key={product.id}>
              <div
                className="w-[220px] h-[319px] text-1f2937 flex flex-col
                sm:w-[167px] sm:h-[267px]"
              >
                <Image
                  width={220}
                  height={220}
                  src="/images/default.png"
                  alt="기본 상품 이미지"
                />
                <span className="h-[24px] text-[14px] leading-24px mt-[16px]">
                  {product.name}
                </span>
                <span className="h-[26px] text-[16px] font-bold leading-26px mt-[6px]">
                  {product.price}원
                </span>
                <div className="h-[19px] flex mt-[8px] items-start">
                  <Image
                    width={16}
                    height={16}
                    src="/images/ic_heart.png"
                    alt="좋아요 이미지"
                  />
                  <span className="h-[18px] text-[12px] leading-18px mt-[1px] ml-[4px]">
                    {product.favoriteCount}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-[304px] h-[40px] flex justify-between">
          <button
            className="w-[40px] h-[40px] flex justify-center items-center rounded-full
           text-6b7280 font-semibold border-[1px] border-e5e7eb bg-ffffff"
            onClick={onClickLeftArrowButton}
            disabled={buttonList.includes(0)}
          >
            <Image
              width={16}
              height={16}
              src="/images/arrow_left.png"
              alt="페이지 화살표 이미지"
            />
          </button>
          <ul className="w-[216px] flex gap-x-[4px]">
            {buttonList.map((buttonPage) => (
              <li key={buttonPage}>
                <button
                  onClick={onClickPageButton}
                  className={`w-[40px] h-[40px] flex justify-center items-center rounded-full font-semibold ${
                    buttonPage === page
                      ? "text-ffffff bg-2f80ed"
                      : "text-6b7280 border-[1px] border-e5e7eb bg-ffffff"
                  }`}
                  value={buttonPage}
                >
                  {buttonPage + 1}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="w-[40px] h-[40px] flex justify-center items-center rounded-full
          text-6b7280 font-semibold border-[1px] border-e5e7eb bg-ffffff"
            onClick={onClickRightArrowButton}
            disabled={buttonList[buttonList.length - 1] >= totalPage - 1}
          >
            <Image
              width={16}
              height={16}
              src="/images/arrow_right.png"
              alt="페이지 화살표 이미지"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
