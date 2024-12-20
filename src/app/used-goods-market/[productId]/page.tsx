"use client";

import { fetchProductDetail } from "@/api/ProductService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import kebab from "@/../public/assets/ic_kebab.svg";
import Image from "next/image";
import defProfile from "@/../public/assets/default_profile.svg";
import { formatDate } from "@/utils/UtilDate";
import heart from "@/../public/assets/ic_heart.svg";
import {
  fetchProductComment,
  fetchProductCommentWrite,
} from "@/api/CommentService";
import Comment from "@/components/Comment";
import back from "@/../public/assets/ic_back.svg";

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

interface CommentData {
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
  writer: WriterData;
}

interface WriterData {
  id: number;
  image: string;
  nickname: string;
}

export default function UsedGoodsMarketDetail() {
  const { productId } = useParams();

  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const getProductDetail = async () => {
      const response = await fetchProductDetail(String(productId));
      setDetailData(response);
    };

    getProductDetail();
  }, [productId]);

  useEffect(() => {
    const getProductComment = async () => {
      const response = await fetchProductComment(String(productId));
      setCommentData(response.list);
    };

    getProductComment();
  }, [productId]);

  const handleRegisterButton = async (text: string) => {
    if (!text.trim()) return;

    try {
      await fetchProductCommentWrite(String(productId), text);
      alert("댓글이 성공적으로 등록되었습니다.");
      const response = await fetchProductComment(String(productId));
      setCommentData(response.list);
      setText("");
    } catch (error) {
      console.error("Error registering comment:", error);
      alert("댓글 등록 중 오류가 발생했습니다. 다시 한 번 시도해주세요.");
    }
  };

  if (!detailData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full items-center justify-center flex mt-[2.6rem] pb-[7rem]">
      <div className="flex flex-col w-[120rem] gap-[4rem] items-center">
        <div className="flex w-full flex-col gap-[4rem]">
          <div className="flex gap-[2.4rem]">
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
          <div className="border border-[#E5E7EB] w-full" />
        </div>
        <div className="flex flex-col gap-[2.4rem] w-full">
          <div className="w-full flex flex-col items-end gap-[1.6rem]">
            <div className="w-full flex flex-col gap-[1rem]">
              <p className="font-semibold text-[1.6rem] leading-[2.6rem] text-[#111827]">
                문의하기
              </p>
              <textarea
                className="w-full h-[10.4rem] rounded-[1.2rem] py-[1.6rem] px-[2.4rem] bg-[#F3F4F6] resize-none gap-[1rem] font-normal text-[1.6rem] leading-[2.6rem] placeholder:text-[#9CA3AF] focus:outline-none"
                placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 읻에 대한 민형사상 책임은 게시자에게 있습니다."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              className={`h-[4.2rem] rounded-[0.8rem] py-[1.2rem] px-[2.3rem] gap-[1rem] font-semibold text-[1.6rem] leading-[2.6rem] text-[#F3F4F6] items-center flex ${
                text ? "bg-[#3692FF]" : "bg-[#9CA3AF]"
              }`}
              onClick={() => handleRegisterButton(text)}
            >
              등록
            </button>
          </div>
          <div className="flex flex-col gap-[4rem]">
            {commentData.map((item: CommentData, index: number) => (
              <div key={index}>
                <Comment
                  content={item.content}
                  image={item.writer.image}
                  name={item.writer.nickname}
                  updatedAt={item.updatedAt}
                />
              </div>
            ))}
          </div>
        </div>
        <button className="w-[24rem] h-[4.8rem] rounded-[4rem] gap-[0.8rem] bg-[#3692FF] font-semibold text-[1.8rem] leading-[2.6rem] text-[#F3F4F6] flex items-center justify-center">
          목록으로 돌아가기
          <Image src={back} alt="back" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
