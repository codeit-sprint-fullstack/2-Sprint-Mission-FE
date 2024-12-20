import kebab from "@/../public/assets/ic_kebab.svg";
import Image from "next/image";
import defaultProfile from "@/../public/assets/default_profile.svg";

interface CommentProps {
  content: string;
  image: string;
  name: string;
  updatedAt: string;
}

export default function Comment({
  content,
  image,
  name,
  updatedAt,
}: CommentProps) {
  const currentDate: Date = new Date();
  const updateDate: Date = new Date(updatedAt);

  const diff: number = currentDate.getTime() - updateDate.getTime();

  const differenceInSeconds: number = Math.floor(diff / 1000);
  const differenceInMinutes: number = Math.floor(differenceInSeconds / 60);
  const differenceInHours: number = Math.floor(differenceInMinutes / 60);

  return (
    <div className="w-full bg-[#FCFCFC] border-b border-[#E5E7EB] pb-[1.2rem] gap-[2.4rem] flex flex-col">
      <div className="flex w-full justify-between">
        <p className="font-normal text-[1.4rem] leading-[2.4rem] text-[#1F2937]">
          {content}
        </p>
        <Image src={kebab} alt="kebab" />
      </div>
      <div className="flex gap-[0.8rem]">
        <Image
          src={image || defaultProfile}
          alt="image"
          width={32}
          height={32}
        />
        <div className="flex gap-[0.4rem] flex-col">
          <p className="font-normal text-[1.2rem] leading-[1.8rem] text-[#4B5563]">
            {name}
          </p>
          <p className="font-normal text-[1.2rem] leading-[1.8rem] text-[#9CA3AF]">
            {differenceInHours}시간 전
          </p>
        </div>
      </div>
    </div>
  );
}
