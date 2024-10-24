import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Items() {
  const itemsPage = `w-full h-full flex justify-center bg-fcfcfc`;
  const items = `w-[1200px] h-[827px] mt-[26px] mb-[140px] flex flex-col justify-between items-center
    md:w-[696px] md:h-[832px] md:mb-[165px]
    sm:w-[344px] sm:h-[754px] sm:mt-[17px] sm:mb-[135px]`;

  const header = `w-full h-[42px] flex relative
    sm:h-[92px]`;
  const title = `w-[113px] h-[32px] text-[20px] font-bold leading-32px text-1f2937 whitespace-nowrap`;
  const searchBox = `w-[325px] h-[42px] flex relative py-[9px] pl-[44px] pr-[16px] bg-f3f4f6 rounded-12px
    lg:ml-[475px]
    md:w-[242px] md:ml-[50px]
    sm:w-[288px] sm:ml-0 sm:absolute sm:bottom-0 sm:left-0`;

  const searchIcon =
    "absolute left-[16px] top-[50%] transform -translate-y-[50%]";
  const searchInput =
    "w-full h-full bg-f3f4f6 text-[16px] leading-24px focus:outline-none";

  const registerBtn = `w-[133px] h-[42px] flex items-center justify-center text-f3f4f6 font-semibold rounded-8px bg-3692ff ml-[12px] whitespace-nowrap
    sm:ml-0 sm:absolute sm:top-0 sm:right-[45px]`;

  const sortSelector = `w-[130px] h-[42px] flex justify-center items-center ml-[12px] whitespace-nowrap
    sm:w-[42px] sm:ml-0 sm:absolute sm:bottom-0 sm:right-0`;
  const productListClass = `w-full h-[678px] grid grid-cols-5 grid-rows-2 gap-x-[25px] gap-y-[39px]
    md:grid-cols-3 md:grid-cols-2 md:gap-x-[17px]  md:gap-y-[40px]
    sm:h-[566px] sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-[10px] sm:gap-y-[32px]`;
  const productClass = `w-[220px] h-[319px] text-1f2937 flex flex-col
    sm:w-[167px] sm:h-[267px]`;
  const productName = `h-[24px] text-[14px] leading-24px mt-[16px]`;
  const productPrice = `h-[26px] text-[16px] font-bold leading-26px mt-[6px]`;
  const favorite = "h-[19px] flex mt-[8px] items-start";
  const productFavoriteCount = `h-[18px] text-[12px] leading-18px mt-[1px]`;
  const pageNation = `w-[304px] h-[40px] flex justify-between`;
  const pageButton = `w-[40px] h-[40px] flex justify-center items-center rounded-full
    text-6b7280 font-semibold border-[1px] border-e5e7eb`;
  const pageButtonContainer = `w-[216px] flex gap-x-[4px]`;
  const PC_WIDTH = 1200;
  const TABLET_WIDTH = 744;
  const getPageSize = (width) => {
    if (width > PC_WIDTH) return 10;
    if (width > TABLET_WIDTH) return 6;
    return 4;
  };
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    const onResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const products = [
    { id: 1, name: "상품 A", price: 10000, favoriteCount: 25 },
    { id: 2, name: "상품 B", price: 15000, favoriteCount: 30 },
    { id: 3, name: "상품 C", price: 20000, favoriteCount: 15 },
    { id: 4, name: "상품 D", price: 25000, favoriteCount: 40 },
    { id: 5, name: "상품 E", price: 30000, favoriteCount: 50 },
    { id: 6, name: "상품 F", price: 35000, favoriteCount: 10 },
    { id: 7, name: "상품 G", price: 40000, favoriteCount: 5 },
    { id: 8, name: "상품 H", price: 45000, favoriteCount: 20 },
    { id: 9, name: "상품 I", price: 50000, favoriteCount: 35 },
    { id: 10, name: "상품 J", price: 55000, favoriteCount: 60 }
  ];
  const list = products.slice(0, pageSize);
  console.log(list);
  return (
    <div className={itemsPage}>
      <div className={items}>
        <div className={header}>
          <h1 className={title}>판매 중인 상품</h1>
          <div className={searchBox}>
            <Image
              className={searchIcon}
              width={24}
              height={24}
              src="/images/ic_search.png"
            />
            <input
              className={searchInput}
              placeholder="검색할 상품을 입력해주세요"
            ></input>
          </div>
          <Link href="/register" className={registerBtn}>
            상품 등록하기
          </Link>
          <span className={sortSelector}>최신순</span>
        </div>
        <div className={productListClass}>
          {list.map((product) => (
            <div className={productClass} key={product.id}>
              <Image width={220} height={220} src="/images/default.png" />
              <span className={productName}>{product.name}</span>
              <span className={productPrice}>{product.price}원</span>
              <div className={favorite}>
                <Image width={16} height={16} src="/images/ic_heart.png" />
                <span className={productFavoriteCount}>
                  {product.favoriteCount}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={pageNation}>
          <button className={pageButton}>
            <Image
              width={16}
              height={16}
              src="/images/arrow_left.png"
              alt="페이지 화살표 이미지"
            />
          </button>
          <div className={pageButtonContainer}>
            <button className={pageButton}>1</button>
            <button className={pageButton}>2</button>
            <button className={pageButton}>3</button>
            <button className={pageButton}>4</button>
            <button className={pageButton}>5</button>
          </div>
          <button className={pageButton}>
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
