"use client";

import search from "@/../public/assets/ic_search.svg";
import Image from "next/image";
import dropdown from "@/../public/assets/ic_arrow_down.svg";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/api/ProductService";
import BestProduct from "@/components/BestProduct";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/pagination";

interface ProductData {
  totalCount: number;
  list: string[];
}

export default function UsedGoodsMarket() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [bestProductData, setBestProductData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const handleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const getBestProduct = async () => {
      const response = await fetchProduct(1, 4);
      setBestProductData(response.list);
    };

    getBestProduct();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      console.log(currentPage);
      const response = await fetchProduct(currentPage, 10);
      console.log(response);
      setProductData(response);
    };

    getProduct();
  }, [currentPage]);

  const totalPages = Math.max(
    1,
    Math.ceil((productData?.totalCount ?? 0) / itemsPerPage)
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full flex items-center justify-center pb-[7rem]">
      <div className="w-[120rem] flex flex-col justify-center gap-[4rem] items-center">
        <div className="flex flex-col gap-[1.2rem] mt-[2rem]">
          <p className="font-bold text-[2rem] leading-[3.2rem] text-[#111827]">
            베스트 상품
          </p>
          <div className="flex gap-[2.4rem]">
            {bestProductData &&
              bestProductData.slice(0, 4).map((item: any, index: number) => (
                <div key={index}>
                  <BestProduct
                    image={item.images[0]}
                    title={item.name}
                    price={item.price}
                    heartNum={item.favoriteCount}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex gap-[2.4rem] flex-col">
          <div className="flex gap-[2.4rem] justify-between w-full">
            <p className="font-bold text-[2rem] leading-[3.2rem] text-[#111827]">
              판매 중인 상품
            </p>
            <div className="flex gap-[1.2rem]">
              <div className="flex w-[32.5rem] h-[4.2rem] rounded-[1.2rem] py-[0.9rem] px-[2rem] gap-[0.4rem] bg-[#F3F4F6] items-center justify-center">
                <Image src={search} alt="search" width={24} height={24} />
                <input
                  className="w-full bg-[#F3F4F6] font-normal text-[1.6rem] leading-[2.6rem] placeholder:text-[#9CA3AF] focus:outline-none"
                  placeholder="검색할 상품을 입력해주세요"
                />
              </div>
              <button className="h-[4.2rem] rounded-[0.8rem] py-[1.2rem] px-[2.3rem] gap-[1rem] flex bg-[#3692FF] font-semibold text-[1.6rem] leading-[2.6rem] text-[#F3F4F6] items-center justify-center">
                상품 등록하기
              </button>
              <div className="flex flex-col">
                <div
                  className="w-[13rem] h-[4.2rem] rounded-[1.2rem] border border-[#E5E7EB] py-[1.2rem] px-[2rem] items-center justify-between flex relative"
                  onClick={handleDropdown}
                >
                  <p className="font-normal text-[1.6rem] leading-[2.6rem] text-[#1F2937]">
                    최신순
                  </p>
                  <Image src={dropdown} alt="dropdown" width={24} height={24} />
                </div>
                {dropdownOpen && (
                  <div className="flex flex-col w-[13rem] border border-[#E5E7EB] rounded-[1.2rem] items-center justify-center absolute z-10 mt-[5rem] bg-[#ffffff]">
                    <p className="w-full h-[4.2rem] font-normal text-[1.6rem] leading-[2.6rem] text-[#1F2937] border-b border-[E5E7EB] flex items-center justify-center">
                      최신순
                    </p>
                    <p className="w-full h-[4.2rem] font-normal text-[1.6rem] leading-[2.6rem] text-[#1F2937] flex items-center justify-center">
                      좋아요순
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[4rem]">
            <div className="flex gap-[2.4rem]">
              {productData?.list &&
                productData.list.slice(0, 5).map((item: any, index: number) => (
                  <div key={index}>
                    <ProductCard
                      image={item.images[0]}
                      title={item.name}
                      price={item.price}
                      heartNum={item.favoriteCount}
                    />
                  </div>
                ))}
            </div>
            <div className="flex gap-[2.4rem]">
              {productData?.list &&
                productData.list
                  .slice(5, 10)
                  .map((item: any, index: number) => (
                    <div key={index}>
                      <ProductCard
                        image={item.images[0]}
                        title={item.name}
                        price={item.price}
                        heartNum={item.favoriteCount}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
        />
      </div>
    </div>
  );
}
