"use client";

import { useState } from "react";
import close from "@/../public/assets/ic_X.svg";
import Image from "next/image";
import plus from "@/../public/assets/ic_plus.svg";
import { fetchProductRegister } from "@/api/ProductService";

export default function ProductDetailPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagesArray, setImagesArray] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tag.trim() !== "" && !tagsArray.includes(tag)) {
        setTagsArray([...tagsArray, tag]);
      } else if (tagsArray.includes(tag)) {
        e.preventDefault();
      }
      setTag("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length > 3) {
        alert("이미지는 최대 3개까지 등록할 수 있습니다.");
        return;
      }
      setImages([...images, ...selectedFiles]);
    }
  };

  const handleSubmit = async () => {
    await fetchProductRegister(images, tagsArray, price, description, name);
  };

  return (
    <div className="flex items-center justify-center w-full mb-[7rem]">
      <div className="flex w-[120rem] flex-col mt-[2.6rem] gap-[2.4rem]">
        <div className="flex justify-between">
          <p className="font-bold text-[2rem] leading-[3.2rem] text-[#1F2937]">
            상품 등록하기
          </p>
          <button
            disabled
            className={`h-[4.2rem] rounded-[0.8rem] px-[2.3rem] text-semibold text-[1.6rem] leading-[2.6rem] text-[#F3F4F6] ${
              name && description && price && tagsArray
                ? "bg-[#3692FF]"
                : "bg-[#9CA3AF]"
            }`}
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex flex-col gap-[1.6rem] w-full">
            <p className="font-bold text-[1.8rem] leading-[2.6rem] text-[#1F2937]">
              상품 이미지
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <div className="flex gap-[2.4rem]">
              {images.length < 3 && (
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-[28.2rem] h-[28.2rem] rounded-[1.2rem] bg-[#F3F4F6] flex items-center justify-center flex-col gap-[1.2rem]">
                    <Image src={plus} alt="plus" />
                    <p className="font-normal text-[1.6rem] leading-[2.6rem] text-[#9CA3AF]">
                      이미지 등록
                    </p>
                  </div>
                </label>
              )}
              <div className="flex gap-[1.2rem]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-[28.2rem] h-[28.2rem] rounded-[1.2rem] bg-[#F3F4F6] relative border border-[#F9FAFB]"
                  >
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      width={282}
                      height={282}
                      className="h-full w-full object-cover rounded-[1.2rem]"
                    />
                    <Image
                      src={close}
                      alt="close"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute top-[1.2rem] right-[1.2rem] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1.6rem] w-full">
            <p className="font-bold text-[1.8rem] leading-[2.6rem] text-[#1F2937]">
              상품명
            </p>
            <input
              className="w-full h-[5.6rem] rounded-[1.2rem] py-[1.6rem] px-[2.4rem] gap-[1rem] bg-[#F3F4F6] font-normal text-[1.6rem] leading-[2.6rem] placeholder:text-[#9CA3AF] focus:outline-none"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[1.6rem] w-full">
            <p className="font-bold text-[1.8rem] leading-[2.6rem] text-[#1F2937]">
              상품 소개
            </p>
            <textarea
              className="h-[28.2rem] rounded-[1.2rem] py-[1.6rem] px-[2.4rem] gap-[1rem] bg-[#F3F4F6] resize-none font-normal text-[1.6rem] leading-[2.6rem] placeholder:text-[#9CA3AF] focus:outline-none"
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[1.6rem] w-full">
            <p className="font-bold text-[1.8rem] leading-[2.6rem] text-[#1F2937]">
              판매가격
            </p>
            <input
              className="h-[5.6rem] rounded-[1.2rem] px-[2.4rem] py-[1.6rem] gap-[1rem] bg-[#F3F4F6] font-normal text-[1.6rem] leading-[2.6rem] placeholder:text-[#9CA3AF] focus:outline-none"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[1.6rem] w-full">
            <p className="font-bold text-[1.8rem] leading-[2.6rem] text-[#1F2937]">
              태그
            </p>
            <div className="w-full flex flex-col gap-[1.4rem]">
              <input
                className="h-[5.6rem] rounded-[1.2rem] py-[1.6rem] px-[2.4rem] gap-[1rem] bg-[#F3F4F6] w-full font-normal text-[1.6rem] leading-[2.6rem] placeholder:text-[#9CA3AF] focus:outline-none"
                placeholder="태그를 입력해주세요"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyUp={handleKeyDown}
              />
              <div className="flex gap-[1.2rem]">
                {tagsArray.map((t, index) => (
                  <div className="flex items-center justify-center h-[3.6rem] rounded-[2.6rem] py-[0.6rem] pr-[1.2rem] pl-[1.6rem] gap-[0.8rem] bg-[#F3F4F6]">
                    <p
                      key={index}
                      className="font-normal text-[1.6rem] leading-[2.6rem] text-[#1F2937]"
                    >
                      #{t}
                    </p>
                    <Image
                      src={close}
                      alt="close"
                      onClick={() =>
                        setTagsArray(tagsArray.filter((_, i) => i !== index))
                      }
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
