"use client";

import { fetchProductDetail } from "@/api/ProductService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import kebab from "@/../public/assets/ic_kebab.svg";
import Image from "next/image";
import defProfile from "@/../public/assets/default_profile.svg";
import { formatDate } from "@/utils/UtilDate";
import heart from "@/../public/assets/ic_heart.svg";

interface DetailData {
  createdAt: string;
  description: string;
  favoriteCount: number;
  id: number;
  images: string[];
  isFavorite: boolean;
  name: string;
  ownerId: number;
  ownerNickname: string;
  price: string;
  tags: string[];
  updatedAt: string;
}

export default function UsedGoodsMarketDetail() {
  const { productId } = useParams();
  const [detailData, setDetailData] = useState<DetailData | null>(null);

  useEffect(() => {
    const getProductDetail = async () => {
      const response = await fetchProductDetail(String(productId));
      setDetailData(response);
    };

    getProductDetail();
  }, [productId]);

  if (!detailData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full items-center justify-center flex mt-[2.6rem]">
      <div className="flex w-[120rem] gap-[2.4rem]">
        <img
          src={detailData.images[0]}
          alt="image"
          width={486}
          height={486}
          className="w-[48.6rem] h-[48.6rem] rounded-[1.6rem]"
        />
        <div className="flex flex-col w-full gap-[6.2rem]">
          <div className="flex gap-[2.4rem] flex-col">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-[1.6rem]">
                <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-[#1F2937]">
                  {detailData.name}
                </p>
                <p className="flex-semibold text-[4rem] leading-[4.773rem] text-[#1F2937]">
                  {detailData.price}원
                </p>
              </div>
              <Image src={kebab} alt="kebab" width={24} height={24} />
            </div>
            <div className="border border-[#E5E7EB]" />
            <div className="flex flex-col gap-[2.4rem]">
              <div className="flex flex-col gap-[1.6rem]">
                <p className="font-semibold text-[1.6rem] leading-[2.6rem] text-[#4B5563]">
                  상품 소개
                </p>
                <p className="font-normal text-[1.6rem] leading-[2.6rem] text-[#4B5563]">
                  {detailData.description}
                </p>
              </div>
              <div className="flex flex-col gap-[1.6rem]">
                <p className="font-semibold text-[1.6rem] leading-[2.6rem] text-[#4B5563]">
                  상품 태그
                </p>
                <div className="flex gap-[0.8rem]">
                  {detailData.tags.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="rounded-[2.6rem] py-[0.6rem] px-[1.6rem] gap-[1rem] bg-[#F3F4F6]"
                    >
                      <p className="font-normal text-[1.6rem] leading-[2.6rem] text-[#1F2937]">
                        #{item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex gap-[1.6rem]">
              <Image src={defProfile} alt="profile" />
              <div className="flex flex-col gap-[0.2rem]">
                <p className="font-medium text-[1.4rem] leading-[2.4rem] text-[#4B5563]">
                  {detailData.ownerNickname}
                </p>
                <p className="font-normal text-[1.4rem] leading-[2.4rem] text-[#9CA3AF]">
                  {formatDate(detailData.updatedAt)}
                </p>
              </div>
            </div>
            <div className="flex gap-[2.4rem] items-center">
              <div className="border border-[#E5E7EB] h-[3.4rem]" />
              <div className="h-[4rem] rounded-[3.5rem] border border-[#E5E7EB] py-[0.4rem] px-[1.2rem] gap-[0.4rem] flex items-center">
                <Image src={heart} alt="heart" width={32} height={32} />
                <p className="font-medium text-[1.6rem] leading-[2.6rem] text-[#6B7280]">
                  {detailData.favoriteCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
