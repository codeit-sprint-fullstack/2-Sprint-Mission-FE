import Image from "next/image";

interface landingCardProps {
  image: string;
  category: string;
  title1: string;
  title2: string;
  description1: string;
  description2: string;
  align: string;
}

export default function LandingCard({
  image,
  category,
  title1,
  title2,
  description1,
  description2,
  align,
}: landingCardProps) {
  return (
    <div
      className={`w-[98.8rem] gap-[6.4rem] bg-[#FCFCFC] flex ${
        align === "start" ? "justify-start" : "justify-end"
      }`}
    >
      {align === "start" && (
        <Image src={image} alt="image" width={588} height={444} />
      )}
      <div className="flex flex-col gap-[1.2rem] items-center justify-center">
        <div
          className={`flex flex-col ${
            align === "start" ? "items-start" : "items-end"
          }`}
        >
          <p className="font-bold text-[1.8rem] leading-[2.6rem] text-[#3692FF]">
            {category}
          </p>
          <div
            className={`flex flex-col gap-[2.4rem] ${
              align === "start" ? "items-start" : "items-end"
            }`}
          >
            <div
              className={`flex flex-col ${
                align === "start" ? "items-start" : "items-end"
              }`}
            >
              <p className="font-bold text-[4rem] leading-[5.6rem] text-[#374151]">
                {title1}
              </p>
              <p className="font-bold text-[4rem] leading-[5.6rem] text-[#374151]">
                {title2}
              </p>
            </div>
            <div
              className={`flex flex-col ${
                align === "start" ? "items-start" : "items-end"
              }`}
            >
              <p className="font-medium text-[2.4rem] leading-[3.2rem]">
                {description1}
              </p>
              <p className="font-medium text-[2.4rem] leading-[3.2rem]">
                {description2}
              </p>
            </div>
          </div>
        </div>
      </div>
      {align === "end" && (
        <Image src={image} alt="image" width={588} height={444} />
      )}
    </div>
  );
}
