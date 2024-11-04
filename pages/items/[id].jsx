import { getProductWithComments } from "@/api/api";
import Image from "next/image";
import useGetData from "@/hooks/useGetData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MODEL_TYPE } from "@/constants";
import EditDeleteDropDown from "@/components/EditDeleteDropDown";
const { PRODUCT_WITH_COMMENTS } = MODEL_TYPE;
export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return;
  const { product, comments } = useGetData({
    type: PRODUCT_WITH_COMMENTS,
    id,
    count: 3
  });
  return (
    <div className="w-full flex justify-center">
      <div
        className="w-[1200px] mt-[24px] mb-[277px]
      md:w-[696px] md:mb-[298px]
      sm:w-[344px] sm:mt-[16px] sm:mb-[139px]"
      >
        <div
          className="w-full h-[496px] lg:mt-[5px] flex justify-between sm:flex-col
        md:h-[484px]
        sm:h-[827px]"
        >
          <div
            className="w-[486px] h-[486px] relative
          md:w-[340px] md:h-[340px]
          sm:w-full sm:h-[343px]"
          >
            <Image
              src="/images/default.png"
              layout="fill"
              objectFit="cover" // 부모 요소를 완전히 채우도록 조정
              sizes="100vw"
              alt="상품이미지"
            />
          </div>
          <div className="w-[690px] h-full flex flex-col md:w-[340px] sm:w-full sm:h-[468px]">
            <div className="w-full h-[32px] sm:h-[26px] flex justify-between">
              <h1
                className="h-full text-[24px] leading-32px font-semibold text-1f2937
                md:text-[20px]sm:text-[16px] sm:leading-26px"
              >
                {product?.name}
              </h1>
              <EditDeleteDropDown />
            </div>
            <span
              className="h-[48px] text-[40px] font-semibold leading-47.73px mt-[16px]
            md:h-[42px] md:text-[32px] md:leading-42px md:mt-[8px]
            sm:h-[32px] sm:text-[24px] sm:leading-32px sm:mt-[8px]"
            >
              {product.price}
            </span>
            <div className="h-[1px] w-full mt-[16px] bg-e5e7eb"></div>
            {/* 구분선 */}
            <span
              className="w-full h-[26px] mt-[16px] text-[16px] font-semibold leading-26px text-4B5563
              lg:mt-[24px]
              md:h-[24px] md:text-[14px] md:leading-24px
              sm:h-[24px] sm:text-[14px] sm:leading-24px"
            >
              상품소개
            </span>
            <div
              className="w-full h-[128px] text-[16px] leading-26px mt-[8px] text-4b5563 lg:mt-[16px]
            md:h-[212px] sm:h-[180px]"
            >
              {product?.description}
            </div>
            <div
              className="w-full h-[24px] text-[16px] leading-26px font-semibold text-4b5563 lg:h-[26px]
            md:text-[14px] md:leading-24px
            sm:text-[14px] sm:leading-24px"
            >
              상품 태그
            </div>
            <div className="w-full h-[36px] mt-[8px] lg:mt-[16px] flex gap-[8px]">
              {product?.tags.map((tag) => (
                <div className="h-full leading-26px px-[16px] py-[6px] rounded-[26px] bg-f3f4f6">
                  #{tag}
                </div>
              ))}
            </div>
            <div className="w-full h-[50px] mt-[40px] lg:mt-[62px] items-center flex">
              <Image
                width={40}
                height={40}
                src="/images/ic_big_profile.png"
                alt="프로필 이미지"
                style={{ objectFit: "cover" }}
              />
              <div className="h-full flex flex-col ml-[24px]">
                <span className="w-[69px] h-[24px] text-[14px] leading-24px text-4b5563">
                  총명한 판다
                </span>
                <span className="w-[80px] h-[24px] text-[14px] leading-24px text-9ca3af whtiespace-nowrap">
                  2024. 01. 01
                </span>
              </div>
              <div
                className="h-[34px] ml-[445px] mr-[24px] border-l border-e5e7eb
              md:ml-[93px] sm:ml-[97px]"
              ></div>
              {/*구분선*/}
              <button
                className="w-[87px] h-[40px] flex items-center gap-[4px] px-[12px] py-[4px] rounded-[35px] border-[1px]
                md:w-[79px] md:h-[32px]
                sm:w-[79px] sm:h-[32px]"
              >
                <Image
                  width={20.1}
                  height={17.48}
                  src="/images/ic_bigheart.png"
                  alt="하트이미지"
                />
                <span className="text-[16px] leading-26px text-6b7280">
                  123
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
