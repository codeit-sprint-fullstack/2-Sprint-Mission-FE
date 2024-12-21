import Image from "next/image";
import inactHeart from "@/../public/assets/ic_inact_heart.svg";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  heartNum: number;
}

export default function ProductCard({
  image,
  title,
  price,
  heartNum,
}: ProductCardProps) {
  return (
    <div>
      <div className="flex gap-[1.6rem] flex-col">
        <img
          src={image}
          alt="image"
          width={221}
          height={221}
          className="object-cover w-[22.1rem] h-[22.1rem] rounded-[1.6rem]"
        />
        <div className="flex gap-[1rem] flex-col">
          <p className="font-medium text-[1.4rem] leading-[2.4rem] text-[#1F2937]">
            {title}
          </p>
          <p className="font-bold text-[1.6rem] leading-[2.6rem] text-[#1F2937]">
            {price}원
          </p>
          <div className="flex gap-[0.4rem]">
            <Image src={inactHeart} alt="heart" width={16} height={16} />
            <p className="text-medium text-[1.2rem] leading-[1.8rem] text-[#4B5563]">
              {heartNum}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
